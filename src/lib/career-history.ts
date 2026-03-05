export type CareerProjectItem = {
  title: string;
  period: string;
  summary: string;
  details: string[];
  link?: string;
};

export type CareerCompanyItem = {
  company: string;
  position: string;
  period: string;
  overview: string;
  projects: CareerProjectItem[];
};

export const careerHistory: CareerCompanyItem[] = [
  {
    company: "액트베이스유한책임회사",
    position: "Software Engineer · 선임연구원/팀장(2년차) · 웹마스터",
    period: "2021.01 ~ 2023.09 (2년 9개월)",
    overview:
      "React Native 기반 앱 개발, React/Next.js 기반 웹 개발, Node.js/Express/Sequelize 기반 서버 개발을 담당했습니다.",
    projects: [
      {
        title: "Bizprint 서비스 리뉴얼",
        period: "2023-01-01 ~ 2023-04-01",
        summary: "명함 제작/구매/판매 플랫폼 Bizprint의 Web, CMS 개발 담당",
        details: ["연계: 메이비원", "사용 기술: Next.js, React Query, React Hook Form"],
        link: "https://bizprint.actbase.dev"
      },
      {
        title: "SKKU IMBA 서비스 리뉴얼",
        period: "2023-01-01 ~ 2023-03-01",
        summary: "성균관대학교 IMBA 플랫폼의 Web, CMS, API, 인프라 개발 담당",
        details: ["연계: 신세계 아이앤씨", "사용 기술: Next.js, React, Spring Boot", "운영환경: AWS EC2"],
        link: "https://imba.ac.kr"
      },
      {
        title: "뱅크몰 앱 서비스 신규 개발",
        period: "2022-11-01 ~ 2023-03-01",
        summary: "대출 비교 플랫폼 뱅크몰 앱 개발 (메인 프로젝트 리더)",
        details: ["연계: (주)뱅크몰", "사용 기술: React Native, React Query"]
      },
      {
        title: "mKWP 앱 유지보수",
        period: "2022-07-01 ~ 2023-01-01",
        summary: "풀무원 사내 근태/인력 관리 서비스 앱 유지보수",
        details: ["연계: 풀무원", "사용 기술: React Native"]
      },
      {
        title: "Homegrit 서비스 신규 개발",
        period: "2022-03-01 ~ 2022-12-01",
        summary: "인테리어 구매/판매 플랫폼 Homegrit 일정/프로세스/개발/인프라 담당 (메인 프로젝트 리더)",
        details: [
          "연계: (주)강앤김파트너스",
          "성과: 몰인몰 인테리어 쇼핑몰 서비스 개발",
          "사용 기술: React Native, React, Spring Boot",
          "운영환경: CentOS8, Nginx, Tomcat"
        ]
      },
      {
        title: "Pangaia SPVRKD 서비스 신규 개발",
        period: "2022-07-01 ~ 2022-12-01",
        summary: "친환경 의류 플랫폼 SPVRKD의 App/Web/API/인프라 담당 (메인 프로젝트 리더)",
        details: [
          "연계: 신세계 아이앤씨",
          "사용 기술: React Native, React Query, Next.js, Express, Sequelize",
          "운영환경: AWS Lambda, AWS S3, AWS CloudFront"
        ]
      },
      {
        title: "아이쿠카 고도화",
        period: "2022-06-01 ~ 2022-06-01",
        summary: "부모/자녀 미션 및 용돈 관리 서비스 아이쿠카 앱 개발",
        details: ["연계: 아이쿠카", "사용 기술: React Native"]
      },
      {
        title: "뱅크몰 서비스 신규 개발",
        period: "2021-09-01 ~ 2022-03-01",
        summary: "대출 비교 플랫폼 뱅크몰 Web/API/인프라 개발",
        details: ["연계: (주)뱅크몰", "사용 기술: Next.js, React, Spring Boot", "운영환경: CentOS8, Apache, Tomcat, PM2"],
        link: "https://bank-mall-co.kr"
      },
      {
        title: "Showket 서비스 신규 개발",
        period: "2021-07-01 ~ 2021-09-01",
        summary: "의류 구매/판매/스트리밍 플랫폼의 App/CMS/API 개발",
        details: ["사용 기술: React Native, React, Express, Sequelize"]
      },
      {
        title: "Shoedoc 서비스 신규 개발",
        period: "2021-04-01 ~ 2021-07-01",
        summary: "신발/구두 수선 플랫폼의 App/API 개발",
        details: ["사용 기술: React Native, Express, Sequelize"]
      },
      {
        title: "차두 & 딜러두 서비스 신규 개발",
        period: "2021-01-01 ~ 2021-04-01",
        summary: "중고차 구매 서비스(차두), 딜러 판매 서비스(딜러두) 앱 개발",
        details: ["사용 기술: React Native"]
      },
      {
        title: "신세계 SSG EDU LCMS 리뉴얼",
        period: "2023-06-01 ~ 2023-09-14",
        summary: "PM으로 일정/개발(API, Web, DevOps) 담당",
        details: [
          "연계: 신세계 아이앤씨",
          "사용 기술: Next.js, React, Spring Boot, SCORM, xAPI",
          "운영환경: AWS EKS, AWS CloudFront, AWS S3, AWS Route53, AWS RDS, AWS ElastiCache",
          "특징: Spring Boot API 컨테이너화 후 EKS 배포, Next.js CSR export 후 S3+CloudFront 배포, SCORM/xAPI 기반 LCMS 구현, S3 업로드/청크 업로드/다운로드, Redis 기반 RefreshToken 및 JWT Access/RefreshToken 구현"
        ]
      }
    ]
  },
  {
    company: "내공",
    position: "제작팀 · 사원",
    period: "2019.05 ~ 2020.05 (1년 1개월)",
    overview: "홈페이지 제작 담당",
    projects: [
      {
        title: "웹사이트 제작 및 운영",
        period: "2019.05 ~ 2020.05",
        summary: "기업 홈페이지 제작/운영 실무",
        details: ["사용 기술: HTML, CSS, jQuery, JavaScript, MySQL, anibuild, cafe24, 그누보드"]
      }
    ]
  },
  {
    company: "(주)티움커뮤니케이션",
    position: "디자인 · 인턴/수습/팀원",
    period: "2019.01 ~ 2019.04 (4개월)",
    overview: "웹 디자인 및 퍼블리싱 실무",
    projects: [
      {
        title: "웹 디자인/퍼블리싱",
        period: "2019.01 ~ 2019.04",
        summary: "웹디자인과 프론트 개발 보조",
        details: ["사용 기술: HTML, CSS, jQuery, JavaScript, PHP"]
      }
    ]
  }
];
