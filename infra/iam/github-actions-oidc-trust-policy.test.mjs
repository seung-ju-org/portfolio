import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("OIDC trust evaluates both audience and protected production environment subject", () => {
  const policy = JSON.parse(readFileSync(new URL("./github-actions-oidc-trust-policy.json", import.meta.url), "utf8"));
  const condition = policy.Statement[0].Condition.StringEquals;
  assert.deepEqual(condition, {
    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
    "token.actions.githubusercontent.com:sub": "repo:seung-ju-org/portfolio:environment:production"
  });
  const allowed = (claims) => Object.entries(condition).every(([key, value]) => claims[key] === value);
  assert.equal(
    allowed({
      "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
      "token.actions.githubusercontent.com:sub": "repo:seung-ju-org/portfolio:environment:production"
    }),
    true
  );
  assert.equal(
    allowed({
      "token.actions.githubusercontent.com:aud": "other",
      "token.actions.githubusercontent.com:sub": "repo:seung-ju-org/portfolio:environment:production"
    }),
    false
  );
  assert.equal(
    allowed({
      "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
      "token.actions.githubusercontent.com:sub": "repo:seung-ju-org/portfolio:ref:refs/heads/main"
    }),
    false
  );
});
