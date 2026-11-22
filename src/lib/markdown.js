import { Marked } from 'marked'
import GithubSlugger from 'github-slugger'
import { images } from '@/data/images'

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const decode = (s) =>
  String(s)
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
const stripTags = (s) => decode(String(s).replace(/<[^>]+>/g, ''))

// Build a responsive <img> that goes through Next's image optimizer, so
// article images get AVIF/WebP and per-device sizes like next/image.
function responsiveImg({ src, alt, width, height, sizes = '(min-width: 1024px) 720px, 100vw', eager = false }) {
  const widths = [640, 828, 1080, 1280, 1600]
  const isLocal = src.startsWith('/')
  const srcset = isLocal
    ? widths.map((w) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75 ${w}w`).join(', ')
    : ''
  const fallback = isLocal ? `/_next/image?url=${encodeURIComponent(src)}&w=1080&q=75` : src
  return `<img src="${fallback}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ''} alt="${escapeHtml(alt)}"${
    width ? ` width="${width}" height="${height}"` : ''
  } loading="${eager ? 'eager' : 'lazy'}" decoding="async" />`
}

const ALERTS = {
  TIP: { label: 'Tip', cls: 'callout-tip' },
  NOTE: { label: 'Good to know', cls: 'callout-note' },
  WARNING: { label: 'Watch out', cls: 'callout-warning' },
  IMPORTANT: { label: 'Important', cls: 'callout-important' },
}

/**
 * Render article Markdown to HTML.
 * Supports GitHub-flavoured Markdown plus:
 *  - `> [!TIP]` / `[!NOTE]` / `[!WARNING]` / `[!IMPORTANT]` callouts
 *  - `![alt](image-key "caption")` where image-key is a key in data/images.js
 *  - external links open safely and are marked rel="noopener"
 * Returns { html, headings } where headings feed the table of contents.
 */
export function renderMarkdown(markdown) {
  const slugger = new GithubSlugger()
  const headings = []
  const marked = new Marked({ gfm: true })

  marked.use({
    renderer: {
      heading(text, depth, raw) {
        const id = slugger.slug(stripTags(raw).replace(/\{#.+\}$/, '').trim())
        if (depth === 2 || depth === 3) headings.push({ id, text: stripTags(text), depth })
        return `<h${depth} id="${id}"><a class="heading-anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${text}</h${depth}>\n`
      },
      table(header, body) {
        return `<div class="table-wrap" role="region" aria-label="Table" tabindex="0"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`
      },
      image(href, title, text) {
        const reg = images[href]
        if (reg) {
          const caption = title || reg.caption
          return `<figure class="article-figure">${responsiveImg({ src: reg.src, alt: text && text !== href ? text : reg.alt, width: reg.width, height: reg.height })}${
            caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''
          }</figure>`
        }
        return `<figure class="article-figure">${responsiveImg({ src: href, alt: text })}${
          title ? `<figcaption>${escapeHtml(title)}</figcaption>` : ''
        }</figure>`
      },
      link(href, title, text) {
        const external = /^https?:\/\//.test(href) && !href.includes('saharaguides.com')
        const t = title ? ` title="${escapeHtml(title)}"` : ''
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
          : `<a href="${href}"${t}>${text}</a>`
      },
      blockquote(quote) {
        const m = quote.match(/^<p>\[!(TIP|NOTE|WARNING|IMPORTANT)\]\s*/)
        if (m) {
          const a = ALERTS[m[1]]
          const inner = quote.replace(m[0], '<p>')
          return `<aside class="callout ${a.cls}"><p class="callout-label">${a.label}</p>${inner}</aside>\n`
        }
        return `<blockquote>${quote}</blockquote>\n`
      },
    },
  })

  const html = marked.parse(markdown || '')
  return { html, headings }
}

export function countWords(markdown) {
  return String(markdown || '')
    .replace(/[#>*_`|\-\[\]()!]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

export function readingTime(markdown) {
  return Math.max(1, Math.round(countWords(markdown) / 230))
}

export { responsiveImg }
