/*
 * The homepage, the header and the footer: what they say, where they link and which pictures they
 * show. Facts come from the verified data in site.ts, elements.ts, proof.ts and projects.ts (from
 * dishahabitat.com and the official project sites, inspected October 2026); change a fact there.
 * No prices, and every computer render is labelled an artist’s impression.
 */
import { elements } from "@/lib/elements";
import type { Film } from "@/lib/film";
import { award, homesHandedOver, reraSearch, residentRating } from "@/lib/proof";
import { formatIndian, company as site } from "@/lib/site";

export type Img = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /* object-position on wide screens, and on phones, where the frame turns portrait */
  position?: string;
  mobilePosition?: string;
};

export type Cta = { label: string; href: string };
/* A button that opens the site's message form on WhatsApp with this topic already chosen. */
export type Compose = { label: string; compose: string };
export type Action = Cta | Compose;

/* A figure in a SpecRow: the number large, its unit small beside it, what it measures underneath. */
export type Figure = { value: string; unit?: string; label: string };

export const links = {
  /* The site-visit booker on the contact page. */
  bookVisit: "/contact#book",
  elements: elements.href,
  homes: "/homes",
  story: "/story",
  checklist: "/checklist",
  contact: "/contact",
  privacy: "/privacy",
  emi: "/plan",
  /* Karnataka RERA's list of registered projects, searchable by number, name or promoter. */
  rera: reraSearch,
  updates: elements.updates,
  mygate: "https://mygate.com/bengaluru/disha-central-park-499.html",
} as const;

export const communityHref = (slug: string) => (slug === elements.slug ? elements.href : `/homes/${slug}`);

/* 1,102, written the Indian way. */
const handed = formatIndian(homesHandedOver);

const enquiry = "Hello Disha Habitat, I would like to know more about Pursuit of the Elements.";

export const company = {
  name: site.name,
  copyright: site.copyrightHolder,
  year: site.copyrightYear,
  office: site.office.lines.join(", "),
  email: site.email,
  /* The published sales line for Pursuit of the Elements, which also takes WhatsApp. */
  sales: { display: elements.phone.display, tel: elements.phone.href },
  whatsapp: `${elements.whatsapp}&text=${encodeURIComponent(enquiry)}`,
  socials: site.socials,
  rera: elements.rera,
} as const;

const bookVisit: Cta = { label: "Book a visit", href: links.bookVisit };
/*
 * Price is a buyer's first question, and the site can't print one yet: this opens the WhatsApp message form with
 * prices and floor plans already asked for. "Ask for" says it's a request, not a download.
 */
export const pricesAndPlans: Compose = { label: "Ask for prices and plans", compose: "Prices and floor plans" };

/* The one quiet line at the foot of every hero slide. "verify" goes to the RERA strip on the project page. */
export const trust = {
  record: `${handed} homes handed over since 2015`,
  rera: "Karnataka RERA registered",
  verify: `${elements.href}#rera`,
} as const;

/* The project's renders and the films cut from them (public/media/elements, made from the client's assets). */
const pics = "/images/pursuit-of-the-elements";
const films = "/media/elements";
const film = (name: string, renditions: Film["renditions"]): Film => ({ src: `${films}/${name}`, renditions });
const still = (name: string, width: number, height: number, alt: string, position?: string, mobilePosition?: string): Img => ({
  src: `${pics}/${name}.webp`,
  width,
  height,
  alt: `Artist’s impression of ${alt}`,
  position,
  mobilePosition,
});

/*
 * The hero: four slides, each a film, a name, one line and two buttons, as tesla.com's (which changes every ten
 * seconds). The figures are further down the page, in the towers row and the brand band.
 */
export type Slide = {
  id: string;
  /* The slide's mark at the foot of the hero on a computer: one word. */
  tab: string;
  title: string;
  line: string;
  image: Img;
  primary: Cta;
  secondary: Action;
  /* One small line above the title: what is on offer and where. */
  eyebrow: string;
  note: string;
  /* A short silent film over the still, cut from Disha's own renders; the still is its first frame. */
  film?: Film;
};

export const heroSlides: Slide[] = [
  {
    id: "elements",
    tab: "Towers",
    eyebrow: "Now selling · Gunjur, East Bengaluru",
    title: "Pursuit of the Elements",
    line: "2, 3\u00a0&\u00a04 BHK apartments and 4\u00a0&\u00a05 BHK villas on 20\u00a0acres.",
    image: still("hero-towers", 1920, 1080, "the Pursuit of the Elements towers rising above landscaped gardens"),
    film: film("hero-towers", ["1080", "720", "p"]),
    primary: bookVisit,
    /* The first slide is the one a phone holds, so the price question is on it. */
    secondary: pricesAndPlans,
    note: "Artist’s impression",
  },
  {
    id: "clubhouse",
    tab: "Clubhouse",
    eyebrow: "Pursuit of the Elements",
    title: "The Clubhouse",
    line: "1,35,000+\u00a0sq\u00a0ft, with a temperature-controlled pool on the roof.",
    image: still("hero-clubhouse", 1920, 1080, "the clubhouse, raised on angled columns above an amphitheatre"),
    film: film("hero-clubhouse", ["1080", "720", "p"]),
    primary: bookVisit,
    secondary: { label: "See the clubhouse", href: `${links.elements}#clubhouse` },
    note: "Artist’s impression",
  },
  {
    id: "outdoors",
    tab: "Outdoors",
    eyebrow: "Pursuit of the Elements · 20 acres",
    title: "40+ amenities",
    line: "Pickleball and futsal courts, a skate park and an outdoor café, between the towers.",
    image: still("hero-outdoors", 1920, 1080, "pickleball courts, a skate park and a lawn beside an outdoor café, from above"),
    film: film("hero-outdoors", ["1080", "720", "p"]),
    primary: bookVisit,
    secondary: { label: "See the grounds", href: `${links.elements}#outdoors` },
    note: "Artist’s impression",
  },
  {
    id: "home",
    tab: "Homes",
    eyebrow: "Pursuit of the Elements · Apartments",
    title: "2, 3\u00a0&\u00a04\u00a0BHK homes",
    line: "In seven towers, 23 to 29 floors high.",
    image: still("pote-home", 1920, 1080, "a front door opening onto a living room", "50% 50%", "47% 50%"),
    film: film("pote-home", ["720", "p"]),
    primary: bookVisit,
    secondary: { label: "See the homes", href: `${links.elements}#homes` },
    note: "Artist’s impression",
  },
];

/*
 * "Choose your home": tesla.com's row of models, one big card per tower family and the villas. Floors are
 * from the project site's floor-plan page (elements.ts). Which render shows which tower is not stated, so
 * each picture is described as what it shows.
 */
export type Model = {
  id: string;
  which: string;
  name: string;
  figure: { value: string; unit: string };
  fact: string;
  image: Img;
  film?: Film;
  href: string;
};

export const modelsHead = {
  title: "Seven towers and the villas",
  line: "2, 3\u00a0&\u00a04 BHK apartments in towers of 23 to 29 floors. 4\u00a0&\u00a05 BHK villas inside the same 20\u00a0acres.",
} as const;

export const models: Model[] = [
  {
    id: "presidential",
    which: "Towers D & E",
    name: "Presidential Towers",
    figure: { value: "29", unit: "floors" },
    fact: "Over 2 basements and 2 parking levels",
    image: still("towers-4k", 2560, 1440, "the towers above landscaped gardens", "50% 62%", "58% 50%"),
    href: `${links.elements}#presidential`,
  },
  {
    id: "premium",
    which: "Towers A, B, F & G",
    name: "Premium Towers",
    figure: { value: "25", unit: "floors" },
    fact: "Over a basement and 2 parking levels",
    image: still("out-podium", 1920, 1080, "the podium garden between two towers, from above"),
    film: film("out-podium", ["720"]),
    href: `${links.elements}#premium`,
  },
  {
    id: "millennium",
    which: "Tower C",
    name: "Millennium Tower",
    figure: { value: "23", unit: "floors" },
    fact: "Over 2 basements and 2 parking levels",
    image: still("entrance-tower", 1920, 1080, "the arched entrance of Tower C", "50% 60%", "50% 50%"),
    href: `${links.elements}#millennium`,
  },
  {
    id: "villas",
    which: "Independent villas",
    name: "Villas",
    figure: { value: "4\u00a0&\u00a05", unit: "BHK" },
    fact: "On the same 20\u00a0acres as the seven towers",
    image: still("out-villa-front", 1920, 1080, "rows of villas and their gardens, from above"),
    film: film("out-villa-front", ["720", "p"]),
    href: `${links.elements}#villas`,
  },
];

/*
 * The amenity cards, where tesla.com shows its row of models: one card per place, each a still that moves
 * (its film plays while the card is pointed at, focused, or first in the row). All renders. Names follow
 * Disha's own walkthrough films. The chips above the row filter it by tag.
 */
export const amenityTags = ["Clubhouse", "Pool", "Sports", "Outdoors", "Kids & pets"] as const;
export type AmenityTag = (typeof amenityTags)[number];
export type Amenity = { name: string; place: string; tags: AmenityTag[]; image: Img; film?: Film; href: string };

export const amenitiesHead = {
  title: "40+ amenities",
  line: "Inside the 1,35,000+\u00a0sq\u00a0ft clubhouse, on its roof, and out on the 20\u00a0acres.",
  link: { label: "See every amenity", href: `${links.elements}#amenities` },
} as const;

const clubhouseHref = `${links.elements}#clubhouse`;
const poolHref = `${links.elements}#pool`;
const outdoorsHref = `${links.elements}#outdoors`;

/* A card: its 4:5 poster (the film's first frame, 864 × 1080) and the 640 × 800 film cut for cards. */
const card = (name: string, alt: string): Pick<Amenity, "image" | "film"> => ({
  image: still(name.startsWith("card-") ? name : `${name}-card`, 864, 1080, alt),
  film: film(name, ["card"]),
});

export const amenities: Amenity[] = [
  {
    name: "Temperature-controlled rooftop pool",
    place: "Clubhouse roof",
    tags: ["Clubhouse", "Pool"],
    ...card("card-pool", "the rooftop pool and deck at dusk, the towers lit behind"),
    href: poolHref,
  },
  {
    name: "Triple-height lobby",
    place: "Clubhouse",
    tags: ["Clubhouse"],
    ...card("room-lobby", "the clubhouse lobby, the Disha Habitat name wall under the skylight"),
    href: clubhouseHref,
  },
  {
    name: "The Aqua Park",
    place: "Outdoors",
    tags: ["Pool", "Outdoors", "Kids & pets"],
    image: still("aqua-park", 1920, 1080, "the Aqua Park’s splash pool, slides and fountains", "58% 50%"),
    href: outdoorsHref,
  },
  {
    name: "Mini theatre",
    place: "Clubhouse",
    tags: ["Clubhouse"],
    ...card("card-theatre", "the mini theatre’s recliners facing its screen"),
    href: clubhouseHref,
  },
  {
    name: "Pickleball & futsal",
    place: "Outdoors",
    tags: ["Sports", "Outdoors"],
    ...card("card-courts", "the pickleball and futsal courts and the skate park from above"),
    href: outdoorsHref,
  },
  {
    name: "Rooftop terrace café",
    place: "Clubhouse, 3rd floor",
    tags: ["Clubhouse", "Pool"],
    ...card("card-terrace", "café tables on the clubhouse’s rooftop terrace"),
    href: clubhouseHref,
  },
  {
    name: "Beach volleyball",
    place: "Outdoors",
    tags: ["Sports", "Outdoors"],
    ...card("out-volleyball", "the sand court of the beach volleyball pitch, the towers behind"),
    href: outdoorsHref,
  },
  {
    name: "Library",
    place: "Clubhouse",
    tags: ["Clubhouse"],
    ...card("room-library", "reading seats and tables in the library"),
    href: clubhouseHref,
  },
  {
    name: "Pet park",
    place: "Outdoors",
    tags: ["Outdoors", "Kids & pets"],
    ...card("card-petpark", "the fenced pet park with play hurdles on the lawn"),
    href: outdoorsHref,
  },
  {
    name: "Indoor badminton",
    place: "Clubhouse",
    tags: ["Clubhouse", "Sports"],
    ...card("card-badminton", "the indoor badminton court with stepped seating"),
    href: clubhouseHref,
  },
  {
    name: "Kids’ play area",
    place: "Outdoors, on EPDM",
    tags: ["Outdoors", "Kids & pets"],
    image: still(
      "kids-play-epdm",
      1920,
      1080,
      "hopscotch on the kids’ play area’s EPDM floor, a climbing net and a play tunnel in a grass mound",
      "40% 50%",
    ),
    href: outdoorsHref,
  },
  {
    name: "Business lounge & café",
    place: "Clubhouse",
    tags: ["Clubhouse"],
    ...card("card-lounge", "co-working seats among planters in the business lounge"),
    href: clubhouseHref,
  },
  {
    name: "Skate park",
    place: "Outdoors",
    tags: ["Sports", "Kids & pets"],
    ...card("out-skate", "inline skates and a skateboard on the skate park’s floor"),
    href: outdoorsHref,
  },
  {
    name: "Music room",
    place: "Clubhouse",
    tags: ["Clubhouse"],
    ...card("room-music", "a guitar on the music room’s red wall"),
    href: clubhouseHref,
  },
  {
    name: "Mini golf",
    place: "Outdoors",
    tags: ["Sports", "Outdoors", "Kids & pets"],
    ...card("out-golf", "the putting green of the mini golf course, grass mounds around it"),
    href: outdoorsHref,
  },
  {
    name: "Gymnasium",
    place: "Clubhouse",
    tags: ["Clubhouse", "Sports"],
    ...card("card-gym", "spin bikes facing tall windows in the gymnasium"),
    href: clubhouseHref,
  },
  {
    name: "Yoga area",
    place: "Outdoors",
    tags: ["Sports", "Outdoors"],
    ...card("out-yoga-gym", "yoga mats laid out on the lawn of the yoga area, from above"),
    href: outdoorsHref,
  },
  {
    name: "Dance studio",
    place: "Clubhouse",
    tags: ["Clubhouse"],
    ...card("room-dance", "the dance studio, a wooden floor under a terracotta ceiling"),
    href: clubhouseHref,
  },
  {
    name: "Twin tennis & futsal courts",
    place: "Outdoors",
    tags: ["Sports", "Outdoors"],
    image: still("tennis-futsal", 1920, 1080, "the twin tennis and futsal courts from above, flowering trees around them"),
    href: outdoorsHref,
  },
  {
    name: "Tropical poolside café",
    place: "Clubhouse roof",
    tags: ["Pool"],
    image: still("poolside-cafe", 2000, 1125, "the poolside café at dusk under a white pergola", "60% 50%"),
    href: poolHref,
  },
];

/* The brand band, straight from the guideline: navy, a huge sky "come home", and the record in figures. */
export const brand = {
  tagline: "come home",
  /* The figures follow, so the line says how to check them rather than repeating them. */
  line: "Every figure here can be checked: each community has its own page, and the rating is MyGate’s.",
  figures: [
    { value: handed, label: "Homes handed over since 2015" },
    { value: "5", label: "Communities handed over" },
    {
      value: `${residentRating.score}/${residentRating.outOf}`,
      label: `${residentRating.community.replace("Disha ", "")} on ${residentRating.source}, ${residentRating.reviews} reviews`,
      note: "1",
    },
  ],
  award: {
    title: award.title,
    honour: award.honour,
    citation: award.citation,
    image: {
      src: award.image,
      width: 315,
      height: 227,
      alt: `The ${award.title} ${award.honour} for ${award.project}: ${award.citation}`,
    } satisfies Img,
  },
  link: { label: "Read our story", href: links.story } satisfies Cta,
};

/*
 * The client's four official walkthrough edits, with music: "<name>-1080.mp4" and "<name>-720.mp4", poster
 * "<name>.webp". Nothing loads until one is opened (WatchFilm). The home page's amenity row opens "The roof
 * at dusk", the pool at night.
 */
export type ShortFilm = { src: string; poster: Img; title: string; line: string; seconds: number };

const short = (name: string, title: string, line: string, alt: string, seconds: number): ShortFilm => ({
  src: `${films}/${name}`,
  poster: still(name, 1920, 1080, alt),
  title,
  line,
  seconds,
});

export const shorts: ShortFilm[] = [
  short(
    "short-clubhouse-1",
    "Business lounge & café",
    "Reception, the conference room, co-working and the café corner",
    "the café corner of the clubhouse’s business lounge & café",
    20,
  ),
  short("short-clubhouse-2", "Gymnasium", "Free weights, spin bikes and the sprint track", "spin bikes by the windows of the gymnasium", 20),
  short(
    "short-1",
    "Mini golf to the Aqua Park",
    "A quick-play golf course, the pet park and the kids’ Aqua Park",
    "the Aqua Park’s slides and splash pool",
    20,
  ),
  short(
    "short-4",
    "The roof at dusk",
    "Rooftop terrace café, tropical poolside café, pool deck and kids’ pool",
    "two cocktails by the rooftop pool at dusk",
    21,
  ),
];

/* The map's heading. Under the map, each community handed over is shown in a photograph, never a render. */
export const mapHead = {
  title: "Six communities on one map",
  line: "Pursuit of the Elements in Gunjur, selling now, and the five handed over since 2015.",
} as const;

/* Every community, newest first after the one on sale. */
export type Community = {
  slug: string;
  name: string;
  eyebrow: string;
  place: string;
  line: string;
  image: Img;
  render?: boolean;
  ctas: Cta[];
};

export const communities: Community[] = [
  {
    slug: "pursuit-of-the-elements",
    name: "Pursuit of the Elements",
    eyebrow: "Now selling",
    place: "Gunjur, East Bengaluru",
    line: "2, 3 & 4 BHK apartments · 4 & 5 BHK villas",
    image: {
      src: `${pics}/aerial-day.webp`,
      width: 2560,
      height: 1440,
      alt: "Artist’s impression from above of the Pursuit of the Elements towers, villas and central gardens",
      position: "50% 50%",
      mobilePosition: "62% 50%",
    },
    render: true,
    ctas: [bookVisit, { label: "Explore", href: links.elements }],
  },
  {
    slug: "disha-pursuit-of-sunshine",
    name: "Pursuit of Sunshine",
    eyebrow: "Handed over 2025",
    place: "Budigere Road",
    line: "322 homes on 4 acres",
    image: {
      src: "/images/pursuit-of-sunshine/pool-aerial.webp",
      width: 1313,
      height: 739,
      alt: "Overhead view of a swimmer in the turquoise pool at Disha Pursuit of Sunshine",
      position: "50% 50%",
      mobilePosition: "56% 50%",
    },
    ctas: [{ label: "Explore", href: communityHref("disha-pursuit-of-sunshine") }],
  },
  {
    slug: "disha-courtyard",
    name: "Courtyard",
    eyebrow: "Handed over 2021",
    place: "Hagadur Village",
    line: "264 homes on 3.6 acres",
    image: {
      src: "/images/courtyard/pool-court.jpg",
      width: 1920,
      height: 1480,
      alt: "Disha Courtyard’s white and terracotta blocks around a pool and landscaped lawn",
      position: "50% 58%",
      mobilePosition: "55% 50%",
    },
    ctas: [{ label: "Explore", href: communityHref("disha-courtyard") }],
  },
  {
    slug: "disha-central-park",
    name: "Central Park",
    eyebrow: "Handed over 2018",
    place: "Panathur–Varthur Road",
    line: "306 homes on 3.5 acres",
    image: {
      src: "/images/central-park/clubhouse-night.webp",
      width: 1920,
      height: 1174,
      alt: "Night aerial of the clubhouse and illuminated pool at Disha Central Park",
      position: "50% 55%",
      mobilePosition: "48% 50%",
    },
    ctas: [{ label: "Explore", href: communityHref("disha-central-park") }],
  },
  {
    slug: "disha-park-west",
    name: "Park West",
    eyebrow: "Handed over 2018",
    place: "Bengaluru",
    line: "118 homes on 1.5 acres",
    image: {
      src: "/images/park-west/facade.jpg",
      width: 1440,
      height: 960,
      alt: "Disha Park West’s mustard and white residential block in warm afternoon light",
      position: "50% 45%",
      mobilePosition: "62% 50%",
    },
    ctas: [{ label: "Explore", href: communityHref("disha-park-west") }],
  },
  {
    slug: "disha-windsor-gardens",
    name: "Windsor Gardens",
    eyebrow: "Handed over 2015",
    place: "Panathur–Varthur Road",
    line: "92 homes on 1.25 acres",
    image: {
      src: "/images/windsor-gardens/aerial.jpg",
      width: 1313,
      height: 739,
      alt: "Aerial view of Disha Windsor Gardens among coconut palms, with the city skyline behind",
      position: "50% 55%",
      mobilePosition: "50% 50%",
    },
    ctas: [{ label: "Explore", href: communityHref("disha-windsor-gardens") }],
  },
];

/* The last thing on the page: one clear next step, over the community at night. */
export const closing = {
  title: "See it in person",
  line: `Gunjur, East Bengaluru. The sales team takes calls and WhatsApp on ${elements.phone.display}.`,
  film: film("pote-night", ["720", "p"]),
  image: still("pote-night", 1920, 1080, "Pursuit of the Elements at night, the towers lit above the pool"),
};

/* The header: one menu with every community (like tesla.com's Vehicles), then plain links. */
export const nav = [
  { label: "Pursuit of the Elements", href: links.elements },
  { label: "Our story", href: links.story },
  { label: "Checklist", href: links.checklist },
  { label: "Contact", href: links.contact },
] as const;

export const homesMenuLinks = [
  { label: "All homes", href: links.homes },
  { label: "Book a visit", href: links.bookVisit },
  { label: "Construction updates", href: links.updates },
  { label: "EMI calculator", href: links.emi },
  { label: "Check a RERA number", href: links.rera },
] as const;
