"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { links } from "@/lib/content";
import type { Community } from "./data";
import s from "./CompareTool.module.css";

const keys = ["a", "b", "c"] as const;
const NONE = "none";

type Props = { communities: Community[]; rows: string[]; initial: string[]; fromUrl?: boolean };

/* Reads the three slots from ?a=&b=&c= and writes them back, so a comparison can be shared. */
export function CompareTool(props: Props) {
  return props.fromUrl ? <WithUrl {...props} /> : <View {...props} picks={props.initial} onPick={() => {}} />;
}

function WithUrl(props: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const known = new Set(props.communities.map((c) => c.slug));
  const fromParams = keys.map((k, i) => {
    const v = params.get(k);
    if (v === NONE && i > 0) return NONE;
    return v && known.has(v) ? v : props.initial[i];
  });
  const picks = [...fromParams].sort((x, y) => Number(x === NONE) - Number(y === NONE));

  const onPick = (index: number, value: string) => {
    const next = [...picks];
    next[index] = value;
    /* Empty slots go last so the columns stay together. */
    next.sort((x, y) => Number(x === NONE) - Number(y === NONE));
    if (next[0] === NONE) return;
    const q = new URLSearchParams();
    keys.forEach((k, i) => q.set(k, next[i]));
    router.replace(`${pathname}?${q.toString()}`, { scroll: false });
  };
  return <View {...props} picks={picks} onPick={onPick} />;
}

function View({ communities, rows, picks, onPick }: Props & { picks: string[]; onPick: (i: number, v: string) => void }) {
  const uid = useId();
  const chosen = picks.map((p) => communities.find((c) => c.slug === p)).filter((c): c is Community => Boolean(c));
  const shown = rows.filter((r) => chosen.some((c) => c.values[r]));
  const count = chosen.length;
  // Empty slots keep their column, so every value sits under its own picker.
  const blanks = Array.from({ length: picks.length - count }, (_, i) => <td key={`blank-${i}`} aria-hidden="true" />);

  /*
   * The names are in the pickers above the table. Once the pickers have scrolled away under the header,
   * a bar repeats them over the rows, until the table has gone too.
   */
  const slotsRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const slots = slotsRef.current;
      const table = tableRef.current;
      const bar = barRef.current;
      if (!slots || !table || !bar) return;
      const top = parseFloat(getComputedStyle(bar).top) || 0;
      setStuck(slots.getBoundingClientRect().bottom < top && table.getBoundingClientRect().bottom > top + bar.offsetHeight + 48);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <div className={s.tool}>
      <div ref={slotsRef} className={s.slots}>
        <div className={s.rowLabelSpace} aria-hidden="true" />
        {picks.map((p, i) => {
          const c = communities.find((x) => x.slug === p);
          const id = `${uid}-${i}`;
          return (
            <div key={i} className={s.slot} data-empty={c ? undefined : ""}>
              <label className={s.pickLabel} htmlFor={id}>
                Community {i + 1}
              </label>
              {/* The native picker, unseen, over a face that shows the whole name (on a phone a closed select would cut it short). */}
              <div className={s.pick}>
                <select id={id} className={s.select} value={p} onChange={(e) => onPick(i, e.target.value)}>
                  {i > 0 && <option value={NONE}>None</option>}
                  {communities.map((o) => (
                    <option key={o.slug} value={o.slug} disabled={o.slug !== p && picks.includes(o.slug)}>
                      {o.name}
                    </option>
                  ))}
                </select>
                <span className={s.face} aria-hidden="true">
                  {c?.name ?? "None"}
                </span>
              </div>
              {c && (
                <div className={s.photo}>
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    width={c.image.width}
                    height={c.image.height}
                    sizes="(min-width: 1024px) 28vw, 33vw"
                    loading="lazy"
                  />
                  {c.render && <span className={s.tag}>Artist’s impression</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {count === 0 ? (
        <p className={s.empty}>Choose a community to begin.</p>
      ) : (
        <>
          <div ref={barRef} className={`${s.slots} ${s.stuck}`} data-show={stuck || undefined} aria-hidden="true">
            <div className={s.rowLabelSpace} />
            {chosen.map((c) => (
              <p key={c.slug} className={s.hName}>
                {c.name}
              </p>
            ))}
          </div>
          <div className={s.tableWrap}>
            <table ref={tableRef} className={s.table}>
              <caption className="sr-only">Comparison of {chosen.map((c) => c.name).join(", ")}</caption>
              <colgroup>
                <col className={s.labelCol} />
                {picks.map((_, i) => (
                  <col key={i} />
                ))}
              </colgroup>
              <thead className={s.head}>
                <tr>
                  <td className={s.hLabel} />
                  {chosen.map((c) => (
                    <th scope="col" key={c.slug}>
                      <span className="sr-only">{c.name}</span>
                    </th>
                  ))}
                  {blanks}
                </tr>
              </thead>
              <tbody>
                {shown.flatMap((r) => [
                  /* On a phone the label takes its own line above the values; screen readers use the row header instead. */
                  <tr key={`${r}-label`} className={s.labelRow} aria-hidden="true">
                    <td colSpan={picks.length + 1}>{r}</td>
                  </tr>,
                  <tr key={r} className={s.row}>
                    <th scope="row" className={s.label}>
                      {r}
                    </th>
                    {chosen.map((c) => (
                      <td key={c.slug} className={s.cell} data-empty={c.values[r] ? undefined : ""}>
                        {c.values[r] ?? (
                          <>
                            <span aria-hidden="true">—</span>
                            <span className="sr-only">Not published</span>
                          </>
                        )}
                      </td>
                    ))}
                    {blanks}
                  </tr>,
                ])}
              </tbody>
              <tfoot>
                <tr className={s.actions}>
                  <td className={s.label} />
                  {chosen.map((c) => (
                    <td key={c.slug} className={s.cell}>
                      <Link className={s.act} href={links.bookVisit} aria-label={`Book a visit: ${c.name}`}>
                        Book a visit
                      </Link>
                      <Link className={s.actSoft} href={c.href} aria-label={`Explore ${c.name}`}>
                        Explore
                      </Link>
                    </td>
                  ))}
                  {blanks}
                </tr>
              </tfoot>
            </table>
          </div>
          <p className={s.note}>A dash means we have not published that figure.</p>
        </>
      )}
    </div>
  );
}
