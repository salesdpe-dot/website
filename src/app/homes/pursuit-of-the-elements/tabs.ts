import type { KeyboardEvent } from "react";

const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/*
 * The keys of a WAI-ARIA tab list, for every tab interface on the page: the arrows move to the next or previous
 * tab (wrapping round), Home and End to the first and last, and the tab reached is selected and focused.
 */
export function tabKeys(e: KeyboardEvent<HTMLElement>, index: number, count: number, select: (i: number) => void) {
  const to = e.key in step ? (index + step[e.key]! + count) % count : e.key === "Home" ? 0 : e.key === "End" ? count - 1 : -1;
  if (to < 0) return;
  e.preventDefault();
  select(to);
  e.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLElement>('[role="tab"]')[to]?.focus();
}
