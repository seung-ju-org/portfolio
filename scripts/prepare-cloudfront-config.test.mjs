import assert from "node:assert/strict";
import test from "node:test";
import { CACHING_DISABLED, CACHING_OPTIMIZED, transformDistribution } from "./prepare-cloudfront-config.mjs";

const fixture = () => ({
  ETag: "E1",
  DistributionConfig: {
    Origins: {
      Quantity: 1,
      Items: [
        {
          Id: "portfolio.seung-ju.com",
          DomainName: "portfolio-2020.seung-ju.com.s3.ap-northeast-2.amazonaws.com",
          OriginPath: "/www",
          OriginAccessControlId: "E2HR8K6NT1APV8",
          S3OriginConfig: { OriginAccessIdentity: "" }
        }
      ]
    },
    DefaultCacheBehavior: {
      TargetOriginId: "portfolio.seung-ju.com",
      ViewerProtocolPolicy: "redirect-to-https",
      CachePolicyId: "old",
      MinTTL: 60,
      ForwardedValues: { QueryString: true },
      FunctionAssociations: { Quantity: 1, Items: [{ EventType: "viewer-response", FunctionARN: "keep" }] }
    },
    CacheBehaviors: { Quantity: 0, Items: [] },
    CustomErrorResponses: { Quantity: 1, Items: [{ ErrorCode: 403, ResponseCode: "200" }] }
  }
});

test("converts only the known OAC origin and policy-managed behaviors", () => {
  const actual = transformDistribution(fixture(), "arn:aws:cloudfront::1:function/portfolio-route");
  assert.equal(actual.Origins.Items[0].OriginPath, "/ssg");
  assert.equal(actual.Origins.Items[0].OriginAccessControlId, "E2HR8K6NT1APV8");
  assert.equal(actual.DefaultCacheBehavior.CachePolicyId, CACHING_DISABLED);
  assert.equal(actual.DefaultCacheBehavior.MinTTL, undefined);
  assert.equal(actual.DefaultCacheBehavior.ForwardedValues, undefined);
  assert.deepEqual(
    actual.DefaultCacheBehavior.FunctionAssociations.Items.map((x) => x.EventType),
    ["viewer-response", "viewer-request"]
  );
  assert.equal(actual.CacheBehaviors.Items[0].CachePolicyId, CACHING_OPTIMIZED);
  assert.deepEqual(
    actual.CustomErrorResponses.Items.map((x) => [x.ErrorCode, x.ResponseCode]),
    [
      [403, "404"],
      [404, "404"]
    ]
  );
});

test("refuses a missing function or a non-default/ambiguous origin", () => {
  assert.throws(() => transformDistribution(fixture()), /FUNCTION_ARN/);
  const wrong = fixture();
  wrong.DistributionConfig.DefaultCacheBehavior.TargetOriginId = "other";
  assert.throws(() => transformDistribution(wrong, "arn"), /DefaultCacheBehavior/);
});
