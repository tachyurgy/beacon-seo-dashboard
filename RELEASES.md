# Beacon — Release History

React SEO & Core Web Vitals dashboard. Static SPA (Vite build) deployed to
Cloudflare Pages (project `beacon-seo`), live at **https://beacon-seo.pages.dev**.

Deploy: `npm run build && CLOUDFLARE_API_TOKEN=$LEVELBROOK_CF_DEPLOY_TOKEN CLOUDFLARE_ACCOUNT_ID=a67eceeb4b89d2d4171ed209e87c9456 npx wrangler pages deploy dist --project-name=beacon-seo --branch=main --commit-dirty=true`

> Newest release on top.

---

## 2026-06-19 — Initial release
- **What deployed:** https://beacon-seo.pages.dev — full Beacon dashboard, first public version.
- **Changed:** React 19 + Vite 8 SPA; four animated hand-coded SVG score rings; Core Web Vitals panel (LCP/INP/CLS) scored against Google thresholds with banded position bars; on-page SEO checklist; sortable keyword-rankings table; prioritized-issues list; responsive-preview widget; persisted light/dark theme; three bundled demo datasets (ecommerce/SaaS/local). Only `react` + `react-dom` runtime deps; all visuals hand-coded SVG + CSS.
- **How:** `wrangler pages project create beacon-seo` (scoped token doesn't auto-create), then `wrangler pages deploy dist`.
- **Verified:** HTTP 200; rendered in real browser — 0 console errors, 0 horizontal overflow at desktop (1320px) and mobile (390px); all panels render with demo data.
