'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { START_CITIES, suggestRoutes } from '@/data/routes'
import Icon from '@/components/Icons'
import { trackEvent } from '@/components/Analytics'

const STYLES = [
  { id: '', label: 'Any style' },
  { id: 'classic', label: 'Classic first trip' },
  { id: 'adventure', label: 'Desert & adventure' },
  { id: 'culture', label: 'Cities & culture' },
  { id: 'relaxed', label: 'Relaxed pace' },
  { id: 'family', label: 'Family friendly' },
  { id: 'no-car', label: 'Without a car' },
]

const MODE_ICON = { road: 'car', '4x4': 'car', train: 'train' }

export default function ItineraryPlanner({ defaultStart = 'Marrakech', defaultDays = 7 }) {
  const [start, setStart] = useState(defaultStart)
  const [days, setDays] = useState(defaultDays)
  const [style, setStyle] = useState('')

  const results = useMemo(() => suggestRoutes({ start, days, style }), [start, days, style])

  return (
    <div className="grid gap-8 lg:grid-cols-[22rem_1fr]">
      <form
        className="card h-fit space-y-5 p-6 lg:sticky lg:top-28"
        onSubmit={(e) => e.preventDefault()}
        onChange={() => trackEvent('planner_change', { start, days, style })}
      >
        <div>
          <label htmlFor="p-start" className="field-label">Starting city</label>
          <select id="p-start" className="field" value={start} onChange={(e) => setStart(e.target.value)}>
            {START_CITIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="p-days" className="field-label">
            Days available: <strong className="text-ink-900">{days}</strong>
          </label>
          <input id="p-days" type="range" min="2" max="21" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-clay-600" />
          <div className="mt-1 flex justify-between text-xs text-ink-500"><span>2</span><span>21</span></div>
        </div>
        <div>
          <label htmlFor="p-style" className="field-label">Travel style</label>
          <select id="p-style" className="field" value={style} onChange={(e) => setStyle(e.target.value)}>
            {STYLES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <p className="text-xs leading-relaxed text-ink-500">
          Driving times are typical times without stops. Mountain roads, weather and photo stops add more. We never suggest a route that needs more days than you have.
        </p>
      </form>

      <div aria-live="polite">
        {results.length === 0 ? (
          <div className="card p-8">
            <h3 className="font-serif text-2xl">No realistic route fits {days} days from {start}</h3>
            <p className="mt-3 text-ink-600">
              With very little time, base yourself in one city and take day trips, or add a day or two. The Sahara in particular needs at least three days from Marrakech or Fes, or two if you fly to Errachidia.
            </p>
          </div>
        ) : (
          <ol className="space-y-8">
            {results.map(({ route: r, spare }, idx) => (
              <li key={r.id} className="card overflow-hidden">
                <div className="border-b border-sand-200 p-6 sm:p-8">
                  <p className="eyebrow">{idx === 0 ? 'Best match' : 'Also consider'} · {r.days} days · {r.start} to {r.end}</p>
                  <h3 className="mt-2 font-serif text-2xl text-ink-900 sm:text-3xl">{r.title}</h3>
                  <p className="mt-3 text-ink-600">{r.summary}</p>
                  {r.start !== start ? (
                    <p className="mt-3 text-sm text-majorelle-700">
                      This route starts in {r.start}. {r.end === start ? `It ends in ${start}, so you could run it in reverse.` : `Allow time to get from ${start} to ${r.start}.`}
                    </p>
                  ) : null}
                  {spare > 0 ? (
                    <p className="mt-3 text-sm text-oasis-700">
                      You have {spare} spare {spare === 1 ? 'day' : 'days'}: add a night in the desert, the Dades Valley or your final city rather than more driving.
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Overnight stops</p>
                    <ul className="mt-3 space-y-2">
                      {r.stops.map((s) => (
                        <li key={s.place} className="flex justify-between gap-4 border-b border-dashed border-sand-200 pb-2 text-[0.95rem]">
                          <span className="text-ink-800">{s.place}</span>
                          <span className="shrink-0 text-ink-500">{s.nights} {s.nights === 1 ? 'night' : 'nights'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">Legs</p>
                    <ul className="mt-3 space-y-3">
                      {r.legs.map((l) => (
                        <li key={l.from + l.to} className="flex gap-3 text-[0.95rem]">
                          <Icon name={MODE_ICON[l.mode] || 'car'} className="mt-0.5 h-4 w-4 shrink-0 text-clay-600" />
                          <span>
                            <span className="text-ink-800">{l.from} → {l.to}</span>
                            <span className="block text-sm text-ink-500">
                              about {l.km} km · {l.hours}{l.mode === '4x4' ? ' (off-road)' : ''}
                            </span>
                            {l.note ? <span className="block text-sm text-ink-500">{l.note}</span> : null}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {r.warning ? (
                  <p className="mx-6 mb-6 rounded-xl bg-clay-50 px-4 py-3 text-sm text-clay-800 sm:mx-8">
                    <strong>Be realistic:</strong> {r.warning}
                  </p>
                ) : null}
                {r.guide ? (
                  <div className="border-t border-sand-200 px-6 py-4 sm:px-8">
                    <Link href={r.guide} className="link-arrow">
                      Read the related guide <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
