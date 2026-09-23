import { notFound } from "next/navigation";
import { SitePage } from "@/components/site/site-page";
import { isLocale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteContent, type Locale } from "@/lib/site-content";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }];
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return isLocale(locale) ? buildPageMetadata({ locale: locale as Locale, page: "home", path: "/" }) : {};
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "ko") notFound();
  const l = locale as Locale;
  return <SitePage locale={l} page="home" content={getSiteContent(l)} />;
}
