import type { Locale } from "./i18n";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

type LocalizedCareerProject = {
  id: number;
  title: LocalizedText;
  company?: LocalizedText;
  period: LocalizedText;
  role: LocalizedText;
  achievements: LocalizedList;
  stack: string;
  links?: Array<{ label: string; url: string }>;
};

export type CareerProject = {
  id: string;
  title: string;
  company?: string;
  period: string;
  role: string;
  achievements: string[];
  stack: string;
  links?: Array<{ label: string; url: string }>;
};

export const fallbackProjects: LocalizedCareerProject[] = [
  {
    id: 1,
    title: { ko: "뱅크몰 Application 개발", en: "Bankmall Application Development", ja: "Bankmall アプリ開発" },
    company: {
      ko: "주식회사 뱅크몰 / 액트베이스 유한책임회사",
      en: "Bankmall Co., Ltd. / Actbase LLC",
      ja: "Bankmall株式会社 / Actbase合同会社"
    },
    period: { ko: "2022.11 ~ 2023.05 (약 7개월)", en: "2022.11 - 2023.05 (about 7 months)", ja: "2022.11 - 2023.05（約7か月）" },
    role: {
      ko: "뱅크몰 Application 개발",
      en: "Developed the Bankmall mobile application",
      ja: "Bankmall モバイルアプリ開発"
    },
    achievements: {
      ko: ["뱅크몰 Application 개발", "GitLab CI 기반 CodePush 파이프라인 구축"],
      en: ["Built the Bankmall application", "Implemented a GitLab CI-based CodePush pipeline"],
      ja: ["Bankmall アプリを開発", "GitLab CI ベースの CodePush パイプラインを構築"]
    },
    stack: "React Native, GitLab CI"
  },
  {
    id: 2,
    title: { ko: "Bizprint 리뉴얼", en: "Bizprint Renewal", ja: "Bizprint リニューアル" },
    company: { ko: "Maybeone / 액트베이스 유한책임회사", en: "Maybeone / Actbase LLC", ja: "Maybeone / Actbase合同会社" },
    period: { ko: "2023.01 ~ 2023.05 (약 4개월)", en: "2023.01 - 2023.05 (about 4 months)", ja: "2023.01 - 2023.05（約4か月）" },
    role: { ko: "Front 개발 총괄", en: "Led front-end development", ja: "フロントエンド開発を統括" },
    achievements: {
      ko: ["Next.js 기반 Front/CMS 구축"],
      en: ["Built frontend and CMS with Next.js"],
      ja: ["Next.js でフロントエンド/CMSを構築"]
    },
    stack: "Next.js, React"
  },
  {
    id: 3,
    title: { ko: "SKKU IMBA 리뉴얼", en: "SKKU IMBA Renewal", ja: "SKKU IMBA リニューアル" },
    company: { ko: "신세계 아이앤씨 / 액트베이스 유한책임회사", en: "Shinsegae I&C / Actbase LLC", ja: "新世界I&C / Actbase合同会社" },
    period: { ko: "2023.01 ~ 2023.03 (약 3개월)", en: "2023.01 - 2023.03 (about 3 months)", ja: "2023.01 - 2023.03（約3か月）" },
    role: { ko: "Front, CMS, API 개발", en: "Developed front-end, CMS, and API", ja: "フロントエンド・CMS・APIを開発" },
    achievements: {
      ko: ["React 기반 Web/CMS 개발", "Spring Boot JPA 기반 API Server 개발"],
      en: ["Built web and CMS with React", "Built API server with Spring Boot JPA"],
      ja: ["React ベースのWeb/CMSを開発", "Spring Boot JPA ベースのAPIサーバーを開発"]
    },
    stack: "React, Next.js, Spring Boot"
  },
  {
    id: 4,
    title: { ko: "Pangaia SPVRKD 개발", en: "Pangaia SPVRKD Development", ja: "Pangaia SPVRKD 開発" },
    company: { ko: "신세계 아이앤씨 / 액트베이스 유한책임회사", en: "Shinsegae I&C / Actbase LLC", ja: "新世界I&C / Actbase合同会社" },
    period: { ko: "2022.07 ~ 2022.12 (약 6개월)", en: "2022.07 - 2022.12 (about 6 months)", ja: "2022.07 - 2022.12（約6か月）" },
    role: { ko: "프로젝트 개발 총괄", en: "Led overall project development", ja: "プロジェクト開発全体をリード" },
    achievements: {
      ko: [
        "React Native 기반 App 개발",
        "Express/Sequelize 기반 NodeJS Server 개발",
        "Next.js Front 구축 및 AWS S3/CloudFront/Lambda 서버리스 배포",
        "React 기반 CMS 구축 및 AWS S3/CloudFront 배포",
        "운영/스테이징/개발 환경 구축"
      ],
      en: [
        "Built the app with React Native",
        "Built Node.js server with Express/Sequelize",
        "Built Next.js frontend and deployed serverless on AWS S3/CloudFront/Lambda",
        "Built React-based CMS and deployed to AWS S3/CloudFront",
        "Set up production, staging, and development environments"
      ],
      ja: [
        "React Native でアプリを開発",
        "Express/Sequelize で Node.js サーバーを開発",
        "Next.js フロントを構築し AWS S3/CloudFront/Lambda にサーバーレス配備",
        "React ベースCMSを構築し AWS S3/CloudFront に配備",
        "本番・ステージング・開発環境を構築"
      ]
    },
    stack: "React Native, Next.js, React, Express, Sequelize, AWS S3, CloudFront, Lambda"
  },
  {
    id: 5,
    title: { ko: "mKWP 앱 유지보수", en: "mKWP App Maintenance", ja: "mKWP アプリ保守" },
    period: { ko: "2022.07 ~ 2023.01 (약 7개월)", en: "2022.07 - 2023.01 (about 7 months)", ja: "2022.07 - 2023.01（約7か月）" },
    role: { ko: "React Native 기반 mKWP 앱 유지보수", en: "Maintained mKWP app with React Native", ja: "React Native ベースの mKWP アプリ保守" },
    achievements: {
      ko: ["React Native 기반 mKWP 앱 유지보수"],
      en: ["Maintained mKWP app built with React Native"],
      ja: ["React Native ベースの mKWP アプリを保守"]
    },
    stack: "React Native"
  },
  {
    id: 6,
    title: { ko: "아이쿠카 고도화", en: "Aikuka Enhancement", ja: "Aikuka 高度化" },
    company: { ko: "아이쿠카 / 액트베이스 유한책임회사", en: "Aikuka / Actbase LLC", ja: "Aikuka / Actbase合同会社" },
    period: { ko: "2022.06 ~ 2022.06 (약 1개월)", en: "2022.06 - 2022.06 (about 1 month)", ja: "2022.06 - 2022.06（約1か月）" },
    role: { ko: "React Native 기반 아이쿠카 앱 개발", en: "Developed Aikuka app with React Native", ja: "React Native で Aikuka アプリを開発" },
    achievements: {
      ko: ["React Native 기반 아이쿠카 앱 개발"],
      en: ["Built Aikuka mobile app with React Native"],
      ja: ["React Native で Aikuka アプリを開発"]
    },
    stack: "React Native"
  },
  {
    id: 7,
    title: { ko: "홈그릿 개발", en: "HomeGrit Development", ja: "HomeGrit 開発" },
    company: { ko: "강앤킴파트너스 / 액트베이스 유한책임회사", en: "Kang & Kim Partners / Actbase LLC", ja: "Kang & Kim Partners / Actbase合同会社" },
    period: { ko: "2022.03 ~ 2022.12 (약 10개월)", en: "2022.03 - 2022.12 (about 10 months)", ja: "2022.03 - 2022.12（約10か月）" },
    role: { ko: "프로젝트 개발 총괄", en: "Led overall project development", ja: "プロジェクト開発全体をリード" },
    achievements: {
      ko: [
        "React Native 기반 홈그릿 앱 개발",
        "React 기반 홈그릿 CMS/Partners 개발",
        "Spring Boot JPA/QueryDSL 기반 API Server 개발",
        "운영/개발 환경 구축"
      ],
      en: [
        "Built HomeGrit app with React Native",
        "Built HomeGrit CMS/Partners with React",
        "Built API server with Spring Boot JPA/QueryDSL",
        "Set up production and development environments"
      ],
      ja: [
        "React Native で HomeGrit アプリを開発",
        "React で HomeGrit CMS/Partners を開発",
        "Spring Boot JPA/QueryDSL でAPIサーバーを開発",
        "本番・開発環境を構築"
      ]
    },
    stack: "React Native, React, Spring Boot, JPA, QueryDSL"
  },
  {
    id: 8,
    title: { ko: "뱅크몰 개발", en: "Bankmall Platform Development", ja: "Bankmall 開発" },
    company: {
      ko: "주식회사 뱅크몰 / 액트베이스 유한책임회사",
      en: "Bankmall Co., Ltd. / Actbase LLC",
      ja: "Bankmall株式会社 / Actbase合同会社"
    },
    period: { ko: "2021.10 ~ 2022.03 (약 7개월)", en: "2021.10 - 2022.03 (about 7 months)", ja: "2021.10 - 2022.03（約7か月）" },
    role: { ko: "Next.js 기반 Front 개발, React 기반 CMS 개발", en: "Developed Next.js frontend and React CMS", ja: "Next.js フロントと React CMS を開発" },
    achievements: {
      ko: ["대출비교 플랫폼 Front/CMS 개발", "운영/스테이징/개발 환경 구축"],
      en: ["Built frontend and CMS for a loan comparison platform", "Set up production, staging, and development environments"],
      ja: ["ローン比較プラットフォームのフロント/CMSを開発", "本番・ステージング・開発環境を構築"]
    },
    stack: "Next.js, React"
  },
  {
    id: 10,
    title: { ko: "신세계 SSG EDU LCMS 리뉴얼", en: "Shinsegae SSG EDU LCMS Renewal", ja: "新世界 SSG EDU LCMS リニューアル" },
    company: { ko: "신세계 아이앤씨 / 액트베이스 유한책임회사", en: "Shinsegae I&C / Actbase LLC", ja: "新世界I&C / Actbase合同会社" },
    period: { ko: "2023.07 ~ 2023.09 (약 2개월)", en: "2023.07 - 2023.09 (about 2 months)", ja: "2023.07 - 2023.09（約2か月）" },
    role: { ko: "PM 및 개발(API, Web, DevOps) 담당", en: "Handled PM and development (API, Web, DevOps)", ja: "PMおよび開発（API・Web・DevOps）を担当" },
    achievements: {
      ko: [
        "Spring Boot API를 컨테이너화하여 EKS 배포",
        "Next.js Web을 build/export 후 S3 + CloudFront 구성",
        "SCORM, xAPI 기반 LCMS 구현",
        "S3 파일 업로드/청크 업로드/다운로드 구현",
        "Redis 기반 RefreshToken 관리, JWT Access/RefreshToken 구현"
      ],
      en: [
        "Containerized Spring Boot API and deployed to EKS",
        "Built/exported Next.js web and delivered via S3 + CloudFront",
        "Implemented LCMS with SCORM and xAPI",
        "Implemented S3 upload/chunk upload/download",
        "Implemented JWT access/refresh tokens with Redis-based refresh token management"
      ],
      ja: [
        "Spring Boot API をコンテナ化して EKS に配備",
        "Next.js Web を build/export し S3 + CloudFront で配信",
        "SCORM・xAPI ベースの LCMS を実装",
        "S3 ファイルアップロード/チャンクアップロード/ダウンロードを実装",
        "Redis で RefreshToken を管理し JWT Access/RefreshToken を実装"
      ]
    },
    stack: "Next.js, React, Spring Boot, SCORM, xAPI, AWS EKS, CloudFront, S3, Route53, RDS, ElastiCache"
  },
  {
    id: 11,
    title: { ko: "피플T 앱 지도 개발", en: "PeopleT Map Feature Development", ja: "PeopleT マップ機能開発" },
    company: { ko: "(주)탑피플", en: "TopPeople Co., Ltd.", ja: "TopPeople株式会社" },
    period: { ko: "2023.10 ~ 2023.11 (약 1개월)", en: "2023.10 - 2023.11 (about 1 month)", ja: "2023.10 - 2023.11（約1か月）" },
    role: { ko: "KakaoMap 기반 지도 기능 개발", en: "Developed map feature using KakaoMap", ja: "KakaoMap ベースの地図機能を開発" },
    achievements: {
      ko: ["React App 지도 구성", "React Native WebView로 지도 연동"],
      en: ["Built map UI in React app", "Integrated map via React Native WebView"],
      ja: ["React アプリで地図UIを構築", "React Native WebView で地図を連携"]
    },
    stack: "React Native, React, Tailwind CSS, KakaoMap API, Node, Express"
  },
  {
    id: 12,
    title: { ko: "마장동 하늘축산 관리자 개발", en: "Majangdong Sky Livestock Admin Development", ja: "馬場洞ハヌル畜産 管理者開発" },
    company: { ko: "마장동 하늘축산 / 아이덴잇", en: "Majangdong Sky Livestock / Idenit", ja: "馬場洞ハヌル畜産 / Idenit" },
    period: { ko: "2023.11 ~ 2023.12 (약 1개월)", en: "2023.11 - 2023.12 (about 1 month)", ja: "2023.11 - 2023.12（約1か月）" },
    role: { ko: "관리자 웹 개발", en: "Developed admin web", ja: "管理者Webを開発" },
    achievements: {
      ko: ["네이버 상품/QR 코드 연계 주문 기능 구현"],
      en: ["Implemented ordering flow linked with Naver products and QR codes"],
      ja: ["NAVER商品・QRコード連携の注文機能を実装"]
    },
    stack: "React, Antd, Spring Boot, AWS S3, Elastic Beanstalk, CloudFront, NCP SMS"
  },
  {
    id: 13,
    title: { ko: "청호나이스 CS PHP 개발", en: "Chungho Nice CS PHP Development", ja: "チョンホナイス CS PHP 開発" },
    company: { ko: "청호나이스 / 아이덴잇", en: "Chungho Nice / Idenit", ja: "チョンホナイス / Idenit" },
    period: { ko: "2024.01 ~ 2024.03", en: "2024.01 - 2024.03", ja: "2024.01 - 2024.03" },
    role: { ko: "청호나이스 고객센터 전체 개발", en: "Developed full Chungho customer center", ja: "チョンホ顧客センター全体を開発" },
    achievements: {
      ko: ["PHP 5.2 기반 고객센터 기능 구축 및 운영"],
      en: ["Built and operated customer center features on PHP 5.2"],
      ja: ["PHP 5.2 ベースで顧客センター機能を構築・運用"]
    },
    stack: "jQuery, PHP 5.2, Oracle, KG 이니시스 결제 모듈",
    links: [{ label: "Web", url: "https://chungho.co.kr/cs/" }]
  },
  {
    id: 14,
    title: { ko: "틴커 관리자 백엔드 개발", en: "Tinker Admin Backend Development", ja: "Tinker 管理者バックエンド開発" },
    company: { ko: "틴커 / 디몬스터", en: "Tinker / Dmonster", ja: "Tinker / Dmonster" },
    period: { ko: "2024.03 ~ 2024.04", en: "2024.03 - 2024.04", ja: "2024.03 - 2024.04" },
    role: { ko: "쇼핑몰 관리자 백엔드 구축", en: "Built shopping mall admin backend", ja: "EC管理者バックエンドを構築" },
    achievements: {
      ko: ["NestJS 기반 관리자 API 설계/구현"],
      en: ["Designed and implemented admin APIs with NestJS"],
      ja: ["NestJS ベースで管理者APIを設計・実装"]
    },
    stack: "NestJS, TypeORM"
  },
  {
    id: 15,
    title: { ko: "제프월드 쇼핑몰 개발", en: "JEP World E-commerce Development", ja: "JEP World ショッピングモール開発" },
    company: { ko: "제프 / 디몬스터", en: "JEP / Dmonster", ja: "JEP / Dmonster" },
    period: { ko: "2024.04 ~ 2024.08", en: "2024.04 - 2024.08", ja: "2024.04 - 2024.08" },
    role: { ko: "사용자/판매자/관리자 웹 및 백엔드 구축", en: "Built user/seller/admin web and backend", ja: "ユーザー/販売者/管理者Webとバックエンドを構築" },
    achievements: {
      ko: ["Next.js 웹사이트 구축", "Spring Boot 기반 백엔드 Application 구축"],
      en: ["Built website with Next.js", "Built backend application with Spring Boot"],
      ja: ["Next.js でWebサイトを構築", "Spring Boot でバックエンドを構築"]
    },
    stack: "Next.js, Spring Boot, MySQL, 스윗트래커, 다날 결제모듈"
  },
  {
    id: 16,
    title: { ko: "전립선 자가진단 무료 설문조사 사이트 구축", en: "Prostate Self-Diagnosis Survey Site", ja: "前立腺セルフ診断アンケートサイト構築" },
    company: { ko: "주식회사 에이엔드", en: "AEND Co., Ltd.", ja: "AEND株式会社" },
    period: { ko: "2024.04", en: "2024.04", ja: "2024.04" },
    role: { ko: "설문조사 사이트 구축", en: "Built survey website", ja: "アンケートサイトを構築" },
    achievements: {
      ko: ["React 기반 설문 사이트 구축", "관리자 단 PHP 그누보드 구축"],
      en: ["Built survey site with React", "Built admin side with PHP GNUBoard"],
      ja: ["React ベースのアンケートサイトを構築", "管理側を PHP GNUBoard で構築"]
    },
    stack: "React, PHP, 그누보드",
    links: [{ label: "Web", url: "http://ipss365.co.kr" }]
  },
  {
    id: 17,
    title: { ko: "하누리 IOT 어플리케이션 개발", en: "Hanuri IoT Application Development", ja: "Hanuri IoT アプリ開発" },
    company: { ko: "하누리 / 디몬스터", en: "Hanuri / Dmonster", ja: "Hanuri / Dmonster" },
    period: { ko: "2024.07 ~ 2024.08", en: "2024.07 - 2024.08", ja: "2024.07 - 2024.08" },
    role: { ko: "IOT 연동 모바일 앱 개발", en: "Developed IoT-integrated mobile app", ja: "IoT連携モバイルアプリを開発" },
    achievements: {
      ko: ["Bluetooth 기반 전방감지/자이로센서 알림 기능 구현"],
      en: ["Implemented Bluetooth-based front detection and gyro-sensor alerts"],
      ja: ["Bluetooth ベースの前方検知・ジャイロセンサー通知機能を実装"]
    },
    stack: "React Native, Bluetooth",
    links: [
      { label: "AOS", url: "https://play.google.com/store/apps/details?id=com.hanuri&pli=1" },
      { label: "iOS", url: "https://apps.apple.com/kr/app/%ED%95%98%EB%88%84%EB%A6%AC-%EC%95%88%EC%A0%84%EC%A7%80%ED%82%B4%EC%9D%B4/id6550891684" }
    ]
  },
  {
    id: 18,
    title: { ko: "한인학생회 고도화 및 서버 마이그레이션", en: "Korean Student Association Upgrade & Server Migration", ja: "韓人学生会 高度化・サーバーマイグレーション" },
    company: { ko: "한인교류회 / 디몬스터", en: "Korean Association / Dmonster", ja: "韓人交流会 / Dmonster" },
    period: { ko: "2024.08 ~ 2024.09", en: "2024.08 - 2024.09", ja: "2024.08 - 2024.09" },
    role: { ko: "운영 고도화 및 인프라 마이그레이션", en: "Upgraded operations and migrated infrastructure", ja: "運用高度化とインフラ移行を実施" },
    achievements: {
      ko: [
        "PHP-CGI -> PHP-FPM 전환",
        "Apache -> Nginx 전환",
        "CentOS7 -> Amazon Linux 2023 전환",
        "메일 발송을 Gmail SMTP로 전환",
        "보안/운영 편의 기능(캡챠, 드래그 금지, 게시판별 에디터) 개선"
      ],
      en: [
        "Migrated PHP-CGI to PHP-FPM",
        "Migrated Apache to Nginx",
        "Migrated CentOS7 to Amazon Linux 2023",
        "Switched outbound mail to Gmail SMTP",
        "Improved security/operations features (captcha, drag-block, per-board editor)"
      ],
      ja: [
        "PHP-CGI から PHP-FPM へ移行",
        "Apache から Nginx へ移行",
        "CentOS7 から Amazon Linux 2023 へ移行",
        "メール送信を Gmail SMTP に切替",
        "セキュリティ/運用機能（CAPTCHA、ドラッグ禁止、掲示板別エディタ）を改善"
      ]
    },
    stack: "PHP, 그누보드, AWS EC2",
    links: [{ label: "Web", url: "https://gtksa.net/" }]
  },
  {
    id: 19,
    title: { ko: "이엔솔루션 개발", en: "ENSolution Development", ja: "ENSolution 開発" },
    company: { ko: "이엔미디어", en: "EN Media", ja: "ENメディア" },
    period: { ko: "2024.10 ~ 진행중", en: "2024.10 - Ongoing", ja: "2024.10 - 進行中" },
    role: { ko: "마케팅 솔루션 개발", en: "Developing a marketing solution", ja: "マーケティングソリューションを開発" },
    achievements: {
      ko: [
        "방문자 추적, 검색엔진/플레이스/쇼핑 크롤링",
        "보고서 자동 발행",
        "토스페이먼츠 결제 시스템 구축",
        "네이버 키워드/소재 자동 재등록, 자동 입찰 기능 개발"
      ],
      en: [
        "Implemented visitor tracking and crawler for search/place/shopping channels",
        "Implemented automated report publishing",
        "Built payment flow with Toss Payments",
        "Built automated re-registration and auto-bidding for Naver keywords/assets"
      ],
      ja: [
        "訪問者追跡と検索/プレイス/ショッピング向けクローリングを実装",
        "レポート自動発行を実装",
        "Toss Payments 決済機能を構築",
        "NAVERキーワード/素材の自動再登録・自動入札機能を開発"
      ]
    },
    stack: "Next.js(TypeScript), Spring Boot(Kotlin), AWS Lambda(Node.js), K8S, AWS",
    links: [{ label: "Web", url: "https://ensolution.co.kr" }]
  },
  {
    id: 20,
    title: { ko: "베테랑스 백엔드 개발", en: "Veterans Backend Development", ja: "Veterans バックエンド開発" },
    company: { ko: "베테랑스 / 디몬스터", en: "Veterans / Dmonster", ja: "Veterans / Dmonster" },
    period: { ko: "2025.01 ~ 2025.03", en: "2025.01 - 2025.03", ja: "2025.01 - 2025.03" },
    role: { ko: "교육 플랫폼 관리자 백엔드 개발", en: "Developed backend for education platform admin", ja: "教育プラットフォーム管理者向けバックエンドを開発" },
    achievements: {
      ko: ["NestJS 기반 관리자 백엔드 구축"],
      en: ["Built admin backend using NestJS"],
      ja: ["NestJS ベースの管理者バックエンドを構築"]
    },
    stack: "NestJS(TypeScript), Prisma"
  },
  {
    id: 21,
    title: { ko: "한국제약바이오협회 디지털역사관 개발", en: "KPBMA Digital Archive Development", ja: "韓国製薬バイオ協会 デジタル歴史館開発" },
    company: { ko: "한국제약바이오협회", en: "Korea Pharmaceutical and Bio-Pharma Manufacturers Association", ja: "韓国製薬バイオ協会" },
    period: { ko: "2025.07 ~ 2025.10", en: "2025.07 - 2025.10", ja: "2025.07 - 2025.10" },
    role: { ko: "홈페이지 및 디지털 아카이브 개발", en: "Developed website and digital archive", ja: "Webサイトとデジタルアーカイブを開発" },
    achievements: {
      ko: ["NodeJS 기반 상세 페이지 자동 생성으로 동적 아카이브 관리 구현"],
      en: ["Implemented dynamic archive management by auto-generating detail pages with Node.js"],
      ja: ["Node.js で詳細ページ自動生成を実装し、動的アーカイブ管理を実現"]
    },
    stack: "HTML, CSS, JS, NodeJS"
  },
  {
    id: 22,
    title: { ko: "무주 헬스케어 관리자 웹 프론트 개발", en: "Muju Healthcare Admin Frontend Development", ja: "無住ヘルスケア 管理者フロント開発" },
    company: { ko: "브이투씨(주)", en: "V2C Co., Ltd.", ja: "V2C株式会社" },
    period: { ko: "2025.11", en: "2025.11", ja: "2025.11" },
    role: { ko: "관리자 웹 프론트 개발", en: "Developed admin web frontend", ja: "管理者Webフロントを開発" },
    achievements: {
      ko: ["관리자 운영 화면 구축"],
      en: ["Built admin operation screens"],
      ja: ["管理者運用画面を構築"]
    },
    stack: "Next.js"
  }
];

export const fallbackCareerProjectCount = fallbackProjects.length;

export async function getCareerProjects(locale: Locale): Promise<CareerProject[]> {
  const { getCareerProjectsFromDb } = await import("./project-repository");
  try {
    return await getCareerProjectsFromDb(locale);
  } catch (error) {
    console.error("Failed to load projects from DB:", error);
    return [];
  }
}

export async function getCareerProjectCount(): Promise<number> {
  const { getCareerProjectCountFromDb } = await import("./project-repository");
  try {
    return await getCareerProjectCountFromDb();
  } catch (error) {
    console.error("Failed to load project count from DB:", error);
    return 0;
  }
}
