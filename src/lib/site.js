// Global site configuration. Values that differ per deployment come from env.

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saharaguides.com'
export const SITE_URL = rawUrl.replace(/\/$/, '')

export const SITE = {
  name: 'Sahara Guides',
  tagline: 'Your independent guide to discovering Morocco',
  description:
    'Independent, researched Morocco travel guides: destinations, Sahara Desert trips, realistic itineraries, transport and practical advice, checked against official sources and updated regularly.',
  locale: 'en',
  // Public contact address. Set NEXT_PUBLIC_CONTACT_EMAIL once the mailbox exists.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@saharaguides.com',
  founded: '2026',
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL || '',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || '',
  },
}

export const EDITORIAL_TEAM = {
  slug: 'editorial-team',
  name: 'Sahara Guides Editorial Team',
  role: 'Research, writing and fact-checking',
  bio: 'Guides are researched and written by the Sahara Guides editorial team, which is based in Morocco and works with local guides, drivers and camp hosts in the south of the country. Practical details such as entry rules, transport and safety advice are checked against official sources before publication and on every review.',
  url: '/contributors',
}

// Primary navigation. Each top-level item can carry a mega menu of columns.
export const NAV = [
  {
    label: 'Destinations',
    href: '/destinations',
    columns: [
      {
        title: 'Cities',
        links: [
          { label: 'Marrakech', href: '/destinations/marrakech' },
          { label: 'Fes', href: '/destinations/fes' },
          { label: 'All destinations', href: '/destinations' },
        ],
      },
      {
        title: 'Regions',
        links: [
          { label: 'Imperial cities', href: '/destinations#imperial-cities' },
          { label: 'The north and the Rif', href: '/destinations#north' },
          { label: 'Atlantic coast', href: '/destinations#atlantic-coast' },
          { label: 'High Atlas', href: '/destinations#atlas' },
          { label: 'The south and the Sahara', href: '/destinations#south' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'Interactive Morocco map', href: '/destinations#map' },
          { label: 'Things to do in Morocco', href: '/things-to-do' },
        ],
      },
    ],
  },
  {
    label: 'Plan Your Trip',
    href: '/plan-your-trip',
    columns: [
      {
        title: 'Essentials',
        links: [
          { label: 'Best time to visit Morocco', href: '/travel-tips/best-time-to-visit-morocco' },
          { label: 'Is Morocco safe?', href: '/travel-tips/is-morocco-safe' },
          { label: 'All travel tips', href: '/travel-tips' },
        ],
      },
      {
        title: 'Getting around',
        links: [
          { label: 'Getting around Morocco', href: '/transportation/getting-around-morocco' },
          { label: 'Transport guides', href: '/transportation' },
        ],
      },
      {
        title: 'Tools',
        links: [
          { label: 'Itinerary planner', href: '/itinerary-planner' },
          { label: 'Trip planning hub', href: '/plan-your-trip' },
        ],
      },
    ],
  },
  {
    label: 'Itineraries',
    href: '/morocco-itineraries',
    columns: [
      {
        title: 'By length',
        links: [
          { label: '7 days in Morocco', href: '/morocco-itineraries/7-days-in-morocco' },
          { label: 'All itineraries', href: '/morocco-itineraries' },
        ],
      },
      {
        title: 'Plan a route',
        links: [{ label: 'Itinerary planner', href: '/itinerary-planner' }],
      },
    ],
  },
  {
    label: 'Sahara Desert',
    href: '/sahara-desert',
    columns: [
      {
        title: 'Start here',
        links: [
          { label: 'How to get to the Sahara', href: '/sahara-desert/how-to-get-to-the-sahara-desert' },
          { label: 'Erg Chebbi vs Erg Chigaga', href: '/sahara-desert/erg-chebbi-vs-erg-chigaga' },
          { label: 'All Sahara guides', href: '/sahara-desert' },
        ],
      },
    ],
  },
  { label: 'Things to Do', href: '/things-to-do' },
  {
    label: 'Culture & Food',
    href: '/culture-food',
    columns: [
      {
        title: 'Read',
        links: [
          { label: 'Moroccan food guide', href: '/culture-food/moroccan-food-guide' },
          { label: 'All culture & food', href: '/culture-food' },
        ],
      },
    ],
  },
  { label: 'Travel Tips', href: '/travel-tips' },
  { label: 'About', href: '/about' },
]

export const FOOTER_GROUPS = [
  {
    title: 'Explore',
    links: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Sahara Desert', href: '/sahara-desert' },
      { label: 'Morocco itineraries', href: '/morocco-itineraries' },
      { label: 'Things to do', href: '/things-to-do' },
      { label: 'Culture & food', href: '/culture-food' },
    ],
  },
  {
    title: 'Plan',
    links: [
      { label: 'Plan your trip', href: '/plan-your-trip' },
      { label: 'Travel tips', href: '/travel-tips' },
      { label: 'Getting around', href: '/transportation' },
      { label: 'Itinerary planner', href: '/itinerary-planner' },
      { label: 'Search the guides', href: '/search' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About Sahara Guides', href: '/about' },
      { label: 'Contributors', href: '/contributors' },
      { label: 'Editorial policy', href: '/editorial-policy' },
      { label: 'Fact-checking policy', href: '/fact-checking-policy' },
      { label: 'Corrections policy', href: '/corrections-policy' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Cookie policy', href: '/cookie-policy' },
      { label: 'Affiliate & commercial disclosure', href: '/affiliate-disclosure' },
      { label: 'RSS feed', href: '/rss.xml' },
    ],
  },
]
