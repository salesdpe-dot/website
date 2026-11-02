"use client";

import Image from "next/image";
import Link from "next/link";
import { ComposeButton } from "@/components/ComposeButton";
import { LoopFilm } from "@/components/media/LoopFilm";
import { floorPlans, links, models, modelsHead } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { RailArrows, RailHead, useRail } from "./Rail";
import r from "./Rail.module.css";
import s from "./ModelRow.module.css";

const SIZES = "(min-width: 1024px) 50vw, (min-width: 768px) 70vw, 88vw";

/*
 * "Choose your home", where tesla.com lists its models: one big card for each tower family and one for the
 * villas, two to a screen on a computer. Each card carries its floors as a figure and the two things a buyer
 * does next. A card with a film plays it while the card is on screen (no more than two can be).
 */
export function ModelRow() {
  const { row, ...rail } = useRail();

  return (
    <section id="homes" className={s.section} aria-labelledby="homes-title">
      <RailHead id="homes-title" title={modelsHead.title} line={modelsHead.line}>
        <RailArrows rail={rail} what="homes" />
      </RailHead>

      <ul ref={row} className={r.row}>
        {models.map((m) => (
          <li key={m.id} className={s.item}>
            <article className={s.card} aria-labelledby={`model-${m.id}`}>
              {m.film ? (
                <LoopFilm film={m.film} poster={m.image} sizes={SIZES} />
              ) : (
                <Image className={s.still} src={m.image.src} alt={m.image.alt} fill sizes={SIZES} quality={78} style={focusPoint(m.image)} />
              )}
              <div className={s.copy}>
                <p className={s.which}>{m.which}</p>
                <h3 id={`model-${m.id}`} className={`display ${s.name}`}>
                  <Link href={m.href}>{m.name}</Link>
                </h3>
                <p className={s.figure}>
                  <span className={s.value}>{m.figure.value}</span>
                  <span className={s.unit}>{m.figure.unit}</span>
                </p>
                <p className={s.fact}>{m.fact}</p>
              </div>
              <div className={s.actions}>
                <Link className="btn btn-primary" href={links.bookVisit}>
                  Book a visit<span className="sr-only">: {m.name}</span>
                </Link>
                <ComposeButton channel="whatsapp" topic={floorPlans.compose} className="btn btn-ghost">
                  {floorPlans.label}
                  <span className="sr-only">: {m.name}</span>
                </ComposeButton>
              </div>
              <p className={`${r.tag} ${s.tag}`}>Artist’s impression</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
