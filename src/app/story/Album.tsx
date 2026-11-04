"use client";

import { Caveat } from "next/font/google";
import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@/components/showroom/Icons";
import { dishaFamily } from "@/lib/site";
import s from "./Album.module.css";

/* The handwriting on the prints, loaded only on this page. */
const hand = Caveat({ subsets: ["latin"], weight: ["500"], display: "swap" });

/*
 * Two piles of prints, like an album left open on the coffee table: one of homeowners, one of the team. Tap the
 * top print and it is tossed to the back of its pile; the arrows go either way. As on the first Our story page.
 */
const captions: Record<string, string> = {
  "/images/people/family-1-1600.webp": "Home is where the giggles are",
  "/images/people/family-2-1600.webp": "Three generations, one sofa",
  "/images/people/family-3-1600.webp": "The whole gang",
  "/images/people/family-4-1600.webp": "Welcome home, little one",
  "/images/people/team-1-1600.webp": "All smiles at Disha",
  "/images/people/team-2-1600.webp": "The site team",
  "/images/people/team-4-1600.webp": "Going over the plans",
  "/images/people/team-3-1600.webp": "Checkmate!",
};

const piles = [
  { kind: "Homeowners", note: "the families who live in our homes", photos: dishaFamily.filter((f) => f.kind === "Homeowners"), tilt: [-3, 5, -7, 9] },
  { kind: "The team", note: "the people who build them", photos: dishaFamily.filter((f) => f.kind === "The team"), tilt: [3, -5, 7, -9] },
];

export function Album() {
  return (
    <div className={s.piles}>
      {piles.map((p, i) => (
        <Pile key={p.kind} {...p} delay={i * 160} />
      ))}
    </div>
  );
}

function Pile({ kind, note, photos, tilt, delay }: (typeof piles)[number] & { delay: number }) {
  const n = photos.length;
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [tossing, setTossing] = useState<number | null>(null);
  const busy = useRef(false);
  const touched = useRef(false);
  const root = useRef<HTMLDivElement>(null);

  // Toss the top print to the back of the pile. Uses the latest order, so timers can call it too.
  const toss = () => {
    if (busy.current) return;
    busy.current = true;
    setOrder((o) => {
      setTossing(o[0]);
      return o;
    });
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), o[0]]);
      setTossing(null);
      busy.current = false;
    }, 380);
  };
  const next = () => {
    touched.current = true;
    toss();
  };
  const prev = () => {
    touched.current = true;
    if (busy.current) return;
    setOrder((o) => [o[n - 1], ...o.slice(0, n - 1)]);
  };

  // A short demo when the album first comes into view: two prints go over on their own, then it waits for the
  // visitor. Any tap stops it.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ts: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        [1400, 3600].forEach((ms) => ts.push(window.setTimeout(() => !touched.current && toss(), ms + delay * 4)));
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const top = order[0];

  return (
    <div ref={root} className={s.pile}>
      <p className={`${hand.className} ${s.kind}`}>{kind}</p>
      <p className={s.note}>{note}</p>

      <div className={s.stack}>
        {photos.map((f, i) => {
          const depth = order.indexOf(i);
          const isTop = depth === 0;
          const out = tossing === i;
          const style = {
            zIndex: n - depth,
            rotate: `${out ? tilt[0] + 16 : tilt[depth]}deg`,
            translate: out ? "62% -8%" : `${depth * 4}px ${depth * 6}px`,
          } as CSSProperties;
          return (
            <button
              key={f.src}
              type="button"
              tabIndex={isTop ? 0 : -1}
              aria-hidden={!isTop}
              aria-label={isTop ? `${f.alt}. Photo ${i + 1} of ${n}. Press for the next photo.` : undefined}
              onClick={isTop ? next : undefined}
              onKeyDown={(e) => {
                if (isTop && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  next();
                  // The next print comes to the top; keep keyboard focus on it.
                  const pile = e.currentTarget.parentElement;
                  window.setTimeout(() => pile?.querySelector<HTMLElement>("button[tabindex='0']")?.focus(), 420);
                }
              }}
              className={s.print}
              data-top={isTop || undefined}
              style={style}
            >
              <span className={s.photo}>
                <Image src={f.src} alt="" fill sizes="(min-width: 640px) 26rem, 90vw" quality={75} />
              </span>
              <span className={`${hand.className} ${s.caption}`}>{captions[f.src]}</span>
            </button>
          );
        })}
      </div>

      <div className={s.controls}>
        <p className={s.count}>
          {String(top + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>
        <div className={s.arrows}>
          <button type="button" onClick={prev} aria-label={`Previous ${kind.toLowerCase()} photo`} className={s.arrow}>
            <ChevronLeft />
          </button>
          <button type="button" onClick={next} aria-label={`Next ${kind.toLowerCase()} photo`} className={s.arrow}>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
