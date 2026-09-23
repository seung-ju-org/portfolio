import type { Locale } from "./i18n";

export type ProjectCategory = "work" | "design" | "archive" | "opensource";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  provenance: string;
  sourceUrl?: string;
  fit?: "cover" | "contain";
};

export type EvidenceProject = {
  id: string;
  title: string;
  company?: string;
  period: string;
  role: string;
  achievements: string[];
  stack: string;
  links?: { label: string; url: string }[];
  category: ProjectCategory;
  image?: ProjectImage;
};

type LocalizedEvidenceProject = Record<Locale, EvidenceProject[]>;

const archiveCommit = "042678a221665ce9823d30e599a5e4098102e5c4";
const archiveRepository = "https://github.com/seung-juv/portfolio-2018";
const rawArchive = `https://raw.githubusercontent.com/seung-juv/portfolio-2018/${archiveCommit}`;

const archiveImage = (
  file: string,
  sourcePath: string,
  width: number,
  height: number,
  alt: Record<Locale, string>,
  caption: Record<Locale, string>,
  fit: ProjectImage["fit"] = "cover"
): Record<Locale, ProjectImage> => ({
  ko: {
    src: `/images/projects/archive/${file}`,
    width,
    height,
    alt: alt.ko,
    caption: caption.ko,
    provenance: "2018 공개 포트폴리오 아카이브",
    sourceUrl: `${rawArchive}/${sourcePath}`,
    fit
  },
  en: {
    src: `/images/projects/archive/${file}`,
    width,
    height,
    alt: alt.en,
    caption: caption.en,
    provenance: "2018 public portfolio archive",
    sourceUrl: `${rawArchive}/${sourcePath}`,
    fit
  },
  ja: {
    src: `/images/projects/archive/${file}`,
    width,
    height,
    alt: alt.ja,
    caption: caption.ja,
    provenance: "2018年公開ポートフォリオアーカイブ",
    sourceUrl: `${rawArchive}/${sourcePath}`,
    fit
  }
});

const images = {
  portfolio: archiveImage(
    "portfolio-2018-profile.webp",
    "images/portfolio/main/picture.png",
    177,
    236,
    {
      ko: "2018 개인 포트폴리오의 프로필 일러스트",
      en: "Profile illustration from the 2018 personal portfolio",
      ja: "2018年個人ポートフォリオのプロフィールイラスト"
    },
    {
      ko: "2018 개인 디자인 포트폴리오 아카이브",
      en: "2018 personal design portfolio archive",
      ja: "2018年個人デザインポートフォリオアーカイブ"
    },
    "contain"
  ),
  dear: archiveImage(
    "dear-my-pet-app-study.webp",
    "project/project_dear_app/images/thumb.jpg",
    1200,
    900,
    {
      ko: "Dear 앱 디자인 스터디 썸네일",
      en: "Dear app design study thumbnail",
      ja: "Dearアプリデザインスタディのサムネイル"
    },
    {
      ko: "2018 공개 포트폴리오의 Dear 앱 디자인 스터디",
      en: "Dear app design study in the 2018 public portfolio",
      ja: "2018年公開ポートフォリオのDearアプリデザインスタディ"
    }
  ),
  green: archiveImage(
    "childfund-leaflet-study.webp",
    "project/project_green/images/thumb.jpg",
    1200,
    840,
    {
      ko: "초록우산 리플릿 독립 디자인 스터디 썸네일",
      en: "ChildFund independent leaflet design study thumbnail",
      ja: "チョロクウサン独立リーフレットデザインスタディのサムネイル"
    },
    {
      ko: "2018 공개 포트폴리오의 독립 디자인 스터디",
      en: "Independent design study in the 2018 public portfolio",
      ja: "2018年公開ポートフォリオの独立デザインスタディ"
    }
  ),
  logo: archiveImage(
    "chonghwa-young-logo-study.webp",
    "project/project_chong_logo/images/thumb.png",
    600,
    600,
    {
      ko: "청화영 로고 독립 디자인 스터디 썸네일",
      en: "Chonghwa Young independent logo design study thumbnail",
      ja: "チョンファヨン独立ロゴデザインスタディのサムネイル"
    },
    {
      ko: "2018 공개 포트폴리오의 독립 로고 디자인 스터디",
      en: "Independent logo design study in the 2018 public portfolio",
      ja: "2018年公開ポートフォリオの独立ロゴデザインスタディ"
    }
  ),
  garbage: archiveImage(
    "garbage-collection-logo-study.webp",
    "project/project_garbege_logo/images/Preview.png",
    600,
    600,
    {
      ko: "가비지 컬렉션 독립 로고 디자인 스터디 썸네일",
      en: "Garbage Collection independent logo design study thumbnail",
      ja: "ガービッジ・コレクション独立ロゴデザインスタディのサムネイル"
    },
    {
      ko: "2018 공개 포트폴리오의 독립 로고 디자인 스터디",
      en: "Independent logo design study in the 2018 public portfolio",
      ja: "2018年公開ポートフォリオの独立ロゴデザインスタディ"
    }
  )
};

export const evidenceProjects: LocalizedEvidenceProject = {
  ko: [
    {
      id: "chadu-dealerdu-2021",
      title: "차두 & 딜러두 서비스 개발",
      company: "액트베이스",
      period: "2021.01–2021.04",
      role: "중고차 구매·딜러 판매 앱 개발",
      achievements: ["차두 구매 서비스와 딜러두 판매 서비스 앱 개발"],
      stack: "React Native",
      category: "work"
    },
    {
      id: "shoedoc-2021",
      title: "Shoedoc 서비스 개발",
      company: "액트베이스",
      period: "2021.04–2021.07",
      role: "신발·구두 수선 서비스 앱/API 개발",
      achievements: ["모바일 앱과 API 개발"],
      stack: "React Native, Express, Sequelize",
      category: "work"
    },
    {
      id: "showket-2021",
      title: "Showket 서비스 개발",
      company: "액트베이스",
      period: "2021.07–2021.09",
      role: "의류 구매·판매·스트리밍 서비스 개발",
      achievements: ["앱, CMS, API 개발"],
      stack: "React Native, React, Express, Sequelize",
      category: "work"
    },
    {
      id: "dear-app-design-2018",
      title: "Dear 앱 디자인 스터디",
      company: "디자인 그룹 과제",
      period: "2018",
      role: "그룹 브랜드 디자인 과제",
      achievements: ["2018 공개 포트폴리오에 수록된 그룹 브랜드 디자인 과제"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: images.dear.ko
    },
    {
      id: "childfund-leaflet-design-2018",
      title: "초록우산 리플릿 디자인 스터디",
      company: "개인 작업",
      period: "2018",
      role: "독립 리플릿 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 독립 디자인 스터디"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: images.green.ko
    },
    {
      id: "chonghwa-young-logo-design-2018",
      title: "청화영 로고 디자인",
      company: "개인 작업",
      period: "2018",
      role: "독립 로고 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 독립 로고 디자인 스터디"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: images.logo.ko
    },
    {
      id: "garbage-collection-logo-design-2018",
      title: "가비지 컬렉션 로고 디자인",
      company: "개인 작업",
      period: "2018",
      role: "독립 로고 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 독립 로고 디자인 스터디"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: images.garbage.ko
    },
    {
      id: "line-web-concept-2018",
      title: "LINE 웹 리디자인 콘셉트",
      company: "개인 작업",
      period: "2018",
      role: "웹 리디자인 콘셉트",
      achievements: ["2018 공개 포트폴리오에 수록된 정보구조 리디자인 콘셉트"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/line-web-redesign-concept.webp",
        width: 1200,
        height: 960,
        alt: "LINE 웹 리디자인 콘셉트",
        caption: "2018 공개 포트폴리오 수록 리디자인 콘셉트",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "line-app-concept-2018",
      title: "LINE 앱 리디자인 콘셉트",
      company: "개인 작업",
      period: "2018",
      role: "앱 리디자인 콘셉트",
      achievements: ["2018 공개 포트폴리오에 수록된 앱 리디자인 콘셉트"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/line-app-redesign-concept.webp",
        width: 1200,
        height: 900,
        alt: "LINE 앱 리디자인 콘셉트",
        caption: "2018 공개 포트폴리오 수록 리디자인 콘셉트",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "dear-my-pet-poster-2018",
      title: "Dear my Pet 포스터 디자인 스터디",
      company: "디자인 그룹 과제",
      period: "2018",
      role: "그룹 브랜드 디자인 과제",
      achievements: ["2018 공개 포트폴리오에 수록된 그룹 과제 작업"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/dear-my-pet-poster-study.webp",
        width: 1152,
        height: 424,
        alt: "Dear my Pet 포스터 디자인 스터디",
        caption: "2018 공개 포트폴리오 수록 그룹 브랜드 디자인 과제",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "identity-leaflet-2018",
      title: "아이덴티티 리플릿 디자인 스터디",
      company: "개인 작업",
      period: "2018",
      role: "개인 아이덴티티 디자인",
      achievements: ["자신을 표현하는 브로슈어 디자인"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/identity-leaflet-study.webp",
        width: 318,
        height: 424,
        alt: "아이덴티티 리플릿 디자인 스터디",
        caption: "2018 공개 포트폴리오 수록 개인 아이덴티티 작업",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "and-then-there-were-none-2018",
      title: "그리고 아무도 없었다 북커버 디자인",
      company: "개인 작업",
      period: "2018",
      role: "북커버 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 북커버 디자인"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/and-then-there-were-none-book-cover-study.webp",
        width: 1152,
        height: 424,
        alt: "그리고 아무도 없었다 북커버 디자인",
        caption: "2018 공개 포트폴리오 수록 북커버 디자인 스터디",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "elegant-night-cats-2018",
      title: "우아한 밤과 고양이들 북커버 디자인",
      company: "개인 작업",
      period: "2018",
      role: "북커버 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 북커버 디자인"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/elegant-night-cats-book-cover-study.webp",
        width: 1200,
        height: 819,
        alt: "우아한 밤과 고양이들 북커버 디자인",
        caption: "2018 공개 포트폴리오 수록 북커버 디자인 스터디",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "andy-warhol-magazine-2018",
      title: "Andy Warhol 매거진 디자인",
      company: "개인 작업",
      period: "2018",
      role: "매거진 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 매거진 디자인"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/andy-warhol-magazine-study.webp",
        width: 900,
        height: 1200,
        alt: "Andy Warhol 매거진 디자인",
        caption: "2018 공개 포트폴리오 수록 디자인 스터디",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "electronic-guitar-phonecase-2018",
      title: "Electronic Guitar 폰케이스 디자인",
      company: "개인 작업",
      period: "2018",
      role: "폰케이스 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 폰케이스 디자인"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/electronic-guitar-phonecase-study.webp",
        width: 1200,
        height: 605,
        alt: "Electronic Guitar 폰케이스 디자인",
        caption: "2018 공개 포트폴리오 수록 디자인 스터디",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "star-box-logo-2018",
      title: "STAR BOX 로고 디자인",
      company: "개인 작업",
      period: "2018",
      role: "로고 디자인 스터디",
      achievements: ["2018 공개 포트폴리오에 수록된 로고 디자인"],
      stack: "Design",
      links: [{ label: "Source", url: archiveRepository }],
      category: "design",
      image: {
        src: "/images/projects/archive/star-box-logo-study.webp",
        width: 600,
        height: 600,
        alt: "STAR BOX 로고 디자인",
        caption: "2018 공개 포트폴리오 수록 로고 디자인 스터디",
        provenance: "2018 공개 포트폴리오 아카이브",
        sourceUrl: archiveRepository
      }
    },
    {
      id: "prismabook-2020",
      title: "Prismabook — 소셜 앱 학습 프로토타입",
      company: "개인 작업",
      period: "2020.09",
      role: "React·GraphQL 기반 소셜 앱 프로토타입",
      achievements: [
        "Facebook 스타일 UI를 재현한 학습용 프로토타입",
        "피드, 프로필, 친구, 스토리, 검색, 그룹, Watch 화면 구조 구현"
      ],
      stack: "React, GraphQL",
      links: [
        { label: "Frontend source", url: "https://github.com/seung-juv/prismabook-frontend" },
        { label: "Backend source", url: "https://github.com/seung-juv/prismabook-backend" }
      ],
      category: "opensource",
      image: {
        src: "/images/projects/archive/prismabook-portfolio-2020-still.webp",
        width: 1000,
        height: 632,
        alt: "Prismabook 소셜 앱 학습 프로토타입 화면",
        caption: "2020 개인 포트폴리오 수록 프로토타입",
        provenance: "공개 개인 포트폴리오 아카이브",
        sourceUrl: "https://github.com/seung-juv/portfolio-2020",
        fit: "contain"
      }
    },
    {
      id: "storage-api-2023",
      title: "Storage API",
      company: "개인 작업",
      period: "2023.03",
      role: "파일 저장 API 도구",
      achievements: ["업로드, 메타데이터 조회, 파일 제공, 이미지 변형 캐시 구조 구현"],
      stack: "NestJS, Sharp",
      links: [{ label: "Source", url: "https://github.com/seung-juv/storage" }],
      category: "opensource"
    },
    {
      id: "ui-library-2023",
      title: "UI 라이브러리",
      company: "개인 작업",
      period: "2023.03",
      role: "React 컴포넌트와 Storybook 문서화 실험",
      achievements: ["타입드 props와 Storybook을 갖춘 UI 컴포넌트 실험"],
      stack: "React, TypeScript, SCSS, Storybook",
      links: [{ label: "Source", url: "https://github.com/seung-juv/ui" }],
      category: "opensource"
    },
    {
      id: "portfolio-engineering-evolution",
      title: "포트폴리오 엔지니어링 진화",
      company: "개인 작업",
      period: "2020–2021",
      role: "개인 포트폴리오 개발",
      achievements: ["React 기반 포트폴리오에서 Next.js·TypeScript 기반 구조로 발전"],
      stack:
        "React 16, React Router, styled-components, GSAP → Next.js 10, TypeScript, Storybook, Apollo Client, GraphQL",
      links: [
        { label: "2020 source", url: "https://github.com/seung-juv/portfolio-2020" },
        { label: "2021 source", url: "https://github.com/seung-juv/portfolio-typescript" }
      ],
      category: "archive"
    }
  ],
  en: [],
  ja: []
};

for (const project of evidenceProjects.ko) {
  if (project.category === "design" || project.category === "archive")
    project.image = project.image ? { ...project.image, fit: "contain" } : undefined;
}

type Translation = { title: string; role: string; achievements: string[] };
const translations: Record<Exclude<Locale, "ko">, Record<string, Translation>> = {
  en: {
    "chadu-dealerdu-2021": {
      title: "Chadu & Dealerdu Service Development",
      role: "Used-car buyer and dealer-sales app development",
      achievements: ["Built the Chadu buyer and Dealerdu seller applications"]
    },
    "shoedoc-2021": {
      title: "Shoedoc Service Development",
      role: "Shoe-repair app and API development",
      achievements: ["Built the mobile application and API"]
    },
    "showket-2021": {
      title: "Showket Service Development",
      role: "Apparel commerce and streaming service development",
      achievements: ["Built the app, CMS, and API"]
    },
    "dear-app-design-2018": {
      title: "Dear My Pet App Design Study",
      role: "Group brand-design assignment",
      achievements: ["App design included in the 2018 public portfolio"]
    },
    "childfund-leaflet-design-2018": {
      title: "ChildFund Leaflet Design Study",
      role: "Independent leaflet design study",
      achievements: ["Independent design study included in the 2018 public portfolio"]
    },
    "chonghwa-young-logo-design-2018": {
      title: "Chonghwa Young Logo Study",
      role: "Independent logo design study",
      achievements: ["Independent logo study included in the 2018 public portfolio"]
    },
    "garbage-collection-logo-design-2018": {
      title: "Garbage Collection Logo Study",
      role: "Independent logo design study",
      achievements: ["Independent logo study included in the 2018 public portfolio"]
    },
    "line-web-concept-2018": {
      title: "LINE Web Redesign Concept",
      role: "Web redesign concept",
      achievements: ["Information-architecture redesign concept included in the 2018 public portfolio"]
    },
    "line-app-concept-2018": {
      title: "LINE App Redesign Concept",
      role: "App redesign concept",
      achievements: ["App redesign concept included in the 2018 public portfolio"]
    },
    "dear-my-pet-poster-2018": {
      title: "Dear My Pet Poster Design Study",
      role: "Group brand-design assignment",
      achievements: ["Group assignment included in the 2018 public portfolio"]
    },
    "identity-leaflet-2018": {
      title: "Identity Leaflet Design Study",
      role: "Personal identity design",
      achievements: ["Brochure design expressing personal identity"]
    },
    "and-then-there-were-none-2018": {
      title: "And Then There Were None Book-cover Study",
      role: "Book-cover design study",
      achievements: ["Book-cover design included in the 2018 public portfolio"]
    },
    "elegant-night-cats-2018": {
      title: "Elegant Night and Cats Book-cover Study",
      role: "Book-cover design study",
      achievements: ["Book-cover design included in the 2018 public portfolio"]
    },
    "andy-warhol-magazine-2018": {
      title: "Andy Warhol Magazine Design Study",
      role: "Magazine design study",
      achievements: ["Magazine design included in the 2018 public portfolio"]
    },
    "electronic-guitar-phonecase-2018": {
      title: "Electronic Guitar Phone-case Design Study",
      role: "Phone-case design study",
      achievements: ["Phone-case design included in the 2018 public portfolio"]
    },
    "star-box-logo-2018": {
      title: "STAR BOX Logo Study",
      role: "Logo design study",
      achievements: ["Logo design included in the 2018 public portfolio"]
    },
    "prismabook-2020": {
      title: "Prismabook — Social App Learning Prototype",
      role: "React and GraphQL social-app prototype",
      achievements: [
        "Learning prototype recreating a Facebook-style interface",
        "Built feed, profile, friends, stories, search, groups, and Watch route structure"
      ]
    },
    "storage-api-2023": {
      title: "Storage API",
      role: "File-storage API tool",
      achievements: ["Built upload, metadata lookup, file delivery, and image-variant cache flows"]
    },
    "ui-library-2023": {
      title: "UI Library",
      role: "React component and Storybook documentation experiment",
      achievements: ["Experimented with typed UI components and Storybook documentation"]
    },
    "portfolio-engineering-evolution": {
      title: "Portfolio Engineering Evolution",
      role: "Personal portfolio development",
      achievements: ["Evolved a React portfolio into a Next.js and TypeScript structure"]
    }
  },
  ja: {
    "chadu-dealerdu-2021": {
      title: "チャドゥ＆ディーラードゥ サービス開発",
      role: "中古車購入・ディーラー販売アプリ開発",
      achievements: ["購入者向けチャドゥと販売者向けディーラードゥのアプリを開発"]
    },
    "shoedoc-2021": {
      title: "Shoedoc サービス開発",
      role: "靴修理アプリとAPIの開発",
      achievements: ["モバイルアプリとAPIを開発"]
    },
    "showket-2021": {
      title: "Showket サービス開発",
      role: "アパレル販売・ストリーミングサービス開発",
      achievements: ["アプリ、CMS、APIを開発"]
    },
    "dear-app-design-2018": {
      title: "Dear My Pet アプリデザイン演習",
      role: "グループのブランドデザイン課題",
      achievements: ["2018年公開ポートフォリオに収録されたアプリデザイン"]
    },
    "childfund-leaflet-design-2018": {
      title: "ChildFund リーフレットデザイン演習",
      role: "独立したリーフレットデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録された独立デザイン演習"]
    },
    "chonghwa-young-logo-design-2018": {
      title: "チョンファヨン ロゴデザイン演習",
      role: "独立したロゴデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録された独立ロゴ演習"]
    },
    "garbage-collection-logo-design-2018": {
      title: "Garbage Collection ロゴデザイン演習",
      role: "独立したロゴデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録された独立ロゴ演習"]
    },
    "line-web-concept-2018": {
      title: "LINE Webリデザインコンセプト",
      role: "Webリデザインコンセプト",
      achievements: ["情報構造のリデザインコンセプトを2018年公開ポートフォリオに収録"]
    },
    "line-app-concept-2018": {
      title: "LINE アプリリデザインコンセプト",
      role: "アプリリデザインコンセプト",
      achievements: ["アプリリデザインコンセプトを2018年公開ポートフォリオに収録"]
    },
    "dear-my-pet-poster-2018": {
      title: "Dear My Pet ポスターデザイン演習",
      role: "グループのブランドデザイン課題",
      achievements: ["2018年公開ポートフォリオに収録されたグループ課題"]
    },
    "identity-leaflet-2018": {
      title: "アイデンティティ・リーフレットデザイン演習",
      role: "個人アイデンティティデザイン",
      achievements: ["自己表現のためのパンフレットデザイン"]
    },
    "and-then-there-were-none-2018": {
      title: "そして誰もいなくなった ブックカバー演習",
      role: "ブックカバーデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録されたブックカバーデザイン"]
    },
    "elegant-night-cats-2018": {
      title: "優雅な夜と猫たち ブックカバー演習",
      role: "ブックカバーデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録されたブックカバーデザイン"]
    },
    "andy-warhol-magazine-2018": {
      title: "Andy Warhol マガジンデザイン演習",
      role: "マガジンデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録されたマガジンデザイン"]
    },
    "electronic-guitar-phonecase-2018": {
      title: "Electronic Guitar スマホケースデザイン演習",
      role: "スマホケースデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録されたスマホケースデザイン"]
    },
    "star-box-logo-2018": {
      title: "STAR BOX ロゴデザイン演習",
      role: "ロゴデザイン演習",
      achievements: ["2018年公開ポートフォリオに収録されたロゴデザイン"]
    },
    "prismabook-2020": {
      title: "Prismabook — ソーシャルアプリ学習プロトタイプ",
      role: "React・GraphQLによるソーシャルアプリプロトタイプ",
      achievements: [
        "Facebook風UIを再現した学習用プロトタイプ",
        "フィード、プロフィール、友達、ストーリー、検索、グループ、Watchの画面構造を実装"
      ]
    },
    "storage-api-2023": {
      title: "Storage API",
      role: "ファイル保存APIツール",
      achievements: ["アップロード、メタデータ取得、ファイル配信、画像バリアントキャッシュを実装"]
    },
    "ui-library-2023": {
      title: "UIライブラリ",
      role: "ReactコンポーネントとStorybook文書化の実験",
      achievements: ["型付きUIコンポーネントとStorybook文書化を実験"]
    },
    "portfolio-engineering-evolution": {
      title: "ポートフォリオ実装の進化",
      role: "個人ポートフォリオ開発",
      achievements: ["ReactポートフォリオをNext.js・TypeScript構成へ発展"]
    }
  }
};

function localizedEvidence(locale: Exclude<Locale, "ko">): EvidenceProject[] {
  return evidenceProjects.ko.map((project) => {
    const translation = translations[locale][project.id];
    const isJapanese = locale === "ja";
    return {
      ...project,
      ...translation,
      company:
        project.company === "디자인 그룹 과제"
          ? isJapanese
            ? "グループデザイン課題"
            : "Group design assignment"
          : project.company === "개인 작업"
            ? isJapanese
              ? "個人制作"
              : "Personal work"
            : project.company === "액트베이스"
              ? isJapanese
                ? "アクトベース"
                : "Actbase"
              : project.company,
      links: project.links?.map((link) => ({
        ...link,
        label:
          link.label.includes("source") || link.label === "Source" ? (isJapanese ? "ソース" : "Source") : link.label
      })),
      image: project.image
        ? {
            ...project.image,
            alt: isJapanese ? `${translation.title} のアーカイブ画像` : `${translation.title} archived portfolio image`,
            caption: project.id.startsWith("dear-")
              ? isJapanese
                ? "2018年公開ポートフォリオに収録されたグループブランドデザイン課題"
                : "Group brand-design assignment recorded in the 2018 public portfolio"
              : isJapanese
                ? "公開ポートフォリオに記録されたアーカイブ作品"
                : "Work recorded in a public portfolio archive",
            provenance: isJapanese ? "公開ポートフォリオアーカイブ" : "Public portfolio archive"
          }
        : undefined
    };
  });
}
evidenceProjects.en = localizedEvidence("en");
evidenceProjects.ja = localizedEvidence("ja");
