"use client";

import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { communities, communityHref, handedOverHead } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { RailArrows, RailHead, useRail } from "./Rail";
import r from "./Rail.module.css";
import s from "./CommunityRow.module.css";

const SIZES = "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 86vw";

/* The communities already handed over, newest first. The one on sale has the rest of the page. */
const handedOver = communities.filter((c) => c.eyebrow.startsWith("Handed over"));

/*
 * The five communities handed over, as one row of tesla.com cards: a photograph of each (never a render), the
 * year it was handed over, its homes and acres. A card opens the community's page, its picture growing into
 * that page's own top picture where the browser can.
 */
export function CommunityRow() {
  const { row, ...rail } = useRail();
  return (
    <section id="handed-over" className={s.section} aria-labelledby="handed-over-title">
      <RailHead id="handed-over-title" title={handedOverHead.title} line={handedOverHead.line}>
        <RailArrows rail={rail} what="communities" />
      </RailHead>
      <ul ref={row} className={r.row}>
        {handedOver.map((c) => (
          <li key={c.slug} className={s.item}>
            <Link href={communityHref(c.slug)} className={s.card}>
              <ViewTransition name={`community-${c.slug}`} share="morph" default="none">
                <Image className={s.photo} src={c.image.src} alt={c.image.alt} fill sizes={SIZES} quality={75} style={focusPoint(c.image)} />
              </ViewTransition>
              <span className={s.copy}>
                <span className={s.year}>{c.eyebrow}</span>
                <span className={`display ${s.name}`}>{c.name}</span>
                <span className={s.meta}>
                  {c.place} · {c.line}
                </span>
              </span>
              <span className={`btn btn-white ${s.explore}`} aria-hidden="true">
                Explore
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
