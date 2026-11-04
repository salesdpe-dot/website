import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accordion, CtaBand, Section, SectionHead } from "@/components/ds";
import { PhotoHero } from "@/components/ds";
import { ArrowRight } from "@/components/showroom/Icons";
import { HomeMark } from "@/components/showroom/Logo";
import { company, formatIndian, homemakerProfiles, homemakers, poem, stats } from "@/lib/site";
import { Album } from "./Album";
import { Stats } from "./Stats";
import { links } from "@/lib/content";
import { pageMeta } from "@/lib/launch";
import { projects, projectsByHandover } from "@/lib/projects";
import { award, homesHandedOver, residentRating as rating } from "@/lib/proof";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "Our story",
  description: `How two homebuyers became builders: Disha Habitat since 2014, five communities and ${formatIndian(homesHandedOver)} homes handed over in East Bengaluru.`,
  path: "/story",
});

const promises = [
  ["Explain everything.", "No question is too small. If something needs explaining, we sit down and explain it."],
  ["Build it properly.", `Our residents are the ones who tell people so: ${rating.community} is rated ${rating.score} out of ${rating.outOf} by ${rating.reviews} residents on ${rating.source}.`],
  ["Price it mindfully.", "Every home, from an apartment to an independent villa, is planned and priced with the same care."],
] as const;

const artists = ["Shankar Ehsaan Loy", "Shreya Ghoshal", "Armaan Malik", "Piyush Mishra", "K S Chithra", "Sunil Grover"];

const homesOf = (p: (typeof projects)[number]) => p.facts.find((f) => f.label === "Homes")?.value;
const year = (date: string) => date.split(" ")[1];

/*
 * The story in seven short bands, each about a screen or less: who we are (the poem beside how we began), the
 * founders (their full profiles a tap away), the five communities with the square feet built, the promises, the
 * family, the award, and the invitation.
 */
export default function StoryPage() {
  const windsor = projects.find((p) => p.slug === "disha-windsor-gardens")!;
  const first = projectsByHandover[0];
  const last = projectsByHandover.at(-1)!;
  /*
   * The square feet from the published "This is us" figures. The communities and homes are already in the hero, and
   * "1,000+ happy families" and "20,000+ site visits" are left out: beside 1,102 homes the first reads as a different
   * count, and neither can be checked.
   */
  const figures = [stats.find((st) => st.label === "Sq ft delivered")!, stats.find((st) => st.label === "Sq ft in the making")!];

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

      {/* The company's own poem, sky blue on navy as the guideline sets its headlines, beside how we began. */}
      <Section tone="navy" space="tight" labelledBy="begin-title">
        <div className={s.opening}>
          <div>
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
          </div>
          <div className={s.begin}>
            <h2 id="begin-title" className={`display ${s.beginTitle}`}>
              We were homebuyers first.
            </h2>
            <p className={s.statement}>We asked the questions every buyer asks.</p>
            <p>
              Then we became investors, and then developers and builders. We learnt each of those from the place of not knowing, and every
              stumble taught us what it takes to keep a promise. That is why every home we plan starts from the buyer’s side of the table.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface" space="tight" labelledBy="founders-title" id="homemakers">
        <SectionHead id="founders-title" title="Software and telecom towers, then homes." />
        <div className={s.founders}>
          {homemakers.map((h) => (
            <article key={h.name} className={s.founder}>
              <div className={s.portrait}>
                <Image src={h.portrait} alt={`Portrait of ${h.name}`} fill sizes="128px" className={s.portraitImg} />
              </div>
              <div className={s.who}>
                <p className="eyebrow">{h.role}</p>
                <h3 className={`display ${s.name}`}>{h.name}</h3>
              </div>
              <p className={`display ${s.signature}`}>{h.signature}</p>
              <div className={s.bio}>
                <Accordion
                  defaultOpen={null}
                  items={[
                    {
                      title: `Read more about ${h.short}`,
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
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section space="tight" labelledBy="five-title">
        <SectionHead
          id="five-title"
          title={`Five communities, ${year(first.timeline.start)} to ${last.handoverYear}.`}
          line={`We began with ${windsor.name}, on Panathur–Varthur Road: ${homesOf(windsor)} homes on 1.25 acres among coconut palms. Our first four sold out by word of mouth.`}
        />
        <Stats items={figures} />
        <ol className={s.track} aria-label="Our communities, in the order they were handed over">
          {projectsByHandover.map((p) => (
            <li key={p.slug}>
              <Link href={`/homes/${p.slug}`} className={s.card}>
                <span className={s.thumb}>
                  <Image src={p.cover.src} alt="" fill sizes="(min-width: 900px) 18vw, 64vw" quality={75} className={s.thumbImg} />
                  {p.cover.kind === "render" && <span className={s.tag}>Artist’s impression</span>}
                </span>
                <span className={s.cardYear}>
                  {p.handoverYear}
                  {p.slug === windsor.slug && " · Our first"}
                </span>
                <span className={`display ${s.cardName}`}>
                  {p.shortName}
                  <ArrowRight />
                </span>
                <span className={s.cardMeta}>
                  {p.timeline.start} to {p.timeline.completion}
                </span>
                <span className={s.cardFigures}>
                  <span>
                    <strong>{homesOf(p)}</strong> homes
                  </span>
                  <span>
                    <strong>{p.timeline.months}</strong> months
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" space="tight" labelledBy="promise-title">
        <SectionHead id="promise-title" title="Three promises we made ourselves." />
        <ol className={s.promises}>
          {promises.map(([t, d], i) => (
            <li key={t}>
              <h3 className={`display ${s.promise}`}>
                <span className={s.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t}
              </h3>
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

      {/* The album as on the first Our story page: two piles of prints to flick through, on the navy band. */}
      <Section tone="navy" labelledBy="family-title" className={s.familyBand}>
        <div className={s.family}>
          <div className={s.familyHead}>
            <p className="eyebrow">Our homemakers · The Disha family</p>
            <h2 id="family-title" className={`display ${s.familyTitle}`}>
              One big family, <span className={s.keep}>close-knit</span> and mindful.
            </h2>
            <p className={s.familyLine}>The families who live in our homes, and the people who build them. Pull up a chair and go through the album.</p>
            <p className={s.familyHint}>Tap or click a photo for the next one</p>
          </div>
          <Album />
        </div>
      </Section>

      <Section tone="surface" space="tight" labelledBy="events-title">
        <div className={s.event}>
          <div className={s.certificate} data-tone="dark">
            <Image
              src={award.image}
              width={315}
              height={227}
              alt="ET Business Awards 2025 Certificate of Excellence for Disha Pursuit of the Elements, Innovation Real Estate Project of the Year"
            />
          </div>
          <div className={s.eventHead}>
            <p className="eyebrow">{award.title}</p>
            <h2 id="events-title" className={`display ${s.h2}`}>
              Innovation Real Estate Project of the Year.
            </h2>
          </div>
          <div className={s.eventText}>
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
