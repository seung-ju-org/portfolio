import { notFound } from "next/navigation";
import "../../globals.css";
import { isLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ja" }];
}
export default async function LocaleLayout({
  children,
  params
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "ko") notFound();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
