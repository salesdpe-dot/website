import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { WatchFilm } from "@/components/brand/WatchFilm";
import { CommuteLazy } from "@/components/CommuteLazy";
import { ComposeButton } from "@/components/ComposeButton";
import { Gallery, PhotoHero } from "@/components/ds";
import { SlashBreak } from "@/components/ds/SlashBreak";
import { EnquirySection } from "@/components/home/EnquirySection";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import { ArrowRight, PlayIcon } from "@/components/showroom/Icons";
import { HomeMark } from "@/components/showroom/Logo";
import { communities, links } from "@/lib/content";
import { elements as e, type Reel } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import { pageMeta } from "@/lib/launch";
import { award, homesHandedOver } from "@/lib/proof";
import { formatIndian } from "@/lib/site";
import { FeaturePanel } from "../FeaturePanel";
import { SubNav } from "../SubNav";
import { ElementsStory } from "./ElementsStory";
import { FilmTile } from "./FilmTile";
import { type Family, HomesTabs, type View } from "./HomesTabs";
import { MediaBrowser } from "./MediaBrowser";
import { PlanViewer } from "./PlanViewer";
import { PoolSwitch } from "./PoolSwitch";
import { ProjectMap } from "./ProjectMap";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: e.name,
  description: `${e.name}, Gunjur, East Bengaluru: 2, 3 & 4 BHK apartments in seven towers and 4 & 5 BHK villas on 20 acres, with a 1,35,000+ sq ft clubhouse. RERA registered.`,
  path: e.href,
  image: { url: "/images/og/pursuit-of-the-elements.jpg", width: 1200, height: 630, alt: e.cover.alt },
});

const NEW_TAB = <span className="sr-only">(opens in a new tab)</span>;

/* The bar's sections. On a phone the ones marked go, so the rest fit across a 390 px screen. */
const nav = [
  { id: "inside", label: "Inside", phoneHidden: true },
  { id: "homes", label: "Homes" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "pool", label: "Pool", phoneHidden: true },
  { id: "outdoors", label: "Outdoors" },
  { id: "films", label: "Films", phoneHidden: true },
  { id: "gallery", label: "Gallery", phoneHidden: true },
  { id: "plan", label: "Plan" },
  { id: "location", label: "Map" },
  { id: "check", label: "RERA", phoneHidden: true },
  { id: "enquire", label: "Visit" },
];

const { hero, home, door, overVillas, towers, villas, villaRows, villasAerial, clubhouse, clubFront, clubAerial, outdoors, night, pool } = e.films;
/* A view for the tabs: a film over its first frame, or a still from the gallery by its file name. */
const film = (r: Reel): View => ({ picture: r.poster, film: r.film });
const picture = (name: string) => e.gallery.find((p) => p.src.endsWith(`/${name}.webp`))!;
const still = (name: string): View => ({ picture: picture(name) });
const balcony = picture("balcony-view");

/* The tower families and the villas, as on the project site's floor-plan pages. */
const families: Family[] = [
  {
    tab: "Presidential Towers",
    meta: "D, E · 29 floors",
    name: "Presidential Towers",
    which: "Towers D and E",
    line: "The tallest of the seven: 29 floors over 2 basements and 2 parking levels.",
    figures: [
      { value: "29", label: "Floors" },
      { value: "2", label: "Towers, D and E" },
      { value: "2 + 2", label: "Basements + parking levels" },
    ],
    views: [film(towers), still("towers-sky"), still("aerial-day"), still("aerial-arena")],
  },
  {
    tab: "Premium Towers",
    meta: "A, B, F, G · 25 floors",
    name: "Premium Towers",
    which: "Towers A, B, F and G",
    line: "Four towers of 25 floors, over a basement and 2 parking levels.",
    figures: [
      { value: "25", label: "Floors" },
      { value: "4", label: "Towers, A, B, F and G" },
      { value: "1 + 2", label: "Basement + parking levels" },
    ],
    views: [{ picture: e.cover }, still("driveway"), still("podium"), still("entry-gate")],
  },
  {
    tab: "Millennium Tower",
    meta: "C · 23 floors",
    name: "Millennium Tower",
    which: "Tower C",
    line: "One tower of 23 floors, behind the arched entrance lettered C.",
    figures: [
      { value: "23", label: "Floors" },
      { value: "1", label: "Tower, C" },
      { value: "2 + 2", label: "Basements + parking levels" },
    ],
    views: [still("entrance-tower"), still("aerial-night")],
  },
  {
    tab: "Villas",
    meta: "4 & 5 BHK",
    name: "Villas",
    which: "Independent villas",
    line: "Independent 4 & 5 BHK villas inside the same 20 acres as the towers.",
    figures: [
      { value: "4 & 5", unit: "BHK", label: "Villas" },
      { value: "20", unit: "acres", label: "Shared with the towers" },
      { value: "40+", label: "Amenities" },
    ],
    views: [film(villasAerial), film(villaRows), film(overVillas), film(villas), still("villa-lane"), still("villas-street")],
  },
];

const gallery = e.gallery;
const groups = ["Exteriors", "Clubhouse", "Outdoors", "Homes"] as const;

/* The home page's map, resting on this community. */
const mapItems = communities.map(({ slug, name, place }) => ({ slug, name, place }));
const mapStart = Math.max(0, mapItems.findIndex((c) => c.slug === e.slug));

/*
 * The project on sale, laid out like a tesla.com model page: the film and its figures, then a bar that follows
 * you down the page. A walk through a home, the towers and villas as tabs, the five elements as you scroll, the
 * clubhouse room by room on film, the rooftop pool by day and night, the grounds zone by zone, the four films with
 * music, every render, the master plan, the drive, the papers, the site at night, and one enquiry form. Every
 * picture and film is a render, and says so.
 */
export default function ElementsPage() {
  return (
    <div className={s.page}>
      <ViewTransition name={`community-${e.slug}`} share="morph" default="none">
        <PhotoHero
          eyebrow={`${e.status} · ${e.locality}`}
          title={e.shortName}
          line="2, 3 & 4 BHK apartments. 4 & 5 BHK villas."
          image={hero.poster}
          film={hero.film}
          note="Artist’s impression"
          figures={[
            { value: "20", unit: "acres", label: "Gunjur" },
            { value: "7", unit: "towers", label: "Up to 29 floors" },
            { value: "1,35,000+", unit: "sq ft", label: "Clubhouse" },
            { value: "40+", label: "Amenities" },
          ]}
          actions={[{ label: "Book a visit", href: "#enquire" }]}
        >
          <ComposeButton channel="whatsapp" topic="Floor plans and carpet areas" className="btn btn-ghost">
            Get floor plans
          </ComposeButton>
        </PhotoHero>
      </ViewTransition>

      <SubNav items={nav} label="On this page" cta={{ label: "Book a visit", href: "#enquire" }} />

      {/* Step inside: the walk through a home, full width, then the door and the balcony. */}
      <section id="inside" className={s.inside} aria-labelledby="inside-title">
        <div className={s.edge}>
          <Head id="inside-title" kicker="Step inside" title="Front door to master bedroom." />
        </div>
        <figure className={s.walk}>
          <LoopFilm film={home.film} poster={home.poster} sizes="100vw" />
          <FilmToggle className={s.walkToggle} />
          <figcaption className={s.walkCaption}>{home.poster.caption}</figcaption>
          <span className={s.note}>Artist’s impression</span>
        </figure>
        <div className={s.moments}>
          <FilmTile reel={door} sizes="(min-width: 768px) 50vw, 100vw" className={`reveal ${s.moment}`} />
          <figure className={`reveal ${s.picture} ${s.moment}`}>
            <Image src={balcony.src} alt={balcony.alt} fill sizes="(min-width: 768px) 50vw, 100vw" quality={78} className={s.cover} style={focusPoint(balcony)} />
            <span className={s.note}>Artist’s impression</span>
            <figcaption className={s.pictureCaption}>{balcony.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section id="homes" className={`${s.band} ${s.surface}`} aria-labelledby="homes-title">
        <div className={s.inner}>
          <Head
            id="homes-title"
            kicker="Homes"
            title="Seven towers. Independent villas."
            line="2, 3 & 4 BHK apartments in Towers A to G, and 4 & 5 BHK villas, on 20 acres in Gunjur."
          />
          <HomesTabs families={families} />
          <p className={s.aside}>
            <Link className="text-link" href={links.emi}>
              Work out your monthly EMI <ArrowRight />
            </Link>
          </p>
        </div>
      </section>

      <ElementsStory />

      <div id="amenities" className={s.anchor}>
        <div id="clubhouse">
          <FeaturePanel
            id="clubhouse-film"
            image={clubhouse.poster}
            film={clubhouse.film}
            eyebrow="The clubhouse"
            title="The clubhouse"
            line="Behind the Elements globe roundabout: a rooftop pool, a mini theatre, indoor courts, a banquet hall and guest rooms."
            position={clubhouse.poster.position}
            mobilePosition={clubhouse.poster.mobilePosition}
            figures={[
              { value: "1,35,000+", unit: "sq ft", label: "Clubhouse" },
              { value: "Triple", unit: "height", label: "Lobby, under a skylight" },
              { value: "Rooftop", label: "Temperature-controlled pool" },
              { value: "3rd", unit: "floor", label: "Rooftop terrace café" },
            ]}
          >
            <a className="btn btn-primary" href="#rooms">
              See every room
            </a>
          </FeaturePanel>

          <section id="rooms" className={`${s.band} ${s.navy}`} aria-labelledby="rooms-title">
            <div className={s.inner}>
              <div className={s.pair}>
                <FilmTile reel={clubFront} sizes="(min-width: 768px) 50vw, 100vw" className={`reveal ${s.pairTile}`} />
                <FilmTile reel={clubAerial} sizes="(min-width: 768px) 50vw, 100vw" className={`reveal ${s.pairTile}`} />
              </div>
              <Head
                id="rooms-title"
                kicker="Room by room"
                title="From the triple-height lobby to the rooftop terrace café."
                line="Library, mini theatre, music room, dance studio, gymnasium, indoor badminton, banquet hall, guest rooms and a senior citizens’ lounge."
                tone="dark"
              />
              <MediaBrowser id="rooms" label="Rooms in the clubhouse" items={e.clubRooms} />
            </div>
          </section>
        </div>

        <section id="pool" className={s.pool} aria-labelledby="pool-title">
          <div className={s.edge}>
            <Head
              id="pool-title"
              kicker="The pool"
              title="A temperature-controlled pool on the roof."
              line="With a kids’ pool, a pool deck, a pool bar, a juice bar and a tropical poolside café."
            />
          </div>
          <PoolSwitch
            views={[
              { label: "Day", picture: e.poolDay },
              { label: "Night", picture: e.poolNight },
            ]}
          />
          <div className={`${s.edge} ${s.poolRow}`} data-count={e.poolside.length + 1}>
            <FilmTile reel={pool} sizes="(min-width: 900px) 30vw, 100vw" className={`reveal ${s.poolFilm}`} />
            {e.poolside.map((p) => (
              <figure key={p.src} className={`reveal ${s.picture} ${s.poolPicture}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 900px) 35vw, 100vw" quality={78} className={s.cover} style={focusPoint(p)} />
                <span className={s.note}>Artist’s impression</span>
                <figcaption className={s.pictureCaption}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <div id="outdoors">
          <FeaturePanel
            id="outdoors-film"
            image={outdoors.poster}
            film={outdoors.film}
            eyebrow="Outdoors"
            title="The amphitheatre and the Highpoint pavilion"
            line="Grass steps, a pavilion planted on top, and 20 acres of courts and gardens around them."
            position={outdoors.poster.position}
            mobilePosition={outdoors.poster.mobilePosition}
            figures={[
              { value: "20", unit: "acres", label: "Gunjur" },
              { value: "Twin", label: "Tennis & futsal courts" },
              { value: "40+", label: "Amenities in all" },
            ]}
          >
            <a className="btn btn-primary" href="#zones">
              See every zone
            </a>
          </FeaturePanel>

          <section id="zones" className={s.band} aria-labelledby="zones-title">
            <div className={s.inner}>
              <Head
                id="zones-title"
                kicker="Zone by zone"
                title="The Aqua Park to the vegetable garden."
                line="Pet park, mini golf, skate park, pickleball court, beach volleyball, cricket pitch, jogging track, and a camping zone with picnic tents round a fire pit."
              />
              <MediaBrowser id="zones" label="Outdoor zones" items={e.zones} tone="light" />
            </div>
          </section>
        </div>
      </div>

      <section id="films" className={`${s.band} ${s.navy}`} aria-labelledby="films-title">
        <div className={s.inner}>
          <Head id="films-title" kicker="Films" title="Four films, with sound." line="Walkthroughs of the clubhouse and the grounds, 20 seconds each." tone="dark" />
          <ul className={s.strip}>
            {e.shorts.map((f) => (
              <li key={f.src} className="reveal">
                <WatchFilm short={f} className={s.short}>
                  <span className={s.shortMedia}>
                    <Image src={f.poster.src} alt="" fill sizes="(min-width: 768px) 48vw, 84vw" quality={75} className={s.cover} />
                    <span className={s.play} aria-hidden="true">
                      <PlayIcon />
                    </span>
                    <span className={s.note}>Artist’s impression</span>
                  </span>
                  <span className={s.shortTitle}>{f.title}</span>
                  <span className={s.shortLine}>{f.line}</span>
                </WatchFilm>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="gallery" className={`${s.band} ${s.surface}`} aria-labelledby="gallery-title">
        <div className={s.inner}>
          <Head id="gallery-title" kicker="Gallery" title={`${gallery.length} renders.`} line="Exteriors, clubhouse, outdoors and homes." />
          <Gallery items={gallery} groups={groups} label="Artist’s impressions" />
        </div>
      </section>

      <section id="plan" className={s.band} aria-labelledby="plan-title">
        <div className={s.inner}>
          <Head
            id="plan-title"
            kicker="Master plan"
            title="Seven towers, the villas, the clubhouse and the grounds, on one sheet."
            line="Open it full size to read the legend."
          />
          <PlanViewer src={e.masterPlan.src} alt={e.masterPlan.alt} width={e.masterPlan.width} height={e.masterPlan.height} />
        </div>
      </section>

      <section id="location" className={`${s.band} ${s.surface}`} aria-labelledby="location-title">
        <div className={s.inner}>
          <Head id="location-title" kicker="Location" title="Gunjur, East Bengaluru." line="Pick your office, and Google Maps shows today’s drive from the site." />
          <ProjectMap items={mapItems} start={mapStart} />
          <CommuteLazy />
        </div>
      </section>

      <section id="check" className={`${s.band} ${s.navy}`} aria-labelledby="check-title">
        <div className={`${s.inner} ${s.check}`}>
          <div className={s.checkText}>
            <Head id="check-title" kicker="Check us" title="Two RERA numbers. One ET award." tone="dark" />
            <div className={s.rera} id="rera">
              <p className={s.reraTitle}>Karnataka RERA</p>
              <ul className={s.reraList}>
                {e.rera.map((r) => (
                  <li key={r.no}>
                    <span className={s.phase}>{r.phase}</span>
                    <span className={s.no}>
                      <SlashBreak code={r.no} />
                    </span>
                  </li>
                ))}
              </ul>
              <a className={`text-link ${s.onNavy}`} href={links.rera} target="_blank" rel="noopener noreferrer">
                Verify on the RERA portal <ArrowRight />
                {NEW_TAB}
              </a>
            </div>
            <dl className={s.proof}>
              <div>
                <dt>Homes handed over since 2014, in five communities</dt>
                <dd>
                  <Link href="/homes">{formatIndian(homesHandedOver)}</Link>
                </dd>
              </div>
              <div>
                <dt>Latest construction photographs</dt>
                <dd>
                  <a href={e.updates} target="_blank" rel="noopener noreferrer">
                    {e.latestUpdate}
                    {NEW_TAB}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <figure className={s.award}>
            <Image
              src={award.image}
              alt={`${award.title} ${award.honour} for ${e.name}`}
              width={315}
              height={227}
              sizes="(min-width: 1024px) 360px, 80vw"
              quality={78}
              className={s.awardImg}
            />
            <figcaption>
              <strong>{award.title}</strong>
              {award.honour}: {award.citation}
            </figcaption>
          </figure>
        </div>
      </section>

      <FeaturePanel
        id="visit"
        image={night.poster}
        film={night.film}
        eyebrow={e.locality}
        title="See it in person"
        line={`Sales: ${e.phone.display}. Come and walk the site with us.`}
        position={night.poster.position}
        mobilePosition={night.poster.mobilePosition}
      >
        <a className="btn btn-primary" href="#enquire">
          Book a visit
        </a>
        <a className="btn btn-ghost" href={e.phone.href}>
          Call sales
        </a>
      </FeaturePanel>

      <EnquirySection defaultInterest={e.name} n="" />
    </div>
  );
}

/* A section's heading: the house icon and a small word, the title large, and one line under it. */
function Head({ id, kicker, title, line, tone = "light" }: { id: string; kicker: string; title: string; line?: string; tone?: "light" | "dark" }) {
  return (
    <div className={`reveal ${s.head}`} data-tone={tone}>
      <p className={s.kicker}>
        <HomeMark className={s.mark} />
        {kicker}
      </p>
      <h2 id={id} className={`display ${s.title}`}>
        {title}
      </h2>
      {line && <p className={s.lede}>{line}</p>}
    </div>
  );
}
