import { LoopFilm } from "@/components/media/LoopFilm";
import type { Reel } from "@/lib/elements";
import s from "./FilmTile.module.css";

/*
 * A film in a rounded frame on the page (not full-bleed): its first frame shows until it plays, which it
 * does only while on screen. The caption sits at the foot, the pause button beside it.
 */
export function FilmTile({ reel, sizes, caption, className }: { reel: Reel; sizes: string; caption?: string; className?: string }) {
  return (
    <figure className={`${s.tile} ${className ?? ""}`}>
      <LoopFilm film={reel.film} poster={reel.poster} sizes={sizes} controls />
      <span className={s.note}>Artist’s impression</span>
      <figcaption className={s.caption}>{caption ?? reel.poster.caption}</figcaption>
    </figure>
  );
}
