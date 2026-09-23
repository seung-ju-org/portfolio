import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const output = resolve(process.cwd(), "out");
const routes = [
  "",
  "about",
  "portfolio",
  "contact",
  "en",
  "en/about",
  "en/portfolio",
  "en/contact",
  "ja",
  "ja/about",
  "ja/portfolio",
  "ja/contact"
];
const required = ["유니코아", "기술을 연결", "https://portfolio.seung-ju.com", "/og-image.png"];
let failed = false;

for (const route of routes) {
  const file = resolve(output, route, "index.html");
  if (!existsSync(file)) {
    console.error(`Missing static route: /${route}`);
    failed = true;
    continue;
  }
  const html = readFileSync(file, "utf8");
  if (html.includes("/api/graphql") || html.includes("/api/contact") || html.includes("/_next/image")) {
    console.error(`Runtime endpoint in /${route}`);
    failed = true;
  }
  if (!html.includes('rel="canonical"')) {
    console.error(`Missing canonical in /${route}`);
    failed = true;
  }
}

const home = readFileSync(resolve(output, "index.html"), "utf8");
for (const value of required)
  if (!home.includes(value)) {
    console.error(`Home output missing: ${value}`);
    failed = true;
  }
for (const [route, lang] of [
  ["", "ko"],
  ["en", "en"],
  ["ja", "ja"]
]) {
  const html = readFileSync(resolve(output, route, "index.html"), "utf8");
  if (!new RegExp(`<html[^>]+lang="${lang}"`).test(html)) {
    console.error(`Wrong html lang for /${route}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log("Static output verified: 12 routes, metadata, links, and locale HTML.");
