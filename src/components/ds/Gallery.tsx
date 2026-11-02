"use client";

import Image from "next/image";
import { type CSSProperties, useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/components/showroom/Icons";
import type { Media } from "@/lib/projects";
import s from "./Gallery.module.css";

export type GalleryItem = Media & { project?: string; group?: string };

const kindLabel = { render: "Artist’s impression", plan: "Plan", photo: null } as const;

type Props = {
  items: readonly GalleryItem[];
  /* "row" is one line of pictures that scrolls sideways, each with its caption under a soft shade. "strip" is the
     first `limit` pictures in one line across a computer screen, and a row to swipe on a phone. */
  layout?: "mosaic" | "grid" | "row" | "strip";
  /* Buttons over the pictures that show one group at a time (each item names its `group`); the first shows first. */
  groups?: readonly string[];
  /* What the list of pictures is, for screen readers. */
  label?: string;
  /* Show only the first `limit` pictures, with a button under them for the rest in a closer grid. The viewer
     steps through every picture either way. */
  limit?: number;
};

/*
 * Pictures in an even grid (the first one large), or in a row that scrolls sideways, each opening a
 * full-screen viewer: arrow keys and swipes move through them, Escape closes, and focus returns to the
 * picture that opened it. With `limit`, a few are shown and "See all" shows the rest.
 */
export function Gallery({ items: all, layout = "mosaic", groups, label, limit }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const openedFrom = useRef<number | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [group, setGroup] = useState(groups?.[0]);
  const [switched, setSwitched] = useState(false);
  const [ends, setEnds] = useState({ start: true, end: false });
  const [expanded, setExpanded] = useState(false);
  const moreRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const items = groups ? all.filter((item) => item.group === group) : all;
  /* With a limit, the first pictures lead and the rest wait for "See all". */
  const cut = layout !== "row" && limit && items.length > limit ? limit : items.length;
  const lead = items.slice(0, cut);
  const rest = items.slice(cut);
  const moreId = useId();

  /* Opening the rest moves focus to the first new picture; closing them brings the button back into view. */
  const toggle = () => {
    const opening = !expanded;
    setExpanded(opening);
    requestAnimationFrame(() => {
      if (opening) moreRef.current?.querySelector("button")?.focus();
      else toggleRef.current?.scrollIntoView({ block: "center" });
    });
  };

  /* The row's arrows hide at either end. */
  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el || layout !== "row") return;
    setEnds({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, [layout]);
  useEffect(measure, [measure, group]);
  const scroll = (dir: 1 | -1) => {
    const el = listRef.current;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: smooth ? "smooth" : "auto" });
  };

  const open = (i: number) => {
    openedFrom.current = i;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)), [items.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      if (openedFrom.current !== null) triggers.current[openedFrom.current]?.focus();
      openedFrom.current = null;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = index === null ? null : items[index];

  const sizes = (i: number) =>
    layout === "row"
      ? "(min-width: 900px) 380px, 78vw"
      : layout === "strip" && i < cut
        ? "(min-width: 768px) 17vw, 72vw"
        : i >= cut
        ? "(min-width: 900px) 25vw, (min-width: 600px) 33vw, 50vw"
        : i === 0 && layout === "mosaic"
          ? "(min-width: 900px) 66vw, 100vw"
          : "(min-width: 900px) 33vw, 50vw";

  const tile = (item: GalleryItem, i: number) => {
    const tag = kindLabel[item.kind];
    return (
      <li key={item.src} className={`lift ${s.tile}`}>
        <button
          ref={(el) => {
            triggers.current[i] = el;
          }}
          type="button"
          className={s.trigger}
          onClick={() => open(i)}
          aria-haspopup="dialog"
        >
          <Image src={item.src} alt={item.alt} fill sizes={sizes(i)} quality={78} className={item.kind === "plan" ? s.plan : s.img} />
          {tag && <span className={s.tag}>{tag}</span>}
          <span className={s.caption}>{item.caption}</span>
        </button>
      </li>
    );
  };

  return (
    <>
      {groups && (
        <div className={s.groups} role="group" aria-label="Show">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              className={s.group}
              aria-pressed={g === group}
              onClick={() => {
                setGroup(g);
                setSwitched(true);
              }}
            >
              {g}
            </button>
          ))}
        </div>
      )}
      <div className={s.wrap}>
        <ul
          ref={listRef}
          key={group}
          className={s.grid}
          data-layout={layout}
          data-fade={switched || undefined}
          data-grouped={groups || rest.length ? "" : undefined}
          aria-label={label}
          style={layout === "strip" ? ({ "--n": cut } as CSSProperties) : undefined}
          onScroll={layout === "row" ? measure : undefined}
        >
          {lead.map((item, i) => tile(item, i))}
        </ul>
        {rest.length > 0 && (
          <>
            <ul ref={moreRef} id={moreId} key={`${group}-more`} className={s.grid} data-layout="grid" data-more="" hidden={!expanded} aria-label={label && `${label}, the rest`}>
              {expanded && rest.map((item, i) => tile(item, cut + i))}
            </ul>
            <div className={s.toggle}>
              <button ref={toggleRef} type="button" className="btn btn-outline" aria-expanded={expanded} aria-controls={moreId} onClick={toggle}>
                {expanded ? "Show fewer" : `See all ${items.length} pictures`}
              </button>
            </div>
          </>
        )}
        {layout === "row" && (
          <>
            <button
              type="button"
              className={s.nudge}
              data-dir="back"
              onClick={() => scroll(-1)}
              aria-label="Scroll back"
              hidden={ends.start}
            >
              <ChevronLeft />
            </button>
            <button type="button" className={s.nudge} data-dir="on" onClick={() => scroll(1)} aria-label="Scroll on" hidden={ends.end}>
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className={s.viewer}
        aria-label="Picture viewer"
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("img, button, figcaption")) close();
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          touch.current = t ? { x: t.clientX, y: t.clientY } : null;
        }}
        onTouchEnd={(e) => {
          const start = touch.current;
          const end = e.changedTouches[0];
          touch.current = null;
          if (!start || !end) return;
          const dx = end.clientX - start.x;
          // A mostly vertical gesture is a scroll or a pinch, not a swipe.
          if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(end.clientY - start.y) * 1.5) return;
          step(dx < 0 ? 1 : -1);
        }}
      >
        {current && index !== null && (
          <div className={s.frame}>
            <div className={s.bar}>
              <p className={s.count} aria-live="polite">
                {index + 1} / {items.length}
              </p>
              <button type="button" className={s.round} onClick={close} aria-label="Close picture viewer" autoFocus>
                <CloseIcon />
              </button>
            </div>
            <figure className={s.figure}>
              <div className={s.stage}>
                <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" quality={82} className={s.full} />
                {kindLabel[current.kind] && <span className={s.tag}>{kindLabel[current.kind]}</span>}
              </div>
              <figcaption className={s.figcaption}>
                {current.caption}
                {current.project && <span> · {current.project}</span>}
              </figcaption>
            </figure>
            <div className={s.arrows}>
              <button type="button" className={s.round} onClick={() => step(-1)} aria-label="Previous picture">
                <ChevronLeft />
              </button>
              <button type="button" className={s.round} onClick={() => step(1)} aria-label="Next picture">
                <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
