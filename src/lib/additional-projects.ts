import type { Locale } from "./i18n";
import type { EvidenceProject } from "./project-evidence";

const sources = {
  sana: "https://github.com/seung-juv/sana-portfolio",
  actionSheet: "https://github.com/seung-ju-org/react-native-action-sheet",
  openapiGenerator: "https://github.com/seung-ju-org/openapi-generator",
  coupangReviewBot: "https://github.com/seung-ju-org/coupang-review-bot"
} as const;

export const additionalProjects: Record<Locale, EvidenceProject[]> = {
  ko: [
    {
      id: "sana-portfolio-2022",
      title: "SANA Portfolio",
      company: "개인 작업",
      period: "2022.01–2023.05",
      role: "풀스택 개인 포트폴리오 구현",
      achievements: [
        "Next.js 프런트엔드와 NestJS 서버를 함께 구성",
        "인증, 프로필, 포트폴리오 생성·수정·삭제 API와 화면을 구현",
        "모바일 대응 포트폴리오·소개·연락처 화면과 Docker 구성을 공개 소스에 기록"
      ],
      stack: "Next.js, TypeScript, NestJS, TypeORM, PostgreSQL, Docker",
      links: [{ label: "소스", url: sources.sana }],
      category: "archive"
    },
    {
      id: "react-native-action-sheet-2024",
      title: "React Native Action Sheet",
      company: "개인 오픈소스 프로젝트",
      period: "2024.08",
      role: "iOS·Android React Native 액션 시트 라이브러리 구현",
      achievements: [
        "제목·메시지·버튼 구성을 받는 ActionSheet API를 제공",
        "Swift/Objective-C iOS 모듈과 Kotlin Android 모듈을 포함",
        "CommonJS·ESM·TypeScript 선언을 생성하도록 패키지를 구성"
      ],
      stack: "React Native, TypeScript, Swift, Objective-C++, Kotlin",
      links: [{ label: "소스", url: sources.actionSheet }],
      category: "opensource"
    },
    {
      id: "openapi-generator-2024",
      title: "OpenAPI Generator",
      company: "개인 오픈소스 프로젝트",
      period: "2024.05",
      role: "OpenAPI 스키마 TypeScript 인터페이스 생성 CLI 구현",
      achievements: [
        "설정 파일의 OpenAPI URL에서 스키마를 가져오도록 구현",
        "스키마 이름을 기준으로 네임스페이스와 TypeScript 인터페이스를 생성",
        "생성 결과에 패키지 메타데이터를 작성하도록 구성"
      ],
      stack: "TypeScript, Node.js, Rollup, Prettier",
      links: [{ label: "소스", url: sources.openapiGenerator }],
      category: "opensource"
    },
    {
      id: "coupang-review-bot-2026",
      title: "Coupang Review Draft Assistant CLI",
      company: "개인 오픈소스 프로젝트",
      period: "2026.03",
      role: "브라우저 기반 리뷰 초안 보조 CLI 구현",
      achievements: [
        "Chrome 원격 디버깅 세션에 연결하고 수동 로그인 대기 흐름을 구현",
        "주문 리뷰 화면에서 상품 맥락을 추출해 판매자·상품 리뷰 초안을 분리 생성",
        "생성 텍스트를 검증한 뒤 리뷰 폼에 채우는 워크플로를 구성"
      ],
      stack: "TypeScript, Node.js, Puppeteer, OpenAI/OpenRouter",
      links: [{ label: "소스", url: sources.coupangReviewBot }],
      category: "opensource"
    }
  ],
  en: [
    {
      id: "sana-portfolio-2022",
      title: "SANA Portfolio",
      company: "Personal work",
      period: "2022.01–2023.05",
      role: "Full-stack personal portfolio implementation",
      achievements: [
        "Built a Next.js frontend alongside a NestJS server",
        "Implemented authentication, profile, and portfolio create, update, and delete APIs and screens",
        "Recorded responsive portfolio, about, and contact pages plus Docker configuration in public source"
      ],
      stack: "Next.js, TypeScript, NestJS, TypeORM, PostgreSQL, Docker",
      links: [{ label: "Source", url: sources.sana }],
      category: "archive"
    },
    {
      id: "react-native-action-sheet-2024",
      title: "React Native Action Sheet",
      company: "Personal open-source project",
      period: "2024.08",
      role: "Implemented a React Native action-sheet library for iOS and Android",
      achievements: [
        "Provided an ActionSheet API for titles, messages, and button configurations",
        "Included Swift/Objective-C iOS modules and a Kotlin Android module",
        "Configured the package to build CommonJS, ESM, and TypeScript declarations"
      ],
      stack: "React Native, TypeScript, Swift, Objective-C++, Kotlin",
      links: [{ label: "Source", url: sources.actionSheet }],
      category: "opensource"
    },
    {
      id: "openapi-generator-2024",
      title: "OpenAPI Generator",
      company: "Personal open-source project",
      period: "2024.05",
      role: "Implemented a CLI that generates TypeScript interfaces from OpenAPI schemas",
      achievements: [
        "Fetches schemas from OpenAPI URLs declared in a configuration file",
        "Generates namespaces and TypeScript interfaces from schema names",
        "Writes package metadata alongside generated output"
      ],
      stack: "TypeScript, Node.js, Rollup, Prettier",
      links: [{ label: "Source", url: sources.openapiGenerator }],
      category: "opensource"
    },
    {
      id: "coupang-review-bot-2026",
      title: "Coupang Review Draft Assistant CLI",
      company: "Personal open-source project",
      period: "2026.03",
      role: "Implemented a browser-based review-drafting assistant CLI",
      achievements: [
        "Connects to a Chrome remote-debugging session and waits for manual sign-in",
        "Extracts product context from review pages and separately generates seller-service and product-review drafts",
        "Validates generated text before filling the review form"
      ],
      stack: "TypeScript, Node.js, Puppeteer, OpenAI/OpenRouter",
      links: [{ label: "Source", url: sources.coupangReviewBot }],
      category: "opensource"
    }
  ],
  ja: [
    {
      id: "sana-portfolio-2022",
      title: "SANA Portfolio",
      company: "個人制作",
      period: "2022.01–2023.05",
      role: "フルスタック個人ポートフォリオの実装",
      achievements: [
        "Next.jsフロントエンドとNestJSサーバーを構築",
        "認証、プロフィール、ポートフォリオの作成・更新・削除APIと画面を実装",
        "レスポンシブ対応のポートフォリオ・紹介・連絡先画面とDocker設定を公開ソースに記録"
      ],
      stack: "Next.js, TypeScript, NestJS, TypeORM, PostgreSQL, Docker",
      links: [{ label: "ソース", url: sources.sana }],
      category: "archive"
    },
    {
      id: "react-native-action-sheet-2024",
      title: "React Native Action Sheet",
      company: "個人オープンソースプロジェクト",
      period: "2024.08",
      role: "iOS・Android向けReact Nativeアクションシートライブラリの実装",
      achievements: [
        "タイトル・メッセージ・ボタン構成を受け取るActionSheet APIを提供",
        "Swift/Objective-CのiOSモジュールとKotlinのAndroidモジュールを収録",
        "CommonJS・ESM・TypeScript宣言を生成するパッケージを構成"
      ],
      stack: "React Native, TypeScript, Swift, Objective-C++, Kotlin",
      links: [{ label: "ソース", url: sources.actionSheet }],
      category: "opensource"
    },
    {
      id: "openapi-generator-2024",
      title: "OpenAPI Generator",
      company: "個人オープンソースプロジェクト",
      period: "2024.05",
      role: "OpenAPIスキーマからTypeScriptインターフェースを生成するCLIの実装",
      achievements: [
        "設定ファイルで指定したOpenAPI URLからスキーマを取得",
        "スキーマ名を基に名前空間とTypeScriptインターフェースを生成",
        "生成結果とともにパッケージメタデータを書き出す構成を実装"
      ],
      stack: "TypeScript, Node.js, Rollup, Prettier",
      links: [{ label: "ソース", url: sources.openapiGenerator }],
      category: "opensource"
    },
    {
      id: "coupang-review-bot-2026",
      title: "Coupang Review Draft Assistant CLI",
      company: "個人オープンソースプロジェクト",
      period: "2026.03",
      role: "ブラウザベースのレビュー下書き支援CLIの実装",
      achievements: [
        "Chromeリモートデバッグセッションへ接続し、手動ログインを待機するフローを実装",
        "レビュー画面から商品コンテキストを抽出し、販売者サービスと商品レビューの下書きを分けて生成",
        "生成テキストを検証してからレビュー入力フォームへ反映するワークフローを構成"
      ],
      stack: "TypeScript, Node.js, Puppeteer, OpenAI/OpenRouter",
      links: [{ label: "ソース", url: sources.coupangReviewBot }],
      category: "opensource"
    }
  ]
};
