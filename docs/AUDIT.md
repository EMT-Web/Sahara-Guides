# Pre-launch audit: 22 November 2026

Tested against the **production build** (`next build && next start`) on a local server, not yet on Vercel. Results that depend on hosting (TTFB, CDN caching, Vercel Analytics) must be re-checked on the first preview deployment.

## Summary

| Area | Result |
|---|---|
| Build | ✅ 43 routes generated, no errors |
| Lint | ✅ No ESLint warnings or errors |
| Content QA (`npm run check:content`) | ✅ 9 articles, 0 errors, 0 warnings |
| Crawl (all internal links from `/`) | ✅ 43 HTML pages, all 200; no broken internal links |
| Metadata | ✅ Every page has a unique title, description, canonical and OG image (contact-form query variants canonicalise to `/contact`) |
| Headings | ✅ Exactly one H1 per page |
| Images | ✅ All `<img>` have alt text; all photos have explicit dimensions (CLS 0 on every tested page) |
| Structured data | ✅ All JSON-LD blocks parse; types used: Organization, WebSite (+SearchAction), Article, BreadcrumbList, FAQPage, CollectionPage. No ratings or reviews. |
| Indexing files | ✅ `/sitemap.xml` (index), `/sitemaps/pages.xml`, `/sitemaps/articles.xml` (with image tags), `/rss.xml`, `/robots.txt`, `/llms.txt`, IndexNow key file: all 200 with correct content types |
| Redirects | ✅ `/plan` → `/plan-your-trip`, `/feed` → `/rss.xml` (308) |
| 404 | ✅ Custom page, real 404 status |
| Search noindex | ✅ `/search` is `noindex, follow`; `/search?` is disallowed in robots.txt |
| Non-canonical hosts | ✅ robots.txt returns `Disallow: /` and `*.vercel.app` sends `X-Robots-Tag: noindex` unless the host is saharaguides.com |

## Functional tests (Playwright, Chromium)

| Test | Result |
|---|---|
| Search "merzouga" returns results; "ramadan" ranks the best-time guide first; nonsense query shows the empty state | ✅ |
| Homepage search form submits to `/search?q=…` | ✅ |
| Planner: Fes + 7 days → "Fes to Marrakech via the Sahara" | ✅ |
| Planner: Marrakech + 2 days and Tangier + 2 days → "no realistic route" (never suggests impossible trips) | ✅ (bug found and fixed: routes starting in another city now require an extra day) |
| Planner: Marrakech + 3 days → fast Sahara loop, with a warning about the 10-hour return | ✅ |
| Desktop mega menu opens on hover and closes after a link is clicked | ✅ |
| Mobile menu opens, expands a section, navigates and closes | ✅ |
| Table-of-contents links jump to sections | ✅ |
| Newsletter and contact forms show a clear message when email is not configured (503), and the contact form pre-fills its topic from the URL | ✅ |
| No horizontal overflow at 390 px on home, destinations, planner, article and search pages | ✅ |
| No JavaScript errors | ✅ (except the Vercel Analytics script, which 404s outside Vercel) |

## Lighthouse (mobile, simulated slow 4G, local server, no CDN)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 90 | 100 | 96* | 100 | 3.6 s | 0 | 30 ms |
| `/travel-tips/best-time-to-visit-morocco` | 94 | 100 | 96* | 100 | 3.0 s | 0 | 100 ms |
| `/destinations` | 91 | 100 | 96* | 100 | 3.3 s | 0 | 130 ms |
| `/itinerary-planner` | 95 | 98→100† | 96* | 100 | 2.9 s | 0 | 60 ms |

\* The only best-practices failure is the console 404 for `/_vercel/insights/script.js`, which exists only on Vercel.
† Heading-order issue fixed after the run (added a visually hidden H2).

Performance work done: removed the Newsreader optical-size axis (preloaded fonts fell from ~320 KB to ~170 KB, raising home performance from 78 to 90), static generation for every page, AVIF/WebP via the Next image optimiser, a zero-JavaScript SVG map, a CSS-only mega menu, about 87 kB of shared JavaScript, and long-lived caching for `/images`.

Recheck on Vercel: LCP should improve with CDN TTFB. Target < 2.5 s on real-user data (Vercel Speed Insights / Search Console Core Web Vitals).

## External links

29 external source links were checked. 20 returned 200. The UK Met Office climate page returned 404 and was **replaced** with Japan Meteorological Agency climate normals. The rest could not be checked automatically from this server and need a manual check in a browser:

- travel.state.gov, whc.unesco.org (5 pages) and halaltrip.com returned 403 (they block automated requests).
- oncf.ma, supratours.ma and smartraveller.gov.au timed out from this network.

## Editorial review

- 9 cornerstone guides, about 19,500 words, each with a short-answer box, facts table, FAQs, sources and a verification date.
- Facts checked in this session: US advisory (Level 2, terrorism), Canada advisory and regional exceptions (updated 26 May 2026), UK entry rules (90 days visa-free; passport valid 3 months after arrival; 100,000 MAD declaration), Ramadan 2027 forecast dates, Al Boraq journey time and the status of the Marrakech high-speed extension, and Errachidia/Ouarzazate flight operators (presented as "verify with the airline").
- Not verifiable here and deliberately left general: exact flight frequencies, entry fees and prices, speed limits by road type, the current status of individual sites (e.g. library access at al-Qarawiyyin). Add these only with a dated official source.

## Known gaps before launch

1. **Photography for Marrakech and Fes.** The library is strong on the south and the Sahara but has no city photographs, so these guides use a pattern placeholder. Add original photos.
2. **Named contributors.** Guides are credited to the editorial team. Add real authors in Sanity when ready.
3. **Commercial disclosure.** Confirm whether Sahara Guides is connected to any tour company; if so, update `/affiliate-disclosure`.
4. **Accounts and DNS** (see `SETUP.md`): Vercel, Sanity project, Resend, Search Console, Bing, GA4/Clarity. None are connected or verified yet.
5. **Keyword volumes.** Semrush had no API units, so priorities are intent-based. Pull volumes from Search Console after 4–8 weeks of data.
6. Validate the live URLs in Google's Rich Results Test and Schema.org validator after deployment (local URLs cannot be tested by those tools).
