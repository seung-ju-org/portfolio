import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compiler: {
    relay: {
      src: "./src",
      artifactDirectory: "./src/__generated__"
    }
  }
};

export default nextConfig;
