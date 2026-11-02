"use client";

import Image from "next/image";
import { useState } from "react";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import type { Picture } from "@/lib/elements";
import type { Film } from "@/lib/film";
import { focusPoint } from "@/lib/focus";
import s from "./Views.module.css";

/* A picture, or a film over its first frame; `label` names it on its button when the buttons are words. */
export type View = { picture: Picture; film?: Film; label?: string };

/*
 * One large frame and, under it, the other views a click away: small frames, or words (`words`) where the name is
 * the point, as for the five elements. Only the view on show is laid out, so the others fetch nothing until chosen.
 * The frame fills the height its holder gives it.
 */
export function Views({ views, label, sizes, words = false }: { views: View[]; label: string; sizes: string; words?: boolean }) {
  const [index, setIndex] = useState(0);
  const v = views[index] ?? views[0]!;
  return (
    <div className={s.views}>
      <figure key={v.picture.src} className={s.frame}>
        {v.film ? (
          <LoopFilm film={v.film} poster={v.picture} sizes={sizes} />
        ) : (
          <Image src={v.picture.src} alt={v.picture.alt} fill sizes={sizes} quality={78} className={s.cover} style={focusPoint(v.picture)} />
        )}
        {v.film && <FilmToggle className={s.toggle} />}
        <figcaption className={s.caption}>
          {words && v.label ? (
            <>
              <span className={`display ${s.word}`}>{v.label}</span> {v.picture.caption}
            </>
          ) : (
            v.picture.caption
          )}
        </figcaption>
        <span className={s.note}>Artist’s impression</span>
      </figure>
      {views.length > 1 && (
        <ul className={s.list} data-words={words || undefined} aria-label={label}>
          {views.map((w, j) => (
            <li key={w.picture.src}>
              <button type="button" className={words ? s.chip : s.thumb} aria-pressed={j === index} onClick={() => setIndex(j)}>
                {words ? (
                  w.label
                ) : (
                  <>
                    <Image src={w.picture.src} alt="" fill sizes="112px" quality={75} className={s.cover} style={focusPoint(w.picture)} />
                    {w.film && <span className={s.filmMark} aria-hidden="true" />}
                    <span className="sr-only">{w.picture.caption}</span>
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
