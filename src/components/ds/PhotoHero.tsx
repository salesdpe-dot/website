import type { ReactNode } from "react";
import Image from "next/image";
import { type Spec as Figure, SpecRow } from "@/components/brand/SpecRow";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import type { Img } from "@/lib/content";
import type { Film } from "@/lib/film";
import { focusPoint } from "@/lib/focus";
import { ArrowRight } from "@/components/showroom/Icons";
import { type Cta, CtaLink } from "./CtaLink";
import s from "./PhotoHero.module.css";

/* The number is large and the unit ("acres", "months") small beside it, so every figure shares a baseline. */
export type Spec = { value: ReactNode; unit?: string; label: string };

type Props = {
  title: string;
  /* A short line under the title: what it is, where, for whom. */
  line?: string;
  /* A word above the title, such as "Now selling" or "Handed over 2018". */
  eyebrow?: string;
  image: Img;
  /* Up to three figures along the foot of the picture, as tesla.com shows range and speed. */
  specs?: Spec[];
  /* The first is the sky-blue button; a second is a quiet text link. */
  actions?: Cta[];
  /* Small print in the corner, such as "Artist's impression". */
  note?: string;
  /* A silent film over the picture, which is its first frame: the picture paints first, the film follows once the page has loaded. */
  film?: Film;
  /* Instead of `specs`: a row of up to four figures in the brand's SpecRow, the figures large in Montserrat. */
  figures?: Figure[];
  /* More actions after `actions`, such as a button that opens the message form; styled by the caller. */
  children?: ReactNode;
};

/*
 * A page that opens on a photograph, the way tesla.com opens each model: the name at the top over a
 * soft scrim, three figures and the buttons at the foot. The header floats over it in white.
 */
export function PhotoHero({ title, line, eyebrow, image, specs, actions, note, film, figures, children }: Props) {
  return (
    <section className={s.hero} data-tone="dark" aria-labelledby="page-title">
      <Image
        className={s.media}
        src={image.src}
        alt={image.alt}
        fill
        sizes="(orientation: portrait) 70vh, 100vw"
        quality={78}
        loading="eager"
        fetchPriority="high"
        style={focusPoint(image)}
      />
      {film && (
        <div className={s.film} style={focusPoint(image)}>
          <LoopFilm film={film} />
        </div>
      )}
      <div className={s.scrim} aria-hidden="true" />
      {film && <FilmToggle className={s.toggle} />}
      <div className={`photo-copy ${s.copy}`}>
        {eyebrow && <p className={s.eyebrow}>{eyebrow}</p>}
        <h1 id="page-title" className={`display ${s.title}`}>
          {title}
        </h1>
        {line && <p className={s.line}>{line}</p>}
      </div>
      {(specs?.length || figures?.length || actions?.length || children) && (
        <div className={`photo-foot ${s.foot}`}>
          {figures && figures.length > 0 && <SpecRow items={figures} className={s.figures} />}
          {specs && specs.length > 0 && (
            <dl className={s.specs}>
              {specs.map((sp) => (
                <div key={sp.label} className={s.spec}>
                  <dt>{sp.label}</dt>
                  <dd>
                    {sp.value}
                    {sp.unit && <span className={s.unit}>{sp.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          {((actions && actions.length > 0) || children) && (
            <div className={s.ctas}>
              {actions?.map((a, i) => (
                <CtaLink key={a.label} href={a.href} className={i === 0 ? "btn btn-primary" : `text-link ${s.link}`}>
                  {a.label}
                  {i > 0 && <ArrowRight />}
                </CtaLink>
              ))}
              {children}
            </div>
          )}
        </div>
      )}
      {note && <p className={s.note}>{note}</p>}
    </section>
  );
}
