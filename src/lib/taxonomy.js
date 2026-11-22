// Content categories. Each maps to a URL section: /<slug>/<article-slug>.
// The `intro` is shown on the category hub and used as its meta description.

export const CATEGORIES = [
  {
    slug: 'destinations',
    name: 'Destinations',
    eyebrow: 'Where to go',
    title: 'Morocco destinations',
    description:
      'In-depth guides to Morocco’s cities, mountains, coast and desert: where each place is, why it is worth the trip, how long to stay and how to get there.',
    intro:
      'Morocco packs medieval medinas, Atlantic beaches, 4,000-metre peaks and Saharan dunes into one country, and the distances between them are bigger than most first-time visitors expect. Start with the map, then dive into the full guides.',
    image: 'kasbah-palm-grove',
  },
  {
    slug: 'sahara-desert',
    name: 'Sahara Desert',
    eyebrow: 'The desert',
    title: 'Sahara Desert travel guides',
    description:
      'Everything you need to plan a Sahara trip in Morocco: Erg Chebbi or Erg Chigaga, how to get there, desert camps, best seasons, camel rides and what to pack.',
    intro:
      'Most visitors to the Moroccan Sahara go to one of two dune seas, Erg Chebbi near Merzouga or Erg Chigaga beyond M’Hamid. These guides explain the difference, the realistic travel times and what a night in the dunes is actually like.',
    image: 'camel-caravan-erg-chebbi',
  },
  {
    slug: 'morocco-itineraries',
    name: 'Itineraries',
    eyebrow: 'Route planning',
    title: 'Morocco itineraries',
    description:
      'Realistic Morocco itineraries with honest driving times, distances, overnight stops and alternatives, from short city breaks to three-week journeys.',
    intro:
      'Every route here is built around real road and rail times, not wishful thinking. Where a day is long we say so, and we suggest how to break it up.',
    image: 'dades-gorge-switchbacks',
  },
  {
    slug: 'travel-tips',
    name: 'Travel Tips',
    eyebrow: 'Know before you go',
    title: 'Morocco travel tips',
    description:
      'Practical Morocco travel advice: when to go, safety, money, what to wear, etiquette, entry requirements and more, with sources and verification dates.',
    intro:
      'The practical questions that decide whether a trip runs smoothly. Rules and advisories change, so time-sensitive facts carry a “last verified” date and a link to the official source.',
    image: 'mint-tea-dunes',
  },
  {
    slug: 'transportation',
    name: 'Getting Around',
    eyebrow: 'Transport',
    title: 'Getting around Morocco',
    description:
      'How to travel in Morocco by train, bus, car, taxi and domestic flight, with realistic journey times and advice on driving and private drivers.',
    intro:
      'Morocco’s trains are fast in the north-west, buses reach almost everywhere, and the south is best covered by road. These guides help you choose.',
    image: '4x4-tamarisk-dunes',
  },
  {
    slug: 'culture-food',
    name: 'Culture & Food',
    eyebrow: 'Culture',
    title: 'Moroccan culture and food',
    description:
      'Moroccan food, mint tea, hammams, crafts, music and Amazigh heritage, explained clearly and respectfully for visitors.',
    intro:
      'Morocco’s culture is Arab, Amazigh, African, Andalusian and Mediterranean at once. These guides help you understand what you are eating, hearing and seeing.',
    image: 'tea-at-camp',
  },
  {
    slug: 'things-to-do',
    name: 'Things to Do',
    eyebrow: 'Experiences',
    title: 'Things to do in Morocco',
    description:
      'The best things to do in Morocco, from sleeping in the Sahara to exploring the Fes medina, with links to the detailed guides that explain how.',
    intro:
      'A curated list of experiences that are genuinely worth building a trip around, each linked to the guide that explains where, when and how.',
    image: 'climbing-a-dune',
  },
]

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]))

export function getCategory(slug) {
  return CATEGORY_MAP[slug] || null
}
