/*
 * Disha Pursuit of the Elements, Gunjur: the project Disha Habitat is selling now.
 * Every fact comes from dishapursuitoftheelements.com (home, floor plans, amenities, updates)
 * and the featured-project banner on dishahabitat.com, inspected 12 October 2026. Amenity names
 * also come from Disha's own walkthrough films and render files (October 2026).
 * The pictures and films are Disha's own computer renders, so every one is labelled an artist's impression.
 */
import type { Img } from "@/lib/content";
import type { Film, Rendition } from "@/lib/film";
import type { Media } from "@/lib/projects";

export type Group = "Exteriors" | "Clubhouse" | "Outdoors" | "Homes";
/* A render, with the group it is filed under in the gallery and where it is anchored when cropped. */
export type Picture = Media & Pick<Img, "position" | "mobilePosition"> & { group?: Group };
/* A silent film and the still it starts from (its exact first frame). */
export type Reel = { film: Film; poster: Picture };
/*
 * A room of the clubhouse or a zone of the grounds, for the browsers on the page: its name in the client's files,
 * one line on what is there, the floor when the files give one, and its film (a wide cut and, for phones, a 4:5
 * card cut with its own first frame). A zone with no film yet shows its still.
 */
export type Spot = { name: string; line: string; where?: string; film?: Film; card?: Film; poster: Picture; cardPoster?: Picture };
/* One of the client's edited films with music, played on request (components/brand/WatchFilm). */
export type Short = { src: string; poster: Picture; title: string; line: string };

const dir = "/images/pursuit-of-the-elements";

const render = (name: string, width: number, height: number, alt: string, caption: string, group?: Group, position?: string, mobilePosition?: string): Picture => ({
  src: `${dir}/${name}.webp`,
  width,
  height,
  alt: `Artist’s impression of ${alt}`,
  caption,
  kind: "render",
  group,
  position,
  mobilePosition,
});

/* A film in /media/elements, encoded in the cuts listed (lib/film.ts), with its poster beside the stills. */
const reel = (name: string, renditions: Rendition[], alt: string, caption: string, position?: string, mobilePosition?: string, poster: [number, number] = [1920, 1080]): Reel => ({
  film: { src: `/media/elements/${name}`, renditions },
  poster: render(name, poster[0], poster[1], alt, caption, undefined, position, mobilePosition),
});

/* A room or zone with a film: the wide cuts for the large frame, and the card cut (with its first frame) for a phone. */
const spot = (name: string, cuts: Rendition[], label: string, line: string, alt: string, where?: string, position?: string): Spot => {
  const src = `/media/elements/${name}`;
  const card = cuts.includes("card");
  return {
    name: label,
    line,
    where,
    film: { src, renditions: cuts.filter((c) => c !== "card") },
    card: card ? { src, renditions: ["card"] } : undefined,
    poster: render(name, 1920, 1080, alt, label, undefined, position),
    cardPoster: card ? render(`${name}-card`, 864, 1080, alt, label) : undefined,
  };
};

/* A zone shown by its still alone. */
const still = (name: string, width: number, height: number, label: string, line: string, alt: string): Spot => ({
  name: label,
  line,
  poster: render(name, width, height, alt, label),
});

const short = (name: string, title: string, line: string, alt: string): Short => ({
  src: `/media/elements/${name}`,
  poster: render(name, 1920, 1080, alt, title),
  title,
  line,
});

export const elements = {
  slug: "pursuit-of-the-elements",
  href: "/homes/pursuit-of-the-elements",
  name: "Disha Pursuit of the Elements",
  shortName: "Pursuit of the Elements",
  locality: "Gunjur, East Bengaluru",
  status: "Now selling",
  /* From the featured-project banner on dishahabitat.com. */
  offer: "Last few 2, 3 & 4 BHK homes",
  tagline: "Let it all come to you.",
  intro:
    "Disha Pursuit of the Elements, located at Gunjur, draws inspiration from the five elements of nature. The core elemental attributes of space, fire, air, water and earth have been captured in every aspect of the homes and amenities here.",
  fiveElements: ["Space", "Fire", "Air", "Water", "Earth"],
  facts: [
    { label: "Land", value: "20 acres" },
    { label: "Apartments", value: "2, 3 & 4 BHK" },
    { label: "Villas", value: "4 & 5 BHK" },
    { label: "Clubhouse", value: "1,35,000+ sq ft" },
    { label: "Amenities", value: "40+" },
    { label: "Towers", value: "7, up to 29 floors" },
  ],
  towers: [
    { name: "Premium Towers", which: "A, B, F, G", floors: "Basement + 2 parking levels + 25 floors" },
    { name: "Presidential Towers", which: "D, E", floors: "2 basements + 2 parking levels + 29 floors" },
    { name: "Millennium Tower", which: "C", floors: "2 basements + 2 parking levels + 23 floors" },
    { name: "Villas", which: "", floors: "Independent villas within the community" },
  ],
  cover: render("towers-4k", 2560, 1440, "the Pursuit of the Elements towers above landscaped gardens", "The towers", "Exteriors", "50% 62%", "62% 50%"),
  /* The films, each with its first frame as its poster. Phones get the portrait cut (lib/film.ts); the
   * poster's phone position matches where that cut was taken from the frame. */
  films: {
    hero: reel("pote-hero", ["1080", "720", "p"], "the central gardens, courts and villa rows from high up beside a tower", "The gardens from above", undefined, "65% 50%"),
    home: reel("pote-home", ["720", "p"], "a front door opening onto a living room", "Front door, living room, master bedroom", undefined, "47% 50%"),
    overVillas: reel("out-balcony", ["720", "p"], "the villa rows, lawns, courts and a pool from the tower side, from above", "From the towers: villa rows, lawns and courts"),
    towers: reel("hero-towers", ["1080", "720", "p"], "the towers rising above the central gardens", "The towers"),
    villas: reel("pote-villas", ["720", "p"], "the villa rows from above, the camera pulling back over their gardens", "The villas"),
    villaRows: reel("out-villa-front", ["720", "p"], "low over the villa fronts, rising to the villa cluster round its central garden and pool", "Villa fronts, then the cluster round its garden and pool"),
    villasAerial: reel("out-villas", ["720", "p"], "the villa clusters round a green court, the clubhouse and a tower beside them, from above", "The villa clusters, the clubhouse and a tower"),
    clubhouse: reel("club-night", ["720", "p"], "the clubhouse lit up at night, its rooftop pool glowing", "The clubhouse at night", "47% 50%"),
    clubFront: reel("club-elevation", ["720", "p"], "the clubhouse front with its round cut-outs and green ledges, towers behind", "The clubhouse from the street", "62% 50%"),
    clubAerial: reel("club-aerial", ["720", "p"], "the clubhouse from above, its rooftop pool and solar roof, villas behind", "The rooftop pool and the solar roof"),
    outdoors: reel("pote-outdoors", ["720", "p"], "the amphitheatre lawns and the Highpoint pavilion from above", "The amphitheatre and the Highpoint pavilion"),
    night: reel("pote-night", ["720", "p"], "the towers and villas lit at night, seen from above", "At night"),
    pool: reel("card-pool", ["card"], "the rooftop pool as the sun sets and the lights come on", "Sunset on the rooftop pool", undefined, undefined, [864, 1080]),
  },
  /* One picture for each of the five elements, behind the words as they come forward; the caption names the place. */
  elementPictures: {
    Space: render("aerial-arena", 2560, 1440, "the central arena from above, between the towers", "The Central arena"),
    Fire: render("camping", 1920, 1080, "a fire pit in the camping zone, tents beyond", "The fire pit in the camping zone"),
    Air: render("yoga-deck", 1920, 1080, "the open-air yoga deck, mats laid out under a painted wall", "The open-air yoga deck"),
    Water: render("elements-plaza", 2560, 1440, "the Elements plaza, its stepped pools and fountains among palms", "The Elements plaza"),
    Earth: render("mound-opening", 1920, 1080, "a tower seen through a round opening in a grassy mound", "The mound"),
  } as Record<string, Picture>,
  /* The clubhouse room by room, from the client's walkthrough films (October 2026), lobby first and the roof last. */
  clubRooms: [
    spot("room-lobby", ["720", "p", "card"], "Triple-height lobby", "The Disha name on the stone wall, and the floors rising to a skylight.", "the triple-height clubhouse lobby"),
    spot("room-reception", ["720", "card"], "Reception", "The front desk beside the clubhouse name board, lounge chairs in front.", "the clubhouse reception desk"),
    spot("room-cowork", ["720", "card"], "Co-working business centre", "A long wooden table, lounge seats and glass-walled offices.", "the co-working business centre"),
    spot("room-conference", ["720", "card"], "Conference room", "One long table under pendant lights.", "the conference room’s long table"),
    spot("room-library", ["720", "card"], "Library", "Reading tables, and a book left open.", "a reading table in the library"),
    spot("room-classroom", ["720", "card"], "Classroom", "Wooden desks, a whiteboard, and sketches of India’s leaders on the wall.", "the classroom’s desks and whiteboard"),
    spot("room-theatre", ["720"], "Mini theatre", "Recliners in rows, facing the screen.", "the mini theatre’s recliners"),
    spot("room-music", ["720", "card"], "Music room", "A guitar on a red wall, a sitar and tabla drawn on the panels.", "the music room’s guitar wall"),
    spot("room-dance", ["720", "card"], "Dance studio", "A wooden floor, a ballet barre and lockers.", "the dance studio"),
    spot("room-gym", ["720", "card"], "Gymnasium", "A squat rack, dumbbells, kettlebells and medicine balls, by the windows.", "the gymnasium’s free weights"),
    spot("room-badminton", ["720", "card"], "Indoor badminton", "A green court, rackets and shuttles at the net, sports murals on the walls.", "the indoor badminton court"),
    spot("room-tt", ["720", "card"], "Table tennis", "A table, a bat and a ball, from above.", "a table tennis table from above"),
    spot("room-games", ["720", "card"], "Indoor games", "A pool table, the balls racked.", "the pool table in the indoor games room"),
    spot("room-banquet", ["720", "card"], "Banquet hall", "Round tables and white-covered chairs.", "the banquet hall laid for a dinner"),
    spot("room-guest", ["720", "card"], "Guest rooms", "A bed, a TV wall and botanical wallpaper, for family who come to stay.", "a guest room in the clubhouse"),
    spot("room-senior", ["720", "card"], "Senior citizens’ lounge", "Lounge seating by the windows.", "the senior citizens’ lounge"),
    spot("room-yoga", ["720", "card"], "Yoga deck", "Open-air mats and a meditation mural.", "the open-air yoga deck", "1st floor"),
    spot("room-terrace", ["720", "card"], "Terrace seating", "Café tables beside a lily-pond water channel and green walls.", "the terrace seating", "2nd floor"),
    spot("room-cafe", ["720"], "Rooftop terrace café", "Tables on the roof at sunset.", "the rooftop terrace café at sunset", "3rd floor"),
  ] as Spot[],
  /* The grounds zone by zone: the zones on film first, then the ones with a still. */
  zones: [
    still("aqua-park", 1920, 1080, "The Aqua Park", "Slides and fountains over a shallow pool.", "a water play pool with slides and fountains"),
    spot("out-elements", ["720", "p", "card"], "Elements plaza", "A water grid of planters and sculptures, the golden Elements globe beside it.", "the Elements plaza and its globe sculpture from above"),
    spot("hero-clubhouse", ["1080", "720", "p"], "Amphitheatre", "Grass steps down to a stage, the Elements globe beyond.", "the amphitheatre and the globe beyond it"),
    spot("out-kids-play", ["720", "card"], "Kids’ play area", "Slides on a grass mound, swings and a climbing frame by a water rill.", "the kids’ play area among the towers"),
    still("kids-play-epdm", 1920, 1080, "Play floor on EPDM", "Hopscotch on the soft floor, a climbing net and a tunnel through the mound.", "the kids’ play area on EPDM, a climbing net and a tunnel"),
    still("toddler-sand-pit", 1920, 1080, "Toddlers’ sand pit and floral garden", "A dome climber and a play wall with round openings.", "the toddlers’ sand pit, a dome climber and a play wall"),
    spot("hero-outdoors", ["1080", "720", "p"], "Pickleball court", "Pickleball, the sand court and the skate park, side by side.", "the pickleball court, sand court and skate park"),
    spot("out-volleyball", ["720", "card"], "Beach volleyball", "A sand court and net, an umbrella and a deck chair.", "the beach volleyball court"),
    spot("out-skate", ["720", "card"], "Skate park", "Skates and a board on the bowl’s concrete.", "skates and a skateboard in the skate bowl"),
    still("tennis-futsal", 1920, 1080, "Twin tennis & futsal courts", "Both courts from above, flowering trees round them.", "the twin tennis and futsal courts from above"),
    spot("out-petpark", ["720", "p", "card"], "Pet park", "A fenced run with agility hurdles, a seating lawn beside it.", "the pet park from above", undefined, "18% 50%"),
    spot("out-golf", ["720", "p", "card"], "Mini golf", "A putting green among grass mounds, a curved bench beside it.", "the mini golf putting green"),
    spot("out-yoga-gym", ["720", "p", "card"], "Yoga lawn", "Mats laid out on the lawn, then the outdoor gym beside it.", "the yoga lawn from above"),
    still("outdoor-gym-aerial", 1920, 1080, "Outdoor gym", "Exercise stations along a garden path, under flowering trees.", "the outdoor gym stations along a garden path"),
    still("jogging-track", 2560, 1440, "Jogging track", "A running lane along the lawn, past a swing pavilion.", "the jogging track beside a lawn and a swing pavilion"),
    spot("out-podium", ["720", "card"], "Podium garden", "Concentric paving, mosaic benches and a pergola between two towers.", "the podium garden between two towers"),
    still("picnic-tents", 1920, 1080, "Picnic tents", "Tents under shade sails on the lawn.", "picnic tents under shade sails, villas behind"),
    still("camping", 1920, 1080, "Camping zone", "A fire pit, the tents beyond.", "a fire pit in the camping zone, tents beyond"),
    still("lily-pond", 1920, 1080, "Lily pond pavilion", "A pavilion over the water.", "the lily pond and its pavilion"),
    still("highpoint", 1920, 1080, "Highpoint pavilion", "Planted on top, open underneath.", "the Highpoint pavilion, planted on top and open below"),
    still("mound-opening", 1920, 1080, "The mound", "A grass hill with a round opening.", "a tower seen through a round opening in a grassy mound"),
    still("giant-chess", 1920, 1080, "Giant chess", "A chessboard laid into a terrace.", "a giant chessboard on a terrace"),
    still("rock-garden", 1920, 1080, "Rock garden", "Boulders and palms.", "a rock garden of boulders and palms"),
    still("vegetable-garden", 1920, 1080, "Vegetable garden", "Raised beds in front of the villas.", "beds of vegetables in front of the villas"),
  ] as Spot[],
  /* The rooftop pool, by day and at night, and the places to eat and drink beside it. */
  poolDay: render("pool-day", 2560, 1440, "the rooftop pool deck by day", "The rooftop pool by day", "Clubhouse"),
  poolNight: render("pool-night", 2560, 1440, "the rooftop pool deck at night, loungers under umbrellas", "The rooftop pool at night", "Clubhouse"),
  poolside: [
    render("poolside-cafe", 2000, 1125, "the poolside café at dusk under a white pergola", "Tropical poolside café", "Clubhouse"),
    render("juice-bar", 1920, 1080, "a red juice on the juice bar’s counter, a Disha menu card beside it", "Juice bar", "Clubhouse"),
    render("pool-full", 1920, 1080, "the rooftop pool end to end, loungers under the pergola, towers behind", "Loungers under the pergola", "Clubhouse"),
    render("pool-rooftop-night", 1920, 1080, "the rooftop pool at night from above, the towers lit behind", "The roof at night", "Clubhouse"),
  ],
  /* The client's four edited walkthroughs, with music. */
  shorts: [
    short("short-4", "The rooftop at dusk", "Terrace café, tropical poolside café, the pool deck and the temperature-controlled pool.", "cocktails by the rooftop pool"),
    short("short-clubhouse-1", "Business lounge & café", "Reception, the conference room, co-working and the café corner.", "the café corner of the business lounge"),
    short("short-clubhouse-2", "Gymnasium", "Free weights, spin bikes and the sprint track.", "spin bikes in the gymnasium"),
    short("short-1", "Mini golf, pet park, Aqua Park", "Putting greens, agility hurdles, and slides over a shallow pool.", "the kids’ Aqua Park"),
  ] as Short[],
  /* Every picture, filed by group for the gallery's filter. Pictures shown above are in it too, so it is the one place to see them all. */
  gallery: [
    render("aerial-day", 2560, 1440, "the towers, villas and gardens from above", "From above", "Exteriors"),
    render("clubhouse-globe", 1920, 1080, "the clubhouse behind the sculpted globe at its entrance", "The Elements globe roundabout", "Exteriors"),
    render("elements-plaza", 2560, 1440, "the Elements plaza, its stepped pools and fountains among palms", "Elements plaza", "Exteriors"),
    render("villas-street", 1920, 1080, "a row of villas from the street", "The villas", "Exteriors"),
    render("towers-4k", 2560, 1440, "the Pursuit of the Elements towers above landscaped gardens", "The towers", "Exteriors"),
    render("aerial-night", 1920, 1080, "the community lit at night, seen from above", "At night", "Exteriors"),
    render("aerial-arena", 2560, 1440, "the central arena from above, between the towers", "Central arena", "Exteriors"),
    render("clubhouse-aerial", 1920, 1080, "the clubhouse from above, the villas behind it", "The clubhouse from above", "Exteriors"),
    render("clubhouse-front", 1920, 1080, "the clubhouse entrance steps and its name wall", "The clubhouse entrance", "Exteriors"),
    render("entrance-tower", 1920, 1080, "the arched entrance of Tower C", "Tower C entrance", "Exteriors"),
    render("driveway", 1920, 1080, "the tree-lined driveway between the towers", "The driveway", "Exteriors"),
    render("entry-gate", 1920, 1080, "the entry gate from the road", "The entry gate", "Exteriors"),
    render("villas-aerial", 1920, 1080, "the villa rows and their gardens from above", "The villas from above", "Exteriors"),
    render("podium", 1920, 1080, "the podium garden between two towers, from above", "The podium garden", "Exteriors"),
    render("towers-sky", 1920, 1080, "the towers seen from the garden, looking up", "The towers from the garden", "Exteriors"),
    render("clubhouse-elevation", 1920, 1080, "the clubhouse’s cantilevered upper floors over its entrance steps", "The clubhouse, side on", "Exteriors"),
    render("clubhouse-top", 1920, 1080, "the Elements plaza, the drop-off circle and the clubhouse roof from directly above", "Straight down on the clubhouse", "Exteriors"),
    render("elements-sculpture", 1920, 1080, "steel sculptures in lavender planters over the Elements plaza’s water channels", "Sculptures in the Elements plaza", "Exteriors"),
    render("podium-deck", 1920, 1080, "wooden deck seating among planters between the towers", "Podium deck", "Exteriors"),
    render("podium-plaza", 1920, 1080, "the podium plaza’s concentric paving and mosaic seating walls", "Podium plaza", "Exteriors"),
    render("entry-wall", 1920, 1080, "sculpted pillars along the compound wall of the approach road", "The approach road", "Exteriors"),
    render("villa-lane", 1920, 1080, "villa fronts with cars in their driveways, towers behind", "A villa lane", "Exteriors"),
    render("villa-pavilion-pool", 1920, 1080, "a pergola pavilion beside a blue pool among the villas", "Villa pavilion and pool", "Exteriors"),
    render("lobby", 2560, 1707, "the triple-height clubhouse lobby", "Triple-height lobby", "Clubhouse"),
    render("lobby-sign", 2560, 1440, "the lobby wall lettered Disha Habitat, The Clubhouse", "The lobby wall", "Clubhouse"),
    render("lounge-lobby", 2560, 1440, "the reception of the business lounge", "Business lounge reception", "Clubhouse"),
    render("lounge", 2560, 1440, "co-working clusters around planted seats under a curved ceiling", "Business lounge & café", "Clubhouse"),
    render("pool-day", 2560, 1440, "the rooftop pool deck by day", "Rooftop pool", "Clubhouse"),
    render("pool-night", 2560, 1440, "the rooftop pool deck at night, loungers under umbrellas", "Pool deck at night", "Clubhouse"),
    render("pool-full", 1920, 1080, "the rooftop pool end to end, loungers under the pergola, towers behind", "The pool, end to end", "Clubhouse"),
    render("pool-rooftop-night", 1920, 1080, "the rooftop pool at night from above, the towers lit behind", "The roof at night", "Clubhouse"),
    render("poolside-cafe", 2000, 1125, "the poolside café at dusk under a white pergola", "Tropical poolside café", "Clubhouse"),
    render("juice-bar", 1920, 1080, "a red juice on the juice bar’s counter, a Disha menu card beside it", "Juice bar", "Clubhouse"),
    render("terrace-cafe", 1920, 1080, "café tables on the clubhouse’s planted roof terrace at sunset", "Rooftop terrace café", "Clubhouse"),
    render("library", 2560, 1440, "the library, reading tables under a painted map ceiling", "Library", "Clubhouse"),
    render("theatre", 2560, 1440, "rows of recliners facing the screen in the mini theatre", "Mini theatre", "Clubhouse"),
    render("gym", 1920, 1080, "the gymnasium, a running track beside the weights", "Gymnasium", "Clubhouse"),
    render("badminton", 1920, 1080, "an indoor badminton court with painted players on its walls", "Indoor badminton", "Clubhouse"),
    render("indoor-games", 2560, 1440, "pool tables in the indoor games room", "Indoor games", "Clubhouse"),
    render("music", 2560, 1440, "the music room, a drum kit and a piano by the windows", "Music room", "Clubhouse"),
    render("dance", 2500, 1406, "the dance studio, a wooden floor under a terracotta ceiling", "Dance studio", "Clubhouse"),
    render("table-tennis", 2560, 1440, "table tennis tables by tall windows", "Table tennis", "Clubhouse"),
    render("yoga-deck", 1920, 1080, "the open-air yoga deck, mats laid out under a painted wall", "Yoga deck", "Clubhouse"),
    render("senior-lounge", 2560, 1518, "a bright lounge of armchairs and tables for senior citizens", "Senior citizens’ lounge", "Clubhouse"),
    render("guest-room", 2560, 1440, "a guest bedroom with framed prints above a desk", "Guest rooms", "Clubhouse"),
    render("banquet", 1920, 1080, "banquet tables dressed in white under a coffered ceiling", "Banquet hall", "Clubhouse"),
    render("classroom", 2560, 1440, "a classroom of desks facing a whiteboard", "Classroom", "Clubhouse"),
    render("aqua-park", 1920, 1080, "a water play pool with slides and fountains", "The Aqua Park", "Outdoors"),
    render("kids-play-epdm", 1920, 1080, "the kids’ play area on EPDM, a climbing net and a tunnel", "Kids’ play area on EPDM", "Outdoors"),
    render("toddler-sand-pit", 1920, 1080, "the toddlers’ sand pit, a dome climber and a play wall", "Toddlers’ sand pit and floral garden", "Outdoors"),
    render("beach-volleyball", 1920, 1080, "the beach volleyball court, an umbrella and a deck chair beside it", "Beach volleyball", "Outdoors"),
    render("pickleball-court", 1920, 1080, "the pickleball court at ground level, the futsal cage beside it", "Pickleball court", "Outdoors"),
    render("pickleball-paddles", 1920, 1080, "two pickleball paddles and a ball on the blue court", "Paddles on the pickleball court", "Outdoors"),
    render("tennis-futsal", 1920, 1080, "the twin tennis and futsal courts from above", "Twin tennis & futsal courts", "Outdoors"),
    render("skate-park", 1920, 1080, "the skate bowl lettered Skate Park, the volleyball court beyond", "Skate park", "Outdoors"),
    render("outdoor-gym", 1920, 1080, "blue exercise stations on the lawn", "Outdoor gym", "Outdoors"),
    render("outdoor-gym-aerial", 1920, 1080, "the outdoor gym stations along a garden path", "Outdoor gym from above", "Outdoors"),
    render("yoga-cafe", 1920, 1080, "a café table under an umbrella looking over the yoga lawn", "Seating over the yoga lawn", "Outdoors"),
    render("jogging-track", 2560, 1440, "the jogging track beside a lawn and a swing pavilion", "Jogging track", "Outdoors"),
    render("picnic-tents", 1920, 1080, "picnic tents under shade sails, villas behind", "Picnic tents", "Outdoors"),
    render("camping", 1920, 1080, "a fire pit in the camping zone, tents beyond", "Camping zone", "Outdoors"),
    render("pickleball-futsal", 1920, 1080, "pickleball and futsal courts from above, a sand court and a skate park beside them", "Pickleball & futsal courts", "Outdoors"),
    render("courts", 1920, 1080, "a tennis court among the towers", "Tennis court", "Outdoors"),
    render("pet-park", 2560, 1440, "a fenced pet park with agility hurdles", "Pet park", "Outdoors"),
    render("giant-chess", 1920, 1080, "a giant chessboard on a terrace", "Giant chess", "Outdoors"),
    render("lily-pond", 1920, 1080, "the lily pond and its pavilion", "Lily pond pavilion", "Outdoors"),
    render("highpoint", 1920, 1080, "the Highpoint pavilion, planted on top and open below", "Highpoint pavilion", "Outdoors"),
    render("mound-opening", 1920, 1080, "a tower seen through a round opening in a grassy mound", "The mound", "Outdoors"),
    render("fountain-walk", 1920, 1080, "a long pool of fountains under flowering trees", "Fountain", "Outdoors"),
    render("vegetable-garden", 1920, 1080, "beds of vegetables in front of the villas", "Vegetable garden", "Outdoors"),
    render("skate", 1920, 1080, "skates and a skateboard on the rink", "Skates in the bowl", "Outdoors"),
    render("rock-garden", 1920, 1080, "a rock garden of boulders and palms", "Rock garden", "Outdoors"),
    render("sand-pit", 1920, 1080, "a sand pit with a climbing dome and a roundabout", "Toddlers’ sand pit", "Outdoors"),
    render("living", 1920, 1080, "a living room with a dining table by the window", "Living room", "Homes"),
    render("bedroom", 1920, 1080, "a master bedroom in blue and wood", "Master bedroom", "Homes"),
    render("bedroom-2", 1920, 1080, "a bedroom with a wooden headboard wall", "Bedroom", "Homes"),
    render("front-door", 1920, 1080, "a front door with a smart lock", "Front door", "Homes"),
    render("balcony-view", 1920, 1080, "the view from a tower balcony over the gardens and villas", "From a balcony", "Homes"),
  ] as Picture[],
  masterPlan: {
    src: `${dir}/master-plan.jpg`,
    width: 2200,
    height: 1414,
    alt: "Master plan of Disha Pursuit of the Elements showing the towers, villas, clubhouse and landscaped grounds",
    caption: "Master plan",
    kind: "plan" as const,
  },
  rera: [
    { phase: "Phase I", no: "PRM/KA/RERA/1251/308/PR/280324/006756" },
    { phase: "Phase II", no: "PRM/KA/RERA/1251/308/PR/060924/007003" },
  ],
  phone: { display: "+91 95053 33333", href: "tel:+919505333333" },
  whatsapp: "https://api.whatsapp.com/send?phone=919505333333",
  email: "info@dishapursuitoftheelements.com",
  website: { label: "dishapursuitoftheelements.com", href: "https://www.dishapursuitoftheelements.com/" },
  updates: "https://www.dishapursuitoftheelements.com/project-updates",
  /* The project site publishes quarterly construction newsletters; the latest is Q4 (October) 2026, issue 12 of 16. */
  latestUpdate: "Q4 2026",
} as const;
