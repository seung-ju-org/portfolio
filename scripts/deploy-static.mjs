#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";

export function mutableInvalidationPaths(files) {
  const paths = new Set();
  for (const file of files) {
    const publicPath = `/${file.replaceAll("\\", "/")}`;
    if (publicPath.startsWith("/_next/static/")) continue;
    paths.add(publicPath);
    if (publicPath.endsWith("/index.html")) paths.add(publicPath.slice(0, -"index.html".length));
  }
  return [...paths].sort();
}

export function exportedFiles(out) {
  return readdirSync(out, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(out, join(entry.parentPath, entry.name)).split(sep).join("/"));
}

export function deploymentPlan({ bucket, prefix, distribution, out, release, archiveDir, invalidationPaths = [] }) {
  if (!prefix || prefix === "/" || prefix === "www" || prefix.startsWith("www/"))
    throw new Error("STATIC_PREFIX must be a non-root prefix other than www.");
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(release))
    throw new Error("Release identifier contains an unsafe path character.");
  const releasePrefix = `s3://${bucket}/releases/${release}`;
  return [
    ["s3", "cp", join(archiveDir, `${release}-distribution-config.json`), `${releasePrefix}/distribution-config.json`],
    ["s3", "cp", join(archiveDir, `${release}-bucket-policy.json`), `${releasePrefix}/bucket-policy.json`],
    ["s3", "cp", join(archiveDir, `${release}-out.tar.gz`), `${releasePrefix}/out.tar.gz`],
    [
      "s3",
      "sync",
      `${out}/_next/static/`,
      `s3://${bucket}/${prefix}/_next/static/`,
      "--cache-control",
      "public,max-age=31536000,immutable"
    ],
    [
      "s3",
      "sync",
      `${out}/`,
      `s3://${bucket}/${prefix}/`,
      "--exclude",
      "_next/static/*",
      "--cache-control",
      "public,max-age=0,must-revalidate"
    ],
    ...chunk(invalidationPaths, 1000).map((paths) => [
      "cloudfront",
      "create-invalidation",
      "--distribution-id",
      distribution,
      "--paths",
      ...paths
    ])
  ];
}

function chunk(items, size) {
  const groups = [];
  for (let index = 0; index < items.length; index += size) groups.push(items.slice(index, index + size));
  return groups;
}

export function deploy(options, execute) {
  const { bucket, distribution, archiveDir, release } = options;
  const config = execute(["cloudfront", "get-distribution-config", "--id", distribution, "--output", "json"], {
    encoding: "utf8"
  });
  const policy = execute(["s3api", "get-bucket-policy", "--bucket", bucket, "--output", "json"], { encoding: "utf8" });
  writeFileSync(join(archiveDir, `${release}-distribution-config.json`), config);
  writeFileSync(join(archiveDir, `${release}-bucket-policy.json`), policy);
  execute(["tar", "-czf", join(archiveDir, `${release}-out.tar.gz`), "-C", options.out, "."]);
  for (const command of deploymentPlan({
    ...options,
    invalidationPaths: mutableInvalidationPaths(exportedFiles(options.out))
  }))
    execute(command);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const options = {
    bucket: process.env.STATIC_BUCKET ?? "portfolio-2020.seung-ju.com",
    prefix: process.env.STATIC_PREFIX ?? "ssg",
    distribution: process.env.CLOUDFRONT_DISTRIBUTION_ID ?? "EL15WJYWXRAIG",
    out: process.env.STATIC_OUT_DIR ?? "out",
    release: process.env.GITHUB_SHA ?? new Date().toISOString().replace(/[:.]/g, "-"),
    archiveDir: ".static-release"
  };
  if (!existsSync(options.out) || !statSync(options.out).isDirectory())
    throw new Error(`${options.out}/ is required. Run the static build first.`);
  if (!existsSync(join(options.out, "404.html")))
    throw new Error(`${options.out}/404.html is required for CloudFront real-404 responses.`);
  mkdirSync(options.archiveDir, { recursive: true });
  deploy(options, (args, config) =>
    execFileSync(
      args[0] === "tar" ? "tar" : "aws",
      args[0] === "tar" ? args.slice(1) : args,
      config?.encoding ? config : { stdio: "inherit" }
    )
  );
  console.log(
    "Upload complete. Apply the reviewed ETag configuration, function, additive /ssg policy, and DNS only after CloudFront verification."
  );
}
