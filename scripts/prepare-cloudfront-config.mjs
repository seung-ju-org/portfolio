#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const CACHING_DISABLED = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad";
export const CACHING_OPTIMIZED = "658327ea-f89d-4fab-a63d-7e88639e58f6";
const ORIGIN_ID = "portfolio.seung-ju.com";
const ORIGIN_DOMAIN = "portfolio-2020.seung-ju.com.s3.ap-northeast-2.amazonaws.com";

function policyBehavior(behavior, policyId) {
  const next = { ...behavior, CachePolicyId: policyId };
  delete next.MinTTL;
  delete next.DefaultTTL;
  delete next.MaxTTL;
  delete next.ForwardedValues;
  return next;
}

export function transformDistribution(source, functionArn) {
  if (!functionArn) throw new Error("CLOUDFRONT_VIEWER_REQUEST_FUNCTION_ARN is required.");
  const config = structuredClone(source.DistributionConfig ?? source);
  const matches =
    config.Origins?.Items?.filter((origin) => origin.Id === ORIGIN_ID && origin.DomainName === ORIGIN_DOMAIN) ?? [];
  if (matches.length !== 1)
    throw new Error(`Expected exactly one ${ORIGIN_ID} REST origin with its known regional S3 domain.`);
  const defaultBehavior = config.DefaultCacheBehavior;
  if (!defaultBehavior || defaultBehavior.TargetOriginId !== ORIGIN_ID)
    throw new Error(`DefaultCacheBehavior must target ${ORIGIN_ID}; refusing ambiguous update.`);
  matches[0].OriginPath = "/ssg";
  config.DefaultCacheBehavior = policyBehavior(defaultBehavior, CACHING_DISABLED);
  const associations = config.DefaultCacheBehavior.FunctionAssociations ?? { Quantity: 0, Items: [] };
  const others = (associations.Items ?? []).filter((item) => item.EventType !== "viewer-request");
  config.DefaultCacheBehavior.FunctionAssociations = {
    ...associations,
    Quantity: others.length + 1,
    Items: [...others, { EventType: "viewer-request", FunctionARN: functionArn }]
  };
  const behaviors = config.CacheBehaviors ?? { Quantity: 0, Items: [] };
  const index = (behaviors.Items ?? []).findIndex((item) => item.PathPattern === "_next/static/*");
  if (index >= 0) behaviors.Items[index] = policyBehavior(behaviors.Items[index], CACHING_OPTIMIZED);
  else
    behaviors.Items = [
      ...(behaviors.Items ?? []),
      policyBehavior({ ...defaultBehavior, PathPattern: "_next/static/*" }, CACHING_OPTIMIZED)
    ];
  config.CacheBehaviors = { ...behaviors, Quantity: behaviors.Items.length, Items: behaviors.Items };
  const errors = config.CustomErrorResponses ?? { Quantity: 0, Items: [] };
  const items = errors.Items ?? [];
  for (const code of [403, 404]) {
    const value = { ErrorCode: code, ResponsePagePath: "/404.html", ResponseCode: "404", ErrorCachingMinTTL: 0 };
    const old = items.find((item) => item.ErrorCode === code);
    if (old) Object.assign(old, value);
    else items.push(value);
  }
  config.CustomErrorResponses = { ...errors, Quantity: items.length, Items: items };
  return config;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [input, output] = process.argv.slice(2);
  if (!input || !output)
    throw new Error(
      "Usage: CLOUDFRONT_VIEWER_REQUEST_FUNCTION_ARN=... node scripts/prepare-cloudfront-config.mjs <input.json> <output.json>"
    );
  const source = JSON.parse(readFileSync(input, "utf8"));
  writeFileSync(
    output,
    `${JSON.stringify(transformDistribution(source, process.env.CLOUDFRONT_VIEWER_REQUEST_FUNCTION_ARN), null, 2)}\n`
  );
  console.log(`Wrote ${output}; update with IfMatch ETag ${source.ETag ?? "<from get-distribution-config>"}.`);
}
