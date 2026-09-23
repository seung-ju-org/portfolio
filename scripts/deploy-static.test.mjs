import assert from "node:assert/strict";
import test from "node:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { deploy, deploymentPlan, mutableInvalidationPaths } from "./deploy-static.mjs";

const options = {
  bucket: "portfolio-2020.seung-ju.com",
  prefix: "ssg",
  distribution: "EL15WJYWXRAIG",
  out: "out",
  release: "abc123",
  archiveDir: ".static-release"
};

test("backs up remotely before uploads and invalidates concrete mutable paths only", () => {
  const invalidationPaths = mutableInvalidationPaths([
    "index.html",
    "about/index.html",
    "en/portfolio/index.html",
    "404.html",
    "robots.txt",
    "sitemap.xml",
    "_next/static/chunks/a.js",
    "_next/data/build/about.txt",
    "manifest.webmanifest"
  ]);
  const plan = deploymentPlan({ ...options, invalidationPaths });
  assert.deepEqual(
    plan.slice(0, 3).map((x) => x[1]),
    ["cp", "cp", "cp"]
  );
  assert.equal(plan[3][1], "sync");
  assert.deepEqual(plan.at(-1), [
    "cloudfront",
    "create-invalidation",
    "--distribution-id",
    "EL15WJYWXRAIG",
    "--paths",
    "/",
    "/404.html",
    "/_next/data/build/about.txt",
    "/about/",
    "/about/index.html",
    "/en/portfolio/",
    "/en/portfolio/index.html",
    "/index.html",
    "/manifest.webmanifest",
    "/robots.txt",
    "/sitemap.xml"
  ]);
  assert.equal(invalidationPaths.includes("/_next/static/chunks/a.js"), false);
  assert.equal(
    plan.some((x) => x.includes("--delete")),
    false
  );
});

test("splits invalidations below CloudFront path request limits", () => {
  const paths = Array.from({ length: 1001 }, (_, i) => `/page-${i}.html`);
  const invalidations = deploymentPlan({ ...options, invalidationPaths: paths }).filter(
    (command) => command[0] === "cloudfront"
  );
  assert.deepEqual(
    invalidations.map((command) => command.length - 5),
    [1000, 1]
  );
});

test("rejects root and legacy prefixes before an AWS command can be planned", () => {
  assert.throws(() => deploymentPlan({ ...options, prefix: "www" }), /STATIC_PREFIX/);
  assert.throws(() => deploymentPlan({ ...options, prefix: "/" }), /STATIC_PREFIX/);
});

test("mocked AWS sequence snapshots both remote documents before static writes", () => {
  const archiveDir = mkdtempSync(join(tmpdir(), "static-deploy-test-"));
  const out = join(archiveDir, "out");
  const calls = [];
  try {
    mkdirSync(out);
    writeFileSync(join(out, "index.html"), "ok");
    deploy({ ...options, archiveDir, out }, (args) => {
      calls.push(args);
      if (args[0] === "cloudfront" && args[1] === "get-distribution-config") return '{"ETag":"E1"}';
      if (args[0] === "s3api") return '{"Policy":"{}"}';
      return "";
    });
    assert.deepEqual(
      calls.slice(0, 5).map((x) => x.slice(0, 2)),
      [
        ["cloudfront", "get-distribution-config"],
        ["s3api", "get-bucket-policy"],
        ["tar", "-czf"],
        ["s3", "cp"],
        ["s3", "cp"]
      ]
    );
  } finally {
    rmSync(archiveDir, { recursive: true, force: true });
  }
});
