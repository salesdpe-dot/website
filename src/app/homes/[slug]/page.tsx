import type { Metadata } from "next";
import { type CSSProperties, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import {
  Accordion,
  FactList,
  Gallery,
  Quote,
  Section,
  SectionHead,
} from "@/components/ds";
import { PhotoHero, type Spec } from "@/components/ds";
import { SlashBreak } from "@/components/ds/SlashBreak";
import { SpecRow, type Spec as BigSpec } from "@/components/brand/SpecRow";
import { ArrowRight } from "@/components/showroom/Icons";
import { HomeMark } from "@/components/showroom/Logo";
import { links } from "@/lib/content";
import { elements } from "@/lib/elements";
import { pageMeta } from "@/lib/launch";
import {
  getProject,
  type Media,
  type MediaKind,
  monthIndex,
  projectsByHandover,
  projectsNewestFirst,
} from "@/lib/projects";
import { homeowners } from "@/lib/site";
import { Count } from "../Count";
import { SubNav } from "../SubNav";
import s from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectsByHandover.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/homes/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: p.name,
    description: `${p.name}, ${p.locality}: ${p.facts.find((f) => f.label === "Homes")?.value} homes, handed over in ${p.handoverYear}. Photographs, facts and timeline.`,
    path: `/homes/${p.slug}`,
    image: {
      url: `/images/og/${p.slug}.jpg`,
      width: 1200,
      height: 630,
      alt: p.cover.alt,
    },
  });
}

/* "264" or "31 months" becomes a counting number and a small unit; "3.5 acres" keeps its decimal and only splits. */
const figure = (text = ""): Pick<Spec, "value" | "unit"> => {
  const m = /^([\d.]+)(?:\s+(.*))?$/.exec(text);
  if (!m) return { value: text };
  return {
    value: /^\d+$/.test(m[1]) ? <Count to={Number(m[1])} /> : m[1],
    unit: m[2],
  };
};

const factValue = (facts: { label: string; value: string }[], label: string) =>
  facts.find((f) => f.label === label)?.value;

/* The hero already gives these two as figures, so the facts beside the overview do not repeat them. */
const IN_HERO = new Set(["Homes", "Project size"]);

/* The facts that are figures ("2,98,840 sq ft") become big numbers; the rest ("2 & 3 BHK", an address) stay as rows. */
const FIGURES: Record<string, string> = {
  Homes: "Homes",
  "Project size": "Land",
  "Saleable area": "Saleable area",
  "Built-up area": "Built-up area",
};
const asFigure = (f: { label: string; value: string }): BigSpec | null => {
  const m = /^([\d.,]+)(?:\s+(.*))?$/.exec(f.value);
  return FIGURES[f.label] && m ? { value: m[1], unit: m[2], label: FIGURES[f.label] } : null;
};

/* What a gallery holds, by kind: "6 photographs, 2 artist’s impressions and a plan". */
const kindNames: Record<MediaKind, [one: string, many: string]> = {
  photo: ["a photograph", "photographs"],
  render: ["an artist’s impression", "artist’s impressions"],
  plan: ["a plan", "plans"],
};
const describe = (items: Media[]) => {
  const parts = (Object.keys(kindNames) as MediaKind[]).flatMap((k) => {
    const n = items.filter((m) => m.kind === k).length;
    return n === 0 ? [] : [n === 1 ? kindNames[k][0] : `${n} ${kindNames[k][1]}`];
  });
  const text = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts.join("");
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const months = (n: number) => (n === 0 ? "Same month" : `${n} ${n === 1 ? "month" : "months"}`);

/*
 * A community Disha has handed over, laid out as a case study on a tesla.com model page, in about four screens:
 * the photograph and its three figures; what it is in one line beside the rest of its facts, with what is there
 * (amenities, specification) in rows that open under them; the build record on the navy field; the pictures in
 * one row to swipe, each opening full screen; the families who live there in their own words; and the way on, to
 * the project on sale now or the next community.
 */
export default async function CommunityPage(props: PageProps<"/homes/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projectsNewestFirst.indexOf(p);
  const next = projectsNewestFirst[(i + 1) % projectsNewestFirst.length];
  const words = homeowners.filter((h) => h.slug === p.slug);
  const mapQuery = encodeURIComponent(p.address ?? `${p.name}, ${p.locality}`);

  /* The figures the hero has not shown, large; every other fact, the RERA number and the address as rows. */
  const facts = p.facts.filter((f) => !IN_HERO.has(f.label));
  const figures = facts.map(asFigure).filter((f): f is BigSpec => f !== null);
  const details = [
    ...facts.filter((f) => !asFigure(f)),
    ...(p.rera ? [{ label: "Karnataka RERA", value: <SlashBreak code={p.rera} /> }] : []),
    ...(p.address ? [{ label: "Address", value: p.address }] : []),
  ];

  /*
   * The timeline: the milestones at equal spacing, with the real months between them. Where the published
   * handover month comes before the occupancy certificate, it is left out until Disha confirms what it records:
   * a buyer reads keys before the OC as possession without one (docs/LAUNCH.md, decisions for Disha).
   */
  const keysFirst = monthIndex(p.timeline.handover) < monthIndex(p.timeline.completion);
  const marks = [
    { k: "Construction start", v: p.timeline.start },
    ...(keysFirst ? [] : [{ k: "Handover", v: p.timeline.handover }]),
    { k: "Completion (as per OC)", v: p.timeline.completion },
  ]
    .map((m) => ({ ...m, at: monthIndex(m.v) }))
    .sort((a, b) => a.at - b.at);
  const gaps = marks.slice(1).map((m, n) => m.at - marks[n].at);
  const toKeys = monthIndex(p.timeline.handover) - monthIndex(p.timeline.start);

  /* Every picture the hero has not shown, in one row that scrolls sideways; each opens the full-screen viewer. */
  const gallery = p.gallery.filter((m) => m.src !== p.cover.src);
  const showGallery = gallery.length > 0;

  /* What is there, in rows that open under the facts: the signature spaces, the other amenities, the specification. */
  const extras = [
    ...(p.highlights
      ? [
          {
            title: `${p.highlights.length} signature spaces`,
            body: (
              <ol className={s.highlights}>
                {p.highlights.map((h, k) => (
                  <li key={h.name}>
                    <span className={s.num}>{String(k + 1).padStart(2, "0")}</span>
                    <h4 className={s.hName}>{h.name}</h4>
                    <p>{h.text}</p>
                  </li>
                ))}
              </ol>
            ),
          },
        ]
      : []),
    ...(p.otherAmenities
      ? [
          {
            title: "Also in the community",
            body: (
              <ul className={s.also}>
                {p.otherAmenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    ...(p.specifications
      ? [
          {
            title: "Specification",
            body: (
              <>
                {p.specifications.map((sp) => (
                  <div key={sp.group} className={s.specGroup}>
                    <h4 className={s.specName}>{sp.group}</h4>
                    <ul className={s.specItems}>
                      {sp.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className={s.extrasNote}>Selected items from the published specification.</p>
              </>
            ),
          },
        ]
      : []),
  ];

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "facts", label: "Facts" },
    { id: "timeline", label: "Timeline" },
    ...(showGallery ? [{ id: "gallery", label: "Gallery" }] : []),
    ...(words.length > 0 ? [{ id: "residents", label: "Residents" }] : []),
  ];

  return (
    <>
      <ViewTransition name={`community-${p.slug}`} share="morph" default="none">
        <PhotoHero
          eyebrow={`Handed over ${p.handoverYear}`}
          title={p.shortName}
          line={p.locality}
          image={p.cover}
          specs={[
            { label: "Homes", ...figure(factValue(p.facts, "Homes")) },
            { label: "Land", ...figure(factValue(p.facts, "Project size")) },
            {
              label: "Start to OC",
              ...figure(`${p.timeline.months} months`),
            },
          ]}
          /* These homes are all sold: a visit is to the project on sale now, and the button says so. */
          actions={[
            { label: `Visit ${elements.shortName}`, href: links.bookVisit },
            { label: "See the homes on sale", href: elements.href },
          ]}
        />
      </ViewTransition>

      <SubNav
        items={nav}
        label="On this page"
        cta={{ label: "Book a visit", href: links.bookVisit }}
      />

      {/* What it is in one line, and beside it every fact the hero has not given. */}
      <Section id="overview" labelledBy="about-title" className={`${s.anchor} ${s.overview}`}>
        <div className={s.split}>
          <div className={s.about}>
            <h2 id="about-title" className={s.kicker}>
              <HomeMark className={s.kickerMark} />
              {p.name}, {p.handoverYear}
            </h2>
            <p className={`display ${s.lead}`}>{p.intro}</p>
            <div className={s.links}>
              {p.website && (
                <a
                  className="text-link"
                  href={p.website.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.website.label}
                  <ArrowRight />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
              <a
                className="text-link"
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find it on Google Maps
                <ArrowRight />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div id="facts" className={`${s.anchor} ${s.facts}`} role="group" aria-labelledby="facts-title">
            <h3 id="facts-title" className="sr-only">
              {p.shortName} in figures
            </h3>
            {figures.length > 0 && <SpecRow items={figures} tone="light" className={`${s.figures} reveal`} />}
            {details.length > 0 && (
              <div className="reveal">
                <FactList facts={details} />
              </div>
            )}
            {extras.length > 0 && (
              <div className={s.extras}>
                <Accordion items={extras} defaultOpen={null} />
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section id="timeline" tone="navy" labelledBy="timeline-title" className={`${s.anchor} ${s.record}`}>
        <div className={s.recordGrid}>
          <div className={s.recordHead}>
            <h2 id="timeline-title" className={s.recordTitle}>
              <span className={`mega sky ${s.recordFigure}`}>{p.timeline.months} months</span>
              <span className={`display ${s.recordWords}`}>from ground-breaking to the occupancy certificate.</span>
            </h2>
            {toKeys > 0 && !keysFirst && (
              <p className={s.recordLine}>
                Keys handed over {toKeys} months after work began, in {p.timeline.handover}.
              </p>
            )}
          </div>
          <div className={s.recordBody}>
            <ol className={s.marks} style={{ "--marks": marks.length } as CSSProperties}>
              {marks.map((m, k) => (
                <li key={m.k}>
                  <span className={s.track} aria-hidden="true">
                    <span className={s.dot} />
                    {k < gaps.length && (
                      <span className={s.seg}>
                        <span className={s.gap}>{months(gaps[k])}</span>
                      </span>
                    )}
                  </span>
                  <span className={s.markLabel}>{m.k}</span>
                  <span className={`display ${s.markValue}`}>{m.v}</span>
                </li>
              ))}
            </ol>
            <p className={s.share}>
              <ShareButton
                text={`${p.name}, ${p.locality}: ${factValue(p.facts, "Homes")} homes, ${p.timeline.months} months from the start of work to the occupancy certificate. By Disha Habitat.`}
                hash="timeline"
              >
                Send this record to family
              </ShareButton>
            </p>
          </div>
        </div>
      </Section>

      {showGallery && (
        <Section id="gallery" labelledBy="gallery-title" className={`${s.anchor} ${s.gallerySection}`}>
          <div className="reveal">
            <SectionHead id="gallery-title" title={`Inside ${p.shortName}.`} line={`${describe(gallery)}.`} />
          </div>
          <div className={s.gallery}>
            <Gallery items={gallery} layout="row" label={`Pictures of ${p.shortName}`} />
          </div>
        </Section>
      )}

      {words.length > 0 && (
        <Section id="residents" labelledBy="words-title" className={`${s.anchor} ${s.residents}`}>
          <h2 id="words-title" className={s.kicker}>
            <HomeMark className={s.kickerMark} />
            {words.length > 1 ? "Homeowners" : "A homeowner"} at {p.shortName}, on what home means
          </h2>
          <div className={s.words} data-count={words.length}>
            {words.map((w) => (
              <Quote key={w.name} quote={w.quote} name={w.name} detail={`Native of ${w.native}`} />
            ))}
          </div>
        </Section>
      )}

      {/*
       * The way on, in one band: these homes are all sold, so the project on sale now with its two buttons, and
       * beside it the next community as a photograph, the whole card a link.
       */}
      <section className={s.onward} aria-label="Where next">
        <div className={s.sale} data-tone="dark">
          <HomeMark className={s.saleMark} />
          <h2 className={`display ${s.saleTitle}`}>{elements.shortName} is selling now.</h2>
          <p className={s.saleLine}>
            20 acres in Gunjur, from the team that handed over {p.shortName} in {p.handoverYear}: 2, 3 &amp; 4 BHK
            apartments and 4 &amp; 5 BHK villas.
          </p>
          <div className={s.saleActions}>
            <Link className="btn btn-primary" href={links.bookVisit}>
              Book a visit
            </Link>
            <Link className="btn btn-ghost" href={elements.href}>
              See {elements.shortName}
            </Link>
          </div>
        </div>
        <nav aria-label="Next community" className={s.nextWrap}>
          <ViewTransition name={`community-${next.slug}`} share="morph" default="none">
            <Link href={`/homes/${next.slug}`} className={s.next} data-tone="dark">
              <Image
                src={next.cover.src}
                alt=""
                fill
                sizes="(min-width: 900px) 40vw, 100vw"
                quality={78}
                className={s.nextImg}
              />
              <span className={s.nextShade} aria-hidden="true" />
              <span className={s.nextText}>
                <span className={s.nextEyebrow}>Next community · {next.locality}</span>
                <span className={`display ${s.nextName}`}>{next.shortName}</span>
              </span>
              <span className={s.nextArrow} aria-hidden="true">
                <ArrowRight />
              </span>
            </Link>
          </ViewTransition>
        </nav>
      </section>
    </>
  );
}
