export type LocalEvent = {
  name: string
  season: string
  description: string
}

export type HiddenGem = {
  name: string
  description: string
}

export type Destination = {
  slug: string

  name: string
  country: string
  region: string
  image: string
  tagline: string
  summary: string
  heritage: string
  bestMonths: string
  languages: string[]
  tags: string[]
  hiddenGems: HiddenGem[]
  events: LocalEvent[]
  experiences: string[]
}

export const destinations: Destination[] = [
  {
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Kansai',
    image: '/destinations/kyoto.png',
    tagline: 'A thousand years of ritual, kept alive in wood and moss',
    summary:
      'Once the imperial capital, Kyoto is where Japan guards its oldest customs. Beyond the famous temples lies a living city of tea masters, indigo dyers, and monks who still keep dawn rituals.',
    heritage:
      'Home to 17 UNESCO World Heritage sites, Kyoto preserved court aesthetics, the tea ceremony (chado), and Zen garden design across a millennium. Its wooden machiya townhouses and geiko districts remain working cultural landscapes, not museums.',
    bestMonths: 'March–May, October–November',
    languages: ['Japanese'],
    tags: ['Heritage', 'Temples', 'Craft', 'Tea culture', 'Gardens'],
    hiddenGems: [
      {
        name: 'Ohara valley',
        description:
          'A farming hamlet an hour north where moss temples sit among terraced fields and almost no tour buses reach.',
      },
      {
        name: 'Nishijin weaving workshops',
        description:
          'Backstreet ateliers where families still weave gold-threaded obi on century-old looms; some welcome quiet visitors.',
      },
    ],
    events: [
      {
        name: 'Gion Matsuri',
        season: 'July',
        description:
          'A month-long Shinto festival with towering wooden floats hauled through the old town — one of Japan\u2019s oldest.',
      },
      {
        name: 'Hanatoro lantern nights',
        season: 'March',
        description:
          'Lantern-lit evening walks through Higashiyama\u2019s temples and lanes.',
      },
    ],
    experiences: [
      'Sit a formal tea ceremony led by a machiya-house host',
      'Learn indigo shibori dyeing from a fifth-generation artisan',
      'Join monks for early morning zazen meditation',
    ],
  },
  {
    slug: 'fez',
    name: 'Fez',
    country: 'Morocco',
    region: 'Fès-Meknès',
    image: '/destinations/fez.png',
    tagline: 'The world\u2019s largest living medieval city',
    summary:
      'Fez el Bali is a labyrinth of 9,000 alleys where donkeys still carry the loads and craft guilds work as they have for centuries. It is the spiritual and artisanal heart of Morocco.',
    heritage:
      'Founded in the 9th century, Fez holds the world\u2019s oldest continually operating university (al-Qarawiyyin) and UNESCO-listed medina. Its tanneries, brass souks, and zellige tile ateliers preserve craft lineages passed down through families.',
    bestMonths: 'March–May, September–November',
    languages: ['Arabic', 'Amazigh', 'French'],
    tags: ['Heritage', 'Craft', 'Souks', 'Cuisine', 'Architecture'],
    hiddenGems: [
      {
        name: 'Nejjarine fondouk',
        description:
          'A restored 18th-century caravanserai and woodwork museum most visitors walk straight past.',
      },
      {
        name: 'Rooftop weavers of the Andalusian quarter',
        description:
          'Quiet workshops where scarves are woven from agave silk, away from the main tourist tanneries.',
      },
    ],
    events: [
      {
        name: 'Fes Festival of World Sacred Music',
        season: 'June',
        description:
          'Sufi orders and global musicians perform in palace courtyards and gardens.',
      },
      {
        name: 'Moussem of Moulay Idriss',
        season: 'September',
        description:
          'A religious pilgrimage and procession honoring the city\u2019s founder.',
      },
    ],
    experiences: [
      'Apprentice for a morning with a zellige tile cutter',
      'Cook a seffa or pastilla with a family in the medina',
      'Trace the leather trade from tannery to babouche maker',
    ],
  },
  {
    slug: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    region: 'Oaxaca de Juárez',
    image: '/destinations/oaxaca.png',
    tagline: 'Where Indigenous roots color everything',
    summary:
      'Oaxaca is Mexico\u2019s cultural kitchen and craft capital — a highland city of mezcal, mole, and sixteen Indigenous peoples whose languages and textiles remain vividly alive.',
    heritage:
      'The historic center and nearby Monte Albán are UNESCO sites. Zapotec and Mixtec traditions endure in weaving villages, natural dyeing with cochineal, and a cuisine recognized as intangible heritage.',
    bestMonths: 'October–November, March–May',
    languages: ['Spanish', 'Zapotec', 'Mixtec'],
    tags: ['Heritage', 'Cuisine', 'Textiles', 'Mezcal', 'Festivals'],
    hiddenGems: [
      {
        name: 'Teotitlán del Valle',
        description:
          'A weaving village where families dye wool with cochineal and indigo and welcome you to the loom.',
      },
      {
        name: 'San Baltazar mezcal palenques',
        description:
          'Small family distilleries off the tourist mezcal trail, still roasting agave in earthen pits.',
      },
    ],
    events: [
      {
        name: 'Día de los Muertos',
        season: 'Late October–November',
        description:
          'Oaxaca\u2019s most profound celebration: candlelit cemeteries, marigold altars, and comparsas parading through town.',
      },
      {
        name: 'Guelaguetza',
        season: 'July',
        description:
          'A grand gathering of Indigenous communities sharing dance, dress, and music.',
      },
    ],
    experiences: [
      'Grind a mole from scratch with a Zapotec cook',
      'Dye wool with cochineal alongside village weavers',
      'Taste ancestral mezcal at a family palenque',
    ],
  },
  {
    slug: 'hoian',
    name: 'Hoi An',
    country: 'Vietnam',
    region: 'Quảng Nam',
    image: '/destinations/hoian.png',
    tagline: 'A lantern-lit port where East met West',
    summary:
      'This preserved trading port glows with silk lanterns at night. Hoi An\u2019s streets blend Vietnamese, Japanese, and Chinese heritage into one of Southeast Asia\u2019s most atmospheric towns.',
    heritage:
      'A UNESCO-listed ancient town, Hoi An was a major Silk Road seaport from the 15th–19th centuries. Its Japanese covered bridge, assembly halls, and tailoring and lantern-making crafts survive intact.',
    bestMonths: 'February–April',
    languages: ['Vietnamese'],
    tags: ['Heritage', 'Craft', 'Cuisine', 'Lanterns', 'Riverside'],
    hiddenGems: [
      {
        name: 'Tra Que herb village',
        description:
          'A farming community where you can plant and harvest herbs at dawn with the growers.',
      },
      {
        name: 'Kim Bong carpentry island',
        description:
          'A short boat ride to woodcarvers who built the town\u2019s temples for generations.',
      },
    ],
    events: [
      {
        name: 'Full Moon Lantern Festival',
        season: 'Monthly (lunar 14th)',
        description:
          'The town cuts its electric lights and floats paper lanterns down the Thu Bon river.',
      },
      {
        name: 'Tet Nguyen Dan',
        season: 'January–February',
        description:
          'Lunar New Year fills the streets with flowers, offerings, and family ritual.',
      },
    ],
    experiences: [
      'Make a silk lantern with a local craftsperson',
      'Cook central-Vietnamese specialties after a market walk',
      'Row a basket boat through the coconut palm waterways',
    ],
  },
  {
    slug: 'tbilisi',
    name: 'Tbilisi',
    country: 'Georgia',
    region: 'Kartli',
    image: '/destinations/tbilisi.png',
    tagline: 'Crossroads of the Caucasus, cradle of wine',
    summary:
      'Georgia\u2019s capital tumbles down hillsides in a mix of carved wooden balconies, sulfur baths, and Soviet-era boldness. It is warm, chaotic, and fiercely hospitable.',
    heritage:
      'Georgia is the birthplace of wine, with an 8,000-year qvevri (clay vessel) tradition on the UNESCO intangible heritage list. Its polyphonic singing and distinct alphabet are among the world\u2019s oldest living traditions.',
    bestMonths: 'May–June, September–October',
    languages: ['Georgian'],
    tags: ['Heritage', 'Wine', 'Music', 'Architecture', 'Cuisine'],
    hiddenGems: [
      {
        name: 'Betlemi Quarter stairways',
        description:
          'Hidden hillside lanes of frescoed courtyards and artist studios above the old town.',
      },
      {
        name: 'Kakheti qvevri cellars',
        description:
          'Family marani (cellars) two hours out where wine still ferments underground in clay.',
      },
    ],
    events: [
      {
        name: 'Rtveli grape harvest',
        season: 'September–October',
        description:
          'Villages open their cellars for the communal harvest, feasting, and supra toasts.',
      },
      {
        name: 'Tbilisoba',
        season: 'October',
        description:
          'A city-wide festival of Georgian food, folk music, and dance.',
      },
    ],
    experiences: [
      'Learn to bake khachapuri and khinkali with a host family',
      'Sing a three-part polyphonic table song at a supra',
      'Press grapes and taste amber wine in a village marani',
    ],
  },
  {
    slug: 'kerala',
    name: 'Kerala',
    country: 'India',
    region: 'Malabar Coast',
    image: '/destinations/kerala.png',
    tagline: 'Green backwaters and ancient performing arts',
    summary:
      'Kerala moves to its own rhythm: palm-fringed canals, spice gardens, and temple arts that predate most theater on earth. It is India at its most lush and layered.',
    heritage:
      'Kerala safeguards Kathakali and Kutiyattam (a UNESCO-listed 2,000-year-old Sanskrit theater), Ayurvedic medicine, and centuries of spice-trade exchange with Arab, Chinese, and European seafarers.',
    bestMonths: 'September–March',
    languages: ['Malayalam'],
    tags: ['Heritage', 'Performing arts', 'Backwaters', 'Ayurveda', 'Spice'],
    hiddenGems: [
      {
        name: 'Kutiyattam rehearsals in Irinjalakuda',
        description:
          'A temple-town academy where you can watch masters train in the world\u2019s oldest surviving Sanskrit theater.',
      },
      {
        name: 'Kumbalangi village',
        description:
          'A community-run backwater village showing Chinese fishing nets and coir-making away from the houseboat crowds.',
      },
    ],
    events: [
      {
        name: 'Onam',
        season: 'August–September',
        description:
          'The harvest festival of flower carpets, feasts on banana leaves, and snake-boat races.',
      },
      {
        name: 'Thrissur Pooram',
        season: 'April–May',
        description:
          'A dazzling temple festival of caparisoned elephants and percussion ensembles.',
      },
    ],
    experiences: [
      'Watch a Kathakali artist transform through hours of makeup',
      'Cook a Keralan sadya feast with a backwater family',
      'Learn the basics of Ayurvedic cooking and herbs',
    ],
  },
]

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}

export const allTags = Array.from(
  new Set(destinations.flatMap((d) => d.tags)),
).sort()
