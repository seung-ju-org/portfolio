import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildPageMetadata({
    locale: locale as Locale,
    page: "portfolio",
    path: "/portfolio"
  });
}

export default async function LocalizedPortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <PortfolioSection locale={locale as Locale} />
    </main>
  );
}
