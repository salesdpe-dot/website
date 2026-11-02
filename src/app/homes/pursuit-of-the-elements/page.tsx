import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { CommuteLazy } from "@/components/CommuteLazy";
import { ComposeButton } from "@/components/ComposeButton";
import { Gallery, PhotoHero } from "@/components/ds";
import { SlashBreak } from "@/components/ds/SlashBreak";
import { EnquirySection } from "@/components/home/EnquirySection";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import { ArrowRight } from "@/components/showroom/Icons";
import { HomeMark } from "@/components/showroom/Logo";
import { communities, links, trust } from "@/lib/content";
import { elements as e, type Reel } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import { pageMeta } from "@/lib/launch";
import { award, delivered } from "@/lib/proof";
import { formatIndian } from "@/lib/site";
import { FeaturePanel } from "../FeaturePanel";
import { SubNav } from "../SubNav";
import { ActionDock } from "./ActionDock";
import { ElementsStory } from "./ElementsStory";
import { FilmCards } from "./FilmCard";
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

/* The bar's sections, in the page's order. On a phone the ones marked go, so the rest fit across a 390 px screen. */
const nav = [
  { id: "homes", label: "Homes" },
  { id: "inside", label: "Inside", phoneHidden: true },
  { id: "check", label: "RERA" },
  { id: "location", label: "Map" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "pool", label: "Pool", phoneHidden: true },
  { id: "outdoors", label: "Outdoors" },
  { id: "gallery", label: "Gallery", phoneHidden: true },
  { id: "plan", label: "Master plan", phoneHidden: true },
  { id: "visit", label: "Visit" },
];

/* Every "Book a visit" goes straight to the booker. */
const BOOK = "#enquire";

const { hero, home, overVillas, towers, villas, villaRows, villasAerial, clubhouse, clubFront, clubAerial, outdoors, night, pool } = e.films;
/* A view for the tabs: a film over its first frame, or a still from the gallery by its file name. */
const film = (r: Reel): View => ({ picture: r.poster, film: r.film });
const picture = (name: string) => e.gallery.find((p) => p.src.endsWith(`/${name}.webp`))!;
const still = (name: string): View => ({ picture: picture(name) });
/* Under the walk through a home: a second bedroom and the view from a balcony (the film already opens on the front door). */
const moments = [picture("bedroom-2"), picture("balcony-view")];
/* The client's four films with music, each in the section it shows. */
const shorts = (...names: string[]) => names.map((n) => e.shorts.find((f) => f.src.endsWith(`/${n}`))!);

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
    hash: "villas",
  },
];

/*
 * The gallery leads with twelve renders, a mix of the grounds, the homes, the villas and the clubhouse that the
 * sections above don't already show large; "See all" shows the rest, and the viewer steps through every one.
 */
const picks = [
  "aerial-day",
  "clubhouse-globe",
  "living",
  "villa-lane",
  "lounge",
  "fountain-walk",
  "library",
  "bedroom",
  "villa-pavilion-pool",
  "music",
  "lily-pond",
  "aerial-night",
].map(picture);
const gallery = [...picks, ...e.gallery.filter((p) => !picks.includes(p))];

/* The home page's map, resting on this community. */
const mapItems = communities.map(({ slug, name, place }) => ({ slug, name, place }));
const mapStart = Math.max(0, mapItems.findIndex((c) => c.slug === e.slug));

/*
 * The project on sale, laid out like a tesla.com model page and in the order a buyer decides: the film, its
 * figures and the record, then a bar that follows you down the page. The towers and villas as tabs, a walk through
 * a home, the RERA numbers, the record and the award, the map and the drive, then the clubhouse room by room, the
 * rooftop pool, the grounds zone by zone (each with its film with sound), the five elements as you scroll, the
 * renders, the master plan, and the visit booker. Every picture and film is a render, and says so.
 */
export default function ElementsPage() {
  return (
    /* It ends on the visit section's own grey band, so the footer meets it edge to edge. */
    <div className={s.page} data-flush-end="">
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
          actions={[{ label: "Book a visit", href: BOOK }]}
          trust={[
            trust.record,
            <>
              Two Karnataka RERA numbers{" "}
              <a href="#rera">
                Verify<span className="sr-only"> the RERA registrations</span>
              </a>
            </>,
          ]}
        >
          <ComposeButton channel="whatsapp" topic="Floor plans and carpet areas" className="btn btn-ghost">
            Get floor plans
          </ComposeButton>
        </PhotoHero>
      </ViewTransition>

      <SubNav items={nav} label="On this page" cta={{ label: "Book a visit", href: BOOK }} />

      <section id="homes" className={`${s.band} ${s.surface}`} aria-labelledby="homes-title">
        <div className={s.inner}>
          <Head
            id="homes-title"
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

      {/* Step inside: the walk through a home, full width, then a bedroom and the balcony. */}
      <section id="inside" className={s.inside} aria-labelledby="inside-title">
        <div className={s.edge}>
          <Head id="inside-title" title="Front door to master bedroom." />
        </div>
        <figure className={s.walk}>
          <LoopFilm film={home.film} poster={home.poster} sizes="100vw" />
          <FilmToggle className={s.walkToggle} />
          <figcaption className={s.walkCaption}>{home.poster.caption}</figcaption>
          <span className={s.note}>Artist’s impression</span>
        </figure>
        <div className={`${s.edge} ${s.moments}`}>
          {moments.map((p) => (
            <figure key={p.src} className={`reveal ${s.picture} ${s.moment}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1440px) 660px, (min-width: 768px) 50vw, 100vw" quality={78} className={s.cover} style={focusPoint(p)} />
              <span className={s.note}>Artist’s impression</span>
              <figcaption className={s.pictureCaption}>{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* The proof: the RERA numbers to check, the communities already handed over, and the award. */}
      <section id="check" className={`${s.band} ${s.navy}`} data-tone="dark" aria-labelledby="check-title">
        <div className={`${s.inner} ${s.check}`}>
          <div className={s.checkText}>
            <Head id="check-title" kicker="Check us" title="Two RERA numbers. One ET award." tone="dark" />
            <div className={s.rera} id="rera">
              <p className={s.small}>Karnataka RERA</p>
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
            <div className={s.record}>
              <p className={s.small}>Handed over since 2014</p>
              <ul className={s.recordList}>
                {delivered.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/homes/${d.slug}`} className={s.recordName}>
                      {d.name}
                    </Link>
                    <span className={s.recordYear}>{d.handoverYear}</span>
                    <span className={s.recordHomes}>{formatIndian(d.homes)} homes</span>
                  </li>
                ))}
              </ul>
              <a className={`text-link ${s.onNavy}`} href={e.updates} target="_blank" rel="noopener noreferrer">
                Construction updates, latest {e.latestUpdate} <ArrowRight />
                {NEW_TAB}
              </a>
            </div>
          </div>
          <figure className={s.award}>
            <Image
              src={award.image}
              alt={`${award.title} ${award.honour} for ${e.name}`}
              width={315}
              height={227}
              sizes="315px"
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

      <section id="location" className={`${s.band} ${s.surface}`} aria-labelledby="location-title">
        <div className={s.inner}>
          <Head id="location-title" title="Gunjur, East Bengaluru." line="Pick your office, and Google Maps shows today’s drive from the site." />
          <ProjectMap items={mapItems} start={mapStart} />
          <CommuteLazy />
        </div>
      </section>

      <div id="amenities" className={s.anchor}>
        <div id="clubhouse">
          <FeaturePanel
            id="clubhouse-film"
            image={clubhouse.poster}
            film={clubhouse.film}
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

          <section id="rooms" className={`${s.band} ${s.navy}`} data-tone="dark" aria-labelledby="rooms-title">
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
              <FilmCards shorts={shorts("short-clubhouse-1", "short-clubhouse-2")} tone="dark" />
            </div>
          </section>
        </div>

        <section id="pool" className={s.pool} aria-labelledby="pool-title">
          <div className={s.edge}>
            <Head
              id="pool-title"
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
          <div className={s.edge}>
            <FilmCards shorts={shorts("short-4")} />
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
              <FilmCards shorts={shorts("short-1")} />
            </div>
          </section>
        </div>
      </div>

      <ElementsStory />

      <section id="gallery" className={`${s.band} ${s.surface}`} aria-labelledby="gallery-title">
        <div className={s.inner}>
          <Head id="gallery-title" title="The gallery." line="Exteriors, the clubhouse, the grounds and the homes." />
          <Gallery items={gallery} limit={picks.length} label="Artist’s impressions" />
        </div>
      </section>

      <section id="plan" className={s.band} aria-labelledby="plan-title">
        <div className={s.inner}>
          <Head
            id="plan-title"
            title="The master plan."
            line="Seven towers, the villas, the clubhouse and the grounds on one sheet. Open it full size to read the legend."
          />
          <PlanViewer src={e.masterPlan.src} alt={e.masterPlan.alt} width={e.masterPlan.width} height={e.masterPlan.height} />
        </div>
      </section>

      {/* The visit: the site at night, then the booker. The phone's action bar goes once this is reached. */}
      <div id="visit">
        <FeaturePanel
          id="visit-film"
          image={night.poster}
          film={night.film}
          eyebrow={e.locality}
          title="See it in person"
          line={`Sales: ${e.phone.display}. Come and walk the site with us.`}
          position={night.poster.position}
          mobilePosition={night.poster.mobilePosition}
        >
          <a className="btn btn-primary" href={BOOK}>
            Book a visit
          </a>
          <a className="btn btn-ghost" href={e.phone.href}>
            Call sales
          </a>
        </FeaturePanel>

        <EnquirySection />
      </div>

      <ActionDock until="visit" book={BOOK} />
    </div>
  );
}

/*
 * A section's heading: the title large and one line under it. A few (no more than three on the page) carry the
 * house icon and a small word above, where it adds something the bar's label doesn't.
 */
function Head({ id, kicker, title, line, tone = "light" }: { id: string; kicker?: string; title: string; line?: string; tone?: "light" | "dark" }) {
  return (
    <div className={`reveal ${s.head}`} data-tone={tone}>
      {kicker && (
        <p className={s.kicker}>
          <HomeMark className={s.mark} />
          {kicker}
        </p>
      )}
      <h2 id={id} className={`display ${s.title}`}>
        {title}
      </h2>
      {line && <p className={s.lede}>{line}</p>}
    </div>
  );
}
