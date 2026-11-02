import Link from "next/link";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import { closing, company, links } from "@/lib/content";
import { HomeMark } from "./Logo";
import s from "./ClosingCta.module.css";

/* The page ends on its one action, over the community at night, under the house icon: book a visit, or call. */
export function ClosingCta() {
  return (
    <section className={s.section} data-tone="dark" aria-labelledby="closing-title">
      <LoopFilm film={closing.film} poster={closing.image} sizes="100vw" />
      <div className={s.shade} aria-hidden="true" />
      <FilmToggle className={s.toggle} />
      <div className={`photo-foot ${s.inner} reveal`}>
        <div>
          <HomeMark className={s.mark} />
          <h2 id="closing-title" className={`display ${s.title}`}>
            {closing.title}
          </h2>
          <p className={s.line}>{closing.line}</p>
        </div>
        <div className={s.buttons}>
          <Link className="btn btn-primary" href={links.bookVisit}>
            Book a visit
          </Link>
          <a className="btn btn-ghost" href={company.sales.tel}>
            Call <span className="whitespace-nowrap">{company.sales.display}</span>
          </a>
        </div>
      </div>
      <p className={s.note}>Artist’s impression</p>
    </section>
  );
}
