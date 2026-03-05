import { PortfolioRelayContent } from "@/components/portfolio/portfolio-relay-content";
import { getMessages, type Locale } from "@/lib/i18n";
import { getCareerProjectsConnectionFromDb } from "@/lib/project-repository";

type PortfolioSectionProps = {
  locale?: Locale;
};

export async function PortfolioSection({ locale = "ko" }: PortfolioSectionProps) {
  const t = getMessages(locale);
  const initialConnection = await getCareerProjectsConnectionFromDb(locale, 8, null);

  return (
    <section className="container py-14 md:py-20" id="portfolio">
      <PortfolioRelayContent
        initialConnection={initialConnection}
        labels={{
          companyLabel: t.portfolio.companyLabel,
          periodLabel: t.portfolio.periodLabel,
          roleLabel: t.portfolio.roleLabel,
          stackLabel: t.portfolio.stackLabel,
          achievementsLabel: t.portfolio.achievementsLabel
        }}
        locale={locale}
      />
    </section>
  );
}
