import { ContactSection } from "@/components/portfolio/contact-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "ko",
  page: "contact",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  );
}
