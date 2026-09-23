# Agent SEO & Automated Publishing System

> **Handover Document for Next AI Agent / Developer Session**  
> **Last Updated:** 2026-09-23 14:10 BST (UTC+6)  
> **Author:** Antigravity AI  
> **Repository Scope:** Multi-site automated publishing system across 4 web properties.

---

## 1. System Overview & Objective

An automated daily publishing pipeline is deployed across **4 distinct web properties**. Each site has **10 pre-generated, SEO/GEO/AEO-optimized articles** queued. Every night at **12:00 AM Bangladesh Standard Time (BST = UTC+6)**, a GitHub Actions workflow triggers, pops exactly 1 post from the queue, publishes it into the live blog system, commits the changes with `[skip ci]`, and pushes to `main`. The connected hosting platform (Vercel / Netlify / Hostinger) automatically builds and deploys the new post.

---

## 2. Directory & Site Matrix

| Website | Local Path | GitHub Repository | Queue Location | Publisher Script | Workflow File |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **BEC** | `e:\Documnets\COde\bec-main` | [`tareksec/bec`](https://github.com/tareksec/bec) | `Jobaway/articles/queue/*.md` | `Jobaway/scripts/publish-daily.mjs` | `.github/workflows/daily-publish.yml` |
| **TechVRS** | `e:\Documnets\COde\techvrs-main` | [`tareksec/techvrs`](https://github.com/tareksec/techvrs) | `src/content/posts-queue.json` | `scripts/publish-daily.mjs` | `.github/workflows/daily-publish.yml` |
| **Elite Prominence** | `e:\Documnets\COde\Elite-Prominence-main` | [`tareksec/Elite-Prominence`](https://github.com/tareksec/Elite-Prominence) | `content/queue/*.mdx` | `scripts/publish-daily.mjs` | `.github/workflows/daily-publish.yml` |
| **ArtX** | `e:\Documnets\COde\artx-main` | [`tareksec/artx`](https://github.com/tareksec/artx) | `src/content/blog-queue.json` | `scripts/publish-daily.mjs` | `.github/workflows/daily-publish.yml` |

*(Note: `personal-blog-imran-main` at `e:\Documnets\COde\personal-blog-imran-main` was also fully configured with queue and workflow, but the user explicitly selected the 4 above).*

---

## 3. Automation Timing & Schedule

- **Target Local Time:** 12:00 AM (Midnight) Bangladesh Standard Time (BST, UTC+6).
- **GitHub Actions Cron Expression:** `0 18 * * *` (18:00 UTC on the previous calendar day).
- **Manual Trigger Support:** All workflows define `workflow_dispatch:`, meaning you can manually trigger a publish from the GitHub Actions UI at any time for testing.

---

## 4. How Each Site Publishes (Technical Mechanics)

### A. BEC (`Jobaway` Subproject)
- **Queue Storage:** Markdown files located in `Jobaway/articles/queue/`.
- **Target Storage:** Moves the file into `Jobaway/articles/` (or inserts via `insert-articles.mjs` directly into the database / file storage).
- **Runner:** `node Jobaway/scripts/publish-daily.mjs`
  - Takes the first `.md` file sorted alphabetically.
  - Updates timestamp.
  - Publishes and updates `Jobaway/articles/publish-history.json`.

### B. TechVRS (`Next.js / Content Layer`)
- **Queue Storage:** JSON array in `src/content/posts-queue.json`.
- **Live Posts Storage:** `src/content/posts.json` (or `src/content/posts/`).
- **Runner:** `node scripts/publish-daily.mjs`
  - Shifts 1 post from `posts-queue.json`.
  - Sets `publishedAt` to the current ISO date.
  - Prepends to `posts.json` and updates `publish-history.json`.

### C. Elite Prominence (`Next.js + MDX + blogData.js`)
- **Queue Storage:** MDX files in `content/queue/*.mdx`.
- **Live Posts Storage:** Moves to `content/blog/<slug>.mdx` AND prepends the parsed article object into `BLOG_ARTICLES` in `lib/blogData.js`.
- **Runner:** `node scripts/publish-daily.mjs`
  - Parses frontmatter and body headings/paragraphs.
  - Moves file out of `content/queue/` into `content/blog/`.
  - Updates `lib/blogData.js` and `content/publish-history.json`.

### D. ArtX (`Vite / React / Static Blog`)
- **Queue Storage:** JSON array in `src/content/blog-queue.json`.
- **Live Posts Storage:** `src/content/blog-data.json`.
- **Runner:** `node scripts/publish-daily.mjs`
  - Shifts 1 post from `blog-queue.json`.
  - Sets `date` to current ISO string.
  - Prepends to `blog-data.json` and logs in `src/content/publish-history.json`.

---

## 5. Inventory of Queued Posts (10 per site = 40 total)

### 1. BEC (`thebec.site`)
1. `ai-fluent-c-suite-enterprise-ai-bangladesh-operations.md`
2. `bangladesh-tech-talent-retention-global-remote-era.md`
3. `corporate-governance-esg-compliance-dhaka-enterprises.md`
4. `cross-border-payments-b2b-fintech-bangladesh-exporters.md`
5. `cybersecurity-resilience-fintech-banking-infrastructure-bd.md`
6. `executive-personal-branding-c-suite-authority-bangladesh.md`
7. `fractional-cxo-leadership-scaling-bangladeshi-startups.md`
8. `future-of-work-hybrid-leadership-bangladesh-corporates.md`
9. `next-gen-logistics-ai-supply-chain-optimization-bd.md`
10. `rmg-automation-sustainable-manufacturing-4.0-bangladesh.md`

### 2. TechVRS (`techvrs.com`)
1. `securing-autonomous-ai-agents-owasp-top-10-llm`
2. `edge-ai-wasm-client-side-inference-2026`
3. `serverless-containers-vs-traditional-kubernetes-cost-breakdown`
4. `post-quantum-cryptography-web-developers-migration-guide`
5. `building-zero-trust-microservices-service-mesh-istio`
6. `database-sharding-vs-distributed-sql-cockroachdb-yugabytedb`
7. `mastering-event-driven-architecture-kafka-flink`
8. `optimizing-rag-systems-hybrid-search-reranking`
9. `synthetic-data-generation-privacy-safe-ai-training`
10. `next-gen-api-design-graphql-grpc-rest-comparison`

### 3. Elite Prominence (`prominence.agency`)
1. `01-ceo-reputation-management-2026.mdx`
2. `02-board-of-directors-executive-visibility-strategy.mdx`
3. `03-digital-executive-presence-framework.mdx`
4. `04-crisis-communications-executive-brand-defense.mdx`
5. `05-b2b-founder-thought-leadership-framework.mdx`
6. `06-geo-generative-engine-optimization-for-executives.mdx`
7. `07-c-suite-linkedin-algorithm-strategy-2026.mdx`
8. `08-from-corporate-executive-to-board-advisor.mdx`
9. `09-chief-technology-officer-personal-brand.mdx`
10. `10-executive-narrative-design-origin-story.mdx`

### 4. ArtX (`artx.techvrs.com`)
1. `evolution-minimalist-web-design-2026`
2. `color-theory-in-digital-interfaces-dark-mode-accessibility`
3. `micro-interactions-and-tactile-ui-framermotion`
4. `typography-in-product-design-hierarchy-and-performance`
5. `bento-grid-ui-layouts-practical-implementation`
6. `design-systems-at-scale-tokens-and-governance`
7. `ai-driven-ui-personalization-adaptive-interfaces`
8. `glassmorphism-and-depth-layering-modern-css`
9. `mobile-first-gestural-navigation-patterns`
10. `designing-for-spatial-computing-and-webxr`

---

## 6. Git & Credential Context

- **Remote Account:** `tareksec` on GitHub.
- **Active PAT Scope:** The active Personal Access Token configured in git origins includes `repo` and `workflow` permissions.
- **Git User Config:**
  - Name: `github-actions[bot]` (inside GitHub Actions runner)
  - Local commit author: `tareksec` / `tareksec@users.noreply.github.com`
- **Branch:** `main` (for all 4 repositories).

---

## 7. Instructions for the Next Agent / Maintenance Tasks

### When Current 10 Posts are Nearing Completion (Day 8–10):
1. **Check Queue Count:**
   - Run:
     ```powershell
     (Get-ChildItem 'e:\Documnets\COde\bec-main\Jobaway\articles\queue' -Filter '*.md').Count
     (Get-Content 'e:\Documnets\COde\techvrs-main\src\content\posts-queue.json' | ConvertFrom-Json).Count
     (Get-ChildItem 'e:\Documnets\COde\Elite-Prominence-main\content\queue' -Filter '*.mdx').Count
     (Get-Content 'e:\Documnets\COde\artx-main\src\content\blog-queue.json' | ConvertFrom-Json).Count
     ```
2. **Generate Next Batch (Batch #2):**
   - Keep the same format: 10 new high-signal articles per site targeting fresh 2026 keywords.
   - Append to the respective queue file or queue directory.
   - Commit and push to `origin main`.
3. **If a Scheduled Run Fails:**
   - Go to the GitHub repository > **Actions** tab.
   - Inspect the failed workflow run logs under `publish`.
   - Verify if any merge conflict occurred or if the queue was empty.
   - You can test-run locally at any time:
     - In `bec-main`: `node Jobaway/scripts/publish-daily.mjs`
     - In `techvrs-main`: `node scripts/publish-daily.mjs`
     - In `Elite-Prominence-main`: `node scripts/publish-daily.mjs`
     - In `artx-main`: `node scripts/publish-daily.mjs`

---

## 8. Summary of Guarantee
- Exactly 1 post per day at 12:00 AM BST.
- Automatic commit and push.
- Zero other project files modified.
- Full system self-sustained for the next 10 days without manual intervention.
