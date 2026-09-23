import { SitePage } from "@/components/site/site-page";
import { getSiteContent } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ locale: "ko", page: "portfolio", path: "/portfolio" });
export default function Page() {
  return <SitePage locale="ko" page="portfolio" content={getSiteContent("ko")} />;
}
