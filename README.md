# Seung Ju Portfolio

Static Next.js portfolio for `https://portfolio.seung-ju.com`. Korean uses unprefixed paths, English uses `/en`, Japanese uses `/ja`, and `/ko` redirects at CloudFront.

## Local development and preview

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
python3 -m http.server --directory out 3000
```

The production build must generate `out/`. Run `node scripts/verify-static.mjs` before deployment.

## Content

Edit portfolio copy in `src/lib/site-content.ts`. This is a static deployment: do not add server-only data, cookies, database access, mail, or API calls.

## Deployment

GitHub Actions verifies each pull request and deploys only `main` or an explicit production manual run. It requires `AWS_STATIC_DEPLOY_ROLE_ARN`; OIDC trust and least-privilege permissions are in `infra/iam/`. They are setup documents only: an authorized operator must create the provider and role before CI deployment.

The GitHub `production` Environment must restrict deployment branches to `main` exactly. Its OIDC subject is `repo:seung-ju-org/portfolio:environment:production`; this branch restriction is required in addition to the workflow `main` condition.

Before first deployment, an authorized operator must back up the existing distribution configuration and bucket policy, then:

1. Run `node scripts/deploy-static.mjs` to archive current config/policy and upload new files before the origin switch.
2. Add `infra/s3/cloudfront-ssg-read-policy-statement.json` to the bucket policy after replacing `<ACCOUNT_ID>`. Preserve the existing `/www/*` statement.
3. Publish `infra/cloudfront/canonical-route.js`, then run `CLOUDFRONT_VIEWER_REQUEST_FUNCTION_ARN=<published-arn> node scripts/prepare-cloudfront-config.mjs original.json proposed.json`. It changes only the known REST origin to `/ssg`, retains OAC `E2HR8K6NT1APV8`, uses managed CachingDisabled/Optimized policies, and makes both 403 and 404 return `/404.html` with HTTP 404.
4. ETag-update the distribution, wait for deployment, and verify CloudFront before DNS.
5. Add exact Route 53 A and AAAA aliases for `portfolio.seung-ju.com` to this distribution. Keep the wildcard, root, mail, and historical portfolio records unchanged.

`node scripts/deploy-static.mjs` uploads hashed assets before HTML, never deletes `/www` or bucket objects, archives the build and configuration backups under `releases/`, then invalidates concrete mutable HTML, RSC/data, metadata, and public paths while excluding `/_next/static/**`. Roll back by restoring an archived build beneath `ssg/` and invalidating those paths; use a fresh ETag when restoring the saved distribution configuration.
