import { Reveal } from "@/components/reveal";
import type { AboutCareerItem } from "@/lib/career";
import { getMessages, type Locale } from "@/lib/i18n";

type AboutSectionProps = {
  locale?: Locale;
  careerItems: AboutCareerItem[];
  experienceLabel?: string | null;
};

export function AboutSection({ locale = "ko", careerItems, experienceLabel }: AboutSectionProps) {
  const t = getMessages(locale);
  const essayParagraphs = (t.about as { essayParagraphs?: readonly string[] }).essayParagraphs;

  return (
    <section className="container py-14 md:py-20" data-locale={locale} data-page="about" id="about" lang={locale}>
      <div className="mx-auto max-w-6xl space-y-5 break-keep text-muted-foreground">
        <h2 className="text-2xl font-bold !leading-[1.35] text-foreground">{t.about.title}</h2>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
          {t.about.summaryLabel}
        </p>
        <p className="text-sm">{t.about.role}</p>
        <div className="space-y-1 text-sm">
          <p>{experienceLabel ?? t.about.exp}</p>
          <p>{t.about.domain}</p>
        </div>
        <p className="font-semibold text-foreground">{t.about.coreTitle}</p>
        <p className="text-sm">
          Next.js, React, TypeScript, React Native, Java, Kotlin, Spring Boot, NestJS, Express, PostgreSQL, MySQL,
          Redis, AWS, Kubernetes, Helm
        </p>

        <div className="my-2 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
            {t.about.careerLabel ?? "Career"}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="space-y-3">
          {careerItems.map((career, index) => (
            <Reveal className="space-y-1 text-sm" delay={(index % 6) * 0.03} key={`${career.company}-${career.period}`}>
              <p className="font-semibold text-foreground">{career.company}</p>
              <p>{career.position}</p>
              <p className="text-muted-foreground">{career.period}</p>
            </Reveal>
          ))}
        </div>

        <div className="my-2 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
            {t.about.essayLabel}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {essayParagraphs?.length ? (
          <div className="space-y-3">
            <Reveal>
              <p className="font-semibold text-foreground">{essayParagraphs[0]}</p>
            </Reveal>
            {essayParagraphs.slice(1).map((paragraph, index) => (
              <Reveal delay={(index % 6) * 0.03} key={`${paragraph.slice(0, 24)}-${index}`}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <>
            <Reveal>
              <p>{t.about.intro}</p>
            </Reveal>
            {t.about.sections.map((section, index) => (
              <Reveal className="space-y-2" delay={(index % 6) * 0.03} key={section.heading}>
                <p className="font-semibold text-foreground">{section.heading}</p>
                <p>{section.body}</p>
              </Reveal>
            ))}
            <Reveal>
              <p>{t.about.closing}</p>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
