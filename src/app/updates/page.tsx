import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, PageIntro, Section, SectionHead } from "@/components/ds";
import { ArrowRight } from "@/components/showroom/Icons";
import { elements } from "@/lib/elements";
import { pageMeta } from "@/lib/launch";
import { archive, issueHref, latestIssue as issue } from "@/lib/newsletter";
import s from "./updates.module.css";

export const metadata: Metadata = pageMeta({
  title: "Construction updates",
  description: `The quarterly newsletter of ${elements.name}: what was built each quarter, tower by tower and villa by villa, in site photographs.`,
  path: "/updates",
});

/* The newsletter's home: the latest issue as a web page, and every earlier issue as Disha published it. */
export default function UpdatesPage() {
  const cover = issue.villas.aerial;
  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Construction updates" }]} />}
        title="Construction updates."
        line={`Every quarter, what has been built at ${elements.name}: tower by tower and villa by villa, in site photographs.`}
      />

      <Section tone="surface" space="tight" labelledBy="latest-title">
        <Link href={issueHref(issue)} className={s.latest}>
          <span className={s.latestPicture}>
            <Image src={cover.src} alt={cover.caption} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={78} className={s.cover} />
          </span>
          <span className={s.latestText}>
            <span className="eyebrow">
              Latest issue · {issue.quarter} · {issue.number} of {issue.of}
            </span>
            <span id="latest-title" className={`display ${s.latestTitle}`}>
              {issue.month}.
            </span>
            <span className={s.latestLine}>
              {issue.feature.title}, {issue.phases.reduce((n, p) => n + p.towers.length, 0)} towers, the clubhouse and{" "}
              {issue.villas.rows.length} villa rows.
            </span>
            <span className="text-link">
              Read the update <ArrowRight />
            </span>
          </span>
        </Link>
      </Section>

      <Section space="tight" labelledBy="archive-title">
        <SectionHead id="archive-title" title="Earlier issues." line="As Disha published them, in PDF." />
        <ul className={s.archive}>
          {archive.map((a) => (
            <li key={a.quarter}>
              <a href={a.pdf} target="_blank" rel="noopener noreferrer" className={s.archiveLink}>
                <span className={s.archiveQuarter}>{a.quarter}</span>
                <span className={s.archiveMonth}>{a.month}</span>
                <span className={s.archiveKind}>
                  PDF <ArrowRight />
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
