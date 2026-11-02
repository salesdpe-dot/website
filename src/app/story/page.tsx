import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion, CtaBand, Feature, Gallery, Section, SectionHead } from "@/components/ds";
import { PhotoHero } from "@/components/ds";
import { ArrowRight } from "@/components/showroom/Icons";
import { HomeMark } from "@/components/showroom/Logo";
import { company, dishaFamily, formatIndian, homemakerProfiles, homemakers, poem, stats } from "@/lib/site";
import { Stats } from "./Stats";
import { links } from "@/lib/content";
import { pageMeta } from "@/lib/launch";
import { projects, projectsByHandover } from "@/lib/projects";
import { award, homesHandedOver } from "@/lib/proof";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "Our story",
  description: `How two homebuyers became builders: Disha Habitat since 2014, five communities and ${formatIndian(homesHandedOver)} homes handed over in East Bengaluru.`,
  path: "/story",
});

/* Condensed from the founders’ published profiles (site.ts); they should approve the wording. */
const voices: Record<string, string> = {
  "Gunaranjan J":
    "Fifteen years in software: ERP, SAP, data warehousing, consulting for businesses in the USA. A practising horticulturist, which you will see in every Disha garden.",
  "K Raja Sekhar":
    "Built mobile-tower infrastructure for Airtel, Vodafone, Idea and Reliance, then a long stretch with HCL Technologies. He explains a structure plainly until the maths is clear.",
};

const promises = [
  ["Explain everything.", "No question is too small. If something needs explaining, we sit down and explain it."],
  ["Build it properly.", "Build quality has always been our biggest strength, and our residents are the ones who tell people so."],
  ["Price it mindfully.", "Every home, from an apartment to an independent villa, is planned and priced with the same care."],
] as const;

const artists = ["Shankar Ehsaan Loy", "Shreya Ghoshal", "Armaan Malik", "Piyush Mishra", "K S Chithra", "Sunil Grover"];

const family = dishaFamily.slice(0, 6).map((f) => ({
  src: f.src,
  width: 1600,
  height: f.src.includes("team-1-") ? 1204 : 1067,
  alt: f.alt,
  caption: f.kind,
  kind: "photo" as const,
}));

const homesOf = (p: (typeof projects)[number]) => p.facts.find((f) => f.label === "Homes")?.value;
const year = (date: string) => date.split(" ")[1];

export default function StoryPage() {
  const windsor = projects.find((p) => p.slug === "disha-windsor-gardens")!;
  const first = projectsByHandover[0];
  const last = projectsByHandover.at(-1)!;
  const delivered = stats.find((st) => st.label === "Sq ft delivered")!;
  const making = stats.find((st) => st.label === "Sq ft in the making")!;

  return (
    <>
      <PhotoHero
        title="Our story"
        line={`Two homebuyers who became builders. Since ${company.founded}: five communities and ${formatIndian(homesHandedOver)} homes in East Bengaluru.`}
        image={{
          src: "/images/community/site-team-1600.webp",
          width: 1600,
          height: 1067,
          alt: "The Disha Habitat site and engineering team gathered on a landscaped lawn",
          position: "50% 35%",
        }}
        specs={[
          { value: String(company.founded), label: "Building since" },
          { value: String(projectsByHandover.length), label: "Communities handed over" },
          { value: formatIndian(homesHandedOver), label: "Homes handed over" },
        ]}
        actions={[{ label: "Book a visit", href: links.bookVisit }]}
      />

      {/* The company's own poem, set as the guideline sets its headlines: sky blue on navy, with the house icon under it. */}
      <Section tone="navy" label="Our poem">
        <p className={`mega ${s.poem}`}>
          {poem.opening.map((l) => (
            <span key={l} className={s.line}>
              {l}
            </span>
          ))}
          <span className={`${s.line} ${s.dots}`} aria-hidden="true">
            …
          </span>
          <span className={s.line}>{poem.closing}</span>
        </p>
        <HomeMark className={s.poemMark} />
      </Section>

      <Section split labelledBy="begin-title">
        <div className="reveal">
          <SectionHead id="begin-title" size="large" title="We were homebuyers first." />
        </div>
        <div className={`${s.prose} ${s.big}`}>
          <p>We asked the questions every buyer asks.</p>
          <p>
            We became homebuyers first, then investors, and then developers and builders. We learnt each of those from the place of
            not knowing, and every stumble taught us what it takes to keep a promise.
          </p>
          <p>That is why every home we plan starts from the buyer’s side of the table.</p>
        </div>
      </Section>

      <Section tone="surface" labelledBy="founders-title" id="homemakers">
        <div className="reveal">
          <SectionHead
            id="founders-title"
            size="large"
            title="Software and telecom towers, then homes."
            line={`Gunaranjan J and K Raja Sekhar, founders and directors of Disha Habitat since ${company.founded}.`}
          />
        </div>
        <div className={s.founders}>
          {homemakers.map((h) => (
            <article key={h.name} className={s.founder}>
              <div className={`${s.portrait} reveal`}>
                <Image src={h.portrait} alt={`Portrait of ${h.name}`} fill sizes="(min-width: 900px) 40vw, 100vw" className={s.portraitImg} />
              </div>
              <p className="eyebrow">{h.role}</p>
              <h3 className={`display ${s.name}`}>{h.name}</h3>
              <p className={`display ${s.signature}`}>{h.signature}</p>
              <p className={s.bio}>{voices[h.name]}</p>
              <Accordion
                defaultOpen={null}
                items={[
                  {
                    title: `More about ${h.short}`,
                    body: (
                      <div className={s.prose}>
                        {homemakerProfiles[h.name].map((t) => (
                          <p key={t}>{t}</p>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </article>
          ))}
        </div>
      </Section>

      <Section labelledBy="five-title">
        <div className="reveal">
          <SectionHead
            id="five-title"
            size="large"
            title={`Five communities, ${year(first.timeline.start)} to ${last.handoverYear}.`}
            line="Our first four sold out by word of mouth: our homebuyers told their friends."
            link={{ label: "See all our homes", href: links.homes }}
          />
        </div>
        <div className={s.track}>
          <svg className={`draw ${s.rail}`} viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M1 0V100" pathLength="1" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <ol className={`${s.list} reveal-stagger`}>
            {projectsByHandover.map((p) => (
              <li key={p.slug}>
                <Link href={`/homes/${p.slug}`} className={s.row}>
                  <span className={s.thumb}>
                    <Image src={p.cover.src} alt="" fill sizes="160px" quality={75} className={s.thumbImg} />
                  </span>
                  <span className={s.rowText}>
                    <span className={s.rowYear}>{p.handoverYear}</span>
                    <span className={`display ${s.rowName}`}>{p.shortName}</span>
                    <span className={s.rowMeta}>
                      {p.timeline.start} to {p.timeline.completion}
                    </span>
                  </span>
                  <span className={s.rowFigures}>
                    <span>
                      <strong>{homesOf(p)}</strong> homes
                    </span>
                    <span>
                      <strong>{p.timeline.months}</strong> months
                    </span>
                  </span>
                  <ArrowRight />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section space="tight" labelledBy="first-title">
        <div className={s.pair}>
          <Feature image={windsor.cover} ratio="wide">
            <p className="eyebrow">
              {year(windsor.timeline.start)} · Our first community
            </p>
            <h2 id="first-title" className={`display ${s.h2}`}>
              Ninety-two homes among the palms.
            </h2>
            <p>
              {windsor.name}, on Panathur–Varthur Road: {homesOf(windsor)} homes on 1.25 acres, among coconut palms. We broke ground in{" "}
              {windsor.timeline.start} and handed over the keys in {windsor.timeline.handover}.
            </p>
            <Link href={`/homes/${windsor.slug}`} className="text-link">
              See {windsor.shortName}
              <ArrowRight />
            </Link>
          </Feature>
        </div>
      </Section>

      <Section tone="navy" labelledBy="numbers-title">
        <div className="reveal">
          <SectionHead
            id="numbers-title"
            size="large"
            title={`${formatIndian(delivered.value)}${delivered.suffix} sq ft built. ${formatIndian(making.value)}${making.suffix} in the making.`}
            line="Our homebuyers have been our brand ambassadors from the start, and the community grows with every project."
          />
        </div>
        <Stats items={stats} />
      </Section>

      <Section labelledBy="promise-title">
        <div className="reveal">
          <SectionHead id="promise-title" size="large" title="Three promises we made ourselves." />
        </div>
        <ol className={s.promises}>
          {promises.map(([t, d], i) => (
            <li key={t}>
              <span className={s.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={`display ${s.promise}`}>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <blockquote className={s.inkQuote}>
          <p className={`display ${s.ink}`}>
            Life is colourful, and every colour is open to interpretation. That is why, when it comes to promises, we only deal in
            two: our promises are inked in black, and our approach is clear white.
          </p>
          <footer className={s.sign}>Gunaranjan J and K Raja Sekhar, founders</footer>
        </blockquote>
      </Section>

      <Section tone="surface" labelledBy="family-title">
        <div className="reveal">
          <SectionHead
            id="family-title"
            size="large"
            title="One big family."
            line="Homeowners at home, and the site and office teams who built their homes."
          />
        </div>
        <div className={s.gal}>
          <Gallery items={family} layout="grid" />
        </div>
      </Section>

      <Section labelledBy="events-title">
        <div className={s.event}>
          <div className={s.eventText}>
            <p className="eyebrow">{award.title}</p>
            <h2 id="events-title" className={`display ${s.h2}`}>
              Innovation Real Estate Project of the Year.
            </h2>
            <p>
              A {award.honour} for {award.project}, residential category. We have also presented or supported concerts in Bengaluru by{" "}
              {artists.slice(0, -1).join(", ")} and {artists.at(-1)}.
            </p>
            <a href={company.brandFilm.youtubeUrl} className="text-link" target="_blank" rel="noopener noreferrer">
              Watch our brand film
              <ArrowRight />
              <span className="sr-only">(opens YouTube in a new tab)</span>
            </a>
          </div>
          <div className={`${s.certificate} reveal`} data-tone="dark">
            <Image
              src={award.image}
              width={315}
              height={227}
              alt="ET Business Awards 2025 Certificate of Excellence for Disha Pursuit of the Elements, Innovation Real Estate Project of the Year"
            />
          </div>
        </div>
      </Section>

      <CtaBand
        title="Bring every question."
        line="Meet us at the site in Gunjur or at the office on Whitefield Main Road, over coffee."
        actions={[
          { label: "Book a visit", href: links.bookVisit },
          { label: "See our homes", href: links.homes },
        ]}
      />
    </>
  );
}
