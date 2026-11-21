import Image from "next/image";
import { WatchFilm } from "@/components/brand/WatchFilm";
import { RailHead } from "@/components/home/Rail";
import { type Review, reviews, reviewsHead } from "@/lib/reviews";
import { PlayIcon } from "./Icons";
import s from "./Reviews.module.css";

const SIZES = "(min-width: 1024px) 22vw, (min-width: 600px) 40vw, 72vw";
const length = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

/*
 * The four buyers' films as cards: a frame of the family with a play button and the film's length, the words
 * they said, their names and the home they took. The whole card opens the film full screen, upright, with sound.
 * Four across on a computer, two on a tablet, a row to swipe on a phone. The heading is the page's own.
 */
export function Reviews({ items = reviews }: { items?: readonly Review[] }) {
  return (
    <ul className={s.cards}>
      {items.map((r) => (
        <li key={r.src} className="reveal">
          <WatchFilm short={r} className={s.card}>
            <span className={s.thumb}>
              <Image src={r.card.src} alt="" fill sizes={SIZES} quality={78} className={s.img} />
              <span className={s.play} aria-hidden="true">
                <PlayIcon />
              </span>
              <span className={s.time}>
                <span className="sr-only">Watch the film, </span>
                {length(r.seconds)}
                <span className="sr-only"> with sound:</span>
              </span>
            </span>
            <span className={s.text}>
              <span className={s.quote}>“{r.quote}”</span>
              <span className={s.who}>{r.title}</span>
              <span className={s.home}>{r.home}</span>
            </span>
          </WatchFilm>
        </li>
      ))}
    </ul>
  );
}

/* The home page's band: the row's heading, then the cards. */
export function ReviewsBand() {
  return (
    <section id="reviews" className={s.band} aria-labelledby="reviews-title">
      <RailHead id="reviews-title" title={reviewsHead.title} line={reviewsHead.line} />
      <div className={s.bandCards}>
        <Reviews />
      </div>
    </section>
  );
}
