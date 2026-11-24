"use client";

import { useEffect } from "react";

/*
 * The footer's columns are <details> so they fold on a phone. From 768 px they stand open by CSS, but a closed
 * <details> still tells a screen reader "collapsed" and leaves a dead tab stop on each heading. So on a wider
 * screen this opens them for real and takes the headings out of the tab order; on a phone it puts both back.
 */
export function FooterFolds() {
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      document.querySelectorAll<HTMLDetailsElement>("footer details").forEach((d) => {
        d.open = wide.matches;
        const summary = d.querySelector("summary");
        if (!summary) return;
        if (wide.matches) summary.tabIndex = -1;
        else summary.removeAttribute("tabindex");
      });
    };
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, []);
  return null;
}
