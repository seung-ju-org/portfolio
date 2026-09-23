export type Locale = "ko" | "en" | "ja";
export type PageKind = "home" | "about" | "portfolio" | "contact";

export type SiteContent = {
  profile: {
    name: string;
    role: string;
    headline: string;
    summary: string;
    current: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
  };
  about: string[];
  capabilities: { title: string; description: string; skills: string[] }[];
  careers: {
    company: string;
    role: string;
    period: string;
    location?: string;
    employment?: string;
    summary: string;
    highlights: string[];
    skills: string[];
  }[];
  education: { school: string; course: string; period: string; details: string[] }[];
  projects: {
    id: string;
    title: string;
    company?: string;
    period: string;
    role: string;
    achievements: string[];
    stack: string;
    links?: { label: string; url: string }[];
    category?: ProjectCategory;
    image?: ProjectImage;
  }[];
};

import { fallbackProjects } from "./projects";
import { additionalProjects } from "./additional-projects";
import { evidenceProjects, type ProjectCategory, type ProjectImage } from "./project-evidence";

type Localized<T> = Record<Locale, T>;
const localized = <T>(ko: T, en: T, ja: T): Localized<T> => ({ ko, en, ja });

const profile = localized(
  {
    name: "오승주",
    role: "Full-Stack Engineer",
    headline: "기술을 연결하고, 서비스의 방향을 설계하는 개발자",
    summary: "프론트엔드, 백엔드, 인프라와 클라우드를 경험하며 서비스 전체의 흐름을 설계합니다.",
    current: "유니코아에서 결제·정산 서비스와 배포·운영 환경을 개발하고 있습니다.",
    location: "대한민국 서울",
    email: "seung-ju@seung-ju.com",
    github: "https://github.com/seung-juv",
    linkedin: "https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%98%A4-5b3a41435/"
  },
  {
    name: "Seung-Ju Oh",
    role: "Full-Stack Engineer",
    headline: "Connecting technology and shaping service direction",
    summary:
      "I work across frontend, backend, infrastructure, and cloud to understand and design the full service flow.",
    current: "At Unicorea, I develop payment and settlement services and their deployment and operations environment.",
    location: "Seoul, South Korea",
    email: "seung-ju@seung-ju.com",
    github: "https://github.com/seung-juv",
    linkedin: "https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%98%A4-5b3a41435/"
  },
  {
    name: "オ・スンジュ",
    role: "Full-Stack Engineer",
    headline: "技術をつなぎ、サービスの方向性を設計する開発者",
    summary: "フロントエンド、バックエンド、インフラ、クラウドを横断し、サービス全体の流れを設計します。",
    current: "Unicoreaで決済・精算サービスとデプロイ・運用環境を開発しています。",
    location: "韓国・ソウル",
    email: "seung-ju@seung-ju.com",
    github: "https://github.com/seung-juv",
    linkedin: "https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%98%A4-5b3a41435/"
  }
);

const content: Localized<Omit<SiteContent, "profile">> = {
  ko: {
    about: [
      "기술을 연결하고, 서비스의 방향을 설계하는 개발자 오승주입니다.",
      "프론트엔드, 백엔드, 인프라와 클라우드를 경험하며 서비스 전체의 흐름을 이해하는 관점을 길러왔습니다. 이전 직장에서는 개발팀장으로 프로젝트를 이끌었고, 현재는 유니코아에서 결제·정산 서비스와 배포·운영 환경을 개발하고 있습니다.",
      "기술을 이해할 때 맥락과 연결 관계를 먼저 살펴봅니다. 새로운 기술을 접하면 빠르게 구현해보고, 내부 구조와 동작 방식에 대한 가설을 세운 뒤 문서와 실제 구조를 확인하며 검증합니다.",
      "기술은 서비스의 요구사항을 해결하는 도구로 다룹니다. 서비스의 특성, 확장 요구, 운영 환경을 함께 고려해 적합한 구조를 설계하고 기술을 조합합니다.",
      "문제의 성격과 영향 범위에 따라 탐색의 깊이를 조절합니다. 전체 시스템의 흐름과 균형을 살피면서, 문제가 발생하거나 성능 병목이 확인되면 해당 영역의 내부 동작까지 깊이 들어가 원인을 찾고 해결합니다.",
      "팀장으로 일하며 기술적 판단에는 넓은 시야와 실행력이 함께 필요하다는 것을 배웠습니다. 어떤 기술을 선택할지, 어느 수준까지 구현할지, 언제 리팩토링하고 어디부터 개선할지를 판단하고 그 결정을 직접 구현으로 이어가는 역할을 맡아왔습니다.",
      "여러 기술을 연결해 구조를 설계하고, 필요한 지점은 깊이 파고들어 해결하며, 서비스를 끝까지 완성하는 개발자로 성장하고자 합니다."
    ],
    capabilities: [
      {
        title: "웹·앱",
        description: "사용자와 운영자 경험을 위한 제품 개발",
        skills: ["React", "Next.js", "React Native", "TypeScript"]
      },
      {
        title: "백엔드",
        description: "서비스 API와 데이터 처리",
        skills: ["Kotlin", "Spring Boot", "Node.js", "NestJS"]
      },
      {
        title: "인프라·운영",
        description: "배포와 관측 환경",
        skills: ["AWS", "Kubernetes", "Jenkins", "Helm", "ArgoCD", "Prometheus"]
      },
      {
        title: "기술 리더십",
        description: "프로젝트 리딩과 개발 프로세스 관리",
        skills: ["Project Management", "Technical Leadership", "Git", "CI/CD"]
      }
    ],
    careers: [
      {
        company: "유니코아",
        role: "Full-Stack Engineer",
        period: "2026.04–현재",
        location: "대한민국 서울",
        summary: "결제·정산 서비스의 프론트엔드와 백엔드, 공통 배포·운영 환경을 개발합니다.",
        highlights: [
          "React·TypeScript 기반 가맹점 웹과 관리자 기능 개발",
          "Kotlin·Spring Boot 기반 정산·통계 API와 데이터 처리",
          "Jenkins·Kubernetes·Helm·ArgoCD 기반 공통 배포 환경 구성"
        ],
        skills: ["React", "TypeScript", "Kotlin", "Spring Boot", "Kubernetes"]
      },
      {
        company: "프리랜서",
        role: "풀스택 개발자 · 개발 PM",
        period: "2023.10–현재",
        employment: "개인 외주",
        summary: "개인 외주로 웹·모바일 서비스, 관리자 시스템, 백엔드 API를 개발합니다.",
        highlights: [
          "React·Next.js 기반 웹·관리자 시스템 개발",
          "Kotlin·Spring Boot·NestJS·Node.js 기반 API 개발",
          "외부 서비스 연동과 업무 자동화"
        ],
        skills: ["Next.js", "React Native", "Spring Boot", "NestJS", "AWS"]
      },
      {
        company: "액트베이스",
        role: "풀스택 개발자 · 대리/팀장",
        period: "2021.01–2023.09",
        location: "대한민국 서울",
        summary: "웹·모바일·백엔드·인프라 개발과 프로젝트 리딩 및 개발 프로세스 관리를 수행했습니다.",
        highlights: [
          "React·Next.js 기반 웹, CMS, 파트너 시스템 개발",
          "React Native 앱 개발과 프로젝트 리딩",
          "AWS 배포 환경과 GitLab CI·CodePush 자동화"
        ],
        skills: ["React", "Next.js", "React Native", "Spring Boot", "AWS"]
      },
      {
        company: "㈜내공",
        role: "웹 개발자",
        period: "2019.09–2020.05",
        location: "대한민국 서울",
        summary: "고객사 홈페이지 제작과 웹 기능 구현을 담당했습니다.",
        highlights: [
          "HTML·CSS·JavaScript·jQuery 기반 웹 페이지 개발",
          "MySQL 기반 웹 기능 구현",
          "Anibuild·Cafe24·그누보드 커스터마이징"
        ],
        skills: ["HTML", "CSS", "JavaScript", "jQuery", "MySQL"]
      },
      {
        company: "㈜티움커뮤니케이션",
        role: "웹 디자인·개발 인턴",
        period: "2019.01–2019.04",
        location: "대한민국 인천",
        summary: "웹 디자인과 웹 페이지 제작 업무를 수행했습니다.",
        highlights: ["HTML·CSS 기반 웹 페이지 구성", "JavaScript·jQuery·PHP 기반 웹 기능 개발"],
        skills: ["HTML", "CSS", "JavaScript", "jQuery", "PHP"]
      }
    ],
    education: [
      { school: "인천디자인고등학교", course: "시각디자인과 · 고등학교 졸업", period: "2016.01–2018.12", details: [] },
      {
        school: "SBS아카데미컴퓨터아트학원",
        course: "웹 퍼블리싱·웹 프로그래밍 교육과정 수료",
        period: "2018.08–2019.10",
        details: ["2018.08–2018.12: HTML·CSS3·JavaScript·jQuery", "2019.06–2019.10: Java·Oracle·JSP"]
      }
    ],
    projects: [
      {
        id: "ensolution",
        title: "이엔솔루션 개발",
        company: "이엔미디어",
        period: "2024.10–2025.09",
        role: "마케팅 솔루션 개발",
        achievements: [
          "방문자 추적과 검색·플레이스·쇼핑 크롤링",
          "보고서 자동 발행",
          "결제와 키워드·소재 자동화 기능 개발"
        ],
        stack: "Next.js, Kotlin, Spring Boot, AWS Lambda, Kubernetes"
      },
      {
        id: "kpbma",
        title: "한국제약바이오협회 디지털역사관 개발",
        company: "한국제약바이오협회",
        period: "2025.07–2025.10",
        role: "홈페이지 및 디지털 아카이브 개발",
        achievements: ["Node.js 기반 상세 페이지 자동 생성으로 동적 아카이브 관리 구현"],
        stack: "HTML, CSS, JavaScript, Node.js"
      }
    ]
  },
  en: {
    about: [
      "I am Seung-Ju Oh, an engineer who connects technology and shapes service direction.",
      "Across frontend, backend, infrastructure, and cloud, I have built a service-wide perspective. I previously led projects as a development team lead and now develop payment, settlement, deployment, and operations systems at Unicorea.",
      "I begin by understanding context and relationships. When I encounter a new technology, I build quickly, form a hypothesis about its structure, and validate it against documentation and the real implementation.",
      "I treat technology as a tool for service requirements. I select and combine structures by considering product characteristics, growth needs, and operations.",
      "I adjust the depth of investigation to a problem's nature and impact. I keep the whole system in view, then go deep when failures or performance bottlenecks require it.",
      "Leading a team taught me that technical judgment requires both breadth and execution: deciding what to choose, how far to implement, when to refactor, and where to improve.",
      "I aim to design structures across technologies, investigate where needed, and complete services end to end."
    ],
    capabilities: [],
    careers: [],
    education: [],
    projects: []
  },
  ja: {
    about: [
      "技術をつなぎ、サービスの方向性を設計する開発者、オ・スンジュです。",
      "フロントエンド、バックエンド、インフラ、クラウドを経験し、サービス全体の流れを理解する視点を培ってきました。前職では開発チーム長としてプロジェクトを率い、現在はUnicoreaで決済・精算サービスとデプロイ・運用環境を開発しています。",
      "技術を理解する際は文脈とつながりを先に見ます。新しい技術に触れたら素早く実装し、内部構造の仮説を立て、文書と実際の構造で検証します。",
      "技術はサービス要件を解決する道具として扱います。サービスの特性、拡張要件、運用環境を考慮し、適切な構造を設計して技術を組み合わせます。",
      "課題の性質と影響範囲に応じて探索の深さを調整します。システム全体の流れとバランスを見ながら、障害や性能ボトルネックがあれば内部動作まで深く調べます。",
      "チーム長として、技術判断には広い視野と実行力が必要だと学びました。技術選択、実装範囲、リファクタリングの時機、改善箇所を判断し、実装まで担ってきました。",
      "複数の技術をつないで構造を設計し、必要な箇所を深く解決し、サービスを最後まで完成させる開発者を目指しています。"
    ],
    capabilities: [],
    careers: [],
    education: [],
    projects: []
  }
};

function translate(locale: Exclude<Locale, "ko">): Omit<SiteContent, "profile" | "about"> {
  const suffix =
    locale === "en" ? " (See Korean page for detailed history.)" : "（詳細な経歴は韓国語ページをご覧ください。）";
  return {
    ...content.ko,
    capabilities: content.ko.capabilities.map((item) => ({ ...item })),
    careers: content.ko.careers.map((item) => ({ ...item, summary: `${item.summary}${suffix}` })),
    education: content.ko.education.map((item) => ({ ...item })),
    projects: content.ko.projects.map((item) => ({ ...item }))
  };
}

export function getSiteContent(locale: Locale): SiteContent {
  const localizedContent = locale === "ko" ? content.ko : { ...translate(locale), about: content[locale].about };
  const projects: SiteContent["projects"] = fallbackProjects.map((project) => ({
    id: String(project.id),
    title: project.title[locale],
    company: project.company?.[locale],
    period:
      project.id === 19
        ? locale === "ko"
          ? "2024.10–2025.09"
          : locale === "en"
            ? "2024.10–2025.09"
            : "2024.10–2025.09"
        : project.period[locale],
    role: project.role[locale],
    achievements: project.achievements[locale],
    stack: project.stack,
    links: project.links
  }));
  const bankmallApp = projects.find((project) => project.id === "1");
  const bankmallWebIndex = projects.findIndex((project) => project.id === "8");
  if (bankmallApp && bankmallWebIndex >= 0) {
    const bankmallWeb = projects[bankmallWebIndex];
    bankmallApp.title =
      locale === "ko"
        ? "뱅크몰 웹·앱 개발"
        : locale === "en"
          ? "Bankmall Web & App Development"
          : "Bankmall Web・アプリ開発";
    bankmallApp.period = "2021.09–2022.03 / 2022.11–2023.03";
    bankmallApp.role =
      locale === "ko"
        ? "웹 프론트엔드·CMS 및 모바일 앱 개발"
        : locale === "en"
          ? "Web frontend/CMS and mobile app development"
          : "Webフロントエンド・CMSとモバイルアプリ開発";
    bankmallApp.achievements = [...bankmallWeb.achievements, ...bankmallApp.achievements];
    bankmallApp.stack = "Next.js, React, React Native, GitLab CI";
    bankmallApp.image = {
      src: "/images/projects/services/bankmall-archived-portfolio.webp",
      width: 1200,
      height: 676,
      alt:
        locale === "ko"
          ? "이전 포트폴리오의 뱅크몰 대출 비교 웹 화면"
          : locale === "en"
            ? "Bankmall web experience on a desktop monitor from an earlier portfolio"
            : "以前のポートフォリオに掲載されたBankmallローン比較Web画面",
      caption:
        locale === "ko"
          ? "이전 포트폴리오 수록 화면"
          : locale === "en"
            ? "Archived portfolio screen"
            : "以前のポートフォリオ掲載画面",
      provenance:
        locale === "ko"
          ? "이전 포트폴리오 PDF"
          : locale === "en"
            ? "Archived portfolio PDF"
            : "以前のポートフォリオPDF",
      fit: "contain"
    };
    projects.splice(bankmallWebIndex, 1);
  }
  const serviceImages = {
    "3": [
      "/images/projects/services/skku-imba-archived-portfolio.webp",
      "SKKU IMBA website displayed on a desktop monitor, from an earlier portfolio."
    ],
    "7": [
      "/images/projects/services/homegrit-archived-portfolio.webp",
      "Two HomeGrit mobile app screens, from an earlier portfolio."
    ],
    "19": [
      "/images/projects/services/ensolution-dashboard.webp",
      "Current public promotional dashboard image for ENSolution."
    ]
  } as const;
  for (const project of projects) {
    const image = serviceImages[project.id as keyof typeof serviceImages];
    if (!image) continue;
    project.image = {
      src: image[0],
      width: 1200,
      height: project.id === "19" ? 1077 : 676,
      alt:
        locale === "ko"
          ? project.id === "3"
            ? "이전 포트폴리오의 SKKU IMBA 웹사이트 화면"
            : project.id === "7"
              ? "이전 포트폴리오의 HomeGrit 모바일 앱 화면"
              : "ENSolution 공개 대시보드 이미지"
          : locale === "ja"
            ? project.id === "3"
              ? "以前のポートフォリオに掲載されたSKKU IMBA Webサイト画面"
              : project.id === "7"
                ? "以前のポートフォリオに掲載されたHomeGritモバイルアプリ画面"
                : "ENSolution公開ダッシュボード画像"
            : image[1],
      caption:
        locale === "ko"
          ? project.id === "19"
            ? "2026년 확인한 공개 서비스 이미지"
            : "이전 포트폴리오 수록 화면"
          : locale === "ja"
            ? project.id === "19"
              ? "2026年に確認した公開サービス画像"
              : "以前のポートフォリオ掲載画面"
            : project.id === "19"
              ? "Current public service image, viewed 2026-09-23"
              : "Archived portfolio screen",
      provenance:
        locale === "ko"
          ? project.id === "19"
            ? "ENSolution 공개 사이트"
            : "이전 포트폴리오 PDF"
          : locale === "ja"
            ? project.id === "19"
              ? "ENSolution公開サイト"
              : "以前のポートフォリオPDF"
            : project.id === "19"
              ? "ENSolution public site"
              : "Archived portfolio PDF",
      fit: "contain"
    };
  }
  projects.push({
    id: "brassone",
    title:
      locale === "ko"
        ? "대창 브라스원 웹 개발"
        : locale === "en"
          ? "Daechang Brassone Web Development"
          : "大昌ブラスワンWeb開発",
    company: "크림쿠키스튜디오",
    period: locale === "ko" ? "2026.03–현재" : locale === "ja" ? "2026.03–現在" : "2026.03–Present",
    role: locale === "ko" ? "웹 개발" : locale === "en" ? "Web development" : "Web開発",
    achievements: [
      locale === "ko"
        ? "Next.js 기반 웹 개발"
        : locale === "en"
          ? "Web development with Next.js"
          : "Next.jsによるWeb開発"
    ],
    stack: "Next.js",
    links: undefined
  });
  projects.push({
    id: "unicorea-payment",
    title:
      locale === "ko"
        ? "결제·정산 서비스 개발"
        : locale === "en"
          ? "Payment and Settlement Service Development"
          : "決済・精算サービス開発",
    company: locale === "ko" ? "유니코아" : "Unicorea",
    period: locale === "ko" ? "2026.04–현재" : locale === "ja" ? "2026.04–現在" : "2026.04–Present",
    role: locale === "ko" ? "Full-Stack Engineer" : "Full-Stack Engineer",
    achievements: [
      locale === "ko"
        ? "가맹점 웹, 정산 API, 공통 배포·운영 환경 개발"
        : locale === "en"
          ? "Developing merchant web, settlement APIs, and shared deployment operations"
          : "加盟店Web、精算API、共通デプロイ・運用環境を開発"
    ],
    stack: "React, TypeScript, Kotlin, Spring Boot, Kubernetes",
    links: undefined
  });
  projects.push(...evidenceProjects[locale], ...additionalProjects[locale]);
  const startDate = (period: string) => {
    const match = period.match(/(\d{4})(?:\.(\d{2}))?/);
    return match ? Number(match[1]) * 100 + Number(match[2] ?? 0) : 0;
  };
  const orderedProjects = projects
    .map((project, index) => ({ project, index }))
    .sort((left, right) => startDate(right.project.period) - startDate(left.project.period) || left.index - right.index)
    .map(({ project }) => project);
  return { profile: profile[locale], ...localizedContent, projects: orderedProjects };
}
