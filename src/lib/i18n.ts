export const locales = ["ko", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function withLocale(locale: Locale, path: "/" | "/about" | "/portfolio" | "/contact") {
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export const messages = {
  ko: {
    nav: { home: "Home", about: "About Me", portfolio: "Portfolio", contact: "Contact Me", contactButton: "Contact" },
    language: { label: "언어", ko: "한국어", en: "English", ja: "日本語" },
    theme: { light: "라이트", system: "시스템", dark: "다크" },
    hero: {
      badge: "Software Engineer",
      titleLine1: "기술을 연결하고",
      titleLine2: "방향을 설계하는 개발 리더",
      description:
        "특성화고등학교 시각디자인과 출신으로 웹디자인부터 커리어를 시작했고, 프론트엔드/백엔드/인프라/클라우드를 모두 경험했습니다. 팀장으로 프로젝트를 리딩하며 기능이 아닌 서비스 단위로 사고합니다.",
      ctaProjects: "프로젝트 보기",
      ctaContact: "문의하기",
      projectCountLabel: "프로젝트",
      experienceLabel: "총 경력",
      coverageLabel: "커버리지",
      coverageValue: "Design · Frontend · Backend · Infra",
      quickTitle: "빠른 이동",
      quickAboutDesc: "개발 철학과 리더십 관점을 확인하세요.",
      quickProjectsDesc: "실무 프로젝트와 기술 스택을 확인하세요.",
      quickContactDesc: "협업/채용 문의를 남겨주세요.",
      focusTitle: "현재 집중하는 것",
      focus: ["서비스 확장 가능한 아키텍처 설계", "프론트엔드 품질/성능 최적화", "개발 프로세스와 배포 안정성 개선"]
    },
    about: {
      title: "About Me",
      role: "오승주 | Software Engineer / 개발 리더",
      exp: "총 경력: 2019.01 ~ 현재",
      domain: "핵심 영역: Design, Web, App, CMS, API, DevOps",
      coreTitle: "Core Tech",
      summaryLabel: "Summary",
      careerLabel: "Career",
      essayLabel: "Statement",
      essayParagraphs: [
        "기술을 연결하고 방향을 설계하는 개발 리더",
        "특성화고등학교 시각디자인과 출신으로 웹디자인을 먼저 경험했고, 지금은 디자인과 개발을 함께 다루는 개발자입니다. 프론트엔드, 백엔드, 인프라, 클라우드를 모두 경험해왔고, 이전 직장에서 팀장으로 근무하며 프로젝트를 리딩했습니다. 기능 단위가 아니라 서비스 단위로 사고하는 개발자입니다.",
        '저는 깊이보다 "맥락"을 먼저 봅니다',
        "저는 하나의 기술을 끝까지 파고드는 타입이라기보다, 여러 기술이 어떻게 연결되어 동작하는지를 먼저 이해하는 타입입니다.",
        '새로운 기술을 접하면 먼저 빠르게 만들어보고, "이건 내부적으로 이런 구조일 것 같다"라고 스스로 예측해봅니다. 그 다음 문서와 구조를 확인하면서 제 가설을 검증합니다.',
        "이 과정에서 기술의 핵심 동작 원리와 한계를 파악합니다.",
        "모든 내부 구현을 완벽하게 꿰고 있다고 말하긴 어렵지만, 어디까지가 추상화의 영역이고, 어디서부터 내부를 들여다봐야 하는지는 알고 있습니다.",
        "저는 모든 것을 깊이 아는 개발자라기보다, 어디까지 깊게 들어가야 하는지 판단할 수 있는 개발자에 가깝습니다.",
        '기술을 "도구"로 다룹니다',
        "React, Next.js, Spring Boot, NestJS, Redis, AWS, Kubernetes 등 다양한 기술을 사용해왔지만, 기술 자체가 목적이 된 적은 없습니다.",
        "서비스에 CSR 구조가 적합하다면 Next export + S3 + CloudFront",
        "확장 요구가 있다면 컨테이너화 후 EKS 배포",
        "인증 확장이 필요하다면 JWT + Redis 구조 설계",
        "대용량 파일은 S3 Chunk Upload 방식 적용",
        "각 기술의 내부 구현을 모두 파고들기보다, 서비스에 맞는 구조를 선택하고 조합하는 데 더 집중해왔습니다.",
        "그래서 저는 특정 스택에 종속되기보다는 환경과 요구사항에 맞게 기술을 선택할 수 있습니다.",
        "깊이가 부족한 것이 아니라, 깊이를 조절합니다",
        '제가 중요하게 생각하는 건 "균형"입니다.',
        "하나의 기술을 극단적으로 깊게 파기보다, 전체 시스템이 안정적으로 동작하도록 설계하는 것이 더 중요하다고 생각합니다.",
        "물론 문제가 발생하거나 성능 병목이 생기면 그때는 해당 영역을 깊게 파고듭니다.",
        "저는 모든 것을 처음부터 깊게 파는 개발자는 아닙니다. 하지만 필요할 때는 충분히 깊게 들어갈 수 있는 개발자입니다.",
        "팀장으로 일하면서 느낀 것은, 리더는 가장 깊이 아는 사람이 아니라 가장 넓게 보고 판단하는 사람에 가깝다는 점이었습니다.",
        "어떤 기술을 선택할지",
        "어느 수준까지 구현할지",
        "언제 리팩토링할지",
        "어디서부터 성능 개선을 할지",
        "이런 판단을 내리는 것이 더 중요했습니다.",
        "저는 기술 하나의 전문가라기보다, 여러 기술을 연결해 구조를 설계할 수 있는 사람입니다.",
        "그리고 필요하다면 그중 하나를 깊게 파서 해결할 수 있는 실행력도 가지고 있습니다.",
        '정리하자면, 저는 "많이 아는 척하는 개발자"가 아니라, "어디까지 알아야 하는지 판단하는 개발자"입니다.',
        "그리고 그 판단을 바탕으로 서비스를 끝까지 완성하는 기술 리더로 성장하고 싶습니다."
      ],
      intro:
        "프론트엔드, 백엔드, 인프라, 클라우드를 모두 경험해왔고 팀장으로 프로젝트를 리딩했습니다. 기능 단위가 아니라 서비스 단위로 사고합니다.",
      sections: [
        {
          heading: "저는 깊이보다 맥락을 먼저 봅니다.",
          body: "하나의 기술을 끝까지 파고들기보다, 여러 기술이 어떻게 연결되어 동작하는지를 먼저 이해합니다. 빠르게 만들어보고 가설을 세운 뒤 문서와 구조를 확인하며 검증합니다."
        },
        {
          heading: "기술을 도구로 다룹니다.",
          body: "서비스에 맞춰 구조를 선택하고 조합합니다. CSR이 적합하면 Next export + S3 + CloudFront, 확장 요구가 있으면 컨테이너화 후 EKS, 인증 확장이 필요하면 JWT + Redis, 대용량 파일은 S3 Chunk Upload를 적용합니다."
        },
        {
          heading: "깊이가 부족한 것이 아니라, 깊이를 조절합니다.",
          body: "평소에는 전체 시스템의 균형과 안정성을 우선하고, 병목이나 장애가 생기면 필요한 지점까지 깊게 들어가 해결합니다. 리더 역할에서 핵심은 기술 하나의 깊이보다 선택과 우선순위 판단입니다."
        }
      ],
      closing:
        "저는 기술 하나의 전문가라기보다, 여러 기술을 연결해 구조를 설계할 수 있는 사람입니다. 필요하면 그중 하나를 깊게 파서 끝까지 해결하는 실행력을 갖추고 있습니다."
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "경력기술서 기반 전체 프로젝트 ({count}개)",
      companyLabel: "연계/소속회사",
      periodLabel: "수행 기간",
      roleLabel: "주요 역할",
      stackLabel: "사용 기술",
      achievementsLabel: "업무 성과",
      viewService: "서비스 보기"
    },
    contact: {
      title: "Contact Me",
      recentPortfolioTitle: "최근 프로젝트",
      recentPortfolioDescription: "최근 수행한 프로젝트 10개를 먼저 확인해보세요.",
      viewProjects: "프로젝트 보기",
      description: "협업/채용 문의는 아래 채널로 연락 주세요.",
      email: "Email",
      phone: "Phone",
      github: "GitHub",
      formEmail: "이메일",
      formPhone: "연락처",
      formSubject: "제목",
      formMessage: "내용",
      formSubmit: "메일 보내기",
      formSending: "전송 중...",
      formSuccess: "메일이 전송되었습니다.",
      formError: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요."
    },
    footer: { copyright: "All rights reserved." }
  },
  en: {
    nav: { home: "Home", about: "About Me", portfolio: "Portfolio", contact: "Contact Me", contactButton: "Contact" },
    language: { label: "Language", ko: "Korean", en: "English", ja: "Japanese" },
    theme: { light: "Light", system: "System", dark: "Dark" },
    hero: {
      badge: "Software Engineer",
      titleLine1: "Connecting technology",
      titleLine2: "and shaping product direction",
      description:
        "I started from web design with a visual design background from a vocational high school, and now work across frontend, backend, infrastructure, and cloud. As a former team lead, I approach products at the service level, not just by features.",
      ctaProjects: "View Projects",
      ctaContact: "Contact",
      projectCountLabel: "Projects",
      experienceLabel: "Experience",
      coverageLabel: "Coverage",
      coverageValue: "Design · Frontend · Backend · Infra",
      quickTitle: "Quick Access",
      quickAboutDesc: "See my engineering philosophy and leadership approach.",
      quickProjectsDesc: "Explore production projects and stacks.",
      quickContactDesc: "Send a collaboration or hiring inquiry.",
      focusTitle: "Current Focus",
      focus: ["Scalable architecture design", "Frontend quality and performance", "Stable delivery and team workflow"]
    },
    about: {
      title: "About Me",
      role: "Seung-Ju Oh | Software Engineer / Development Lead",
      exp: "Career: Jan 2019 - Present",
      domain: "Domains: Design, Web, App, CMS, API, DevOps",
      coreTitle: "Core Tech",
      summaryLabel: "Summary",
      careerLabel: "Career",
      essayLabel: "Statement",
      essayParagraphs: [
        "A development lead who connects technology and designs direction",
        "I began my career in web design with a visual design background, and now work across design and engineering. I have practical experience in frontend, backend, infrastructure, and cloud, and I previously led projects as a team lead. I think in terms of service outcomes, not isolated features.",
        "I prioritize context before depth",
        "I am less focused on mastering only one tool deeply from day one, and more focused on understanding how multiple technologies connect in a real service.",
        "When I face a new technology, I build quickly first, make a structural hypothesis, and then validate it against docs and implementation details.",
        "I treat technology as a tool",
        "React, Next.js, Spring Boot, NestJS, Redis, AWS, and Kubernetes are not goals by themselves. I choose combinations based on product constraints and operating conditions.",
        "I adjust depth intentionally",
        "I design for system balance first, then dive deep where bottlenecks or failures actually require it. As a lead, choosing what to optimize, how far to implement, and when to refactor matters most.",
        "In short, I am an engineer who can connect technologies into a working structure and still go deep when needed to deliver outcomes."
      ],
      intro:
        "With a visual design background, I started from web design and now work across frontend, backend, infrastructure, and cloud. I previously led projects as a team lead, and I think in terms of services, not isolated features.",
      sections: [
        {
          heading: "I prioritize context before depth.",
          body: "Rather than diving into a single tool from the start, I first understand how multiple technologies connect and operate together. I prototype quickly, build hypotheses, and validate them through documentation and architecture."
        },
        {
          heading: "I treat technology as a tool.",
          body: "I choose architecture based on product needs: Next export + S3 + CloudFront for CSR delivery, containerization + EKS for scaling, JWT + Redis for authentication expansion, and S3 chunk upload for large files."
        },
        {
          heading: "I adjust depth intentionally.",
          body: "I optimize for system-wide balance first, and go deep only where performance bottlenecks or failures require it. As a lead, selecting the right level of implementation matters more than maximizing depth everywhere."
        }
      ],
      closing:
        "I am not tied to a single stack. I connect technologies to design structures, and when necessary, I can dive deep into critical areas and deliver outcomes."
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Full project history from my career document ({count} projects)",
      companyLabel: "Company",
      periodLabel: "Period",
      roleLabel: "Role",
      stackLabel: "Tech Stack",
      achievementsLabel: "Key Outcomes",
      viewService: "Visit Service"
    },
    contact: {
      title: "Contact Me",
      recentPortfolioTitle: "Recent Projects",
      recentPortfolioDescription: "Preview 10 of my most recent projects first.",
      viewProjects: "View Projects",
      description: "For collaboration or hiring opportunities, please reach out via:",
      email: "Email",
      phone: "Phone",
      github: "GitHub",
      formEmail: "Email",
      formPhone: "Phone",
      formSubject: "Subject",
      formMessage: "Message",
      formSubmit: "Send Email",
      formSending: "Sending...",
      formSuccess: "Your email has been sent.",
      formError: "Failed to send email. Please try again."
    },
    footer: { copyright: "All rights reserved." }
  },
  ja: {
    nav: {
      home: "ホーム",
      about: "プロフィール",
      portfolio: "ポートフォリオ",
      contact: "お問い合わせ",
      contactButton: "Contact"
    },
    language: { label: "言語", ko: "韓国語", en: "英語", ja: "日本語" },
    theme: { light: "ライト", system: "システム", dark: "ダーク" },
    hero: {
      badge: "Software Engineer",
      titleLine1: "技術をつなぎ",
      titleLine2: "プロダクトの方向性を設計する",
      description:
        "特性化高校の視覚デザイン科出身で、Webデザインからキャリアを始めました。現在はフロントエンド、バックエンド、インフラ、クラウドを横断し、チームリード経験を活かして機能単位ではなくサービス単位で設計します。",
      ctaProjects: "プロジェクトを見る",
      ctaContact: "お問い合わせ",
      projectCountLabel: "プロジェクト",
      experienceLabel: "経験年数",
      coverageLabel: "カバレッジ",
      coverageValue: "Design · Frontend · Backend · Infra",
      quickTitle: "クイックアクセス",
      quickAboutDesc: "開発思想とリーダーシップの視点を確認。",
      quickProjectsDesc: "実務プロジェクトと技術スタックを確認。",
      quickContactDesc: "協業・採用のお問い合わせはこちら。",
      focusTitle: "現在のフォーカス",
      focus: ["スケーラブルなアーキテクチャ設計", "フロントエンド品質と性能最適化", "安定したデリバリーと開発プロセス"]
    },
    about: {
      title: "About Me",
      role: "オ・スンジュ | Software Engineer / 開発リード",
      exp: "経歴: 2019年1月 - 現在",
      domain: "領域: Design, Web, App, CMS, API, DevOps",
      coreTitle: "Core Tech",
      summaryLabel: "Summary",
      careerLabel: "経歴",
      essayLabel: "Statement",
      essayParagraphs: [
        "技術をつなぎ、方向性を設計する開発リード",
        "私は視覚デザインのバックグラウンドからWebデザインでキャリアを始め、現在はデザインと開発を横断して取り組んでいます。フロントエンド、バックエンド、インフラ、クラウドまで実務経験があり、前職ではチームリードとしてプロジェクトを牽引しました。機能単位ではなく、サービス単位で考えます。",
        "私は深さより文脈を先に見ます",
        "最初から一つの技術だけを深掘りするより、複数技術が実サービスでどうつながるかを先に把握します。",
        "新しい技術に触れると、まず素早く作って仮説を立て、ドキュメントと実装を照合しながら検証します。",
        "技術は目的ではなく手段です",
        "React、Next.js、Spring Boot、NestJS、Redis、AWS、Kubernetes などを使ってきましたが、技術そのものを目的にしたことはありません。要件と運用条件に合わせて構成を選びます。",
        "深さは不足ではなく調整です",
        "私はまずシステム全体のバランスを設計し、性能ボトルネックや障害が起きた箇所は必要な深さまで掘り下げます。リードとして重要なのは、何を優先し、どこまで実装し、いつ改善するかの判断です。",
        "要するに私は、技術をつないで動く構造を作り、必要な場面では深く入り込んで最後まで結果を出すエンジニアです。"
      ],
      intro:
        "視覚デザインのバックグラウンドを持ち、Webデザインからキャリアを始めました。現在はフロントエンド、バックエンド、インフラ、クラウドを横断して取り組み、前職ではチームリードとしてプロジェクトを牽引しました。機能単位ではなくサービス単位で設計します。",
      sections: [
        {
          heading: "私は深さより文脈を先に見ます。",
          body: "単一技術を最初から掘り下げるより、複数技術がどう連携するかを先に理解します。まず素早く作り、仮説を立て、ドキュメントと構造で検証します。"
        },
        {
          heading: "技術は目的ではなく手段です。",
          body: "要件に応じて構成を選びます。CSRなら Next export + S3 + CloudFront、拡張性が必要ならコンテナ化して EKS、認証拡張なら JWT + Redis、大容量ファイルは S3 Chunk Upload を採用します。"
        },
        {
          heading: "深さは不足ではなく調整です。",
          body: "普段はシステム全体の安定性を優先し、ボトルネックや障害がある箇所は必要な深さまで掘り下げます。リードとして重要なのは、どこまで実装するかの判断です。"
        }
      ],
      closing:
        "私は単一技術の専門家というより、複数技術をつないで構造を設計する開発者です。必要であれば重要箇所を深く掘り下げ、最後まで解決します。"
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "経歴書ベースの全プロジェクト（{count}件）",
      companyLabel: "会社",
      periodLabel: "期間",
      roleLabel: "役割",
      stackLabel: "技術",
      achievementsLabel: "成果",
      viewService: "サービスを見る"
    },
    contact: {
      title: "Contact Me",
      recentPortfolioTitle: "最近のプロジェクト",
      recentPortfolioDescription: "最近担当したプロジェクト10件を先にご覧ください。",
      viewProjects: "プロジェクトを見る",
      description: "協業・採用に関するお問い合わせはこちら：",
      email: "Email",
      phone: "Phone",
      github: "GitHub",
      formEmail: "メール",
      formPhone: "連絡先",
      formSubject: "件名",
      formMessage: "内容",
      formSubmit: "メール送信",
      formSending: "送信中...",
      formSuccess: "メールを送信しました。",
      formError: "メール送信に失敗しました。しばらくして再度お試しください。"
    },
    footer: { copyright: "All rights reserved." }
  }
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
