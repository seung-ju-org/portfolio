import type { Metadata } from "next";
import "../globals.css";
import { siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: "기술을 연결하고, 서비스의 방향을 설계하는 개발자 오승주의 포트폴리오",
  manifest: "/manifest.webmanifest"
};

export default function KoreanLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Seung-Ju Oh",
                url: siteUrl,
                sameAs: [
                  "https://github.com/seung-juv",
                  "https://www.linkedin.com/in/%EC%8A%B9%EC%A3%BC-%EC%98%A4-5b3a41435/"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: siteName,
                url: siteUrl,
                inLanguage: ["ko-KR", "en-US", "ja-JP"]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
