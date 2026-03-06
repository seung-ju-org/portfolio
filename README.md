# Seung Ju Portfolio

Next.js App Router 기반 포트폴리오 웹사이트입니다.  
방문자용 사이트를 우선 구축했고, Portfolio/Career 데이터는 DB + GraphQL + Relay로 동작합니다.

## 주요 기능

- 다국어: `ko`, `en`, `ja`
- 테마: `light`, `system`, `dark` (쿠키 기반 유지)
- 페이지: Home / About Me / Portfolio / Contact Me
- Portfolio:
  - PostgreSQL 저장 데이터 조회
  - GraphQL API(`/api/graphql`) + Relay 클라이언트
  - 커서 기반 무한 스크롤
  - Redis 캐시
- Career:
  - DB 저장 데이터 기반 다국어 조회
- Contact:
  - 메일 전송 API(`/api/contact`)
- Sentry:
  - App/Server/Edge 에러 수집 + 소스맵 업로드
- 배포:
  - Docker(standalone) + Helm + ArgoCD
- CI:
  - Jenkinsfile + Kaniko 빌드/푸시 + GitOps 태그 업데이트

## 기술 스택

- Next.js 16.1.6 (App Router)
- React / React DOM
- TypeScript
- Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL
- GraphQL Yoga + Relay Runtime
- Redis (ioredis)
- Sentry
- Vitest + Testing Library

## 프로젝트 구조

- `src/app`: 라우팅, 페이지, API 라우트
- `src/components/portfolio`: 포트폴리오 UI 컴포넌트
- `src/lib`: i18n, repository, graphql schema, env, util
- `prisma`: schema, seed
- `helm/portfolio`: Kubernetes Helm chart
- `deploy`: ArgoCD Application 매니페스트
- `.github/workflows/ci-cd.yml`: GitHub Actions CI/CD 파이프라인

## 로컬 실행 (pnpm)

```bash
pnpm install
pnpm prisma:generate
pnpm dev
```

- 개발 서버: `http://localhost:3000`

## 환경 변수

기본 템플릿은 `.env.example`을 참고하세요.

핵심 변수:

- `DATABASE_URL`
- `REDIS_HOST`
- `REDIS_PORT`
- `REDIS_PASSWORD`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_DOMAIN`, `SMTP_PROTOCOL`
- `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN` (빌드 소스맵 업로드)

## DB/캐시

- ORM: Prisma
- RDB: PostgreSQL
- Cache: Redis
- Portfolio/Career 데이터는 DB 기준으로 조회됩니다.

마이그레이션/시드:

```bash
pnpm prisma:generate
pnpm prisma:push
pnpm prisma:seed
```

## 테스트/품질

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
```

현재 기준:

- 테스트 통과
- lint/typecheck 통과
- coverage threshold 적용 (`vitest.config.ts`)

## Sentry

- 설정 파일:
  - `src/instrumentation-client.ts`
  - `sentry.server.config.ts`
  - `sentry.edge.config.ts`
- 토큰 파일:
  - `.env.sentry-build-plugin` (git 제외)
- GitHub Actions 빌드 시 `SENTRY_AUTH_TOKEN` build-arg 전달

## CI/CD

### GitHub Actions

파이프라인 파일:

- `.github/workflows/ci-cd.yml`

필수 Repository Secrets:

- `SENTRY_AUTH_TOKEN` (Sentry 소스맵 업로드)

동작:

1. `pnpm install/lint/typecheck/test/build`
2. Docker Buildx 이미지 빌드/푸시 (`ghcr.io/seung-ju/portfolio`)
3. `helm/portfolio/values.yaml`의 `image.tag` 갱신 커밋
4. ArgoCD 자동 동기화

### Helm / ArgoCD

렌더 테스트:

```bash
helm template portfolio ./helm/portfolio -f ./helm/portfolio/values.yaml
```

ArgoCD 앱 배포:

```bash
kubectl apply -f deploy/argocd-application.yaml
```

Ingress host:

- `portfolio.seung-ju.com`

## 운영 메모

- GitHub 원격: `git@github.com:seung-ju-org/portfolio.git`
- 기본 브랜치: `main`
- Node 패키지 매니저: `pnpm` (lockfile 포함)
