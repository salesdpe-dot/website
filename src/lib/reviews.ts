import type { Short } from "@/components/brand/WatchFilm";
import type { Img } from "@/lib/content";

/*
 * Buyers at Pursuit of the Elements in their own words: the client's four upright review films (Drive, "Clips",
 * November 2026), each about 50 seconds with sound and captions burned in. Encoded by scripts/encode-films.sh as
 * "<name>-1080" and "<name>-720"; the player's poster is the film's title card, and the card shows a frame of the
 * family. Names and homes are as each film's title card gives them; each quote is word for word from the film,
 * as its captions show it. These are filmed, not rendered, so they carry no "Artist's impression".
 */
export type Review = Short & {
  /* A frame of the family, 864 × 1080; decorative, as the card names them beside it. */
  card: Img;
  /* The home they bought or booked, from the film's title card. */
  home: string;
  quote: string;
  /* The film's length, for the card's "0:54". */
  seconds: number;
};

const films = "/media/elements";
const pics = "/images/pursuit-of-the-elements";

const review = (name: string, title: string, home: string, quote: string, seconds: number): Review => ({
  src: `${films}/${name}`,
  poster: { src: `${pics}/${name}.webp`, width: 720, height: 1280, alt: "" },
  card: { src: `${pics}/${name}-card.webp`, width: 864, height: 1080, alt: "" },
  title,
  home,
  quote,
  seconds,
  start: 0,
  upright: true,
  filmed: true,
});

export const reviews: Review[] = [
  review(
    "review-madhusudhan",
    "Madhu Sudhan & family",
    "Booked two homes: a 1,413 sq ft 3 BHK and a 1,135 sq ft 2 BHK",
    "Whenever we come, we feel like that we are meeting with our family and not with the sales representatives.",
    54,
  ),
  review(
    "review-veena",
    "Veena & Abhilash",
    "Bought a 2,103 sq ft 3 BHK with a staff room",
    "Something that you are investing and something that you want to build for a very long term, transparency is very important.",
    49,
  ),
  review(
    "review-tony",
    "Tony & family",
    "Bought a 2,495 sq ft 4 BHK with a staff room",
    "I am impressed with the quality, extremely impressed with the offer of amenities.",
    49,
  ),
  review(
    "review-abhilash",
    "Abhilash & family",
    "Bought a 2,103 sq ft 3 BHK with a staff room",
    "There’s a lot of nature around and kid-friendly facilities around. We are not constantly exposed to traffic.",
    50,
  ),
];

export const reviewsHead = {
  title: "In our buyers’ own words.",
  line: "Four families on why they booked at Pursuit of the Elements. Each film is under a minute, with sound.",
};
