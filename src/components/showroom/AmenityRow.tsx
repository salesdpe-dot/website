"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { WatchFilm } from "@/components/brand/WatchFilm";
import { RailArrows, RailHead, useRail } from "@/components/home/Rail";
import r from "@/components/home/Rail.module.css";
import { LoopFilm } from "@/components/media/LoopFilm";
import { type AmenityTag, amenities, amenitiesHead, amenityTags, shorts } from "@/lib/content";
import { filmsPaused } from "@/lib/film";
import { focusPoint } from "@/lib/focus";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import { ArrowRight, PauseIcon, PlayIcon } from "./Icons";
import s from "./AmenityRow.module.css";

const SIZES = "(min-width: 1024px) 30vw, (min-width: 600px) 45vw, 80vw";

type Filter = "All" | AmenityTag;
const filters: Filter[] = ["All", ...amenityTags];

/* The client's own film of the clubhouse roof at dusk, with its music, one tap from the row. */
const film = shorts.find((f) => f.src.endsWith("/short-4"));

/* A hyphenated word stays whole, so "Temperature-controlled" never breaks at its hyphen. */
const keepWhole = (name: string) =>
  name.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 ? (
      <span key={part} className={s.whole}>
        {part}
      </span>
    ) : (
      part
    ),
  );

/*
 * A row of amenity cards that scrolls sideways, as tesla.com's row of models does, with chips above it that
 * narrow it to the clubhouse, the pool, sports, the grounds, or children and pets. One card moves at a time:
 * the one pointed at or focused, otherwise the first in view, so the row is never busy and only the films on
 * screen are fetched. Stills drift slowly instead. A new filter fades the row out and deals the cards back in.
 */
export function AmenityRow() {
  const section = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  /* The filter the cards on screen belong to: it follows `filter` once the old cards have faded. */
  const [dealt, setDealt] = useState<Filter>("All");
  /* The first set is simply there; only a change of filter deals the cards in. */
  const [changed, setChanged] = useState(false);
  const { row, ...rail } = useRail(dealt);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const stopped = useSyncExternalStore(filmsPaused.subscribe, filmsPaused.get, () => false);
  const motionOk = useMedia(MOTION_OK);
  const swap = useRef(0);
  const shown = dealt === "All" ? amenities : amenities.filter((a) => a.tags.includes(dealt));
  const active = hovered ?? rail.lead;

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(swap.current);
    };
  }, []);

  const pick = (f: Filter) => {
    if (f === filter) return;
    setFilter(f);
    setChanged(true);
    setHovered(null);
    window.clearTimeout(swap.current);
    const deal = () => {
      setDealt(f);
      row.current?.scrollTo({ left: 0 });
    };
    if (motionOk) swap.current = window.setTimeout(deal, 180);
    else deal();
  };

  return (
    <section ref={section} id="amenities" className={s.section} aria-labelledby="amenities-title">
      <RailHead id="amenities-title" title={amenitiesHead.title} line={amenitiesHead.line}>
        <RailArrows rail={rail} what="amenities">
          {motionOk && (
            <button
              type="button"
              className={r.tool}
              onClick={() => filmsPaused.set(!stopped)}
              aria-label={stopped ? "Play the films" : "Pause the films"}
            >
              {stopped ? <PlayIcon /> : <PauseIcon />}
            </button>
          )}
        </RailArrows>
      </RailHead>

      <div className={s.chips} role="group" aria-label="Show amenities in">
        {filters.map((f) => (
          <button key={f} type="button" className={s.chip} aria-pressed={f === filter} onClick={() => pick(f)}>
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {/* No count: the row holds 20 cards, and the heading says 40+ amenities. */}
        Showing {dealt === "All" ? "all" : dealt}
      </p>
      <ul ref={row} className={`${r.row} ${s.row}`} data-leaving={filter !== dealt || undefined} data-dealt={changed || undefined}>
        {shown.map((a, i) => {
          const on = inView && i === active;
          return (
            <li key={`${dealt}-${a.name}`} className={s.item} style={{ "--i": Math.min(i, 5) } as CSSProperties}>
              <Link
                href={a.href}
                className={s.card}
                data-active={on || undefined}
                onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              >
                {a.film ? (
                  <LoopFilm
                    film={a.film}
                    poster={a.image}
                    sizes={SIZES}
                    play={on}
                    prefetch={inView && i >= rail.lead && i < rail.lead + rail.shown}
                  />
                ) : (
                  <Image className={s.still} src={a.image.src} alt={a.image.alt} fill sizes={SIZES} quality={78} style={focusPoint(a.image)} />
                )}
                <span className={s.caption}>
                  <span className={s.place}>{a.place}</span>
                  <span className={s.name}>{keepWhole(a.name)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={r.foot}>
        <div className={s.links}>
          <Link className="text-link" href={amenitiesHead.link.href}>
            {amenitiesHead.link.label} <ArrowRight />
          </Link>
          {film && (
            <WatchFilm short={film} className={`text-link ${s.watch}`}>
              <PlayIcon />
              Watch the film<span className="sr-only">: {film.title}</span>
            </WatchFilm>
          )}
        </div>
        <p className={r.note}>Artist’s impressions</p>
      </div>
    </section>
  );
}
