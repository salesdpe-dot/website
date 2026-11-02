"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { type Spec, SpecRow } from "@/components/brand/SpecRow";
import { ComposeButton } from "@/components/ComposeButton";
import { ShareButton } from "@/components/ShareButton";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import type { Film } from "@/lib/film";
import type { Picture } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import { tabKeys } from "./tabs";
import s from "./HomesTabs.module.css";

/* A picture, or a film over its first frame. */
export type View = { picture: Picture; film?: Film };

export type Family = {
  /* The tab's name and the short fact under it. */
  tab: string;
  meta: string;
  name: string;
  which: string;
  line: string;
  figures: Spec[];
  /* The first is shown large; the others are a click away in the small frames under it. */
  views: View[];
  /* A link to the page with this hash ("#villas") opens on this tab. */
  hash?: string;
};

/*
 * The tower families and the villas as tabs, the way tesla.com switches between a model's versions: the picture or
 * film large on the left, other views of it in small frames below, and the name, its figures and the two buttons on
 * the right. Only the panel on show is laid out, so a hidden one fetches nothing, and only the view on show plays.
 * `place` names the project in the words "Send to family" sends with a tab's link.
 */
export function HomesTabs({ families, place }: { families: Family[]; place: string }) {
  const [active, setActive] = useState(0);
  const [view, setView] = useState(0);
  const pick = (i: number) => {
    setActive(i);
    setView(0);
  };

  /* Arriving on (or moving to) a tab's hash: that tab is chosen and the tabs come into view under the bar. */
  useEffect(() => {
    const fromHash = () => {
      const i = families.findIndex((f) => f.hash && location.hash === `#${f.hash}`);
      if (i < 0) return;
      setActive(i);
      setView(0);
      document.getElementById(`homes-tab-${i}`)?.closest("section")?.scrollIntoView({ block: "start" });
    };
    const frame = requestAnimationFrame(fromHash);
    addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("hashchange", fromHash);
    };
  }, [families]);
  return (
    <div className={s.tabs}>
      <div role="tablist" aria-label="Towers and villas" className={s.list}>
        {families.map((f, i) => (
          <button
            key={f.tab}
            type="button"
            role="tab"
            id={`homes-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`homes-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={s.tab}
            onClick={() => pick(i)}
            onKeyDown={(e) => tabKeys(e, i, families.length, pick)}
          >
            <span className={s.tabName}>{f.tab}</span>
            <span className={s.tabMeta}>{f.meta}</span>
          </button>
        ))}
      </div>
      {families.map((f, i) => {
        const v = f.views[i === active ? view : 0] ?? f.views[0]!;
        return (
          <div key={f.tab} role="tabpanel" id={`homes-panel-${i}`} aria-labelledby={`homes-tab-${i}`} hidden={i !== active} className={s.panel}>
            <div className={s.visual}>
              <figure key={v.picture.src} className={s.media}>
                {v.film ? (
                  <LoopFilm film={v.film} poster={v.picture} sizes="(min-width: 1024px) 60vw, 100vw" />
                ) : (
                  <Image src={v.picture.src} alt={v.picture.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" quality={78} className={s.cover} style={focusPoint(v.picture)} />
                )}
                {v.film && <FilmToggle className={s.toggle} />}
                <figcaption className={s.caption}>{v.picture.caption}</figcaption>
                <span className={s.note}>Artist’s impression</span>
              </figure>
              {f.views.length > 1 && (
                <ul className={s.scroller} aria-label={`Views of the ${f.name}`}>
                  {f.views.map((w, j) => (
                    <li key={w.picture.src}>
                      <button type="button" className={s.view} aria-pressed={j === (i === active ? view : 0)} onClick={() => setView(j)}>
                        <Image src={w.picture.src} alt="" fill sizes="120px" quality={75} className={s.cover} style={focusPoint(w.picture)} />
                        {w.film && <span className={s.filmMark} aria-hidden="true" />}
                        <span className="sr-only">{w.picture.caption}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={s.text}>
              <p className={s.which}>{f.which}</p>
              <h3 className={`display ${s.name}`}>{f.name}</h3>
              <p className={s.line}>{f.line}</p>
              <SpecRow items={f.figures} tone="light" className={s.figures} />
              <div className={s.actions}>
                <ComposeButton channel="whatsapp" topic={`Floor plans and carpet areas: ${f.name}`} className="btn btn-dark">
                  Ask for floor plans
                </ComposeButton>
                <ComposeButton channel="whatsapp" topic={`Current prices: ${f.name}`} className="btn btn-outline">
                  Ask for prices
                </ComposeButton>
              </div>
              <p className={s.share}>
                <ShareButton text={`${f.name}, ${place}. ${f.line}`} hash={f.hash} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
