import Link from "next/link";
import { HomeMark } from "@/components/showroom/Logo";
import { communityHref, communities } from "@/lib/content";
import s from "./not-found.module.css";

/* A wrong address lands on the brand's navy field: 404 at poster size with the house icon for its zero, and a way home. */
export default function NotFound() {
  return (
    <section className={`band-navy ${s.page}`} data-tone="dark" aria-labelledby="nf-title">
      <div className={s.inner}>
        <p className={`mega sky ${s.code}`} aria-hidden="true">
          <span>4</span>
          <HomeMark className={s.zero} />
          <span>4</span>
        </p>
        <h1 id="nf-title" className={`display ${s.title}`}>
          This page isn’t here.
        </h1>
        <p className={s.line}>The address may have a typo, or the page has moved. Every community is one click below.</p>
        <div className={s.links}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/homes" className="btn btn-line">
            All our homes
          </Link>
          <Link href="/contact" className="btn btn-line">
            Contact us
          </Link>
        </div>
        <ul className={s.list} aria-label="Our communities">
          {communities.map((c) => (
            <li key={c.slug}>
              <Link href={communityHref(c.slug)}>
                <span className={s.name}>{c.name}</span>
                <span className={s.meta}>{c.eyebrow}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
