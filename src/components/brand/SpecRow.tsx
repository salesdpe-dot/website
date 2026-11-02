import s from "./SpecRow.module.css";

export type Spec = { value: string; unit?: string; label: string };

/*
 * tesla.com's row of figures under a model's name: each figure large, its unit small beside it, and what it
 * measures underneath. Light text over a photograph or the navy field, ink on a light section.
 */
export function SpecRow({ items, tone = "dark", className }: { items: Spec[]; tone?: "dark" | "light"; className?: string }) {
  return (
    <dl className={`${s.row} ${className ?? ""}`} data-tone={tone}>
      {items.map((it) => (
        <div key={it.label} className={s.item}>
          <dt className={s.label}>{it.label}</dt>
          <dd className={s.value}>
            {it.value}
            {it.unit && <span className={s.unit}>{it.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}
