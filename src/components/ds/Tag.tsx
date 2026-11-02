import type { ReactNode } from "react";
import s from "./Tag.module.css";

/* A small label: sky blue for "Now selling", grey for a status, dark glass on a photograph. */
export function Tag({ children, tone = "grey" }: { children: ReactNode; tone?: "accent" | "grey" | "photo" | "ink" }) {
  return (
    <span className={s.tag} data-tone={tone}>
      {children}
    </span>
  );
}
