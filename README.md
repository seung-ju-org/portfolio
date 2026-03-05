# Portfolio (Next.js + Tailwind + shadcn/ui)

방문자용 포트폴리오 사이트입니다. 관리자 기능(CMS)은 별도 앱으로 분리하는 전제를 두고, 현재는 공개 사이트 UI를 먼저 구성했습니다.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui 스타일 컴포넌트 구조 (`components.json`, `src/components/ui/*`)

## Local Run (pnpm)

```bash
pnpm install
pnpm dev
```

## Structure

- `src/app/page.tsx`: 랜딩 페이지
- `src/components/portfolio/*`: 섹션 단위 컴포넌트
- `src/components/ui/*`: shadcn 스타일 베이스 UI
- `src/lib/utils.ts`: `cn` 유틸

## Next Steps

- 관리자 앱을 별도 저장소/서브앱으로 구축 후 API 연동
- 프로젝트/스킬/연락처 데이터를 CMS 또는 JSON 소스로 분리
- `pnpm dlx shadcn@latest add ...`로 필요한 UI 컴포넌트 추가

## Deployment (Docker + Helm + ArgoCD)

### 1) Build & Push Image

```bash
docker build -t ghcr.io/seung-ju/portfolio:latest .
docker push ghcr.io/seung-ju/portfolio:latest
```

### 2) Helm Render Test

```bash
helm template portfolio ./helm/portfolio \
  -f ./helm/portfolio/values-prod.yaml
```

### 3) ArgoCD Application

`deploy/argocd-application.yaml`의 `repoURL`, `targetRevision`, `namespace`를 환경에 맞게 수정 후 적용:

```bash
kubectl apply -f deploy/argocd-application.yaml
```
