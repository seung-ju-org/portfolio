import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "오승주 | Portfolio",
    short_name: "SeungJu",
    description: "기술을 연결하고 방향을 설계하는 개발 리더 오승주의 포트폴리오",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/seungju-mark-black.svg",
        type: "image/svg+xml",
        sizes: "any"
      }
    ]
  };
}

