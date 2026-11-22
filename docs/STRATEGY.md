# Sahara Guides: strategy, architecture and editorial plan

Prepared November 2026. This document records the research and decisions behind the first build of saharaguides.com. Treat it as a living plan; update it when priorities change.

---

## 1. Competitive research

### Method

Live Google results (US index) were reviewed in November 2026 for representative queries in each cluster: "best time to visit Morocco", "Morocco itinerary 7 days", "is Morocco safe to visit", "how to get to Merzouga from Marrakech", "Erg Chebbi vs Erg Chigaga", and "things to know before visiting Morocco". Pages ranking on page one were read and assessed for depth, accuracy, freshness, structure and usefulness. Search-volume tools (Semrush) were unavailable because the connected account had no API units left, so the keyword map below is intent-based; add volumes from Google Search Console and Keyword Planner once data is available.

### Who ranks, and what they do well

| Type | Examples seen on page one | Strengths | Weaknesses we can exploit |
|---|---|---|---|
| Legacy guidebook brands | Lonely Planet, Rough Guides, Fodor's, National Geographic | Domain authority, brand trust, polished editing, broad coverage | Generic advice repeated across countries; few specifics on driving times, camps, flights; updates lag; little southern Morocco depth |
| Tour operators with blogs | Intrepid, kimkim, On The Go Tours, WeRoad, Journey Beyond Travel | Itinerary formats, clear CTAs, local partners | Content is a funnel for their products; itineraries often compressed to sell a tour; commercial bias rarely disclosed |
| Independent travel bloggers | Nomadic Matt, The Broke Backpacker, Big World Small Pockets, Travel Addicts, Away with the Steiners | First-person voice, practical tips, strong internal linking | Single-trip snapshots; facts age quickly; little verification of advisories, flights or schedules |
| Aggregators | Rome2rio | Dominate "how to get from X to Y" queries | Machine-generated, often wrong for southern Morocco (e.g. bus routes via Meknes, outdated flights), no context |
| Local Morocco agencies | Many "Marrakech desert trips" style sites | Local knowledge, Sahara focus | Thin, keyword-stuffed pages, poor English, unclear trust signals, heavy CTAs |

### What is missing across the SERPs

1. **Honest logistics.** Few pages give realistic door-to-door times for the Sahara, or warn that a three-day Marrakech–Merzouga–Marrakech trip ends with a ~10-hour day.
2. **Verification.** Advisories, entry rules and flight routes are rarely sourced or dated. Rome2rio-style flight claims are repeated without checking.
3. **Southern Morocco depth.** The Sahara, Draa Valley, Dades and Todra are covered as stops on a tour, not as destinations with their own guides.
4. **Neutral comparison.** Erg Chebbi vs Erg Chigaga content is mostly written by operators selling one of them.
5. **Structured answers.** Most pages bury the answer. Few use short-answer boxes, comparison tables or consistent FAQ sections, which help readers and answer engines alike.

### Our differentiation

- **"Realistic, not wishful"**: every route shows distance and driving time; the planner never proposes a route that needs more days than the reader has.
- **Visible verification**: "Facts verified" dates plus source lists on every time-sensitive guide.
- **Sahara authority**: the deepest, most neutral desert content on the web, backed by southern Morocco photography from our own library.
- **Editorial independence** stated plainly, with any commercial relationship disclosed.

---

## 2. Positioning

**Brand:** Sahara Guides. **Line:** "Your independent guide to discovering Morocco."

Tone: calm, expert, specific. Write like a well-informed friend who lives in Morocco: warm, direct about trade-offs, never breathless. No invented anecdotes, statistics, testimonials or credentials.

---

## 3. Information architecture

```
/                                   Home
/destinations                       Hub: map + 23 destination overviews by region
/destinations/<place>               Destination guides (Marrakech, Fes live)
/sahara-desert                      Hub
/sahara-desert/<topic>              Sahara guides
/morocco-itineraries                Hub + planner CTA
/morocco-itineraries/<n>-days-…     Itineraries
/travel-tips                        Hub
/travel-tips/<topic>                Practical guides
/transportation                     Hub ("Getting Around")
/transportation/<topic>             Transport guides
/culture-food                       Hub
/culture-food/<topic>               Culture & food guides
/things-to-do                       Curated experiences hub linking to guides
/plan-your-trip                     Planning hub, 5-step path, checklist
/itinerary-planner                  Interactive route planner (with crawlable route list)
/search                             Site search (noindex)
/about /contributors /editorial-policy /fact-checking-policy /corrections-policy
/contact /privacy-policy /cookie-policy /affiliate-disclosure
/sitemap.xml (index) → /sitemaps/pages.xml, /sitemaps/articles.xml (with images)
/rss.xml  /robots.txt  /llms.txt  /search-index.json
```

Rules: one section per article; URLs never change after publishing (add a redirect in Sanity if they must); no thin pages, so destinations without a full guide live as overviews on the hub (`/destinations#slug`) until a full guide is ready.

---

## 4. Design direction

- **Editorial, photo-led, restrained.** Newsreader (variable serif with optical sizes) for headlines and Inter for interface text, on a warm paper background.
- **Palette from the landscape:** clay/terracotta (dunes, kasbahs), Majorelle blue used sparingly (links, focus, sea), oasis green (verification, tips), deep night brown for immersive sections.
- **Moroccan detail without pastiche:** an eight-pointed khatam star mark and a subtle zellige line pattern, used for empty image states and dark panels.
- **Reading experience:** sticky table of contents, "short answer" box, "at a glance" facts, callouts, scrollable tables, FAQs, sources, author box, related reading.
- **Performance first:** static generation, next/image (AVIF/WebP), zero-JS map, CSS-only mega menu, about 87 kB shared JavaScript.

---

## 5. CMS decision: Sanity (standalone Studio) + Markdown

**Why Sanity:** hosted, no servers to maintain, excellent image pipeline and CDN, drafts and publishing, a free tier that covers this site, role-based access, and the team already knows it from their other sites. The Studio is a separate app in `/studio`, deployed to `saharaguides.sanity.studio`, so the public site ships no CMS code.

**How it works:**
- Launch guides live as Markdown in `content/articles` (versioned, reviewable).
- `npm run import:sanity` copies them into Sanity; a Sanity article with the same section and slug then **replaces** the file version automatically.
- Editors write the body in Markdown inside the Studio (same syntax: `##` headings build the TOC; `> [!TIP]` callouts; pipe tables).
- **Scheduling:** set `publishedAt` in the future; pages revalidate hourly, so the article appears on its date.
- **Redirects:** `Redirect` documents in the Studio, applied at the next deploy.
- **Review workflow:** the Studio lists articles whose facts were last verified over six months ago.

---

## 6. Topical authority map

| Cluster (pillar) | Supporting topics | Status |
|---|---|---|
| **Sahara Desert**: How to get to the Sahara | Erg Chebbi vs Chigaga ✔ · Merzouga guide · Desert camps explained · Erg Chigaga guide · Best season for the desert · Sahara packing list · Camel rides & animal welfare · Flights to Errachidia/Ouarzazate · Desert with kids · Nomadic & Gnawa culture | 2 live |
| **When to go**: Best time to visit ✔ | Morocco in winter/summer · Ramadan travel · Festivals calendar · Weather by city | 1 live |
| **Safety & essentials**: Is Morocco safe ✔ | Entry requirements · Solo women · Scams · Health & vaccinations · What to wear · Etiquette | 1 live |
| **Money**: Morocco travel costs | Currency & ATMs · Tipping · Bargaining | Planned |
| **Itineraries**: 7 days ✔ | 3/5/8/10/12/14/21 days · From Casablanca/Fes/Tangier/Agadir/Errachidia/Ouarzazate · Family · Couples · No-car | 1 live + planner |
| **Getting around**: Getting around ✔ | Train guide · Buses · Driving · Private drivers · Airports · Domestic flights · Ferries | 1 live |
| **Destinations**: hub + Marrakech ✔ · Fes ✔ | Chefchaouen · Essaouira · Merzouga · Ait Ben Haddou · Dades & Todra · Imlil/Toubkal · Rabat · Tangier · Casablanca · Agadir · Meknes & Volubilis · Ouarzazate · Zagora · Taroudant · Dakhla | 2 live, 21 overviews |
| **Culture & food**: Food guide ✔ | Mint tea · Hammams · Amazigh culture · Gnawa music · Crafts & zellige · Architecture · Weddings & festivals | 1 live |

**Cannibalisation rules:** one primary query per URL (see `content-plan.csv`). "Marrakech to Merzouga" belongs to *How to get to the Sahara*, not to the 7-day itinerary; "Erg Chebbi" informational queries belong to the comparison until the Merzouga guide exists, then the comparison targets only "vs" queries.

---

## 7. Six-month publishing plan

A sustainable pace for a small team is **4–5 researched guides a month**, plus a review of existing guides. The full list with keywords, intent and URLs is in [`content-plan.csv`](./content-plan.csv).

| Month | Focus |
|---|---|
| Dec 2026 | Merzouga guide, Desert camps explained, What to wear, Packing list |
| Jan 2027 | Chefchaouen, 10 days in Morocco, Travel costs, Money, Ramadan guide (publish before 8 Feb) |
| Feb 2027 | Entry requirements, Train guide, Driving in Morocco, Essaouira |
| Mar 2027 | Ait Ben Haddou, Dades & Todra, Imlil & Toubkal, 14 days |
| Apr 2027 | Morocco with kids, Erg Chigaga, Tipping; first six-month review of launch guides |
| May 2027 | Hammams, Mint tea, Amazigh culture, Tangier |

By mid-2027 the library reaches about 35 guides: a credible, interlinked authority on Morocco and the Sahara.

---

## 8. AI search and answer engines

What helps (and is implemented): crawlable server-rendered HTML; clear H1/H2 structure; a short-answer box at the top of each guide; comparison tables; FAQs that mirror real questions; named, dated sources; consistent Organization/WebSite/Article/BreadcrumbList/FAQPage schema that matches visible content; robots.txt that allows all crawlers; fast pages.

`/llms.txt` is provided as a cheap, optional index of key pages. It is an informal proposal, not a standard: no search engine has said it uses it for ranking, and it does not guarantee citations. The fundamentals above matter far more.
