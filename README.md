# Sahara Guides

Independent Morocco travel guides: **https://saharaguides.com**

Next.js 14 (App Router, JavaScript) · Tailwind CSS · Sanity CMS (standalone Studio) · Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional: the site runs without any env vars
npm run dev                  # http://localhost:5000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server on port 5000 |
| `npm run build && npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run check:content` | Content QA: frontmatter, lengths, duplicates, images, internal links |
| `npm run import:sanity` | Copy Markdown guides into Sanity (needs `SANITY_API_TOKEN`) |
| `npm run indexnow` | Notify Bing/IndexNow of every URL in the live sitemap (after deploys) |

The Sanity Studio lives in `studio/` (`cd studio && npm install && npm run dev`).

## Where things are

- `content/articles/*.md`: launch guides (YAML frontmatter + Markdown body)
- `src/app`: routes. `[category]/[slug]` renders every article; `[category]` renders section hubs
- `src/lib`: content loading (`content.js`), Markdown rendering (`markdown.js`), SEO and JSON-LD (`seo.js`), site config and navigation (`site.js`), sections (`taxonomy.js`)
- `src/data`: photo registry, destinations (map + hub), route library (planner), things-to-do list, redirects
- `docs/`: strategy, content plan (CSV), setup guide and audit

See `docs/SETUP.md` to launch, and `CLAUDE.md` for conventions.
