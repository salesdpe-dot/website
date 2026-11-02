"use client";

import Image from "next/image";
import { WatchFilm } from "@/components/brand/WatchFilm";
import { PlayIcon } from "@/components/showroom/Icons";
import { shorts, watchHead } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { RailArrows, RailHead, useRail } from "./Rail";
import r from "./Rail.module.css";
import s from "./WatchRow.module.css";

const SIZES = "(min-width: 1024px) 44vw, (min-width: 768px) 62vw, 86vw";

/*
 * The client's four walkthrough films, with their music, as a row of wide posters with the name underneath (the
 * films carry their own titles in the lower corner). A card is a button: it opens the film full screen with sound
 * and controls, and nothing of the film is fetched before that.
 */
export function WatchRow() {
  const { row, ...rail } = useRail();
  return (
    <section id="watch" className={s.section} aria-labelledby="watch-title">
      <RailHead id="watch-title" title={watchHead.title} line={watchHead.line}>
        <RailArrows rail={rail} what="films" />
      </RailHead>
      <ul ref={row} className={r.row}>
        {shorts.map((f) => (
          <li key={f.src} className={s.item}>
            <WatchFilm short={f} className={s.card}>
              <span className={s.frame}>
                <Image className={s.poster} src={f.poster.src} alt="" fill sizes={SIZES} quality={75} style={focusPoint(f.poster)} />
                <span className={s.play} aria-hidden="true">
                  <PlayIcon />
                </span>
                <span className={`${r.tag} ${s.tag}`}>Artist’s impression</span>
              </span>
              <span className={s.caption}>
                <span className="sr-only">Watch: </span>
                <span className={s.title}>{f.title}</span>
                <span className={s.line}>{f.line}</span>
                <span className={s.length}>
                  <span aria-hidden="true">{`${Math.floor(f.seconds / 60)}:${String(f.seconds % 60).padStart(2, "0")}`} · </span>
                  <span className="sr-only">{f.seconds} seconds, </span>
                  with music
                </span>
              </span>
            </WatchFilm>
          </li>
        ))}
      </ul>
    </section>
  );
}
