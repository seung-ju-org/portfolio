import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = buildPageMetadata({
  locale: "ko",
  page: "portfolio",
  path: "/portfolio"
});

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioSection />
    </main>
  );
}
