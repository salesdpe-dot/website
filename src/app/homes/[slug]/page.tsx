import type { Metadata } from "next";
import { type CSSProperties, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import {
  Accordion,
  CtaBand,
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
 * A community Disha has handed over, laid out as a case study on a tesla.com model page: the photograph
 * and its three figures, what it is in one line and its numbers large, a photograph from edge to edge, the
 * build record on the navy field, the rest of the pictures, the specification, the families who live
 * there in their own words, and the project on sale now.
 */
export default async function CommunityPage(props: PageProps<"/homes/[slug]">) {
  const { slug } = await props.params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projectsNewestFirst.indexOf(p);
  const next = projectsNewestFirst[(i + 1) % projectsNewestFirst.length];
  const words = homeowners.filter((h) => h.slug === p.slug);
  const mapQuery = encodeURIComponent(p.address ?? `${p.name}, ${p.locality}`);

  /* The figures large; every other fact, the RERA number and the address as rows beside them. */
  const figures = p.facts.map(asFigure).filter((f): f is BigSpec => f !== null);
  const details = [
    ...p.facts.filter((f) => !asFigure(f)),
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

  /*
   * One photograph runs from edge to edge after the figures: the first photograph the hero has not shown.
   * The gallery then shows the rest, and only when there are at least two of them. Sets that divide by
   * three take the mosaic; two or four sit in two columns; otherwise a picture that would end a row alone
   * spans it (on a phone, in two columns, likewise).
   */
  const unseen = p.gallery.filter((m) => m.src !== p.cover.src);
  const wide = unseen.find((m) => m.kind === "photo");
  const gallery = unseen.filter((m) => m !== wide);
  const showGallery = gallery.length >= 2;
  const n = gallery.length;
  const mosaic = n % 3 === 0;
  const twoUp = n === 2 || n === 4;
  const deskTail = !mosaic && !twoUp && n % 3 === 1;
  const phoneTail = mosaic ? n % 2 === 0 : n % 2 === 1;

  /* Signature spaces: three across, or four or two where three would leave the last one alone in its row. */
  const spaces = p.highlights?.length ?? 0;
  const spaceCols = [3, 4, 2].find((c) => spaces % c !== 1) ?? 1;

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

      <Section id="overview" labelledBy="about-title" className={s.anchor}>
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
      </Section>

      <Section id="facts" space="none" labelledBy="facts-title" className={`${s.anchor} ${s.factsSection}`}>
        <h2 id="facts-title" className="sr-only">
          {p.shortName} in figures
        </h2>
        <SpecRow items={figures} tone="light" className={`${s.figures} reveal`} />
        {details.length > 0 && (
          <div className={`${s.details} reveal`}>
            <FactList facts={details} />
          </div>
        )}
      </Section>

      {wide && (
        <figure className={s.wide}>
          <div className={s.wideMedia}>
            <Image src={wide.src} alt={wide.alt} fill sizes="100vw" quality={78} className={s.wideImg} />
          </div>
          <figcaption className={s.wideCaption}>{wide.caption}</figcaption>
        </figure>
      )}

      <Section id="timeline" tone="navy" labelledBy="timeline-title" className={s.anchor}>
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
      </Section>

      {showGallery && (
        <Section
          id="gallery"
          labelledBy="gallery-title"
          className={s.anchor}
        >
          <div className="reveal">
            <SectionHead
              id="gallery-title"
              size="large"
              title={`Inside ${p.shortName}.`}
              line={`${describe(gallery)}.`}
            />
          </div>
          <div
            className={s.gallery}
            data-two-up={twoUp || undefined}
            data-desk-tail={deskTail || undefined}
            data-phone-tail={phoneTail || undefined}
          >
            <Gallery items={gallery} layout={mosaic ? "mosaic" : "grid"} />
          </div>
        </Section>
      )}

      {p.highlights && (
        <Section tone="surface" labelledBy="highlights-title">
          <div className="reveal">
            <SectionHead
              id="highlights-title"
              size="large"
              title={`${p.highlights.length} signature spaces.`}
            />
          </div>
          <ol className={`${s.highlights} reveal-stagger`} data-cols={spaceCols}>
            {p.highlights.map((h, k) => (
              <li key={h.name}>
                <span className={s.num}>{String(k + 1).padStart(2, "0")}</span>
                <h3 className={s.hName}>{h.name}</h3>
                <p>{h.text}</p>
              </li>
            ))}
          </ol>
          {p.otherAmenities && (
            <div className={s.also}>
              <h3 className={s.alsoTitle}>Also in the community</h3>
              <ul>
                {p.otherAmenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </Section>
      )}

      {p.specifications && (
        <Section split labelledBy="specs-title">
          <div className="reveal">
            <SectionHead
              id="specs-title"
              title="Specifications."
              line="Selected items from the published specification."
            />
          </div>
          <Accordion
            items={p.specifications.map((sp) => ({
              title: sp.group,
              body: (
                <ul className={s.specItems}>
                  {sp.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            }))}
          />
        </Section>
      )}

      {words.length > 0 && (
        <Section id="residents" tone="surface" labelledBy="words-title" className={s.anchor}>
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

      <CtaBand
        title={`${elements.shortName} is selling now.`}
        line={`20 acres in Gunjur, from the team that handed over ${p.shortName} in ${p.handoverYear}: 2, 3 & 4 BHK apartments and 4 & 5 BHK villas.`}
        image={elements.cover}
        note="Artist’s impression"
        actions={[
          { label: "Book a visit", href: links.bookVisit },
          { label: `See ${elements.shortName}`, href: elements.href },
        ]}
      />

      <nav aria-label="Next community" className={s.nextWrap}>
        <ViewTransition
          name={`community-${next.slug}`}
          share="morph"
          default="none"
        >
          <Link
            href={`/homes/${next.slug}`}
            className={s.next}
            data-tone="dark"
          >
            <Image
              src={next.cover.src}
              alt=""
              fill
              sizes="100vw"
              quality={78}
              className={s.nextImg}
            />
            <span className={s.nextShade} aria-hidden="true" />
            <span className={s.nextText}>
              <span className={s.nextEyebrow}>
                Next community · {next.locality}
              </span>
              <span className={`display ${s.nextName}`}>{next.shortName}</span>
            </span>
            <span className={s.nextArrow} aria-hidden="true">
              <ArrowRight />
            </span>
          </Link>
        </ViewTransition>
      </nav>
    </>
  );
}
