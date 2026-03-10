import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { HeroSection } from "@/components/portfolio/hero-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    page: "home",
    path: "/"
  });
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <HeroSection compactBottom locale={locale as Locale} />
      <ContactSection compactTop locale={locale as Locale} />
    </main>
  );
}
