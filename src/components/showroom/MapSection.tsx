"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { communityHref, type Img } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import type { MapItem } from "./CommunityMap";
import { LazyMap } from "./LazyMap";
import { ArrowRight } from "./Icons";
import s from "./MapSection.module.css";

/* render: the picture is a render (the one on sale has nothing else yet), so it is labelled and its tag is sky blue. */
type Item = MapItem & { eyebrow: string; line: string; photo: Img; render?: boolean };
type Props = { title: string; line: string; items: Item[] };

const SIZES = "(min-width: 900px) 36vw, 100vw";

/*
 * The map is the picture here, as in the map prototype: the full width of the page, with the list of communities on
 * it at the top left (also the keyboard way in, since the marks on the map are for pointing). Choosing one flies the
 * map down to its plot, and its picture rises out of the plot's own outline into a frame beside it, joined to the
 * plot by a line; the frame is the link to its page. On a phone the frame sits across the foot of the map and the
 * names are a row to swipe under it.
 *
 * The map drives the frame (CommunityMap: where it rises from, and when): "shown" changes only as the map lands.
 * Without JavaScript the frame simply shows the first community.
 */
export function MapSection({ title, line, items }: Props) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const list = useRef<HTMLUListElement>(null);
  const frame = useRef<HTMLAnchorElement>(null);
  const motionOk = useMedia(MOTION_OK);
  /* The frame must hold the new community before the map measures it, so this commits at once. */
  const land = useCallback((i: number) => flushSync(() => setShown(i)), []);

  /* On a phone, a community picked on the map brings its name into the middle of the row of names. */
  useEffect(() => {
    const row = list.current;
    const chip = row?.children[active] as HTMLElement | undefined;
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: motionOk ? "smooth" : "auto" });
  }, [active, motionOk]);

  const c = items[shown] ?? items[0];
  return (
    <section id="communities" className={s.section} aria-labelledby="map-title">
      <div className={`${s.head} reveal`}>
        <h2 id="map-title" className={`display ${s.title}`}>
          {title}
        </h2>
        <p className={s.line}>{line}</p>
      </div>
      <div className={s.inner}>
        <div className={s.map}>
          <LazyMap items={items} active={active} onPick={setActive} onLand={land} frame={frame} cover={list} />
        </div>
        <ul ref={list} className={s.list} aria-label="Choose a community">
          {items.map((it, i) => (
            <li key={it.slug}>
              <button type="button" className={s.item} aria-pressed={i === active} onClick={() => setActive(i)}>
                <span className={s.name}>{it.name}</span>
                <span className={s.meta}>
                  {it.eyebrow} · {it.place}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {c && (
          <Link ref={frame} className={s.frame} href={communityHref(c.slug)} data-render={c.render || undefined}>
            {/* The picture comes first: the map grows it out of the plot. Every picture is in place, so only one shows. */}
            <span className={s.shot}>
              {items.map((it) => (
                <Image
                  key={it.slug}
                  className={s.photo}
                  src={it.photo.src}
                  alt={it === c ? it.photo.alt : ""}
                  aria-hidden={it === c ? undefined : true}
                  data-on={it === c || undefined}
                  fill
                  sizes={SIZES}
                  quality={75}
                  style={focusPoint(it.photo)}
                />
              ))}
              {c.render && <span className={s.impression}>Artist’s impression</span>}
            </span>
            <span className={s.caption}>
              <span className={s.copy}>
                <span className={s.eyebrow}>{c.eyebrow}</span>
                <span className={`display ${s.cardName}`}>{c.name}</span>
                <span className={s.cardMeta}>
                  {c.place} · {c.line}
                </span>
              </span>
              <span className={s.go}>
                Explore<span className="sr-only"> {c.name}</span>
                <ArrowRight />
              </span>
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
