import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ContactSection } from "@/components/portfolio/contact-section";
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
    page: "contact",
    path: "/contact"
  });
}

export default async function LocalizedContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <main>
      <ContactSection locale={locale as Locale} />
    </main>
  );
}
