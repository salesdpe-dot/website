"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { tabKeys } from "./tabs";
import s from "./LifeTabs.module.css";

/*
 * A tab: its id is the button's, so a link to the page with that hash ("#pool") lands on the tabs and opens it;
 * `also` lists older hashes that open it too. The picture or film goes on the left, the words on the right.
 */
export type LifeTab = { id: string; also?: string[]; tab: string; media: ReactNode; body: ReactNode };

/*
 * Life on the 20 acres as tabs, one screen whatever is chosen: each tab's film or picture large, two lines, its
 * figures, its films with sound and a button for the rest. The hidden tabs are not laid out, so they fetch nothing.
 */
export function LifeTabs({ head, label, tabs }: { head: ReactNode; label: string; tabs: LifeTab[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const hashes = JSON.stringify(tabs.map((t) => [t.id, ...(t.also ?? [])]));

  /* Arriving on (or moving to) a tab's hash: that tab is chosen and the tabs come into view under the bar. */
  useEffect(() => {
    const names: string[][] = JSON.parse(hashes);
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      const i = names.findIndex((n) => n.includes(h));
      if (i < 0) return;
      setActive(i);
      requestAnimationFrame(() => root.current?.scrollIntoView({ block: "start" }));
    };
    const frame = requestAnimationFrame(fromHash);
    addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("hashchange", fromHash);
    };
  }, [hashes]);

  return (
    <div ref={root} className={s.root}>
      <div className={s.top}>
        {head}
        <div role="tablist" aria-label={label} className={s.list}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={t.id}
              aria-selected={i === active}
              aria-controls={`${t.id}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={s.tab}
              onClick={() => setActive(i)}
              onKeyDown={(e) => tabKeys(e, i, tabs.length, setActive)}
            >
              {t.tab}
            </button>
          ))}
        </div>
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${t.id}-panel`} aria-labelledby={t.id} hidden={i !== active} className={s.panel}>
          <div className={s.visual}>{t.media}</div>
          <div className={s.text}>{t.body}</div>
        </div>
      ))}
    </div>
  );
}
