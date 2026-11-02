/*
 * The five Disha Habitat communities. Figures come from each project's page on
 * dishahabitat.com ("About the project"); Pursuit of Sunshine details also come from
 * the official project site dishapursuitofsunshine.com. Nothing here is estimated.
 * Where the source was silent (e.g. Park West's address), the field is omitted.
 */

export type MediaKind = "photo" | "render" | "plan";

export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  kind: MediaKind;
};

export type Project = {
  slug: string;
  name: string;
  shortName: string;
  index: string;
  locality: string;
  address?: string;
  intro: string;
  facts: { label: string; value: string }[];
  timeline: { start: string; completion: string; handover: string; months: number };
  handoverYear: number;
  cover: Media;
  gallery: Media[];
  highlights?: { name: string; text: string }[];
  otherAmenities?: string[];
  specifications?: { group: string; items: string[] }[];
  rera?: string;
  website?: { label: string; href: string };
  salesPhone?: { display: string; href: string };
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* "April 2015" → months since year 0, so the months between two milestones can be counted. */
export const monthIndex = (date: string) => {
  const [month, year] = date.split(" ");
  const m = MONTHS.indexOf(month);
  if (m < 0 || !/^\d{4}$/.test(year ?? "")) throw new Error(`Not a "Month YYYY" date: ${date}`);
  return Number(year) * 12 + m;
};

/* The milestones as published. "Start to finish" is counted from the start and OC dates, so it can never disagree with them. */
const built = (t: { start: string; completion: string; handover: string }) => ({
  ...t,
  months: monthIndex(t.completion) - monthIndex(t.start),
});

const img = (
  src: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
  kind: MediaKind = "photo",
): Media => ({ src, width, height, alt, caption, kind });

export const projects: Project[] = [
  {
    slug: "disha-pursuit-of-sunshine",
    name: "Disha Pursuit of Sunshine",
    shortName: "Pursuit of Sunshine",
    index: "05",
    locality: "Budigere Road, Bengaluru",
    intro:
      "322 homes on 4 acres off Budigere Road, in two towers of 19 floors. Every home has an 8\u00a0ft\u00a0×\u00a012\u00a0ft sundeck.",
    facts: [
      { label: "Project size", value: "4 acres" },
      { label: "Homes", value: "322" },
      { label: "Home types", value: "2 & 3 BHK" },
      { label: "Floors", value: "19 + basement" },
      { label: "Built-up area", value: "6,20,000 sq ft" },
      { label: "Signature feature", value: "8\u00a0ft\u00a0×\u00a012\u00a0ft sundecks" },
      { label: "Project type", value: "Gated community" },
    ],
    timeline: built({ start: "January 2023", completion: "March 2025", handover: "June 2025" }),
    handoverYear: 2025,
    cover: img(
      "/images/pursuit-of-sunshine/towers.webp",
      1313,
      739,
      "The two residential towers of Disha Pursuit of Sunshine rising above a line of trees",
      "The towers at Disha Pursuit of Sunshine",
    ),
    gallery: [
      img(
        "/images/pursuit-of-sunshine/pool-aerial.webp",
        1313,
        739,
        "Overhead view of a swimmer in the turquoise pool at Disha Pursuit of Sunshine",
        "The swimming pool, from above",
      ),
      img(
        "/images/pursuit-of-sunshine/sundial.webp",
        1313,
        739,
        "A large stone sundial set into a circular plaza, with a pergola behind it",
        "The Vrihat Samrat Yantra, the community’s sundial",
      ),
      img(
        "/images/pursuit-of-sunshine/treehouse.webp",
        1313,
        739,
        "A wooden treehouse play structure lit warmly at dusk",
        "The treehouse at dusk",
      ),
      img(
        "/images/pursuit-of-sunshine/cafe.webp",
        1313,
        739,
        "A café with sage-green tiles, timber ceiling slats and fresh flowers on the counter",
        "The clubhouse café",
      ),
      img(
        "/images/pursuit-of-sunshine/games-room.webp",
        1313,
        739,
        "A games room with a billiards table, foosball and a large mural",
        "The games room",
      ),
      img(
        "/images/pursuit-of-sunshine/entrance-aerial.webp",
        1313,
        739,
        "Aerial view of a compass rose paved into the entrance plaza beside a canopy",
        "The entrance plaza, from above",
      ),
      img(
        "/images/pursuit-of-sunshine/render-surya-stambh.jpg",
        1440,
        850,
        "Artist’s impression of the Surya Stambh tower at the entrance, framed by palms",
        "The Surya Stambh at the entrance (artist’s impression)",
        "render",
      ),
      img(
        "/images/pursuit-of-sunshine/render-sundeck.jpg",
        1920,
        1080,
        "Artist’s impression of a sundeck at night with lounge chair, plants and a telescope",
        "A sundeck after dark (artist’s impression)",
        "render",
      ),
      img(
        "/images/pursuit-of-sunshine/master-plan.webp",
        1000,
        707,
        "Master plan of Disha Pursuit of Sunshine showing the two blocks, courts and landscaped grounds",
        "Master plan",
        "plan",
      ),
    ],
    highlights: [
      {
        name: "Surya Stambh",
        text: "The sun tower at the entrance.",
      },
      {
        name: "Vrihat Samrat Yantra",
        text: "A working sundial, modelled on the great stone instrument at the Jaipur observatory.",
      },
      {
        name: "Pada Abhyangam",
        text: "A reflexology path to walk barefoot, in the open sun.",
      },
      {
        name: "Vatika",
        text: "Seating in the shade of a wide-branched tree.",
      },
      {
        name: "Vyayam-Idam",
        text: "An open-air fitness arena, under the sky.",
      },
      {
        name: "Paw Park",
        text: "A pet park among the flower gardens.",
      },
      {
        name: "Checkmate",
        text: "A giant outdoor chessboard.",
      },
      {
        name: "Business Centre",
        text: "A Wi-Fi workspace inside the community.",
      },
      {
        name: "Swimming pool",
        text: "Temperature-controlled, at the clubhouse.",
      },
    ],
    otherAmenities: [
      "Chitchat zone",
      "Beach volleyball & futsal courts",
      "Flower garden",
      "Gazebo",
      "Outdoor party space",
      "Indoor party hall",
      "Spa",
      "Clubhouse",
      "Badminton courts",
      "Gym",
      "Amphitheatre",
      "Kids’ play area",
      "Visitors’ parking",
    ],
    specifications: [
      {
        group: "Structure",
        items: [
          "RCC framed structure designed to Seismic Zone II requirements",
          "External walls: 150 mm solid cement concrete / Porotherm blocks",
          "Internal walls: 100 mm solid cement concrete / Porotherm blocks",
          "Waterproofing in terrace, toilets, balcony and utility",
        ],
      },
      {
        group: "Flooring",
        items: [
          "Vitrified tiles in living, dining, kitchen and bedrooms",
          "Wooden floor finish in the master bedroom",
          "Anti-skid ceramic tiles in balcony, utility and toilets",
        ],
      },
      {
        group: "Bath & kitchen",
        items: [
          "Fittings by Grohe, Vitra or equal make",
          "Ceramic dado tiles up to 7 ft in toilets",
          "Provision for water purifier, washing machine, refrigerator, microwave and chimney",
        ],
      },
    ],
    rera: "PRM/KA/RERA/1251/446/PR/100323/005790",
    // website: dishapursuitofsunshine.com fails its secure connection (TLS "unrecognized name", 18 Oct 2026).
    // Restore the link once the client fixes it: { label: "dishapursuitofsunshine.com", href: "https://dishapursuitofsunshine.com/" }
    salesPhone: { display: "+91 95053 33333", href: "tel:+919505333333" },
  },
  {
    slug: "disha-courtyard",
    name: "Disha Courtyard",
    shortName: "Courtyard",
    index: "04",
    locality: "Hagadur Village, Bengaluru",
    address: "13/1, 13/3, 13/4, Vijayanagara, Hagadur Village, near Ganesh Temple, Bengaluru 560066",
    intro:
      "264 homes across 3.6 acres, in terracotta and white, gathered around a landscaped court with a pool, lawns and a giant chessboard.",
    facts: [
      { label: "Project size", value: "3.6 acres" },
      { label: "Homes", value: "264" },
      { label: "Saleable area", value: "2,98,840 sq ft" },
      { label: "Built-up area", value: "3,88,492 sq ft" },
    ],
    timeline: built({ start: "December 2018", completion: "July 2021", handover: "April 2021" }),
    handoverYear: 2021,
    cover: img(
      "/images/courtyard/pool-court.jpg",
      1920,
      1480,
      "Disha Courtyard’s white and terracotta blocks around a pool and landscaped lawn",
      "The central court at Disha Courtyard",
    ),
    gallery: [
      img(
        "/images/courtyard/facade.jpg",
        1920,
        1280,
        "Looking up at a Disha Courtyard block with terracotta panels and white lattice screens",
        "Terracotta and lattice, Disha Courtyard",
      ),
      img(
        "/images/courtyard/giant-chess.jpg",
        1920,
        1280,
        "A young boy standing among giant chess pieces in the Disha Courtyard",
        "The giant chessboard",
      ),
      img(
        "/images/courtyard/yoga-lawn.jpg",
        1920,
        1280,
        "A resident walking past a group practising yoga on the lawn",
        "Morning on the yoga lawn",
      ),
      img(
        "/images/courtyard/facade-pool.jpg",
        1920,
        1280,
        "A Disha Courtyard tower rising behind the pool deck and palms",
        "Pool deck and tower",
      ),
    ],
  },
  {
    slug: "disha-central-park",
    name: "Disha Central Park",
    shortName: "Central Park",
    index: "02",
    locality: "Panathur–Varthur Road, Bengaluru",
    address: "14, 15/1 & 15/2, Panathur–Varthur Road, Bengaluru 560103",
    intro:
      "306 homes on 3.5 acres off Panathur–Varthur Road. The glass-walled clubhouse cantilevers over the pool and lights up at dusk.",
    facts: [
      { label: "Project size", value: "3.5 acres" },
      { label: "Homes", value: "306" },
      { label: "Saleable area", value: "3,81,150 sq ft" },
      { label: "Built-up area", value: "5,33,610 sq ft" },
    ],
    timeline: built({ start: "April 2015", completion: "October 2018", handover: "July 2018" }),
    handoverYear: 2018,
    cover: img(
      "/images/central-park/clubhouse-dusk.jpg",
      1920,
      1280,
      "The glass clubhouse at Disha Central Park lit at dusk, cantilevered over the pool",
      "The clubhouse at dusk, Disha Central Park",
    ),
    gallery: [
      img(
        "/images/central-park/clubhouse-night.jpg",
        1920,
        1280,
        "Night aerial of the clubhouse and illuminated pool at Disha Central Park",
        "Clubhouse and pool after dark",
      ),
      img(
        "/images/central-park/staircase.jpg",
        1920,
        1280,
        "A man climbing an open white staircase beside a reflecting pool",
        "The open staircase",
      ),
      img(
        "/images/central-park/living-room.jpg",
        1920,
        1280,
        "A warmly lit living and dining room inside a Disha Central Park home",
        "Inside a home at Disha Central Park",
      ),
    ],
  },
  {
    slug: "disha-park-west",
    name: "Disha Park West",
    shortName: "Park West",
    index: "03",
    locality: "Bengaluru",
    intro:
      "118 homes on 1.5 acres, in mustard and white, handed over in 2018.",
    facts: [
      { label: "Project size", value: "1.5 acres" },
      { label: "Homes", value: "118" },
      { label: "Saleable area", value: "1,96,876 sq ft" },
      { label: "Built-up area", value: "2,55,938 sq ft" },
    ],
    timeline: built({ start: "January 2016", completion: "October 2018", handover: "July 2018" }),
    handoverYear: 2018,
    cover: img(
      "/images/park-west/facade.jpg",
      1440,
      960,
      "Disha Park West’s mustard and white residential block in warm afternoon light",
      "Disha Park West",
    ),
    gallery: [
      img(
        "/images/park-west/entrance.jpg",
        1440,
        960,
        "The Disha Park West entrance arch with the project name in lettering",
        "The entrance at Disha Park West",
      ),
    ],
  },
  {
    slug: "disha-windsor-gardens",
    name: "Disha Windsor Gardens",
    shortName: "Windsor Gardens",
    index: "01",
    locality: "Panathur–Varthur Road, Bengaluru",
    address: "71/3, 71/6, Panathur–Varthur Road, Bengaluru 560087",
    intro:
      "Disha’s first community. 92 homes on 1.25 acres among coconut palms, off Panathur–Varthur Road.",
    facts: [
      { label: "Project size", value: "1.25 acres" },
      { label: "Homes", value: "92" },
      { label: "Saleable area", value: "1,51,580 sq ft" },
      { label: "Built-up area", value: "1,97,054 sq ft" },
    ],
    timeline: built({ start: "January 2014", completion: "December 2015", handover: "September 2015" }),
    handoverYear: 2015,
    cover: img(
      "/images/windsor-gardens/aerial.jpg",
      1313,
      739,
      "Aerial view of Disha Windsor Gardens among coconut palms, with the city skyline behind",
      "Disha Windsor Gardens from above",
    ),
    gallery: [
      img(
        "/images/windsor-gardens/play-area.jpg",
        1440,
        960,
        "A children’s climbing frame with red rope nets in a sunlit play area",
        "The play area",
      ),
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/* Chronological order (by handover), for the journey timeline. */
export const projectsByHandover = [...projects].sort(
  (a, b) => a.handoverYear - b.handoverYear || a.index.localeCompare(b.index),
);

/* The order used in every list and menu: newest handover first (after the project on sale). */
export const projectsNewestFirst = [...projectsByHandover].reverse();
