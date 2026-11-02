import type { ReactNode } from "react";
import { type Spec, SpecRow } from "@/components/brand/SpecRow";
import { HomeMark } from "@/components/showroom/Logo";
import { type Cta, CtaLink } from "./CtaLink";
import s from "./PageIntro.module.css";

type Props = {
  title: string;
  line?: ReactNode;
  /* Breadcrumbs above the title. */
  above?: ReactNode;
  /* A short word or two above the title, such as "Must-know 2 of 5". */
  eyebrow?: string;
  actions?: Cta[];
  /* Big figures along the foot of the band, as tesla.com sets range and speed. */
  specs?: Spec[];
  /* "mega" is the guideline's poster headline; "large" suits a longer title, such as a guide's. */
  size?: "mega" | "large";
  /* "measure" sets the words in the same centred reading column as a document below them. */
  width?: "page" | "measure";
  /* The house icon, large and faint at the right of the band. Use it once or twice on the site, not everywhere. */
  mark?: boolean;
  children?: ReactNode;
};

/*
 * A page that opens without a photograph opens on the brand guideline's own page: a navy field, the title in
 * sky-blue Montserrat at poster size, one white line, the buttons, and any figures along the foot.
 */
export function PageIntro({ title, line, above, eyebrow, actions, specs, size = "mega", width = "page", mark, children }: Props) {
  return (
    <header className={`band-navy ${s.intro}`} data-tone="dark" data-width={width}>
      {mark && <HomeMark className={s.mark} />}
      <div className={s.inner}>
        {above && <div className={s.above}>{above}</div>}
        {eyebrow && <p className={`eyebrow ${s.eyebrow}`}>{eyebrow}</p>}
        <h1 className={`sky ${size === "mega" ? "mega" : "display"} ${s.title}`} data-size={size}>
          {title}
        </h1>
        {line && <p className={s.line}>{line}</p>}
        {actions && actions.length > 0 && (
          <div className={s.ctas}>
            {actions.map((a, i) => (
              <CtaLink key={a.label} href={a.href} className={`btn ${i === 0 ? "btn-primary" : "btn-line"}`}>
                {a.label}
              </CtaLink>
            ))}
          </div>
        )}
        {children}
        {specs && specs.length > 0 && <SpecRow items={specs} tone="dark" className={s.specs} />}
      </div>
    </header>
  );
}
