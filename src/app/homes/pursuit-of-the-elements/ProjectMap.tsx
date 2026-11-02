"use client";

import { useState } from "react";
import type { MapItem } from "@/components/showroom/CommunityMap";
import { LazyMap } from "@/components/showroom/LazyMap";
import s from "./page.module.css";

/*
 * The home page's map of Disha's communities, resting on this one. Its code and pictures load only as it
 * nears the screen (LazyMap). A name on the map flies there, as on the home page.
 */
export function ProjectMap({ items, start }: { items: MapItem[]; start: number }) {
  const [active, setActive] = useState(start);
  return (
    <div className={s.map}>
      <LazyMap items={items} active={active} onPick={setActive} />
    </div>
  );
}
