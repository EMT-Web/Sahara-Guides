// Registry of the site's own photographs (public/images). Every image used in
// a page or article should be listed here so width/height (for CLS-free
// rendering), alt text and captions live in one place.
// All photos: Sahara Guides photo library, taken on trips in southern Morocco.

const img = (file, width, height, alt, caption) => ({
  src: `/images/${file}.jpg`,
  width,
  height,
  alt,
  caption,
})

export const images = {
  'camel-caravan-erg-chebbi': img('camel-caravan-erg-chebbi', 2000, 1500, 'A camel caravan crossing the orange dunes of Erg Chebbi under a clear blue sky', 'A caravan heading into Erg Chebbi, near Merzouga.'),
  'erg-chebbi-sunrise': img('erg-chebbi-sunrise', 2000, 1125, 'Sunrise light spreading across rippled dunes in Erg Chebbi', 'First light over Erg Chebbi.'),
  'merzouga-seasonal-lake': img('merzouga-seasonal-lake', 2000, 1500, 'A shallow seasonal lake with salt-crusted edges at the foot of the Merzouga dunes', 'After rare heavy rain, a seasonal lake can form near Merzouga.'),
  'dunes-reflected-in-lake': img('dunes-reflected-in-lake', 2000, 1500, 'Sand dunes and a tamarisk tree reflected in still water in the desert', 'Standing water in the dunes is short-lived and depends on the year’s rainfall.'),
  'desert-camp-dusk': img('desert-camp-dusk', 2000, 1500, 'White tents of a desert camp among low dunes at dusk under a pink sky', 'A dune camp at dusk.'),
  'desert-camp-arch': img('desert-camp-arch', 1500, 2000, 'A blue-painted Moroccan arch framing the view at a desert camp', 'The entrance to a desert camp.'),
  'luxury-camp-pool': img('luxury-camp-pool', 1125, 2000, 'A small swimming pool framed by an arch at an upmarket desert camp', 'Some upmarket camps now have plunge pools.'),
  'luxury-camp-evening': img('luxury-camp-evening', 1500, 2000, 'Lanterns and a red carpet leading between tents at an upmarket desert camp', 'Evening at an upmarket camp.'),
  'campfire-drumming': img('campfire-drumming', 2000, 1263, 'Three men drumming around a campfire at night in a desert camp', 'Drumming around the fire is part of most camp evenings.'),
  'musicians-in-white': img('musicians-in-white', 1500, 2000, 'Musicians in white robes with metal castanets performing indoors', 'A musical performance in a village near Merzouga.'),
  'mint-tea-dunes': img('mint-tea-dunes', 1500, 2000, 'A silver Moroccan teapot on a tray with glasses, dunes and water behind', 'Mint tea is offered on arrival almost everywhere in Morocco.'),
  'tea-at-camp': img('tea-at-camp', 1125, 2000, 'Two men pouring tea at a low table in a desert camp at night', 'Tea before dinner at camp.'),
  'nomad-tent-hamada': img('nomad-tent-hamada', 2000, 1125, 'A black woven nomad tent on the stony desert plain', 'A nomad tent on the hamada, the stony desert that surrounds the dune fields.'),
  '4x4-tamarisk-dunes': img('4x4-tamarisk-dunes', 2000, 1125, 'A white 4x4 parked beside a large tamarisk tree in the dunes', 'A 4x4 is the usual way to reach camps deeper in the dunes.'),
  'quad-full-moon': img('quad-full-moon', 1200, 1600, 'Two riders on a quad bike in the dunes under a bright moon', 'Quad biking is offered around Merzouga; it is noisy and best kept away from the camps.'),
  'dades-gorge-switchbacks': img('dades-gorge-switchbacks', 1500, 2000, 'The hairpin bends of the road climbing out of the Dades Gorge', 'The famous switchbacks above the Dades Gorge.'),
  'todra-gorge': img('todra-gorge', 1125, 2000, 'Sheer limestone walls of the Todra Gorge with a road running along the river', 'The narrowest section of the Todra Gorge near Tinghir.'),
  'kasbah-palm-grove': img('kasbah-palm-grove', 2000, 1338, 'An earthen kasbah village rising above a dense palm grove with mountains behind', 'Earth-built villages and palm groves line the river valleys south of the High Atlas.'),
  'kasbah-towers': img('kasbah-towers', 2000, 1333, 'A restored earthen kasbah with crenellated towers under a blue sky', 'A restored kasbah on the road south of the High Atlas.'),
  'valley-town-mountains': img('valley-town-mountains', 2000, 1125, 'A town of pink earthen buildings with green fields and bare mountains behind', 'A valley town on the southern side of the High Atlas.'),
  'atlantic-sunset': img('atlantic-sunset', 1500, 2000, 'Sunset over the Atlantic seen from beside a parked car on the coast', 'Sunset on Morocco’s Atlantic coast.'),
  'climbing-a-dune': img('climbing-a-dune', 2000, 1500, 'Two people climbing a sharp dune ridge in Erg Chebbi', 'Climbing a dune ridge for sunset.'),
  'camels-resting': img('camels-resting', 2000, 1500, 'A camel handler in a blue turban sitting with saddled camels in the dunes', 'Camels resting before the evening ride.'),
  'desert-guide-portrait': img('desert-guide-portrait', 2000, 1500, 'A man in a light blue turban and robe standing in the dunes', 'A desert guide near Merzouga.'),
  'dunes-red-sky': img('dunes-red-sky', 2000, 1500, 'A red and orange sunset sky above dark dune silhouettes', 'Sunset over the dunes.'),
  'caravan-on-ridge': img('caravan-on-ridge', 1395, 2000, 'A line of camels and riders walking along a dune ridge', 'Riding along a dune crest.'),
  'camel-at-sunset': img('camel-at-sunset', 1500, 2000, 'A single camel standing in the desert at sunset', 'Evening on the edge of the dunes.'),
  'camels-under-stars': img('camels-under-stars', 1500, 2000, 'Camels silhouetted at night beneath a star-filled sky', 'Night skies in the desert are exceptionally dark.'),
  'dune-ripples': img('dune-ripples', 2000, 1500, 'Wind ripples across a large sand dune in soft afternoon light', 'Wind-shaped ripples on a dune face.'),
  'desert-lake-panorama': img('desert-lake-panorama', 2000, 1500, 'Pools of water spreading between low dunes under a blue sky', 'Seasonal water among the dunes after heavy rain.'),
}

export function getImage(key) {
  return images[key] || null
}

// Default social sharing image.
export const DEFAULT_OG_IMAGE = images['camel-caravan-erg-chebbi']
