// Route library for the itinerary planner.
// Each leg gives an approximate distance and a typical driving (or train) time
// WITHOUT stops. Real days are longer: add photo stops, lunch and slow
// mountain sections. Figures were checked against road distances in
// November 2026 and rounded; they are planning estimates, not guarantees.

export const START_CITIES = ['Marrakech', 'Casablanca', 'Fes', 'Tangier', 'Agadir', 'Errachidia', 'Ouarzazate']

export const ROUTES = [
  {
    id: 'mkch-sahara-3',
    title: 'Marrakech to the Sahara and back (the fast version)',
    start: 'Marrakech', end: 'Marrakech', days: 3, minDays: 3, maxDays: 3,
    styles: ['adventure'],
    summary: 'The shortest realistic Erg Chebbi trip from Marrakech. It works, but you will spend most of the three days in a vehicle.',
    stops: [
      { place: 'Dades Valley', nights: 1 },
      { place: 'Erg Chebbi desert camp', nights: 1 },
    ],
    legs: [
      { from: 'Marrakech', to: 'Dades Valley', km: 330, hours: '6.5–7 h', mode: 'road', note: 'Over the Tizi n’Tichka pass, with a stop at Ait Ben Haddou.' },
      { from: 'Dades Valley', to: 'Merzouga', km: 260, hours: '4.5 h', mode: 'road', note: 'Via the Todra Gorge; camel ride to camp in the late afternoon.' },
      { from: 'Merzouga', to: 'Marrakech', km: 560, hours: '9.5–10 h', mode: 'road', note: 'A very long day. Only choose this if you cannot add a fourth day.' },
    ],
    warning: 'Day three is roughly 10 hours of driving. If you can, take four days, or fly out of Errachidia or end the trip in Fes instead.',
    guide: '/sahara-desert/how-to-get-to-the-sahara-desert',
  },
  {
    id: 'ozz-chigaga-3',
    title: 'Ouarzazate to Erg Chigaga loop',
    start: 'Ouarzazate', end: 'Ouarzazate', days: 3, minDays: 3, maxDays: 4,
    styles: ['adventure', 'remote'],
    summary: 'A loop to Morocco’s most remote dune sea through the Draa Valley, returning across the desert to Foum Zguid.',
    stops: [
      { place: 'Erg Chigaga desert camp', nights: 2 },
    ],
    legs: [
      { from: 'Ouarzazate', to: 'M’Hamid', km: 260, hours: '4.5 h', mode: 'road', note: 'Through the Draa Valley palm groves via Agdz and Zagora.' },
      { from: 'M’Hamid', to: 'Erg Chigaga', km: 60, hours: '1.5–2.5 h', mode: '4x4', note: 'Off-road track; a 4x4 with an experienced driver is essential.' },
      { from: 'Erg Chigaga', to: 'Foum Zguid', km: 90, hours: '3 h', mode: '4x4', note: 'Across the dry lakebed of Iriqui.' },
      { from: 'Foum Zguid', to: 'Ouarzazate', km: 150, hours: '2.5 h', mode: 'road', note: 'Paved road via Tazenakht.' },
    ],
    guide: '/sahara-desert/erg-chebbi-vs-erg-chigaga',
  },
  {
    id: 'erh-merzouga-3',
    title: 'Fly to Errachidia for a short Merzouga trip',
    start: 'Errachidia', end: 'Errachidia', days: 3, minDays: 2, maxDays: 4,
    styles: ['relaxed', 'family'],
    summary: 'Errachidia airport is about two hours from Merzouga, which makes a short desert trip possible without the long drive from Marrakech or Fes.',
    stops: [
      { place: 'Merzouga hotel', nights: 1 },
      { place: 'Erg Chebbi desert camp', nights: 1 },
    ],
    legs: [
      { from: 'Errachidia', to: 'Merzouga', km: 130, hours: '2 h', mode: 'road', note: 'Through the Ziz Valley and Erfoud.' },
      { from: 'Merzouga', to: 'Errachidia', km: 130, hours: '2 h', mode: 'road', note: 'Check flight times before booking camp; flights are not daily on every route.' },
    ],
    guide: '/sahara-desert/how-to-get-to-the-sahara-desert',
  },
  {
    id: 'mkch-coast-mountains-5',
    title: 'Marrakech, the High Atlas and Essaouira (no desert)',
    start: 'Marrakech', end: 'Marrakech', days: 6, minDays: 5, maxDays: 7,
    styles: ['relaxed', 'family', 'couples'],
    summary: 'A low-driving trip that suits families and first-timers with limited time: city, mountains and sea, with no day longer than three hours on the road.',
    stops: [
      { place: 'Marrakech', nights: 2 },
      { place: 'Imlil, High Atlas', nights: 1 },
      { place: 'Essaouira', nights: 2 },
    ],
    legs: [
      { from: 'Marrakech', to: 'Imlil', km: 65, hours: '1.5 h', mode: 'road', note: 'The last section climbs a narrow mountain road.' },
      { from: 'Imlil', to: 'Essaouira', km: 250, hours: '4 h', mode: 'road', note: 'Back through Marrakech’s outskirts; break the drive for lunch.' },
      { from: 'Essaouira', to: 'Marrakech', km: 190, hours: '2.5–3 h', mode: 'road' },
    ],
    guide: '/destinations/marrakech',
  },
  {
    id: 'mkch-fes-7',
    title: 'Marrakech to Fes via the Sahara',
    start: 'Marrakech', end: 'Fes', days: 7, minDays: 6, maxDays: 8,
    styles: ['classic', 'couples', 'adventure'],
    summary: 'The classic one-way route across the High Atlas, through the valleys of the south to Erg Chebbi and north through the Middle Atlas to Fes.',
    stops: [
      { place: 'Marrakech', nights: 2 },
      { place: 'Ait Ben Haddou', nights: 1 },
      { place: 'Dades Valley', nights: 1 },
      { place: 'Erg Chebbi desert camp', nights: 1 },
      { place: 'Fes', nights: 1 },
    ],
    legs: [
      { from: 'Marrakech', to: 'Ait Ben Haddou', km: 185, hours: '3.5–4 h', mode: 'road', note: 'Tizi n’Tichka pass (2,260 m).' },
      { from: 'Ait Ben Haddou', to: 'Dades Valley', km: 150, hours: '3 h', mode: 'road', note: 'Via Ouarzazate and Skoura.' },
      { from: 'Dades Valley', to: 'Merzouga', km: 260, hours: '4.5 h', mode: 'road', note: 'Via Tinghir and the Todra Gorge.' },
      { from: 'Merzouga', to: 'Fes', km: 470, hours: '7.5–8 h', mode: 'road', note: 'Through the Ziz gorges, Midelt and Ifrane.' },
    ],
    guide: '/morocco-itineraries/7-days-in-morocco',
  },
  {
    id: 'fes-mkch-7',
    title: 'Fes to Marrakech via the Sahara',
    start: 'Fes', end: 'Marrakech', days: 7, minDays: 6, maxDays: 8,
    styles: ['classic', 'couples', 'adventure'],
    summary: 'The same classic route in reverse. Starting in Fes puts the long Middle Atlas drive on day three, when you are rested.',
    stops: [
      { place: 'Fes', nights: 2 },
      { place: 'Erg Chebbi (hotel, then camp)', nights: 2 },
      { place: 'Dades Valley', nights: 1 },
      { place: 'Marrakech', nights: 1 },
    ],
    legs: [
      { from: 'Fes', to: 'Merzouga', km: 470, hours: '7.5–8 h', mode: 'road', note: 'Cedar forests of the Middle Atlas, then the Ziz Valley.' },
      { from: 'Merzouga', to: 'Dades Valley', km: 260, hours: '4.5 h', mode: 'road' },
      { from: 'Dades Valley', to: 'Marrakech', km: 330, hours: '6.5–7 h', mode: 'road', note: 'Stop at Ait Ben Haddou on the way.' },
    ],
    guide: '/morocco-itineraries/7-days-in-morocco',
  },
  {
    id: 'agadir-south-7',
    title: 'Agadir to Marrakech through the south',
    start: 'Agadir', end: 'Marrakech', days: 7, minDays: 7, maxDays: 8,
    styles: ['classic', 'adventure'],
    summary: 'A one-way route from the Atlantic through Taroudant and the Anti-Atlas to the desert, returning along the Draa Valley.',
    stops: [
      { place: 'Taroudant', nights: 1 },
      { place: 'Ait Ben Haddou', nights: 1 },
      { place: 'Dades Valley', nights: 1 },
      { place: 'Erg Chebbi desert camp', nights: 1 },
      { place: 'N’Kob', nights: 1 },
      { place: 'Marrakech', nights: 1 },
    ],
    legs: [
      { from: 'Agadir', to: 'Taroudant', km: 85, hours: '1.25 h', mode: 'road' },
      { from: 'Taroudant', to: 'Ait Ben Haddou', km: 300, hours: '5 h', mode: 'road', note: 'Via Taliouine (saffron country) and Tazenakht.' },
      { from: 'Ait Ben Haddou', to: 'Dades Valley', km: 150, hours: '3 h', mode: 'road' },
      { from: 'Dades Valley', to: 'Merzouga', km: 260, hours: '4.5 h', mode: 'road' },
      { from: 'Merzouga', to: 'N’Kob', km: 240, hours: '4 h', mode: 'road', note: 'Via Rissani, Alnif and Tazzarine.' },
      { from: 'N’Kob', to: 'Marrakech', km: 360, hours: '6.5 h', mode: 'road', note: 'Via Ouarzazate and the Tichka pass.' },
    ],
    guide: '/sahara-desert/how-to-get-to-the-sahara-desert',
  },
  {
    id: 'casa-imperial-7',
    title: 'Imperial cities by train from Casablanca',
    start: 'Casablanca', end: 'Marrakech', days: 8, minDays: 7, maxDays: 9,
    styles: ['culture', 'relaxed', 'no-car'],
    summary: 'A no-driving route using ONCF trains between Casablanca, Rabat, Fes and Marrakech, with a day trip to Meknes and Volubilis.',
    stops: [
      { place: 'Casablanca', nights: 1 },
      { place: 'Rabat', nights: 1 },
      { place: 'Fes', nights: 3 },
      { place: 'Marrakech', nights: 2 },
    ],
    legs: [
      { from: 'Casablanca', to: 'Rabat', km: 90, hours: 'about 1 h', mode: 'train' },
      { from: 'Rabat', to: 'Fes', km: 200, hours: 'about 3 h', mode: 'train' },
      { from: 'Fes', to: 'Marrakech', km: 530, hours: 'about 7 h', mode: 'train', note: 'Direct trains run, but it is a long day; flying via Casablanca rarely saves time.' },
    ],
    guide: '/transportation/getting-around-morocco',
  },
  {
    id: 'tangier-loop-10',
    title: 'Tangier to Marrakech: the north, Fes and the Sahara',
    start: 'Tangier', end: 'Marrakech', days: 10, minDays: 9, maxDays: 11,
    styles: ['classic', 'culture', 'adventure'],
    summary: 'A good route if you arrive by ferry from Spain or fly into Tangier: Chefchaouen and Fes, then south across the Middle Atlas to the desert and over the High Atlas to Marrakech.',
    stops: [
      { place: 'Tangier', nights: 1 },
      { place: 'Chefchaouen', nights: 2 },
      { place: 'Fes', nights: 2 },
      { place: 'Erg Chebbi desert camp', nights: 1 },
      { place: 'Dades Valley', nights: 1 },
      { place: 'Ait Ben Haddou', nights: 1 },
      { place: 'Marrakech', nights: 1 },
    ],
    legs: [
      { from: 'Tangier', to: 'Chefchaouen', km: 115, hours: '2–2.5 h', mode: 'road' },
      { from: 'Chefchaouen', to: 'Fes', km: 200, hours: '3.5–4 h', mode: 'road', note: 'Winding road through the Rif foothills via Ouazzane.' },
      { from: 'Fes', to: 'Merzouga', km: 470, hours: '7.5–8 h', mode: 'road' },
      { from: 'Merzouga', to: 'Dades Valley', km: 260, hours: '4.5 h', mode: 'road' },
      { from: 'Dades Valley', to: 'Ait Ben Haddou', km: 150, hours: '3 h', mode: 'road' },
      { from: 'Ait Ben Haddou', to: 'Marrakech', km: 185, hours: '3.5–4 h', mode: 'road' },
    ],
    guide: '/morocco-itineraries/7-days-in-morocco',
  },
  {
    id: 'casa-grand-12',
    title: 'Casablanca grand loop',
    start: 'Casablanca', end: 'Casablanca', days: 12, minDays: 11, maxDays: 14,
    styles: ['classic', 'culture'],
    summary: 'A full circuit for a first trip of around two weeks: Rabat, Chefchaouen, Fes, the Sahara, the southern valleys, Marrakech and back to Casablanca.',
    stops: [
      { place: 'Rabat', nights: 1 },
      { place: 'Chefchaouen', nights: 2 },
      { place: 'Fes', nights: 2 },
      { place: 'Erg Chebbi (hotel, then camp)', nights: 2 },
      { place: 'Dades Valley', nights: 1 },
      { place: 'Ait Ben Haddou', nights: 1 },
      { place: 'Marrakech', nights: 2 },
    ],
    legs: [
      { from: 'Casablanca', to: 'Rabat', km: 90, hours: '1–1.25 h', mode: 'road' },
      { from: 'Rabat', to: 'Chefchaouen', km: 250, hours: '4 h', mode: 'road' },
      { from: 'Chefchaouen', to: 'Fes', km: 200, hours: '3.5–4 h', mode: 'road' },
      { from: 'Fes', to: 'Merzouga', km: 470, hours: '7.5–8 h', mode: 'road' },
      { from: 'Merzouga', to: 'Dades Valley', km: 260, hours: '4.5 h', mode: 'road' },
      { from: 'Dades Valley', to: 'Ait Ben Haddou', km: 150, hours: '3 h', mode: 'road' },
      { from: 'Ait Ben Haddou', to: 'Marrakech', km: 185, hours: '3.5–4 h', mode: 'road' },
      { from: 'Marrakech', to: 'Casablanca', km: 240, hours: 'about 2 h 40 by train', mode: 'train', note: 'Or about 3 hours on the motorway.' },
    ],
    guide: '/morocco-itineraries/7-days-in-morocco',
  },
]

// Score routes for a start city and number of days.
export function suggestRoutes({ start, days, style }) {
  const d = Number(days)
  return ROUTES.map((r) => {
    let score = 0
    if (r.start === start) score += 50
    else if (r.end === start) score += 15
    if (d >= r.minDays && d <= r.maxDays) score += 40
    else if (d > r.maxDays) score += Math.max(0, 25 - (d - r.maxDays) * 4)
    else score -= 100 // not enough days: never suggest an impossible route
    if (style && r.styles.includes(style)) score += 10
    return { route: r, score, spare: d - r.days }
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}
