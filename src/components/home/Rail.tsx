"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/showroom/Icons";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import s from "./Rail.module.css";

/* The distance from one card to the next. */
const strideOf = (el: HTMLElement) => {
  const first = el.firstElementChild as HTMLElement | null;
  return first ? first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : 0;
};

/*
 * A row of cards that scrolls sideways, as tesla.com's rows do: where it is scrolled to (the first card in view,
 * how many fit, whether either end is reached) and a step of one screenful for the arrow buttons. `items` is
 * anything that changes the cards (a filter), so the row is measured again when they change.
 */
export function useRail(items?: unknown) {
  const row = useRef<HTMLUListElement>(null);
  const [lead, setLead] = useState(0);
  const [shown, setShown] = useState(1);
  const [ends, setEnds] = useState({ start: true, end: false });
  const motionOk = useMedia(MOTION_OK);

  const measure = useCallback(() => {
    const el = row.current;
    const step = el ? strideOf(el) : 0;
    if (!el || !step) return;
    setLead(Math.min(el.children.length - 1, Math.round(el.scrollLeft / step)));
    setShown(Math.max(1, Math.floor((el.clientWidth + 1) / step)));
    setEnds({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    measure();
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure, items]);

  /* One screenful at a time, less one card, so the visitor keeps their place. */
  const step = (dir: 1 | -1) => {
    const el = row.current;
    if (el) el.scrollBy({ left: dir * strideOf(el) * Math.max(1, shown - 1), behavior: motionOk ? "smooth" : "auto" });
  };

  return { row, lead, shown, ends, step, measure };
}

/* What the controls need: the row's ref stays with the list it is attached to. */
export type Rail = Omit<ReturnType<typeof useRail>, "row">;

/* The previous and next buttons; on a phone the cards are swiped and the buttons give way. */
export function RailArrows({ rail, what, children }: { rail: Rail; what: string; children?: ReactNode }) {
  return (
    <div className={s.tools}>
      {children}
      <button
        type="button"
        className={`${s.tool} ${s.arrow}`}
        onClick={() => rail.step(-1)}
        aria-label={`Previous ${what}`}
        disabled={rail.ends.start}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className={`${s.tool} ${s.arrow}`}
        onClick={() => rail.step(1)}
        aria-label={`More ${what}`}
        disabled={rail.ends.end}
      >
        <ChevronRight />
      </button>
    </div>
  );
}

/* A row's heading: a big title and one line on the left, its controls on the right. */
export function RailHead({ id, title, line, children }: { id: string; title: string; line?: string; children?: ReactNode }) {
  return (
    <div className={s.head}>
      <div className="reveal">
        <h2 id={id} className={`display ${s.title}`}>
          {title}
        </h2>
        {line && <p className={s.line}>{line}</p>}
      </div>
      {children}
    </div>
  );
}
