"use client";

import { useEffect, useRef } from "react";
import { formatIndian } from "@/lib/site";
import s from "./page.module.css";

type Stat = { value: number; suffix: string; label: string };

const DURATION = 1800;
/* Fast at first, settling gently on the real figure. */
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/*
 * The figures count up once, the first time they are mostly in view, written with the same Indian
 * grouping as the real figure (990, then 1,000), never with padded zeros. With reduced motion, or
 * before the script runs, the real numbers are simply there.
 */
export function Stats({ items }: { items: readonly Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const outs = [...el.querySelectorAll<HTMLElement>("[data-to]")];
    const draw = (t: number) => {
      for (const o of outs) o.textContent = `${formatIndian(Math.round(Number(o.dataset.to) * t))}${o.dataset.suffix}`;
    };
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          draw(easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    draw(0);
    el.dataset.armed = "";
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      delete el.dataset.armed;
    };
  }, []);

  return (
    <dl ref={ref} className={s.stats}>
      {items.map((st) => (
        <div key={st.label} className={s.stat}>
          <dt>{st.label}</dt>
          <dd>
            <span className={s.real}>
              {formatIndian(st.value)}
              {st.suffix}
            </span>
            <span className={s.counting} aria-hidden="true" data-to={st.value} data-suffix={st.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
