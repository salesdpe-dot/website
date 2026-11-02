"use client";

import { type ReactNode, useState } from "react";
import { ChevronDown } from "@/components/showroom/Icons";
import s from "./page.module.css";

/*
 * The commute checker and the searches around Gunjur: beside the map on a computer, where there is room, and behind
 * one button under it on a phone, so the map and the next section come sooner.
 */
export function CommuteDisclosure({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.commute}>
      <button type="button" className={`btn btn-dark ${s.commuteToggle}`} aria-expanded={open} aria-controls="commute-checker" onClick={() => setOpen(!open)}>
        {label}
        <ChevronDown />
      </button>
      <div id="commute-checker" className={s.commuteBody} data-open={open || undefined}>
        {children}
      </div>
    </div>
  );
}
