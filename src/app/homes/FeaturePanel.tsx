import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { type Spec, SpecRow } from "@/components/brand/SpecRow";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import type { Film } from "@/lib/film";
import type { Media } from "@/lib/projects";

import s from "./FeaturePanel.module.css";

type Props = {
  id?: string;
  image: Media;
  /* A word above the title; leave it out where it would only repeat the title. */
  eyebrow?: string;
  title: string;
  line: string;
  /* Where the picture is anchored on a wide screen and on a phone. */
  position?: string;
  mobilePosition?: string;
  /* A silent film that plays over the picture while the panel is on screen; the picture is its first frame. */
  film?: Film;
  /* tesla.com's figures under a feature: up to four, in a row along the foot. */
  figures?: Spec[];
  /* The buttons or link at the foot. */
  children?: ReactNode;
};

/*
 * A full-bleed film or photograph, the way tesla.com shows each feature: the picture clear at the top, and at the
 * foot over a shade the name, one line, a row of figures and the buttons. Always below the fold, so the picture
 * loads lazily, and a film, when there is one, only once the panel is near the screen.
 */
export function FeaturePanel({ id, image, eyebrow, title, line, position = "50% 50%", mobilePosition, film, figures, children }: Props) {
  const anchor = { "--pos": position, "--pos-m": mobilePosition ?? position } as CSSProperties;
  return (
    <section id={id} className={s.panel} data-tone="dark" aria-labelledby={id ? `${id}-title` : undefined}>
      <Image className={s.media} src={image.src} alt={image.alt} fill sizes="100vw" quality={78} loading="lazy" style={anchor} />
      {film && (
        <div className={s.film} style={anchor}>
          <LoopFilm film={film} />
        </div>
      )}
      <div className={s.scrim} aria-hidden="true" />
      <p className={s.note}>Artist’s impression</p>
      <div className={s.foot}>
        <div className={`reveal ${s.copy}`}>
          {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
          <h2 id={id ? `${id}-title` : undefined} className={`display ${s.title}`}>
            {title}
          </h2>
          <p className={s.line}>{line}</p>
        </div>
        {(figures?.length || children) && (
          <div className={`reveal ${s.base}`}>
            {figures && figures.length > 0 && <SpecRow items={figures} className={s.figures} />}
            {children && <div className={s.actions}>{children}</div>}
          </div>
        )}
        {film && <FilmToggle className={s.toggle} />}
      </div>
    </section>
  );
}
