import { formatIndian } from "@/lib/site";
import s from "./page.module.css";

type Stat = { value: number; suffix: string; label: string };

/*
 * The company's figures, in the Indian grouping they are written in, final from the first paint. They no longer
 * count up: a count caught half way ("970+ homes") reads as a wrong figure.
 */
export function Stats({ items }: { items: readonly Stat[] }) {
  return (
    <dl className={s.stats}>
      {items.map((st) => (
        <div key={st.label} className={s.stat}>
          <dt>{st.label}</dt>
          <dd>
            {formatIndian(st.value)}
            {st.suffix}
          </dd>
        </div>
      ))}
    </dl>
  );
}
