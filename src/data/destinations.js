// Destination index. Powers the interactive map, the destinations hub and
// homepage discovery. `guide` points to the full article once it exists;
// until then the entry shows its overview on the hub (no thin standalone page).
//
// Coordinates are approximate town centres (WGS84) used only for the map.
// Travel times are typical driving times without stops; see the full guides.

export const REGIONS = [
  { id: 'imperial-cities', name: 'Imperial cities', blurb: 'The historic royal capitals and the Roman ruins between them.' },
  { id: 'north', name: 'The north and the Rif', blurb: 'The Strait of Gibraltar, Tangier and the blue mountain town of Chefchaouen.' },
  { id: 'atlantic-coast', name: 'Atlantic coast', blurb: 'Port cities, surf towns and long beaches from Casablanca to the far south.' },
  { id: 'atlas', name: 'High Atlas', blurb: 'Berber villages, walking trails and North Africa’s highest peak.' },
  { id: 'south', name: 'The south and the Sahara', blurb: 'Kasbahs, gorges, palm valleys and the two great dune seas.' },
]

export const DESTINATIONS = [
  {
    slug: 'marrakech', name: 'Marrakech', region: 'imperial-cities', type: 'City', lat: 31.63, lon: -7.99,
    summary: 'Founded in the 11th century, Marrakech is Morocco’s most visited city: a walled medina (a UNESCO World Heritage Site) centred on the Jemaa el-Fna square, with palaces, gardens and souks, and the main gateway to the High Atlas and the desert.',
    days: '3 days', airport: 'Marrakech Menara (RAK)', guide: '/destinations/marrakech', featured: true,
  },
  {
    slug: 'fes', name: 'Fes', region: 'imperial-cities', type: 'City', lat: 34.03, lon: -5.0,
    summary: 'Fes el-Bali, the old city, is one of the largest car-free urban areas in the world and a UNESCO World Heritage Site. It is home to the al-Qarawiyyin mosque and university, founded in 859, medieval madrasas and the leather tanneries.',
    days: '2–3 days', airport: 'Fes-Saïss (FEZ)', guide: '/destinations/fes', featured: true,
  },
  {
    slug: 'meknes', name: 'Meknes', region: 'imperial-cities', type: 'City', lat: 33.89, lon: -5.55, labelSide: 'left',
    summary: 'The 17th-century capital of Sultan Moulay Ismail, with monumental gates such as Bab Mansour, vast granaries and stables, and a calmer medina than Fes. Usually combined with Volubilis as a day trip from Fes.',
    days: '1 day', airport: 'Fes-Saïss (FEZ), about 1 hour',
  },
  {
    slug: 'volubilis', name: 'Volubilis', region: 'imperial-cities', type: 'Heritage site', lat: 34.07, lon: -5.55, labelSide: 'top',
    summary: 'The best-preserved Roman site in Morocco, known for its floor mosaics, triumphal arch and basilica, set in olive country below the holy town of Moulay Idriss Zerhoun. A UNESCO World Heritage Site.',
    days: 'Half a day', airport: 'Fes-Saïss (FEZ), about 1 hour 15 minutes',
  },
  {
    slug: 'rabat', name: 'Rabat', region: 'imperial-cities', type: 'City', lat: 34.02, lon: -6.84,
    summary: 'Morocco’s capital is green, orderly and underrated: the Kasbah of the Udayas above the river mouth, the Hassan Tower and Mausoleum of Mohammed V, and the Chellah ruins. It is on the high-speed rail line and easy to add to any northern route.',
    days: '1–2 days', airport: 'Rabat-Salé (RBA)',
  },
  {
    slug: 'casablanca', name: 'Casablanca', region: 'atlantic-coast', type: 'City', lat: 33.57, lon: -7.59,
    summary: 'Morocco’s largest city and main international air hub. Most visitors come for the Hassan II Mosque, built on the ocean’s edge and one of the few mosques in Morocco that non-Muslims can enter on a guided tour, and the city’s Art Deco architecture.',
    days: '1 day', airport: 'Casablanca Mohammed V (CMN)',
  },
  {
    slug: 'tangier', name: 'Tangier', region: 'north', type: 'City', lat: 35.77, lon: -5.8,
    summary: 'A port city on the Strait of Gibraltar with a hilltop kasbah, a literary past and ferry links to Spain. The Al Boraq high-speed train connects it to Rabat and Casablanca, and Chefchaouen is a little over two hours away by road.',
    days: '1–2 days', airport: 'Tangier Ibn Battouta (TNG)',
  },
  {
    slug: 'chefchaouen', name: 'Chefchaouen', region: 'north', type: 'Mountain town', lat: 35.17, lon: -5.27,
    summary: 'A small medina washed in shades of blue, set beneath the peaks of the Rif. Stay at least one night to see it quiet in the early morning, and to walk in the surrounding hills and Talassemtane National Park.',
    days: '1–2 nights', airport: 'Tetouan Sania R’mel (TTU) or Tangier (TNG)',
  },
  {
    slug: 'essaouira', name: 'Essaouira', region: 'atlantic-coast', type: 'Coastal town', lat: 31.51, lon: -9.77,
    summary: 'A walled 18th-century port town (a UNESCO World Heritage Site) with a working fishing harbour, art galleries and a windy beach popular with kitesurfers. About three hours from Marrakech by road, and much cooler in summer.',
    days: '2 nights', airport: 'Essaouira Mogador (ESU) or Marrakech (RAK)',
  },
  {
    slug: 'agadir', name: 'Agadir', region: 'atlantic-coast', type: 'Beach resort', lat: 30.42, lon: -9.6, labelSide: 'bottom',
    summary: 'Rebuilt after the 1960 earthquake, Agadir is a modern resort with a long sandy bay and a mild climate all year. It is a practical base for the Souss Valley, Taroudant and the surf villages to the north such as Taghazout.',
    days: '2–4 days', airport: 'Agadir Al Massira (AGA)',
  },
  {
    slug: 'taroudant', name: 'Taroudant', region: 'south', type: 'Market town', lat: 30.47, lon: -8.88,
    summary: 'A market town in the Souss Valley enclosed by well-preserved earthen ramparts, with busy souks and few tourists. A natural overnight stop on the road between Agadir and Ouarzazate.',
    days: '1 night', airport: 'Agadir Al Massira (AGA), about 1 hour 15 minutes',
  },
  {
    slug: 'dakhla', name: 'Dakhla', region: 'atlantic-coast', type: 'Coastal town', lat: 23.68, lon: -15.96, offMap: true,
    summary: 'A town on a narrow peninsula in the far south, beside a large, sheltered lagoon that has made it one of the best kitesurfing spots in Africa. It lies in the disputed Western Sahara region administered by Morocco; check your government’s travel advice for the area before booking.',
    days: '3–5 days', airport: 'Dakhla (VIL)',
  },
  {
    slug: 'ouarzazate', name: 'Ouarzazate', region: 'south', type: 'Town', lat: 30.92, lon: -6.89,
    summary: 'The gateway to the south, known for its film studios and the Taourirt Kasbah. Most travellers pass through on the way between Marrakech and the desert; it has an airport with domestic and some international flights.',
    days: '1 night', airport: 'Ouarzazate (OZZ)',
  },
  {
    slug: 'ait-ben-haddou', name: 'Ait Ben Haddou', region: 'south', type: 'Heritage site', lat: 31.05, lon: -7.13,
    summary: 'A fortified earthen village (ksar) climbing a hillside above a river, and one of the most complete examples of southern Moroccan earthen architecture. A UNESCO World Heritage Site and a familiar film location, about 30 minutes from Ouarzazate.',
    days: 'Half a day or 1 night', airport: 'Ouarzazate (OZZ), about 30 minutes',
  },
  {
    slug: 'dades-valley', name: 'Dades Valley', region: 'south', type: 'Valley', lat: 31.42, lon: -5.98,
    summary: 'A valley of kasbahs, walnut trees and red rock between the High Atlas and Jbel Saghro, ending in the Dades Gorge and its famous hairpin road. Kelaat M’Gouna, at the valley’s western end, is known for its roses.',
    days: '1 night', airport: 'Ouarzazate (OZZ), about 2 hours',
  },
  {
    slug: 'todra-gorge', name: 'Todra Gorge', region: 'south', type: 'Gorge', lat: 31.59, lon: -5.59,
    summary: 'A narrow canyon of sheer limestone walls just north of the oasis town of Tinghir. The most dramatic stretch is short and easy to walk; the gorge is also a well-known rock-climbing area.',
    days: '2–3 hours, or 1 night in Tinghir', airport: 'Errachidia (ERH), about 2 hours 30 minutes',
  },
  {
    slug: 'merzouga', name: 'Merzouga', region: 'south', type: 'Desert village', lat: 31.08, lon: -4.01,
    summary: 'The village at the foot of Erg Chebbi and Morocco’s main base for desert trips, with hotels, desert camps, camel rides and 4x4 excursions. The nearest airport, Errachidia, is about two hours away by road.',
    days: '1–2 nights', airport: 'Errachidia (ERH), about 2 hours',
    guide: '/sahara-desert/how-to-get-to-the-sahara-desert',
  },
  {
    slug: 'erg-chebbi', name: 'Erg Chebbi', region: 'south', type: 'Dune sea', lat: 31.2, lon: -3.97, labelSide: 'right',
    summary: 'The most accessible great dune field in Morocco, with dunes that rise to around 150 metres, stretching north–south beside Merzouga. Paved roads reach its edge, so it suits shorter trips and families.',
    days: '1–2 nights', airport: 'Errachidia (ERH)', guide: '/sahara-desert/erg-chebbi-vs-erg-chigaga', featured: true,
  },
  {
    slug: 'zagora', name: 'Zagora', region: 'south', type: 'Town', lat: 30.33, lon: -5.84,
    summary: 'The main town of the Draa Valley, Morocco’s longest palm-lined river valley. Zagora is a stop on the way to M’Hamid and Erg Chigaga; the small dunes nearby are not a substitute for the large ergs.',
    days: '1 night', airport: 'Zagora (OZG) or Ouarzazate (OZZ)',
  },
  {
    slug: 'mhamid', name: 'M’Hamid El Ghizlane', region: 'south', type: 'Desert village', lat: 29.82, lon: -5.72,
    summary: 'The village where the paved road ends, at the southern tip of the Draa Valley. It is the departure point for 4x4 and camel trips into Erg Chigaga.',
    days: 'Stopover', airport: 'Zagora (OZG) or Ouarzazate (OZZ)',
  },
  {
    slug: 'erg-chigaga', name: 'Erg Chigaga', region: 'south', type: 'Dune sea', lat: 29.84, lon: -6.25, labelSide: 'left',
    summary: 'Morocco’s largest and most remote dune sea, reached only by 4x4 or camel across about 60 kilometres of desert track from M’Hamid. Fewer camps and far fewer people than Erg Chebbi, but a longer journey.',
    days: '1–2 nights', airport: 'Ouarzazate (OZZ)', guide: '/sahara-desert/erg-chebbi-vs-erg-chigaga', featured: true,
  },
  {
    slug: 'imlil', name: 'Imlil', region: 'atlas', type: 'Mountain village', lat: 31.14, lon: -7.92, labelSide: 'left',
    summary: 'A village at about 1,740 metres in the High Atlas and the main trailhead for Jbel Toubkal (4,167 m), North Africa’s highest peak. Also excellent for gentler day walks between Berber villages, about 90 minutes from Marrakech.',
    days: '1–3 nights', airport: 'Marrakech Menara (RAK), about 1 hour 30 minutes',
  },
  {
    slug: 'atlas-mountains', name: 'Atlas Mountains', region: 'atlas', type: 'Mountain range', lat: 31.3, lon: -7.38,
    summary: 'Three ranges cross Morocco: the Middle Atlas with its cedar forests, the High Atlas with Toubkal and the Tizi n’Tichka pass, and the drier Anti-Atlas to the south. Every road from Marrakech to the desert crosses the High Atlas.',
    days: '1 day to a week', airport: 'Marrakech Menara (RAK)',
  },
]

export function destinationsByRegion() {
  return REGIONS.map((r) => ({ ...r, items: DESTINATIONS.filter((d) => d.region === r.id) }))
}
