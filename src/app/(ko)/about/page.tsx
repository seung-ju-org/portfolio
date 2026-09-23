import { SitePage } from "@/components/site/site-page";
import { getSiteContent } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/seo";
export const metadata = buildPageMetadata({ locale: "ko", page: "about", path: "/about" });
export default function Page() {
  return <SitePage locale="ko" page="about" content={getSiteContent("ko")} />;
}
