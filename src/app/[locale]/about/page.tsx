import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AboutSection } from "@/components/portfolio/about-section";
import { getAboutCareer } from "@/lib/career";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    page: "about",
    path: "/about"
  });
}

export default async function LocalizedAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const targetLocale = locale as Locale;
  const { experienceLabel, items } = await getAboutCareer(targetLocale);

  return (
    <main>
      <AboutSection careerItems={items} experienceLabel={experienceLabel} locale={targetLocale} />
    </main>
  );
}
