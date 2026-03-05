import { Locale as PrismaLocale } from "@prisma/client";

import type { Locale } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";

export type DbCareerItem = {
  company: string;
  position: string;
  overview: string;
  startDate: Date;
  endDate: Date | null;
  isOngoing: boolean;
  displayOrder: number;
};

const localeMap: Record<Locale, PrismaLocale> = {
  ko: PrismaLocale.KO,
  en: PrismaLocale.EN,
  ja: PrismaLocale.JA
};

export async function getCareerHistoryFromDb(locale: Locale): Promise<DbCareerItem[]> {
  const records = await prisma.career.findMany({
    orderBy: [{ displayOrder: "asc" }, { startDate: "desc" }, { id: "desc" }],
    include: {
      translations: true
    }
  });

  return records.map((record) => ({
    company:
      record.translations.find((translation) => translation.locale === localeMap[locale])?.company ??
      record.translations.find((translation) => translation.locale === PrismaLocale.KO)?.company ??
      record.company,
    position:
      record.translations.find((translation) => translation.locale === localeMap[locale])?.position ??
      record.translations.find((translation) => translation.locale === PrismaLocale.KO)?.position ??
      record.position,
    overview:
      record.translations.find((translation) => translation.locale === localeMap[locale])?.overview ??
      record.translations.find((translation) => translation.locale === PrismaLocale.KO)?.overview ??
      record.overview,
    startDate: record.startDate,
    endDate: record.endDate,
    isOngoing: record.isOngoing,
    displayOrder: record.displayOrder
  }));
}
