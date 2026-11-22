# CLAUDE.md

Guidance for working in this repository.

## What this is

Sahara Guides (saharaguides.com) is an independent editorial Morocco travel site, not a tour-booking site. Next.js 14 App Router in **JavaScript/JSX**, Tailwind CSS, optional Sanity CMS, hosted on Vercel. No test suite: verify with `npm run build`, `npm run lint`, `npm run check:content`, and by loading pages.

Commands: `npm run dev` (port 5000), `npm run build`, `npm run lint`, `npm run check:content`, `npm run import:sanity`, `npm run indexnow`. Path alias `@/` → `src/`.

## Content model

- Articles come from **Markdown files** in `content/articles/` and, if `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, from **Sanity** `article` documents. A Sanity doc with the same `category` + `slug` overrides the file (`src/lib/content.js`).
- URL = `/<category>/<slug>`. Categories are defined once in `src/lib/taxonomy.js` (mirrored in `studio/schemas/article.js`, so keep both in sync).
- Articles are hidden until `publishedAt` (this is the scheduling mechanism). Pages revalidate hourly.
- Frontmatter fields: `title, seoTitle, category, slug, description (140–160 chars), standfirst, publishedAt, updatedAt, verifiedAt, heroImage (key from src/data/images.js), featured, editorsPick, tags, keyTakeaways[], quickFacts[{label,value}], faqs[{question,answer}], sources[{title,publisher,url}], related[urls]`.
- Body Markdown: `##`/`###` only (the title is the H1; `##` headings build the TOC). Callouts: `> [!TIP]`, `[!NOTE]`, `[!WARNING]`, `[!IMPORTANT]`. Images: `![](image-key)` or `![alt](image-key "caption")` using keys from `src/data/images.js`. Tables are GFM.
- Run `npm run check:content` after any content change.

## Editorial rules (non-negotiable)

- No invented first-hand experiences, testimonials, reviews, statistics, ratings or author credentials. No fake Person authors: the default author is the "Sahara Guides Editorial Team" (`src/lib/site.js`).
- Time-sensitive facts (entry rules, advisories, flights, timetables) must cite an official source in `sources` and update `verifiedAt`. Never present an unconfirmed flight route as fact.
- Driving times are typical times without stops; keep them realistic and consistent with `src/data/routes.js`.
- Western Sahara/Dakhla: describe neutrally ("disputed Western Sahara region administered by Morocco") and point readers to their government's advice. The map draws coastlines only, no land borders.
- Structured data must match visible content. No AggregateRating/Review markup.

## Code conventions

- Use `buildMetadata()` from `src/lib/seo.js` for every page's metadata, and `JsonLd` for schema.
- Images: register photos in `src/data/images.js` (with width/height/alt/caption). Keep sources ≤ 2000px; strip EXIF (GPS!) before committing: `convert in.jpg -auto-orient -strip -resize '2000x2000>' -quality 78 out.jpg`.
- Logo: `src/components/Logo.jsx` uses `public/brand/` (emblem.png, wordmark.png, wordmark-light.png for dark backgrounds, sahara-guides-logo.png full lockup for schema/social). Favicons are `src/app/icon.png` and `apple-icon.png` (emblem on cream).
- Design tokens live in `tailwind.config.js` (`paper`, `sand`, `ink`, `clay`, `majorelle`, `oasis`, `night`); reusable classes in `src/app/globals.css`. Use `clay-600+` for text on light backgrounds (AA contrast).
- Keep JavaScript minimal: the header mega menu is CSS-driven, the map is a zero-JS SVG, FAQs use `<details>`. Client components only where interaction requires it (search, planner, forms, share, consent).
- Analytics that set cookies (GA4, Clarity) must stay behind consent (`src/components/Analytics.jsx`).
- Adding a static page: also add it to `STATIC_PAGES` in `src/lib/routes.js` (sitemap, search index, link checker).
- Adding a destination: edit `src/data/destinations.js` (coordinates feed the map; use `labelSide` to avoid label collisions). Set `guide` once a full article exists.
