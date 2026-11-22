import Link from 'next/link'
import { DESTINATIONS } from '@/data/destinations'

// A lightweight, zero-JavaScript SVG map. It draws the Atlantic and
// Mediterranean coastlines and the destinations, without land borders.
// Projection: equirectangular, corrected for latitude ~32.5°N.
const W = 1000
const LON0 = -10.3
const LON1 = -1.0
const LAT0 = 36.0
const LAT1 = 29.3
const H = Math.round((W * (LAT0 - LAT1)) / ((LON1 - LON0) * Math.cos((32.5 * Math.PI) / 180)))

const x = (lon) => ((lon - LON0) / (LON1 - LON0)) * W
const y = (lat) => ((LAT0 - lat) / (LAT0 - LAT1)) * H

// Approximate coastline points, east (Algerian border coast) to south-west.
const COAST = [
  [35.1, -1.0], [35.09, -2.21], [35.17, -2.93], [35.3, -3.4], [35.25, -3.93], [35.2, -4.3],
  [35.35, -4.75], [35.45, -5.1], [35.68, -5.32], [35.89, -5.31], [35.85, -5.55], [35.78, -5.81],
  [35.79, -5.92], [35.47, -6.03], [35.19, -6.15], [34.75, -6.35], [34.26, -6.58], [34.02, -6.84],
  [33.69, -7.39], [33.6, -7.62], [33.25, -8.5], [32.8, -8.85], [32.3, -9.24], [31.85, -9.6],
  [31.51, -9.77], [31.0, -9.83], [30.63, -9.89], [30.42, -9.6], [30.0, -9.65], [29.7, -9.9],
  [29.38, -10.17], [29.3, -10.25],
]

const coastPath = COAST.map(([la, lo], i) => `${i ? 'L' : 'M'}${x(lo).toFixed(1)} ${y(la).toFixed(1)}`).join(' ')
const seaPath = `${coastPath} L${x(-10.3)} ${y(29.3)} L0 0 L${W} 0 L${W} ${y(35.1).toFixed(1)} Z`

const RANGES = [
  { label: 'RIF', lat: 35.0, lon: -4.4, rotate: -8 },
  { label: 'MIDDLE ATLAS', lat: 33.3, lon: -5.0, rotate: -35 },
  { label: 'HIGH ATLAS', lat: 31.75, lon: -6.3, rotate: -22 },
  { label: 'ANTI-ATLAS', lat: 30.0, lon: -8.0, rotate: -18 },
]

export default function MoroccoMap({ highlight }) {
  const onMap = DESTINATIONS.filter((d) => !d.offMap)
  const dakhla = DESTINATIONS.find((d) => d.offMap)
  return (
    <figure className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Map of Morocco’s main travel destinations</title>
        <desc id="map-desc">
          Destinations plotted by location, from Tangier on the Strait of Gibraltar to the Sahara dunes of Erg Chebbi and Erg Chigaga. Each point links to its guide or overview.
        </desc>
        <rect width={W} height={H} fill="#F4EDE2" />
        <path d={seaPath} fill="#D8DEF2" />
        <path d={coastPath} fill="none" stroke="#3A5BB8" strokeWidth="1.5" strokeOpacity="0.6" />
        {/* Dune seas */}
        {[[31.15, -3.98, 22, 52], [29.84, -6.25, 48, 26]].map(([la, lo, rx, ry]) => (
          <ellipse key={lo} cx={x(lo)} cy={y(la)} rx={rx} ry={ry} fill="#E2A36F" opacity="0.45" />
        ))}
        <text x={x(-9.2)} y={y(33.2)} className="fill-majorelle-700 font-serif italic" fontSize="22" opacity="0.7">Atlantic Ocean</text>
        <text x={x(-4.6)} y={y(35.75)} className="fill-majorelle-700 font-serif italic" fontSize="18" opacity="0.7">Mediterranean Sea</text>
        {RANGES.map((r) => (
          <text
            key={r.label}
            x={x(r.lon)}
            y={y(r.lat)}
            transform={`rotate(${r.rotate} ${x(r.lon)} ${y(r.lat)})`}
            fontSize="13"
            letterSpacing="6"
            className="fill-sand-500 font-sans"
            textAnchor="middle"
          >
            {r.label}
          </text>
        ))}
        {onMap.map((d) => {
          const href = d.guide || `/destinations#${d.slug}`
          const cx = x(d.lon)
          const cy = y(d.lat)
          const active = highlight === d.slug
          const left = d.labelSide ? d.labelSide === 'left' : d.lon > -4.5
          return (
            <Link key={d.slug} href={href} className="map-link" aria-label={`${d.name}: ${d.guide ? 'read the guide' : 'overview'}`}>
              <circle className="map-pin" cx={cx} cy={cy} r={d.guide ? 7 : 5} fill={d.guide ? '#A84E22' : '#FBF8F3'} stroke="#A84E22" strokeWidth="2.5" />
              {active ? <circle cx={cx} cy={cy} r="14" fill="none" stroke="#A84E22" strokeWidth="1.5" /> : null}
              <text
                className="map-label font-sans"
                x={left ? cx - 11 : cx + 11}
                y={cy + 4.5}
                fontSize="15"
                textAnchor={left ? 'end' : 'start'}
                fill="#2A251F"
                stroke="#F4EDE2"
                strokeWidth="4"
                paintOrder="stroke"
              >
                {d.name}
              </text>
            </Link>
          )
        })}
        {dakhla ? (
          <Link href={`/destinations#${dakhla.slug}`} className="map-link">
            <text x={x(-10.1)} y={H - 18} fontSize="14" className="map-label fill-ink-700 font-sans">
              ↓ Dakhla: more than 1,100 km south of Agadir by road
            </text>
          </Link>
        ) : null}
        {/* Scale bar: 100 km */}
        <g transform={`translate(${W - 190} ${H - 30})`}>
          <line x1="0" y1="0" x2={(100 / (111.32 * Math.cos((32.5 * Math.PI) / 180) * (LON1 - LON0))) * W} y2="0" stroke="#3D372F" strokeWidth="2" />
          <text x="0" y="-8" fontSize="12" className="fill-ink-700 font-sans">100 km</text>
        </g>
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-600">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-clay-600" /> Full guide</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-clay-600 bg-paper" /> Overview</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-5 rounded-full bg-[#E2A36F]/60" /> Dune seas</span>
        <span>Simplified map for orientation; not to be used for navigation.</span>
      </figcaption>
    </figure>
  )
}
