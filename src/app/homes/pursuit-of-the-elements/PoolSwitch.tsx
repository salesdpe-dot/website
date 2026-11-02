"use client";

import Image from "next/image";
import { useState } from "react";
import type { Picture } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import { tabKeys } from "./tabs";
import s from "./PoolSwitch.module.css";

/*
 * The rooftop pool by day and at night, full width, with a switch over the picture (tesla.com's colour picker,
 * in two settings). Both pictures are stacked and cross-fade, so the switch is instant once the first has loaded.
 */
export function PoolSwitch({ views }: { views: { label: string; picture: Picture }[] }) {
  const [active, setActive] = useState(0);
  const cur = views[active]!;
  return (
    <div className={s.pool}>
      <div role="tabpanel" id="pool-panel" aria-labelledby={`pool-tab-${active}`} className={s.stage}>
        {views.map((v, i) => (
          <Image
            key={v.label}
            src={v.picture.src}
            alt={i === active ? v.picture.alt : ""}
            aria-hidden={i !== active || undefined}
            fill
            sizes="100vw"
            quality={78}
            className={s.img}
            data-on={i === active || undefined}
            style={focusPoint(v.picture)}
          />
        ))}
        <span className={s.note}>Artist’s impression</span>
        <p className={s.caption}>{cur.picture.caption}</p>
      </div>
      <div role="tablist" aria-label="Time of day" className={s.switch}>
        {views.map((v, i) => (
          <button
            key={v.label}
            type="button"
            role="tab"
            id={`pool-tab-${i}`}
            aria-selected={i === active}
            aria-controls="pool-panel"
            tabIndex={i === active ? 0 : -1}
            className={s.option}
            onClick={() => setActive(i)}
            onKeyDown={(e) => tabKeys(e, i, views.length, setActive)}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
