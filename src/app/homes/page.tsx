import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpecRow } from "@/components/brand/SpecRow";
import { Breadcrumbs, PageIntro, Section, SectionHead } from "@/components/ds";
import { focusPoint } from "@/lib/focus";
import { links } from "@/lib/content";
import { elements } from "@/lib/elements";
import { pageMeta } from "@/lib/launch";
import { projectsByHandover, projectsNewestFirst } from "@/lib/projects";
import { homesHandedOver } from "@/lib/proof";
import { formatIndian } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "Our homes",
  description: `Pursuit of the Elements, selling now on 20 acres in Gunjur, and the five Disha Habitat communities handed over since 2015: ${formatIndian(homesHandedOver)} homes in all.`,
  path: "/homes",
});

const fact = (facts: { label: string; value: string }[], label: string) => facts.find((f) => f.label === label)?.value ?? "";
/* "3.6 acres" → "3.6", for a figure whose unit is printed beside it. */
const num = (text: string) => text.split(" ")[0];

const first = projectsByHandover[0];
const latest = projectsByHandover.at(-1)!;
const longest = Math.max(...projectsByHandover.map((p) => p.timeline.months));
/* "7, up to 29 floors" → "7". */
const towers = fact([...elements.facts], "Towers").split(",")[0];

/*
 * The index of Disha's homes: the one selling now, then the five lived in today with how long each took to build.
 * The footer that follows carries the sales line and its two buttons, so the page needs no band of its own for them.
 */
export default function HomesPage() {
  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Our homes" }]} />}
        title={`${formatIndian(homesHandedOver)} homes, handed over.`}
        line={`Five communities in East Bengaluru are lived in today, from ${first.shortName} in ${first.handoverYear} to ${latest.shortName} in ${latest.handoverYear}. The sixth, ${elements.shortName} in Gunjur, is selling now.`}
        mark
        specs={[
          { value: formatIndian(homesHandedOver), label: "Homes handed over" },
          { value: String(projectsByHandover.length), label: "Communities lived in" },
          { value: first.timeline.start.split(" ")[1], label: `First ground broken, ${first.shortName}` },
          { value: "20", unit: "acres", label: "Selling now in Gunjur" },
        ]}
      />

      {/* The project on sale, as tesla.com shows a model: the picture from edge to edge, the name over it. */}
      <section className={s.now} aria-labelledby="now-title" data-tone="dark">
        <ViewTransition name={`community-${elements.slug}`} share="morph" default="none">
          <div className={s.nowMedia}>
            <Image
              src={elements.cover.src}
              alt={elements.cover.alt}
              fill
              priority
              sizes="100vw"
              quality={78}
              className={s.nowImg}
              style={focusPoint(elements.cover)}
            />
          </div>
        </ViewTransition>
        <div className={s.nowShade} aria-hidden="true" />
        <div className={`photo-copy ${s.nowCopy}`}>
          <p className={s.nowTag}>{elements.status}</p>
          <h2 id="now-title" className={`display ${s.nowName}`}>
            {elements.shortName}
          </h2>
          <p className={s.nowLine}>Gunjur, East Bengaluru. 2, 3 &amp; 4 BHK apartments and 4 &amp; 5 BHK villas.</p>
        </div>
        <div className={`photo-foot ${s.nowFoot}`}>
          <SpecRow
            items={[
              { value: "20", unit: "acres", label: "Land" },
              { value: towers, label: "Towers" },
              { value: "29", label: "Floors, Towers D and E" },
              { value: "40+", label: "Amenities" },
            ]}
          />
          <div className={s.nowActions}>
            <Link href={links.bookVisit} className="btn btn-primary">
              Book a visit
            </Link>
            <Link href={elements.href} className="btn btn-ghost">
              See the project
            </Link>
          </div>
        </div>
        <p className={s.note}>Artist’s impression</p>
      </section>

      {/*
       * The five lived in, newest first, each with its build record folded in: the months from ground-breaking to
       * the occupancy certificate as a sky bar (its length against the longest build) and the two dates. Five
       * across on a computer; on a phone a compact list, a photograph beside each.
       */}
      <Section labelledBy="built-title" className={s.built}>
        <div className="reveal">
          <SectionHead
            id="built-title"
            title="Five communities, lived in today."
            line={`From ${fact(first.facts, "Homes")} homes among coconut palms in ${first.handoverYear} to ${fact(latest.facts, "Homes")} homes with sundecks in ${latest.handoverYear}.`}
            link={{ label: "Compare them side by side", href: "/compare" }}
          />
        </div>
        <ul className={`${s.grid} reveal-stagger`}>
          {projectsNewestFirst.map((p) => (
            <li key={p.slug}>
              <Link href={`/homes/${p.slug}`} className={`${s.card} lift`}>
                <ViewTransition name={`community-${p.slug}`} share="morph" default="none">
                  <span className={s.media}>
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width: 1200px) 20vw, (min-width: 900px) 33vw, 120px"
                      quality={75}
                      className={s.img}
                    />
                    <span className={s.year}>{p.handoverYear}</span>
                  </span>
                </ViewTransition>
                <span className={s.body}>
                  <span className={`display ${s.name}`}>{p.shortName}</span>
                  <span className={s.place}>{p.locality}</span>
                  <span className={s.figures}>
                    <span>
                      <strong>{fact(p.facts, "Homes")}</strong> homes
                    </span>
                    <span>
                      <strong>{num(fact(p.facts, "Project size"))}</strong> acres
                    </span>
                  </span>
                  <span className={s.build} style={{ "--w": p.timeline.months / longest } as CSSProperties}>
                    <span className={s.barTrack} aria-hidden="true">
                      <span className={s.barFill} />
                    </span>
                    <span className={s.barValue}>
                      <strong>{p.timeline.months}</strong> months, start to OC
                    </span>
                    <span className={s.barDates}>
                      {p.timeline.start} to {p.timeline.completion}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
