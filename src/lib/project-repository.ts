import { Prisma } from "@prisma/client";

import type { Locale } from "@/lib/i18n";
import type { CareerProject } from "@/lib/projects";
import { prisma } from "@/lib/prisma";
import { getRedisClient } from "@/lib/redis";

type DbProject = Prisma.ProjectGetPayload<{
  include: {
    translations: true;
    technologies: {
      include: {
        technology: true;
      };
    };
  };
}>;

const localeMap: Record<Locale, "KO" | "EN" | "JA"> = {
  ko: "KO",
  en: "EN",
  ja: "JA"
};

const CACHE_KEY_PREFIX = "portfolio:projects:v2";
const CACHE_TTL_SECONDS = 300;

function keyForProjectList(locale: Locale) {
  return `${CACHE_KEY_PREFIX}:list:${locale}`;
}

function keyForProjectCount() {
  return `${CACHE_KEY_PREFIX}:count`;
}

function keyForProjectConnection(locale: Locale, first: number, after?: string | null) {
  return `${CACHE_KEY_PREFIX}:conn:${locale}:${first}:${after ?? "root"}`;
}

async function getCacheValue<T>(key: string): Promise<T | null> {
  try {
    const redis = getRedisClient();
    const raw = await redis.get(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function setCacheValue<T>(key: string, value: T): Promise<void> {
  try {
    const redis = getRedisClient();
    await redis.set(key, JSON.stringify(value), "EX", CACHE_TTL_SECONDS);
  } catch {
    // Cache failure should never block DB fallback.
  }
}

function asStringList(value: Prisma.JsonValue): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function asLinks(value: Prisma.JsonValue | null): CareerProject["links"] {
  if (!Array.isArray(value)) return undefined;
  return value
    .filter((item): item is { label: string; url: string } => {
      if (!item || typeof item !== "object") return false;
      const link = item as Record<string, unknown>;
      return typeof link.label === "string" && typeof link.url === "string";
    })
    .map((link) => ({ label: link.label, url: link.url }));
}

function formatPeriod(startDate: Date, endDate: Date | null, isOngoing: boolean, locale: Locale): string {
  const format = (date: Date) =>
    `${date.getUTCFullYear()}.${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  const ongoingLabel = locale === "ko" ? "진행중" : locale === "ja" ? "進行中" : "Ongoing";

  return `${format(startDate)} ~ ${isOngoing || !endDate ? ongoingLabel : format(endDate)}`;
}

function mapProject(project: DbProject, locale: Locale): CareerProject | null {
  const targetLocale = localeMap[locale];
  const target = project.translations.find((translation) => translation.locale === targetLocale);
  const fallback = project.translations.find((translation) => translation.locale === "KO");
  const translation = target ?? fallback;

  if (!translation) return null;

  return {
    id: project.id,
    title: translation.title,
    company: translation.company ?? undefined,
    period: formatPeriod(project.startDate, project.endDate, project.isOngoing, locale),
    role: translation.role,
    achievements: asStringList(translation.achievements),
    stack: project.technologies
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((item) => item.technology.name)
      .join(", "),
    links: asLinks(project.links)
  };
}

export async function getCareerProjectsFromDb(locale: Locale): Promise<CareerProject[]> {
  const cacheKey = keyForProjectList(locale);
  const cached = await getCacheValue<CareerProject[]>(cacheKey);
  if (cached) return cached;

  const records = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: [{ startDate: "desc" }, { id: "desc" }],
    include: {
      translations: true,
      technologies: {
        include: {
          technology: true
        }
      }
    }
  });

  const projects = records.map((record) => mapProject(record, locale)).filter((record): record is CareerProject => !!record);
  await setCacheValue(cacheKey, projects);
  return projects;
}

export async function getCareerProjectCountFromDb(): Promise<number> {
  const cacheKey = keyForProjectCount();
  const cached = await getCacheValue<number>(cacheKey);
  if (cached !== null) return cached;

  const count = await prisma.project.count({ where: { isPublished: true } });
  await setCacheValue(cacheKey, count);
  return count;
}

export type CareerProjectConnection = {
  edges: Array<{
    cursor: string;
    node: CareerProject;
  }>;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
  totalCount: number;
};

export async function getCareerProjectsConnectionFromDb(
  locale: Locale,
  first: number,
  after?: string | null
): Promise<CareerProjectConnection> {
  const safeFirst = Math.max(1, Math.min(first, 24));
  const cacheKey = keyForProjectConnection(locale, safeFirst, after);
  const cached = await getCacheValue<CareerProjectConnection>(cacheKey);
  if (cached) return cached;

  const [records, totalCount] = await Promise.all([
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ startDate: "desc" }, { id: "desc" }],
      include: {
        translations: true,
        technologies: {
          include: {
            technology: true
          }
        }
      },
      take: safeFirst + 1,
      ...(after
        ? {
            cursor: { id: after },
            skip: 1
          }
        : {})
    }),
    prisma.project.count({ where: { isPublished: true } })
  ]);

  const hasNextPage = records.length > safeFirst;
  const pageRecords = hasNextPage ? records.slice(0, safeFirst) : records;
  const edges = pageRecords
    .map((record) => {
      const node = mapProject(record, locale);
      if (!node) return null;
      return {
        cursor: record.id,
        node
      };
    })
    .filter((edge): edge is { cursor: string; node: CareerProject } => !!edge);

  const result = {
    edges,
    pageInfo: {
      hasNextPage,
      hasPreviousPage: !!after,
      startCursor: edges.length ? edges[0].cursor : null,
      endCursor: edges.length ? edges[edges.length - 1].cursor : null
    },
    totalCount
  };
  await setCacheValue(cacheKey, result);
  return result;
}
