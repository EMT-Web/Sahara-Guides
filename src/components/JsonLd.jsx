// Server-rendered JSON-LD. `<` is escaped so content can never close the tag.
export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean)
  if (!items.length) return null
  return items.map((d, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(d).replace(/</g, '\\u003c') }}
    />
  ))
}
