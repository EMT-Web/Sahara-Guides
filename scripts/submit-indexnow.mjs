// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver…). Run after a deploy.
//   node scripts/submit-indexnow.mjs            → every URL in the live sitemap
//   node scripts/submit-indexnow.mjs /path ...  → only these paths
//   add --dry-run to preview
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://saharaguides.com').replace(/\/$/, '')
const KEY = '82a8345a88392b8ee8d175bb075a4092' // public/82a8345a88392b8ee8d175bb075a4092.txt must stay deployed
const args = process.argv.slice(2)
const dry = args.includes('--dry-run')
const paths = args.filter((a) => a.startsWith('/'))

async function sitemapUrls() {
  const index = await (await fetch(`${SITE}/sitemap.xml`)).text()
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  const urls = []
  for (const m of maps) {
    const xml = await (await fetch(m)).text()
    urls.push(...[...xml.matchAll(/<url><loc>([^<]+)<\/loc>/g)].map((x) => x[1]))
  }
  return urls
}

const urlList = paths.length ? paths.map((p) => SITE + p) : await sitemapUrls()
console.log(`${urlList.length} URLs`)
if (dry) {
  console.log(urlList.join('\n'))
  process.exit(0)
}
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})
console.log('IndexNow response:', res.status, res.statusText)
