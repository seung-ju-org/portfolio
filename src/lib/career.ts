import type { Locale } from "@/lib/i18n";

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
  const { getCareerHistoryFromDb } = await import("./career-repository");
  return getCareerHistoryFromDb(locale);
}

export async function getAboutCareer(
  locale: Locale
): Promise<{ experienceLabel: string | null; items: AboutCareerItem[] }> {
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
