import Image from "next/image";
import { WatchFilm } from "@/components/brand/WatchFilm";
import { PlayIcon } from "@/components/showroom/Icons";
import type { Short } from "@/lib/elements";
import s from "./FilmCard.module.css";

/*
 * One of the client's edited films with music, as a compact card inside the section it shows: its first frame
 * small with a play button, its name and what is in it. Pressing it opens the film full screen, with sound.
 */
export function FilmCard({ short, tone = "light" }: { short: Short; tone?: "light" | "dark" }) {
  return (
    <WatchFilm short={short} className={`${s.card} ${tone === "dark" ? s.dark : ""}`}>
      <span className={s.thumb}>
        <Image src={short.poster.src} alt="" fill sizes="(min-width: 768px) 224px, 160px" quality={75} className={s.img} />
        <span className={s.play} aria-hidden="true">
          <PlayIcon />
        </span>
        <span className={s.note}>Artist’s impression</span>
      </span>
      <span className={s.text}>
        <span className={s.title}>{short.title}</span>
        <span className={s.line}>{short.line}</span>
        <span className={s.cue}>Watch the film, with sound</span>
      </span>
    </WatchFilm>
  );
}

/*
 * The films for one section, side by side on a computer. `compact` stacks them in a narrow column on a computer and
 * makes them a row to swipe on a phone, for the words beside a tab's picture.
 */
export function FilmCards({ shorts, tone, compact = false }: { shorts: readonly Short[]; tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <ul className={s.cards} data-count={shorts.length} data-compact={compact || undefined}>
      {shorts.map((f) => (
        <li key={f.src} className={compact ? undefined : "reveal"}>
          <FilmCard short={f} tone={tone} />
        </li>
      ))}
    </ul>
  );
}
