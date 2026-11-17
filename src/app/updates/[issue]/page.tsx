import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComposeButton } from "@/components/ComposeButton";
import { Breadcrumbs, PageIntro, Section, SectionHead } from "@/components/ds";
import { SlashBreak } from "@/components/ds/SlashBreak";
import { ArrowRight } from "@/components/showroom/Icons";
import { links, pricesAndPlans } from "@/lib/content";
import { elements } from "@/lib/elements";
import { pageMeta } from "@/lib/launch";
import { type Issue, type NewsPhoto, issueHref, issues } from "@/lib/newsletter";
import s from "../updates.module.css";

type Props = { params: Promise<{ issue: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return issues.map((i) => ({ issue: i.slug }));
}

const find = (slug: string) => issues.find((i) => i.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = find((await params).issue);
  if (!i) return {};
  return pageMeta({
    title: `Construction update, ${i.month}`,
    description: `${elements.name}, ${i.quarter}: ${i.feature.title.toLowerCase()}, progress on every tower, the clubhouse and the villas, in site photographs.`,
    path: issueHref(i),
  });
}

const NEW_TAB = <span className="sr-only">(opens in a new tab)</span>;

/* The issue's parts, in its order, for the row of links under the title. */
const parts = [
  { id: "display", label: "Sample display" },
  { id: "towers", label: "Towers" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "villas", label: "Villas" },
  { id: "pictures", label: "In pictures" },
  { id: "homes", label: "Homes" },
];

/*
 * One quarter of the newsletter as a web page, in the PDF's order: the feature, the towers phase by phase with
 * each one's photograph and list, the clubhouse, the villa rows, the work in pictures, and which homes are sold out.
 * Every photograph is a site photograph from Disha's newsletter.
 */
export default async function IssuePage({ params }: Props) {
  const i = find((await params).issue);
  if (!i) notFound();
  return (
    <>
      <PageIntro
        above={
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Construction updates", href: "/updates" },
              { label: i.quarter },
            ]}
          />
        }
        eyebrow={`Quarterly newsletter · ${i.quarter} · ${i.number} of ${i.of}`}
        title={`${i.month}.`}
        line={`What was built at ${elements.name} this quarter, in site photographs.`}
      >
        <nav className={s.parts} aria-label="In this issue">
          {parts.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {p.label}
            </a>
          ))}
          <a href={i.pdf} target="_blank" rel="noopener noreferrer">
            The PDF
            {NEW_TAB}
          </a>
        </nav>
      </PageIntro>

      <Section id="display" space="tight" labelledBy="display-title">
        <SectionHead id="display-title" title={`${i.feature.title}.`} line={i.feature.text} />
        <Photos photos={i.feature.photos} lead={1} />
      </Section>

      <Section id="towers" tone="surface" space="tight" labelledBy="towers-title">
        <SectionHead id="towers-title" title="The towers." line="Floor by floor, as the site team reported it this quarter." />
        {i.phases.map((p) => (
          <div key={p.phase} className={s.phase}>
            <h3 className={s.phaseHead}>
              {p.phase} <span className={s.rera}>Karnataka RERA <SlashBreak code={p.rera} /></span>
            </h3>
            <div className={s.towers}>
              {p.towers.map((t) => (
                <article key={t.name} className={s.card} aria-labelledby={`${slug(t.name)}-title`}>
                  <figure className={s.cardPicture}>
                    <Image src={t.photo.src} alt={t.photo.caption} width={t.photo.width} height={t.photo.height} sizes="(min-width: 1024px) 220px, 40vw" quality={78} />
                  </figure>
                  <div className={s.cardText}>
                    <h4 id={`${slug(t.name)}-title`} className={`display ${s.cardTitle}`}>
                      {t.name}
                    </h4>
                    <p className={s.cardMeta}>
                      {t.family} Tower · {t.floorLevels} floor levels ({t.levels})
                    </p>
                    <Updates items={t.updates} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section id="clubhouse" space="tight" labelledBy="clubhouse-title">
        <SectionHead id="clubhouse-title" title="The clubhouse." />
        <div className={s.split}>
          <Updates items={i.clubhouse.updates} />
          <Photos photos={i.clubhouse.photos} />
        </div>
      </Section>

      <Section id="villas" tone="surface" space="tight" labelledBy="villas-title">
        <SectionHead id="villas-title" title="The villas." line={`${i.villas.rows.length} rows of 4 and 5 BHK villas, row by row.`} />
        <figure className={s.wide}>
          <Image src={i.villas.aerial.src} alt={i.villas.aerial.caption} width={i.villas.aerial.width} height={i.villas.aerial.height} sizes="(min-width: 1440px) 1344px, 100vw" quality={78} />
          <figcaption>{i.villas.aerial.caption}</figcaption>
        </figure>
        <div className={s.rows}>
          {i.villas.rows.map((r) => (
            <article key={r.row} className={s.card} aria-labelledby={`${r.row}-title`}>
              <figure className={s.cardPicture}>
                <Image src={r.photo.src} alt={r.photo.caption} width={r.photo.width} height={r.photo.height} sizes="(min-width: 1024px) 220px, 40vw" quality={78} />
              </figure>
              <div className={s.cardText}>
                <h3 id={`${r.row}-title`} className={`display ${s.cardTitle}`}>
                  Row {r.row}
                </h3>
                <p className={s.cardMeta}>
                  {r.facing}-facing · {r.bhk} BHK
                </p>
                <Updates items={r.updates} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="pictures" space="tight" labelledBy="pictures-title">
        <SectionHead id="pictures-title" title="The work, in pictures." />
        {i.groups.map((g) => (
          <div key={g.title} className={s.group}>
            <h3 className={s.groupTitle}>{g.title}</h3>
            <Photos photos={g.photos} />
          </div>
        ))}
      </Section>

      <Section id="homes" tone="navy" space="tight" labelledBy="homes-title">
        <Availability issue={i} />
      </Section>
    </>
  );
}

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

/* A tower's, a row's or the clubhouse's list, as the site team wrote it. */
function Updates({ items }: { items: string[] }) {
  return (
    <ul className={s.updates}>
      {items.map((u, n) => (
        <li key={n}>{u}</li>
      ))}
    </ul>
  );
}

/* Photographs with their captions, in a grid; `lead` of them run the full width first. */
function Photos({ photos, lead = 0 }: { photos: NewsPhoto[]; lead?: number }) {
  return (
    <div className={s.photos}>
      {photos.map((p, n) => (
        <figure key={p.src} className={n < lead ? s.photoLead : s.photo}>
          <Image
            src={p.src}
            alt={p.caption}
            width={p.width}
            height={p.height}
            sizes={n < lead ? "(min-width: 1440px) 1344px, 100vw" : "(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw"}
            quality={78}
          />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* Which homes are sold out, and the way to the rest. Prices stay with the sales team. */
function Availability({ issue: i }: { issue: Issue }) {
  return (
    <div className={s.homes}>
      <div>
        <h2 id="homes-title" className={`display sky ${s.homesTitle}`}>
          Homes this quarter.
        </h2>
        <ul className={s.sold}>
          {i.soldOut.map((h) => (
            <li key={h}>
              <span>{h}</span>
              <strong>Sold out</strong>
            </li>
          ))}
          <li>
            <span>Premium and Presidential homes</span>
            <strong>Ask the sales team</strong>
          </li>
        </ul>
        <p className={s.next}>The next update comes in {i.next}.</p>
      </div>
      <div className={s.homesActions}>
        <ComposeButton channel="whatsapp" topic={pricesAndPlans.compose} className="btn btn-primary">
          {pricesAndPlans.label}
        </ComposeButton>
        <Link href={links.bookVisit} className="btn btn-line">
          Book a site visit
        </Link>
        <Link href="/updates" className="text-link">
          Earlier issues <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
