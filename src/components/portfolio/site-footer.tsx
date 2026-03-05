import { Brand } from "@/components/portfolio/brand";
import { getMessages, withLocale, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale?: Locale;
};

export function SiteFooter({ locale = "ko" }: SiteFooterProps) {
  const t = getMessages(locale);

  return (
    <footer className="border-t py-4 md:py-6">
      <div className="container flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <Brand className="opacity-80" href={withLocale(locale, "/")} showMark={false} wordmarkClassName="h-5" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Seung Ju. {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
