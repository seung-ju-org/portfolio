import type { Metadata } from "next";

import { defaultLocale, locales, type Locale } from "@/lib/i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://seung-ju.com").replace(/\/+$/, "");
export const siteName = "오승주 | Portfolio";
const siteNameByLocale: Record<Locale, string> = {
  ko: "오승주 | 포트폴리오",
  en: "Seung-Ju Oh | Portfolio",
  ja: "オ・スンジュ | ポートフォリオ"
};

type PageKey = "home" | "about" | "portfolio" | "contact";
type PagePath = "/" | "/about" | "/portfolio" | "/contact";

const ogLocaleMap: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP"
};

const pageSeoCopy: Record<Locale, Record<PageKey, { title: string; description: string }>> = {
  ko: {
    home: {
      title: "기술을 연결하고 방향을 설계하는 개발 리더",
      description: "프론트엔드, 백엔드, 인프라, 클라우드를 연결해 서비스 단위로 설계하는 오승주의 포트폴리오입니다."
    },
    about: {
      title: "About Me",
      description: "오승주의 경력, 기술 스택, 문제 해결 관점과 개발 리더십을 소개합니다."
    },
    portfolio: {
      title: "Portfolio",
      description: "실무 프로젝트별 역할, 사용 기술, 성과를 정리한 전체 포트폴리오를 확인하세요."
    },
    contact: {
      title: "Contact Me",
      description: "협업, 채용, 프로젝트 관련 문의를 위한 연락 채널입니다."
    }
  },
  en: {
    home: {
      title: "Connecting technology and shaping product direction",
      description: "Portfolio of Seung-Ju Oh, an engineering lead across frontend, backend, infrastructure, and cloud."
    },
    about: {
      title: "About Me",
      description: "Learn about Seung-Ju Oh's experience, technical breadth, and service-level engineering approach."
    },
    portfolio: {
      title: "Portfolio",
      description: "Browse practical projects with roles, tech stacks, and outcomes across real production work."
    },
    contact: {
      title: "Contact Me",
      description: "Get in touch for collaboration, hiring, and project inquiries."
    }
  },
  ja: {
    home: {
      title: "技術をつなぎ、プロダクトの方向性を設計する",
      description: "フロントエンド、バックエンド、インフラ、クラウドを横断するオ・スンジュのポートフォリオです。"
    },
    about: {
      title: "プロフィール",
      description: "オ・スンジュの経歴、技術スタック、問題解決のアプローチと開発リーダーシップをご紹介します。"
    },
    portfolio: {
      title: "ポートフォリオ",
      description: "実務プロジェクトの役割、技術、成果を整理したポートフォリオをご覧ください。"
    },
    contact: {
      title: "お問い合わせ",
      description: "協業・採用・プロジェクトに関するお問い合わせはこちらから。"
    }
  }
};

function withLocalePrefix(locale: Locale, path: PagePath): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  if (path === "/") return prefix || "/";
  return `${prefix}${path}`;
}

function toAbsolute(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

export function buildPageMetadata({ locale, page, path }: { locale: Locale; page: PageKey; path: PagePath }): Metadata {
  const copy = pageSeoCopy[locale][page];
  const localizedSiteName = siteNameByLocale[locale];
  const titleText = `${copy.title} | ${localizedSiteName}`;
  const canonicalPath = withLocalePrefix(locale, path);
  const canonical = toAbsolute(canonicalPath);
  const languages = Object.fromEntries(
    locales.map((code) => [code, toAbsolute(withLocalePrefix(code, path))])
  ) as Record<Locale, string>;

  return {
    title: { absolute: titleText },
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        "x-default": toAbsolute(withLocalePrefix(defaultLocale, path))
      }
    },
    openGraph: {
      title: titleText,
      description: copy.description,
      url: canonical,
      siteName: localizedSiteName,
      locale: ogLocaleMap[locale],
      type: "website",
      images: [
        {
          url: toAbsolute("/seungju-wordmark-black.svg"),
          alt: "Seung-Ju Oh Portfolio"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: titleText,
      description: copy.description,
      images: [toAbsolute("/seungju-wordmark-black.svg")]
    }
  };
}
