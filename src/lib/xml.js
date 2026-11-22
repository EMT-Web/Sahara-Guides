export const xmlEscape = (s) =>
  String(s ?? '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

export function xmlResponse(body, type = 'application/xml') {
  return new Response(body, {
    headers: { 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' },
  })
}
