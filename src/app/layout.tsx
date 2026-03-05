import { FooterHost } from "@/components/footer-host";
import type { Metadata } from "next";
import { HeaderHost } from "@/components/header-host";
import { Noto_Sans_KR } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/components/providers";
import { siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | 오승주 Portfolio"
  },
  description: "기술을 연결하고 방향을 설계하는 개발 리더 오승주의 포트폴리오",
  applicationName: "Seung-Ju Portfolio",
  authors: [{ name: "Seung-Ju Oh" }],
  creator: "Seung-Ju Oh",
  publisher: "Seung-Ju Oh",
  keywords: [
    "오승주",
    "portfolio",
    "software engineer",
    "next.js",
    "react",
    "frontend",
    "backend",
    "infra",
    "devops"
  ],
  alternates: {
    canonical: "/",
    languages: {
      ko: "/",
      en: "/en",
      ja: "/ja",
      "x-default": "/"
    }
  },
  openGraph: {
    title: siteName,
    description: "기술을 연결하고 방향을 설계하는 개발 리더 오승주의 포트폴리오",
    url: "/",
    siteName,
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/seungju-wordmark-black.svg", alt: "Seung-Ju Oh Portfolio" }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: "기술을 연결하고 방향을 설계하는 개발 리더 오승주의 포트폴리오",
    images: ["/seungju-wordmark-black.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/seungju-mark.svg", type: "image/svg+xml" },
      { url: "/seungju-mark-black.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/seungju-mark-white.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" }
    ],
    shortcut: ["/seungju-mark.svg"],
    apple: [{ url: "/seungju-mark-black.svg" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Seung-Ju Oh",
      jobTitle: "Software Engineer / Development Lead",
      url: siteUrl,
      sameAs: ["https://github.com/seung-juv"]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      inLanguage: ["ko-KR", "en-US", "ja-JP"]
    }
  ];

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={notoSansKr.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var d=document.documentElement;var m=document.cookie.match(/(?:^|;\\s*)theme=(light|dark|system)(?:;|$)/);var t=m?m[1]:'system';var dark=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.setAttribute('data-theme',t);d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){}"
          }}
        />
        <ThemeProvider>
          <HeaderHost />
          <div className="flex min-h-dvh flex-col">
            <div className="flex flex-1 flex-col pt-16">
              <PageTransition>{children}</PageTransition>
            </div>
            <FooterHost />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
