import s from "./Count.module.css";

/*
 * A whole number, shown as its final figure in the server HTML. It no longer counts up: a count caught half way
 * reads as a wrong number. The props stay, so callers need no change.
 */
export function Count({ to }: { to: number }) {
  return <span className={s.count}>{to}</span>;
}
