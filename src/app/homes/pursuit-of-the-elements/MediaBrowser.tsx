"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import { ChevronLeft, ChevronRight } from "@/components/showroom/Icons";
import type { Spot } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import { tabKeys } from "./tabs";
import s from "./MediaBrowser.module.css";

type Props = {
  /* Prefix for the ids of the tabs and the panel. */
  id: string;
  /* What the list is, for screen readers: "Rooms in the clubhouse". */
  label: string;
  items: readonly Spot[];
  tone?: "dark" | "light";
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Every room (or zone) on film. On a computer the list of names, each with its first frame, sits on the left as
 * tabs, and the chosen one plays large on the right, which stays in view while the list scrolls past. On a phone
 * and a tablet the rooms are a row of cards to swipe through, and the card in front plays. Either way one film
 * plays at a time and the rest are stills until chosen; a film is fetched only once it is chosen and on screen.
 */
export function MediaBrowser({ id, label, items, tone = "dark" }: Props) {
  const [active, setActive] = useState(0);
  const [front, setFront] = useState(0);
  const row = useRef<HTMLUListElement>(null);
  const cur = items[active]!;
  const step = (dir: 1 | -1) => setActive((active + dir + items.length) % items.length);

  /* The card in front is the one nearest the row's left edge, where the cards snap. */
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const first = el.firstElementChild as HTMLElement | null;
        if (!first) return;
        const pitch = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        setFront(atEnd ? items.length - 1 : Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / pitch))));
      });
    };
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      el.removeEventListener("scroll", measure);
      cancelAnimationFrame(frame);
    };
  }, [items.length]);

  const nudge = (dir: 1 | -1) => {
    const el = row.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (first.offsetWidth + 12), behavior: calm ? "auto" : "smooth" });
  };

  return (
    <div className={s.browser} data-tone={tone}>
      {/* A computer: the list as tabs, the chosen room on the stage. */}
      <div className={s.desk}>
        <div role="tablist" aria-label={label} aria-orientation="vertical" className={s.list}>
          {items.map((it, i) => (
            <button
              key={it.name}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={s.tab}
              onClick={() => setActive(i)}
              onKeyDown={(e) => tabKeys(e, i, items.length, setActive)}
            >
              <span className={s.thumb}>
                <Image src={it.poster.src} alt="" fill sizes="88px" quality={75} className={s.thumbImg} style={focusPoint(it.poster)} />
                {it.film && <span className={s.dot} aria-hidden="true" />}
              </span>
              <span className={s.tabText}>
                <span className={s.tabName}>{it.name}</span>
                {it.where && <span className={s.where}>{it.where}</span>}
              </span>
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} className={s.stage}>
          <figure key={active} className={s.frame}>
            {cur.film ? (
              <LoopFilm film={cur.film} poster={cur.poster} sizes="(min-width: 1440px) 1000px, 70vw" />
            ) : (
              <Image src={cur.poster.src} alt={cur.poster.alt} fill sizes="(min-width: 1440px) 1000px, 70vw" quality={78} className={s.cover} style={focusPoint(cur.poster)} />
            )}
            <figcaption className={s.caption}>
              <span className={s.count}>
                {pad(active + 1)} / {pad(items.length)}
                {cur.where && <> · {cur.where}</>}
              </span>
              <span className={`display ${s.name}`}>{cur.name}</span>
              <span className={s.line}>{cur.line}</span>
            </figcaption>
            <span className={s.note}>Artist’s impression</span>
          </figure>
          <div className={s.controls}>
            {cur.film && <FilmToggle className={s.toggle} />}
            <button type="button" className={s.round} onClick={() => step(-1)} aria-label={`Previous: ${items[(active - 1 + items.length) % items.length]!.name}`}>
              <ChevronLeft />
            </button>
            <button type="button" className={s.round} onClick={() => step(1)} aria-label={`Next: ${items[(active + 1) % items.length]!.name}`}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* A phone or a tablet: a row of cards, the one in front playing. */}
      <div className={s.mobile}>
        <ul ref={row} className={s.row} aria-label={label}>
          {items.map((it, i) => {
            const poster = it.cardPoster ?? it.poster;
            return (
              <li key={it.name} className={s.card} data-front={i === front || undefined}>
                <figure className={s.cardFrame}>
                  {it.film ? (
                    <LoopFilm film={it.card ?? it.film} poster={poster} sizes="(min-width: 768px) 44vw, 82vw" play={i === front} />
                  ) : (
                    <Image src={poster.src} alt={poster.alt} fill sizes="(min-width: 768px) 44vw, 82vw" quality={75} className={s.cover} style={focusPoint(poster)} />
                  )}
                  <figcaption className={s.cardCaption}>
                    <span className={s.count}>
                      {pad(i + 1)} / {pad(items.length)}
                      {it.where && <> · {it.where}</>}
                    </span>
                    <span className={`display ${s.cardName}`}>{it.name}</span>
                    <span className={s.cardLine}>{it.line}</span>
                  </figcaption>
                  <span className={s.note}>Artist’s impression</span>
                </figure>
              </li>
            );
          })}
        </ul>
        <div className={s.rowFoot}>
          <div className={s.progress} aria-hidden="true">
            <span style={{ width: `${((front + 1) / items.length) * 100}%` }} />
          </div>
          <FilmToggle className={s.rowToggle} />
          <button type="button" className={s.round} onClick={() => nudge(-1)} aria-label="Previous card" disabled={front === 0}>
            <ChevronLeft />
          </button>
          <button type="button" className={s.round} onClick={() => nudge(1)} aria-label="Next card" disabled={front === items.length - 1}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
