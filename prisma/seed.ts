import { Locale, Prisma, PrismaClient } from "@prisma/client";
import { v7 as uuidv7 } from "uuid";

import { careerHistory } from "../src/lib/career-history";
import { fallbackProjects } from "../src/lib/projects";

const prisma = new PrismaClient();

const localeMap: Record<"ko" | "en" | "ja", Locale> = {
  ko: Locale.KO,
  en: Locale.EN,
  ja: Locale.JA
};

function toUtcMonthDate(year: number, month: number) {
  return new Date(Date.UTC(year, month - 1, 1));
}

function parsePeriod(periodKo: string): { startDate: Date; endDate: Date | null; isOngoing: boolean } {
  const matches = [...periodKo.matchAll(/(\d{4})\.(\d{2})/g)];
  if (!matches.length) {
    throw new Error(`Invalid period format: ${periodKo}`);
  }

  const startYear = Number(matches[0][1]);
  const startMonth = Number(matches[0][2]);
  const startDate = toUtcMonthDate(startYear, startMonth);
  const isOngoing = periodKo.includes("진행중");

  if (isOngoing) {
    return { startDate, endDate: null, isOngoing: true };
  }

  if (matches.length >= 2) {
    const endYear = Number(matches[1][1]);
    const endMonth = Number(matches[1][2]);
    return { startDate, endDate: toUtcMonthDate(endYear, endMonth), isOngoing: false };
  }

  return { startDate, endDate: startDate, isOngoing: false };
}

function parseTechnologies(stack: string): string[] {
  return stack
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}

const careerTranslations: Record<
  string,
  {
    en: { company: string; position: string; overview: string };
    ja: { company: string; position: string; overview: string };
  }
> = {
  "career-1": {
    en: {
      company: "Actbase LLC",
      position: "Software Engineer · Senior Researcher / Team Lead (2 years) · Webmaster",
      overview:
        "Led React Native app development, React/Next.js web development, and Node.js/Express/Sequelize backend development."
    },
    ja: {
      company: "Actbase合同会社",
      position: "Software Engineer · 主任研究員 / チームリード（2年目）· ウェブマスター",
      overview:
        "React Nativeアプリ、React/Next.js Web、Node.js/Express/Sequelizeサーバー開発を担当。"
    }
  },
  "career-2": {
    en: {
      company: "Naegong",
      position: "Production Team · Staff",
      overview: "Worked on website production and operations."
    },
    ja: {
      company: "ネゴン",
      position: "制作チーム · 社員",
      overview: "Webサイト制作および運用を担当。"
    }
  },
  "career-3": {
    en: {
      company: "Tium Communication Co., Ltd.",
      position: "Design · Intern / Probation / Team Member",
      overview: "Handled web design and publishing tasks."
    },
    ja: {
      company: "ティウムコミュニケーション株式会社",
      position: "デザイン · インターン / 試用 / チームメンバー",
      overview: "Webデザインおよびパブリッシング業務を担当。"
    }
  }
};

async function seed() {
  for (const [index, project] of fallbackProjects.entries()) {
    const slug = `project-${project.id}`;
    const { startDate, endDate, isOngoing } = parsePeriod(project.period.ko);
    const technologies = parseTechnologies(project.stack);

    const base = await prisma.project.upsert({
      where: { slug },
      update: {
        displayOrder: index + 1,
        startDate,
        endDate,
        isOngoing,
        links: project.links ? (project.links as Prisma.InputJsonValue) : Prisma.DbNull,
        isPublished: true
      },
      create: {
        id: uuidv7(),
        slug,
        displayOrder: index + 1,
        startDate,
        endDate,
        isOngoing,
        links: project.links ? (project.links as Prisma.InputJsonValue) : Prisma.DbNull,
        isPublished: true
      }
    });

    await prisma.projectTechnology.deleteMany({
      where: { projectId: base.id }
    });

    for (const [techIndex, techName] of technologies.entries()) {
      const technology = await prisma.technology.upsert({
        where: { name: techName },
        update: {},
        create: { id: uuidv7(), name: techName }
      });

      await prisma.projectTechnology.create({
        data: {
          projectId: base.id,
          technologyId: technology.id,
          displayOrder: techIndex
        }
      });
    }

    for (const localeKey of ["ko", "en", "ja"] as const) {
      await prisma.projectTranslation.upsert({
        where: {
          projectId_locale: {
            projectId: base.id,
            locale: localeMap[localeKey]
          }
        },
        update: {
          title: project.title[localeKey],
          company: project.company?.[localeKey] ?? null,
          role: project.role[localeKey],
          achievements: project.achievements[localeKey]
        },
        create: {
          projectId: base.id,
          locale: localeMap[localeKey],
          title: project.title[localeKey],
          company: project.company?.[localeKey] ?? null,
          role: project.role[localeKey],
          achievements: project.achievements[localeKey]
        }
      });
    }
  }

  for (const [index, career] of careerHistory.entries()) {
    const periodMatches = [...career.period.matchAll(/(\d{4})\.(\d{2})/g)];
    if (!periodMatches.length) {
      throw new Error(`Invalid career period format: ${career.period}`);
    }

    const startYear = Number(periodMatches[0][1]);
    const startMonth = Number(periodMatches[0][2]);
    const startDate = toUtcMonthDate(startYear, startMonth);
    const isOngoing = career.period.includes("현재") || career.period.includes("진행중");
    const endDate =
      !isOngoing && periodMatches.length >= 2
        ? toUtcMonthDate(Number(periodMatches[1][1]), Number(periodMatches[1][2]))
        : null;

    const slug = `career-${index + 1}`;
    const base = await prisma.career.upsert({
      where: {
        slug
      },
      update: {
        company: career.company,
        position: career.position,
        overview: career.overview,
        startDate,
        endDate,
        isOngoing,
        displayOrder: index + 1
      },
      create: {
        id: uuidv7(),
        slug,
        company: career.company,
        position: career.position,
        overview: career.overview,
        startDate,
        endDate,
        isOngoing,
        displayOrder: index + 1
      }
    });

    const localized = careerTranslations[slug];
    for (const localeKey of ["ko", "en", "ja"] as const) {
      const translated =
        localeKey === "ko"
          ? { company: career.company, position: career.position, overview: career.overview }
          : localized?.[localeKey] ?? { company: career.company, position: career.position, overview: career.overview };

      await prisma.careerTranslation.upsert({
        where: {
          careerId_locale: {
            careerId: base.id,
            locale: localeMap[localeKey]
          }
        },
        update: {
          company: translated.company,
          position: translated.position,
          overview: translated.overview
        },
        create: {
          careerId: base.id,
          locale: localeMap[localeKey],
          company: translated.company,
          position: translated.position,
          overview: translated.overview
        }
      });
    }
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log(`Seeded ${fallbackProjects.length} projects and ${careerHistory.length} careers.`);
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
