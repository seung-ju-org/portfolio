import { HeroSection } from "@/components/portfolio/hero-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "ko",
  page: "home",
  path: "/"
});

export default function Home() {
  return (
    <main>
      <HeroSection compactBottom />
      <ContactSection compactTop />
    </main>
  );
}
