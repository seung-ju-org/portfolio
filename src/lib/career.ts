import type { Locale } from "@/lib/i18n";
import { careerHistory } from "@/lib/career-history";

type CareerRecord = {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  isOngoing: boolean;
  displayOrder: number;
};

export type AboutCareerItem = {
  company: string;
  position: string;
  period: string;
};

function toUtcMonthDate(year: number, month: number) {
  return new Date(Date.UTC(year, month - 1, 1));
}

function parseCareerPeriod(period: string) {
  const matches = [...period.matchAll(/(\d{4})\.(\d{2})/g)];
  if (!matches.length) return null;

  const startDate = toUtcMonthDate(Number(matches[0][1]), Number(matches[0][2]));
  const isOngoing = period.includes("현재") || period.includes("진행중");
  const endDate = !isOngoing && matches.length >= 2 ? toUtcMonthDate(Number(matches[1][1]), Number(matches[1][2])) : null;

  return { startDate, endDate, isOngoing };
}

function toFallbackRecords(): CareerRecord[] {
  return careerHistory
    .map((item, index) => {
      const parsed = parseCareerPeriod(item.period);
      if (!parsed) return null;
      return {
        company: item.company,
        position: item.position,
        startDate: parsed.startDate,
        endDate: parsed.endDate,
        isOngoing: parsed.isOngoing,
        displayOrder: index + 1
      };
    })
    .filter((item): item is CareerRecord => !!item);
}

function formatPeriodDate(date: Date, locale: Locale) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  if (locale === "en") {
    return date.toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  }
  if (locale === "ja") {
    return `${year}年${month}月`;
  }
  return `${year}.${String(month).padStart(2, "0")}`;
}

function ongoingLabel(locale: Locale) {
  if (locale === "en") return "Present";
  if (locale === "ja") return "現在";
  return "현재";
}

function formatCareerPeriod(record: CareerRecord, locale: Locale) {
  const start = formatPeriodDate(record.startDate, locale);
  const end = record.isOngoing || !record.endDate ? ongoingLabel(locale) : formatPeriodDate(record.endDate, locale);
  return locale === "en" ? `${start} - ${end}` : `${start} ~ ${end}`;
}

function buildExperienceLabel(records: CareerRecord[], locale: Locale) {
  if (!records.length) return null;

  const startDate = records.reduce((min, item) => (item.startDate < min ? item.startDate : min), records[0].startDate);
  const start = formatPeriodDate(startDate, locale);

  if (locale === "en") return `Career: ${start} -`;
  if (locale === "ja") return `経歴: ${start} ~`;
  return `총 경력: ${start} ~`;
}

async function getCareerRecords(locale: Locale): Promise<CareerRecord[]> {
  try {
    const { getCareerHistoryFromDb } = await import("./career-repository");
    const records = await getCareerHistoryFromDb(locale);
    if (!records.length) return toFallbackRecords();
    return records;
  } catch {
    return toFallbackRecords();
  }
}

export async function getAboutCareer(locale: Locale): Promise<{ experienceLabel: string | null; items: AboutCareerItem[] }> {
  const records = await getCareerRecords(locale);
  const sorted = [...records].sort((a, b) => a.displayOrder - b.displayOrder);

  return {
    experienceLabel: buildExperienceLabel(sorted, locale),
    items: sorted.map((record) => ({
      company: record.company,
      position: record.position,
      period: formatCareerPeriod(record, locale)
    }))
  };
}
