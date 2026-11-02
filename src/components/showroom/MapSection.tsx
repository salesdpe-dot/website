"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { communityHref, type Img } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import type { MapItem } from "./CommunityMap";
import { LazyMap } from "./LazyMap";
import { ArrowRight } from "./Icons";
import { HomeMark } from "./Logo";
import s from "./MapSection.module.css";

type Item = MapItem & { eyebrow: string; line: string; photo?: Img };
type Props = { title: string; line: string; items: Item[] };

const SIZES = "(min-width: 900px) 40vw, 100vw";

/*
 * The one place on the home page where all the communities are seen together: a list to choose from (also the
 * keyboard way in, since the marks on the map are for pointing) beside the map, and under the list a card for the
 * one chosen. A community already handed over shows its photograph as it is today, never a render; the one on
 * sale, which has only renders, shows its name and homes on the navy field. On a phone the map comes first and
 * the list becomes a row of names to swipe.
 */
export function MapSection({ title, line, items }: Props) {
  const [active, setActive] = useState(0);
  const shown = items[active] ?? items[0];
  const list = useRef<HTMLUListElement>(null);
  const motionOk = useMedia(MOTION_OK);

  /* On a phone, a community picked on the map brings its name into the middle of the row of names. */
  useEffect(() => {
    const row = list.current;
    const chip = row?.children[active] as HTMLElement | undefined;
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: motionOk ? "smooth" : "auto" });
  }, [active, motionOk]);
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
          <LazyMap items={items} active={active} onPick={setActive} />
        </div>
        <ul ref={list} className={s.list} aria-label="Choose a community">
          {items.map((c, i) => (
            <li key={c.slug}>
              <button type="button" className={s.item} aria-pressed={i === active} onClick={() => setActive(i)}>
                <span className={s.name}>{c.name}</span>
                <span className={s.meta}>
                  {c.eyebrow} · {c.place}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {shown && (
          <Link className={s.card} href={communityHref(shown.slug)} data-photo={shown.photo ? "" : undefined}>
            {/* Every photograph is in place from the start, so choosing another only fades between them. */}
            {items.map((c) =>
              c.photo ? (
                <Image
                  key={c.slug}
                  className={s.photo}
                  src={c.photo.src}
                  alt={c === shown ? c.photo.alt : ""}
                  aria-hidden={c === shown ? undefined : true}
                  data-on={c === shown || undefined}
                  fill
                  sizes={SIZES}
                  quality={75}
                  style={focusPoint(c.photo)}
                />
              ) : null,
            )}
            {!shown.photo && <HomeMark className={s.mark} />}
            <span className={s.copy}>
              <span className={s.eyebrow}>{shown.eyebrow}</span>
              <span className={`display ${s.cardName}`}>{shown.name}</span>
              <span className={s.cardMeta}>
                {shown.place} · {shown.line}
              </span>
            </span>
            <span className={s.go}>
              Explore<span className="sr-only"> {shown.name}</span>
              <ArrowRight />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
