# Project sources and image provenance

This ledger records the evidence behind 46 entries: 22 established career records (Bankmall platform/mobile is one merged record), 3 early public-site records, 13 archived design studies, 7 public tools/prototypes, and 1 portfolio-engineering evolution entry. It describes documented roles and sources; it does not add unverified metrics, client outcomes, or current-product claims.

## Career and early work

The 22 career records are maintained from the supplied résumé and current catalogue. Bankmall, HomeGrit, and SKKU IMBA have archival portfolio composites below; ENSolution uses a current public promotional image. Naegong and SSG EDU remain dated catalogue records, but their current visual state is ambiguous and no image is attached.

Showket (2021.07–2021.09), Shoedoc (2021.04–2021.07), and Chadu & Dealerdu (2021.01–2021.04) come from the earlier public `career-history.ts` source, which documents their title, period, summary, and stack. No image is inferred.

| Site image                                                               | Project                       | Source                                                                                                                                     |
| ------------------------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `/images/projects/services/bankmall-archived-portfolio.webp` (1200×676)  | Bankmall platform development | `seungju-portfolio.pdf`, SHA-256 `15c35c03f169fc16694e53cea4e878985f0b815e23d07e3a6dc87b1a2ecdc713`, page 3; archived portfolio composite. |
| `/images/projects/services/homegrit-archived-portfolio.webp` (1200×676)  | HomeGrit development          | Same PDF and SHA, page 4; archived portfolio composite.                                                                                    |
| `/images/projects/services/skku-imba-archived-portfolio.webp` (1200×676) | SKKU IMBA renewal             | Same PDF and SHA, page 5; archived portfolio composite.                                                                                    |
| `/images/projects/services/ensolution-dashboard.webp` (1200×1077)        | ENSolution / 딸깍             | [ENSolution public image](https://ensolution.co.kr/_next/static/media/sf.8659712e.png), viewed 2026-09-23; current public service image.   |

The PDF pages remain cited by filename, hash, and page only; the full personal PDF is not published. The PDF images are period composites, not clean source captures. The ENSolution image is current public-service material and may differ from the work-period interface.

## 2018 design archive

The 13 design entries come from public, non-fork [`seung-juv/portfolio-2018`](https://github.com/seung-juv/portfolio-2018) at commit [`042678a221665ce9823d30e599a5e4098102e5c4`](https://github.com/seung-juv/portfolio-2018/tree/042678a221665ce9823d30e599a5e4098102e5c4). The archive describes itself as a 2018 portfolio and credits `©2019 SeungJuPortFolio`; its public repository import is dated 2020-07-19. These are archived work/study images, not current public-service images.

| Site image                                                                           | Archived project                            | SHA-pinned original path                               |
| ------------------------------------------------------------------------------------ | ------------------------------------------- | ------------------------------------------------------ |
| `/images/projects/archive/line-web-redesign-concept.webp` (1200×960)                 | LINE web redesign concept                   | `project/project_line_web/images/thumb.jpg`            |
| `/images/projects/archive/line-app-redesign-concept.webp` (1200×900)                 | LINE app redesign concept                   | `project/project_line_app/images/thumb.jpg`            |
| `/images/projects/archive/dear-my-pet-app-study.webp` (1200×900)                     | Dear my Pet app design                      | `project/project_dear_app/images/thumb.jpg`            |
| `/images/projects/archive/dear-my-pet-poster-study.webp` (1152×424)                  | Dear my Pet poster design                   | `images/project/project_09/project_01.jpg`             |
| `/images/projects/archive/childfund-leaflet-study.webp` (1200×840)                   | Green Umbrella leaflet design               | `project/project_green/images/thumb.jpg`               |
| `/images/projects/archive/identity-leaflet-study.webp` (318×424)                     | Identity leaflet study                      | `project/project_indentity_leaflet/images/thumb.jpg`   |
| `/images/projects/archive/and-then-there-were-none-book-cover-study.webp` (1152×424) | _And Then There Were None_ book-cover study | `project/project_none_bookcover/images/project_01.jpg` |
| `/images/projects/archive/elegant-night-cats-book-cover-study.webp` (1200×819)       | _Elegant Night and Cats_ book-cover study   | `project/project_ua/images/project_01.jpg`             |
| `/images/projects/archive/andy-warhol-magazine-study.webp` (900×1200)                | Andy Warhol magazine study                  | `images/project/project_10/thumb.jpg`                  |
| `/images/projects/archive/electronic-guitar-phonecase-study.webp` (1200×605)         | Electronic Guitar phone-case study          | `project/project_elec_phonecase/images/2.jpg`          |
| `/images/projects/archive/garbage-collection-logo-study.webp` (600×600)              | Garbage Collection logo study               | `project/project_garbege_logo/images/Preview.png`      |
| `/images/projects/archive/chonghwa-young-logo-study.webp` (600×600)                  | Chonghwa Young logo study                   | `project/project_chong_logo/images/thumb.png`          |
| `/images/projects/archive/star-box-logo-study.webp` (600×600)                        | STAR BOX logo study                         | `project/project_starbox_logo/images/thumb.png`        |

Every original above resolves as `https://github.com/seung-juv/portfolio-2018/blob/042678a221665ce9823d30e599a5e4098102e5c4/<path>`. The LINE entries are redesign concepts. Dear my Pet app and poster entries are group brand-design assignments. Other named brands, publishers, companies, mockups, or media references remain archive context and do not assert client affiliation or ownership.

Three archive cards are omitted: `기술자들` has conflicting title/prose/image evidence; Guitar Video Edit has only an unexplained still and no video source; the IU phone-case work uses a recognisable performer image.

## Public tools, prototypes, and evolution

| Entry                           | Public source and documented scope                                                                                                                                                                                                                                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prismabook social-app prototype | Public non-fork [frontend](https://github.com/seung-juv/prismabook-frontend) and [backend](https://github.com/seung-juv/prismabook-backend) repositories. The source documents React/Redux/Apollo/GraphQL plus Express/GraphQL Yoga/Prisma, with authentication, feed, posting, likes, comments, follows, and friend requests.              |
| Storage API                     | Public non-fork [repository](https://github.com/seung-juv/storage), created 2023-03-04 with an observed authored commit on 2023-03-31. Its NestJS source accepts multipart upload, stores metadata, serves files and `:id/info`, and creates/caches Sharp image variants.                                                                   |
| UI library                      | Public non-fork [repository](https://github.com/seung-juv/ui), created 2023-03-05 with an observed authored commit on 2023-03-06. Its TypeScript React source has SCSS modules, Storybook stories, typed props/forwarded refs, and layout, menu, table, button, description, space, input/select/checkbox/radio components.                 |
| Sana portfolio platform         | Public non-fork [repository](https://github.com/seung-juv/sana-portfolio), created 2022-01-27. Its source has a Next.js frontend and NestJS server with authentication, profile and portfolio CRUD, and Docker; public commits by `seung-juv` continue through 2023-05-30. Repository dates only.                                           |
| React Native Action Sheet       | Public non-fork [repository](https://github.com/seung-ju-org/react-native-action-sheet), created 2024-08-17. Its README/API and package metadata identify author Seung Ju / `seung-juv`; source includes Swift/Objective-C iOS and Kotlin Android implementations with CJS/ESM/types builds. No adoption or published-product claim.        |
| OpenAPI Generator               | Public non-fork [repository](https://github.com/seung-ju-org/openapi-generator), created 2024-05-06. Its small TypeScript CLI fetches OpenAPI schemas and generates namespaces/interfaces; five initial commits are by `seung-juv`. Repository date only.                                                                                   |
| Coupang review-draft assistant  | Public non-fork [repository](https://github.com/seung-ju-org/coupang-review-bot), created 2026-03-11. Its README/source supports Chrome remote debugging/manual login, product-context extraction, separate LLM review drafts, validation, and form filling. Describe it as a review-draft assistant; no adoption claim.                    |
| Portfolio engineering evolution | [Portfolio 2020](https://github.com/seung-juv/portfolio-2020) (React, React Router, styled-components, GSAP, React Helmet) and [portfolio-typescript](https://github.com/seung-juv/portfolio-typescript) (Next.js 10, TypeScript, Storybook, styled-components, GSAP, Apollo Client, GraphQL) are one evolution entry, not duplicate cards. |

| Site image                                                                 | Project              | Source                                                                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/images/projects/archive/prismabook-portfolio-2020-still.webp` (1000×632) | Prismabook prototype | Authentic still extracted from `portfolio-2020` at commit [`c5e982c024136eae1541bb69e987c486aa5e1450`](https://github.com/seung-juv/portfolio-2020/blob/c5e982c024136eae1541bb69e987c486aa5e1450/src/Assets/Thumb/thumb-prismabook.mov), `src/Assets/Thumb/thumb-prismabook.mov`. Historical prototype artifact; not a current capture. |

Other public personal repositories were reviewed and omitted when they are forks, tutorials, coding exercises, framework templates, small experiments, empty repositories, or lack enough public product/design evidence. Public organization identity `unicoredevelop` is recorded only as its public name (`유니코아&디코코`) and public `unicore-stack` repository; this ledger does not state private membership roles or an employment relationship.

## Related service-card photos (2026-09-24)

These are related stock photos, not actual project screenshots. The visible provenance explicitly states this in Korean, English, and Japanese.

- `unicorea-payment-service.webp`: [CardMapr.nl / Unsplash](https://unsplash.com/photos/XH2JFgT4Abc), contactless payment scene.
- `brassone-site.webp`: [Christopher Gower / Unsplash](https://unsplash.com/photos/m_HRfLhgABo), laptop workspace with a code editor open.

Design supplied 1200×750 PNG originals; encoded as WebP quality 80, displayed with `cover`, each under 150,000 bytes. [Unsplash License](https://unsplash.com/license) allows free commercial and non-commercial use without required permission or attribution; credits are retained. These photos do not claim client affiliation or depict the delivered products. Prefer verified public project screenshots if they become available.
