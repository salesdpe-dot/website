"use client";

import { useEffect, useRef } from "react";
import { MOTION_OK, useMedia } from "@/lib/useMedia";

/*
 * A figure such as "1,102" or "4.7/5" that counts up from nothing, once, when it first comes well into view. The
 * page carries the real figure (for screen readers, without scripts and with reduced motion, it is all there is);
 * the count only rewrites the visible digits while it runs, in the Indian grouping the figure was written in.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionOk = useMedia(MOTION_OK);

  useEffect(() => {
    const el = ref.current;
    const m = /^([\d,]+(?:\.\d+)?)(.*)$/.exec(value);
    if (!el || !m || !motionOk) return;
    const digits = m[1] ?? "0";
    const rest = m[2] ?? "";
    const target = Number(digits.replace(/,/g, ""));
    const decimals = (digits.split(".")[1] ?? "").length;
    const text = el.firstChild;
    const show = (x: number) => {
      if (text) text.nodeValue = x.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + rest;
    };
    let frame = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          show(target * (1 - (1 - p) ** 3));
          if (p < 1) frame = requestAnimationFrame(tick);
          else show(target);
        };
        show(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      show(target);
    };
  }, [value, motionOk]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </>
  );
}
