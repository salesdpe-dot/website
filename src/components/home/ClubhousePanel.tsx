import Link from "next/link";
import { SpecRow } from "@/components/brand/SpecRow";
import { WatchFilm } from "@/components/brand/WatchFilm";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import { PlayIcon } from "@/components/showroom/Icons";
import { clubhouse, shorts } from "@/lib/content";
import s from "./ClubhousePanel.module.css";

/*
 * The clubhouse, full screen, as tesla.com gives a model's best feature a page of its own: the building on film,
 * four figures across the foot, and the names of the rooms inside it. The client's own walkthrough of it opens
 * from here with its music.
 */
export function ClubhousePanel() {
  const film = shorts[0];
  return (
    <section id="clubhouse" className={s.panel} data-tone="dark" aria-labelledby="clubhouse-title">
      <LoopFilm film={clubhouse.film} poster={clubhouse.poster} sizes="100vw" />
      <div className={s.shade} aria-hidden="true" />
      <FilmToggle className={s.toggle} label="the clubhouse film" />

      <div className={`${s.top} reveal`}>
        <p className={s.eyebrow}>{clubhouse.eyebrow}</p>
        <h2 id="clubhouse-title" className={`display ${s.title}`}>
          {clubhouse.title}
        </h2>
        <p className={s.line}>{clubhouse.line}</p>
      </div>

      <div className={s.foot}>
        <SpecRow items={clubhouse.specs} className={`${s.specs} reveal`} />
        <div className={s.bottom}>
          <ul className={s.rooms} aria-label="Inside the clubhouse">
            {clubhouse.rooms.map((room) => (
              <li key={room}>{room}</li>
            ))}
          </ul>
          <div className={s.ctas}>
            <Link className="btn btn-primary" href={clubhouse.primary.href}>
              {clubhouse.primary.label}
            </Link>
            {film && (
              <WatchFilm short={film} className={`btn btn-ghost ${s.watch}`}>
                <PlayIcon />
                Watch the film<span className="sr-only">: {film.title}</span>
              </WatchFilm>
            )}
          </div>
        </div>
      </div>
      <p className={s.note}>Artist’s impression</p>
    </section>
  );
}
