import { AboutSection } from "@/components/portfolio/about-section";
import { getAboutCareer } from "@/lib/career";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  locale: "ko",
  page: "about",
  path: "/about"
});

export default async function AboutPage() {
  const { experienceLabel, items } = await getAboutCareer("ko");

  return (
    <main>
      <AboutSection careerItems={items} experienceLabel={experienceLabel} />
    </main>
  );
}
