import { ArrowRight, Cloud, Github, Layers, Palette, Server } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { getProjectCountViaGraphql } from "@/lib/graphql/project-count";
import { getMessages, withLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  locale?: Locale;
  compactBottom?: boolean;
};

const homeCopy: Record<
  Locale,
  {
    stackTitle: string;
    stackDescription: string;
    stackCards: Array<{ icon: "design" | "frontend" | "backend" | "infra"; title: string; body: string }>;
  }
> = {
  ko: {
    stackTitle: "서비스 전체를 설계하는 방식",
    stackDescription: "기능 개발이 아니라 서비스 단위로 보고, 구조와 운영까지 함께 설계합니다.",
    stackCards: [
      {
        icon: "design",
        title: "Design / UXUI",
        body: "웹디자인 기반으로 브랜드 톤, 정보 구조, 인터랙션 흐름까지 함께 설계합니다."
      },
      {
        icon: "frontend",
        title: "Frontend / UX",
        body: "Next.js, React 기반으로 사용자 흐름과 성능을 함께 최적화합니다."
      },
      {
        icon: "backend",
        title: "Backend / API",
        body: "Spring Boot, NestJS, Node.js로 도메인에 맞는 API 구조를 설계합니다."
      },
      {
        icon: "infra",
        title: "Infra / Cloud",
        body: "AWS, Redis, Kubernetes 환경에서 배포/확장/운영 기준을 정리합니다."
      }
    ]
  },
  en: {
    stackTitle: "How I Design End-to-End Services",
    stackDescription: "I think in services, not isolated features, and design through to operations.",
    stackCards: [
      {
        icon: "design",
        title: "Design / UXUI",
        body: "With a web design foundation, I shape brand tone, information architecture, and interaction flow."
      },
      {
        icon: "frontend",
        title: "Frontend / UX",
        body: "With Next.js and React, I optimize both user flow and runtime performance."
      },
      {
        icon: "backend",
        title: "Backend / API",
        body: "With Spring Boot, NestJS, and Node.js, I shape APIs around domain boundaries."
      },
      {
        icon: "infra",
        title: "Infra / Cloud",
        body: "On AWS, Redis, and Kubernetes, I define clear standards for deploy and scale."
      }
    ]
  },
  ja: {
    stackTitle: "サービス全体を設計するアプローチ",
    stackDescription: "機能単位ではなくサービス単位で捉え、運用まで含めて設計します。",
    stackCards: [
      {
        icon: "design",
        title: "Design / UXUI",
        body: "Webデザインの基盤を活かし、ブランドトーン、情報設計、インタラクション導線まで設計します。"
      },
      {
        icon: "frontend",
        title: "Frontend / UX",
        body: "Next.js と React で、ユーザー導線と性能を同時に最適化します。"
      },
      {
        icon: "backend",
        title: "Backend / API",
        body: "Spring Boot、NestJS、Node.js でドメインに沿ったAPIを設計します。"
      },
      {
        icon: "infra",
        title: "Infra / Cloud",
        body: "AWS、Redis、Kubernetes で配備・拡張・運用基準を整理します。"
      }
    ]
  }
};

function StackIcon({ type }: { type: "design" | "frontend" | "backend" | "infra" }) {
  if (type === "design") return <Palette className="h-5 w-5" />;
  if (type === "frontend") return <Layers className="h-5 w-5" />;
  if (type === "backend") return <Server className="h-5 w-5" />;
  return <Cloud className="h-5 w-5" />;
}

function getCareerTotalMonths(startedAt: Date): number {
  const now = new Date();
  const totalMonths =
    (now.getUTCFullYear() - startedAt.getUTCFullYear()) * 12 + (now.getUTCMonth() - startedAt.getUTCMonth());
  return Math.max(0, totalMonths);
}

function formatCareerMonths(locale: Locale, totalMonths: number) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (locale === "ko") return months ? `${years}년 ${months}개월` : `${years}년`;
  if (locale === "ja") return months ? `${years}年 ${months}か月` : `${years}年`;
  return months ? `${years}y ${months}m` : `${years}y`;
}

export async function HeroSection({ locale = "ko", compactBottom = false }: HeroSectionProps) {
  const t = getMessages(locale);
  const projectCount = await getProjectCountViaGraphql();
  const careerTotalMonths = getCareerTotalMonths(new Date(Date.UTC(2019, 0, 1)));
  const copy = homeCopy[locale];

  return (
    <section
      className={cn("container pt-18 md:pt-28", compactBottom ? "pb-8 md:pb-10" : "pb-24 md:pb-32")}
      data-locale={locale}
      id="top"
      lang={locale}
    >
      <div className="grid items-start gap-10">
        <Reveal className="space-y-6">
          <p className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            {t.hero.badge}
          </p>
          <h1 className="text-4xl font-bold !leading-[1.35] tracking-tight md:text-5xl md:!leading-[1.35]">
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </h1>
          <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{t.hero.description}</p>
          <div className="grid max-w-3xl gap-3 sm:grid-cols-3">
            <div className="interactive-card flex min-h-[104px] flex-col justify-center rounded-2xl border bg-card/80 p-4 text-center">
              <p className="text-2xl font-bold leading-tight tabular-nums text-foreground">{projectCount}</p>
              <p className="mt-1 text-xs leading-tight text-muted-foreground">{t.hero.projectCountLabel}</p>
            </div>
            <div className="interactive-card flex min-h-[104px] flex-col justify-center rounded-2xl border bg-card/80 p-4 text-center">
              <p className="text-2xl font-bold leading-tight tabular-nums text-foreground whitespace-nowrap">
                {formatCareerMonths(locale, careerTotalMonths)}
              </p>
              <p className="mt-1 text-xs leading-tight text-muted-foreground">{t.hero.experienceLabel}</p>
            </div>
            <div className="interactive-card flex min-h-[104px] flex-col justify-center rounded-2xl border bg-card/80 p-4 text-center">
              <p className="text-base font-semibold leading-tight text-foreground">{t.hero.coverageValue}</p>
              <p className="mt-1 text-xs leading-tight text-muted-foreground">{t.hero.coverageLabel}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              className={buttonVariants({ size: "lg", variant: "default" })}
              href={withLocale(locale, "/portfolio")}
            >
              {t.hero.ctaProjects}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a
              className="inline-flex items-center gap-1 hover:text-foreground"
              href="https://github.com/seung-juv"
              rel="noreferrer"
              target="_blank"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {copy.stackCards.map((card, index) => (
          <Reveal
            className="interactive-card rounded-2xl border bg-card/70 p-6"
            delay={0.08 + index * 0.04}
            key={card.title}
          >
            <div className="mb-3 inline-flex rounded-lg border bg-background p-2 text-primary">
              <StackIcon type={card.icon} />
            </div>
            <p className="text-base font-semibold text-foreground">{card.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{card.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
