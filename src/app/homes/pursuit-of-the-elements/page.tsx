import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { SpecRow } from "@/components/brand/SpecRow";
import { CommuteLazy } from "@/components/CommuteLazy";
import { ComposeButton } from "@/components/ComposeButton";
import { Gallery, PhotoHero } from "@/components/ds";
import { SlashBreak } from "@/components/ds/SlashBreak";
import { EnquirySection } from "@/components/home/EnquirySection";
import { FilmToggle, LoopFilm } from "@/components/media/LoopFilm";
import { ArrowRight } from "@/components/showroom/Icons";
import { HomeMark } from "@/components/showroom/Logo";
import { communities, links, pricesAndPlans, trust } from "@/lib/content";
import { elements as e, type Reel } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
import { pageMeta } from "@/lib/launch";
import { award, delivered } from "@/lib/proof";
import { formatIndian } from "@/lib/site";
import { SubNav } from "../SubNav";
import { ActionDock } from "./ActionDock";
import { CommuteDisclosure } from "./CommuteDisclosure";
import { FilmCards } from "./FilmCard";
import { FilmTile } from "./FilmTile";
import { type Family, HomesTabs, type View } from "./HomesTabs";
import { LifeTabs } from "./LifeTabs";
import { MediaBrowser } from "./MediaBrowser";
import { MoreDialog } from "./MoreDialog";
import { PlanViewer } from "./PlanViewer";
import { PoolSwitch } from "./PoolSwitch";
import { ProjectMap } from "./ProjectMap";
import { Views } from "./Views";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: e.name,
  description: `${e.name}, Gunjur, East Bengaluru: 2, 3 & 4 BHK apartments in seven towers and 4 & 5 BHK villas on 20 acres, with a 1,35,000+ sq ft clubhouse. RERA registered.`,
  path: e.href,
  image: { url: "/images/og/pursuit-of-the-elements.jpg", width: 1200, height: 630, alt: "The towers, villas, clubhouse and gardens from above, artist’s impression" },
});

const NEW_TAB = <span className="sr-only">(opens in a new tab)</span>;

/* The bar's sections, in the page's order. On a phone the ones marked go, so the rest fit across a 390 px screen. */
const nav = [
  { id: "homes", label: "Homes" },
  { id: "inside", label: "Inside", phoneHidden: true },
  { id: "check", label: "RERA" },
  { id: "location", label: "Map" },
  { id: "amenities", label: "Amenities" },
  { id: "gallery", label: "Gallery" },
  { id: "plan", label: "Master plan", phoneHidden: true },
  { id: "visit", label: "Visit" },
];

/* Every "Book a visit" goes straight to the booker. */
const BOOK = "#enquire";

const { hero, home, overVillas, towers, villas, villaRows, villasAerial, clubhouse, clubFront, clubAerial, outdoors, pool } = e.films;
/* A view for the tabs: a film over its first frame, or a still from the gallery by its file name. */
const film = (r: Reel): View => ({ picture: r.poster, film: r.film });
const picture = (name: string) => e.gallery.find((p) => p.src.endsWith(`/${name}.webp`))!;
const still = (name: string): View => ({ picture: picture(name) });
/* Beside the walk through a home: a second bedroom and the view from a balcony (the film already opens on the front door). */
const moments = [picture("bedroom-2"), picture("balcony-view")];
/* The client's four films with music, each in the tab it shows. */
const shorts = (...names: string[]) => names.map((n) => e.shorts.find((f) => f.src.endsWith(`/${n}`))!);

/* The tower families and the villas, as on the project site's floor-plan pages. */
const families: Family[] = [
  {
    tab: "Presidential Towers",
    hash: "presidential",
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
    hash: "premium",
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
    hash: "millennium",
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
 * The gallery leads with six renders, a mix of the grounds, the homes, the villas and the clubhouse that the
 * sections above don't already show large; "See all" shows the rest, and the viewer steps through every one.
 */
const picks = ["aerial-day", "clubhouse-globe", "living", "villa-lane", "lounge", "fountain-walk"].map(picture);
const gallery = [...picks, ...e.gallery.filter((p) => !picks.includes(p))];

/* The home page's map, resting on this community. */
const mapItems = communities.map(({ slug, name, place }) => ({ slug, name, place }));
const mapStart = Math.max(0, mapItems.findIndex((c) => c.slug === e.slug));

const TAB_SIZES = "(min-width: 1024px) 56vw, 100vw";

/*
 * Life on the 20 acres, one tab at a time: the clubhouse, the rooftop pool, the grounds and the five elements, each
 * with its film or picture, two lines, its figures, its films with sound, and the rest (every room, every zone,
 * the poolside) a button away in a full-screen dialog. #clubhouse, #pool, #outdoors and #elements open their tab.
 */
const life = [
  {
    id: "clubhouse",
    also: ["rooms"],
    tab: "Clubhouse",
    media: <Views views={[film(clubhouse), film(clubFront), film(clubAerial)]} label="Views of the clubhouse" sizes={TAB_SIZES} />,
    body: (
      <>
        <p className={s.lifeLine}>Behind the Elements globe roundabout: a rooftop pool, a mini theatre, indoor courts, a banquet hall and guest rooms.</p>
        <SpecRow
          className={s.lifeFigures}
          items={[
            { value: "1,35,000+", unit: "sq ft", label: "Clubhouse" },
            { value: "Triple", unit: "height", label: "Lobby, under a skylight" },
            { value: "Rooftop", label: "Temperature-controlled pool" },
            { value: "3rd", unit: "floor", label: "Rooftop terrace café" },
          ]}
        />
        <MoreDialog
          label={`See every room (${e.clubRooms.length})`}
          title="From the triple-height lobby to the rooftop terrace café."
          line="Library, mini theatre, music room, dance studio, gymnasium, indoor badminton, banquet hall, guest rooms and a senior citizens’ lounge."
        >
          <MediaBrowser id="rooms" label="Rooms in the clubhouse" items={e.clubRooms} />
        </MoreDialog>
        <FilmCards shorts={shorts("short-clubhouse-1", "short-clubhouse-2")} tone="dark" compact />
      </>
    ),
  },
  {
    id: "pool",
    tab: "Pool",
    media: (
      <PoolSwitch
        fill
        views={[
          { label: "Day", picture: e.poolDay },
          { label: "Night", picture: e.poolNight },
        ]}
      />
    ),
    body: (
      <>
        <p className={s.lifeLine}>
          A temperature-controlled pool on the roof, with a kids’ pool, a pool deck, a pool bar, a juice bar and a tropical poolside café.
        </p>
        <MoreDialog
          label={`See the poolside (${e.poolside.length + 1})`}
          title="Beside the rooftop pool."
          line="Sunset on the pool, the tropical poolside café, the juice bar, the loungers under the pergola and the roof at night."
        >
          <div className={s.poolRow} data-count={e.poolside.length + 1}>
            <FilmTile reel={pool} sizes="(min-width: 900px) 30vw, 100vw" className={s.poolFilm} />
            {e.poolside.map((p) => (
              <figure key={p.src} className={`${s.picture} ${s.poolPicture}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 900px) 35vw, 100vw" quality={78} className={s.cover} style={focusPoint(p)} />
                <span className={s.note}>Artist’s impression</span>
                <figcaption className={s.pictureCaption}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </MoreDialog>
        <FilmCards shorts={shorts("short-4")} tone="dark" compact />
      </>
    ),
  },
  {
    id: "outdoors",
    also: ["zones"],
    tab: "Outdoors",
    media: <Views views={[film(outdoors)]} label="The grounds" sizes={TAB_SIZES} />,
    body: (
      <>
        <p className={s.lifeLine}>
          The amphitheatre and the Highpoint pavilion: grass steps, a pavilion planted on top, and 20 acres of courts and gardens around them.
        </p>
        <SpecRow
          className={s.lifeFigures}
          items={[
            { value: "20", unit: "acres", label: "Gunjur" },
            { value: "Twin", label: "Tennis & futsal courts" },
            { value: "40+", label: "Amenities in all" },
          ]}
        />
        <MoreDialog
          label={`See every zone (${e.zones.length})`}
          title="The Aqua Park to the vegetable garden."
          line="Pet park, mini golf, skate park, pickleball court, beach volleyball, cricket pitch, jogging track, and a camping zone with picnic tents round a fire pit."
        >
          <MediaBrowser id="zones" label="Outdoor zones" items={e.zones} />
        </MoreDialog>
        <FilmCards shorts={shorts("short-1")} tone="dark" compact />
      </>
    ),
  },
  {
    id: "elements",
    tab: "Five elements",
    media: (
      <Views
        words
        views={e.fiveElements.map((el) => ({ picture: e.elementPictures[el]!, label: el }))}
        label="The five elements"
        sizes={TAB_SIZES}
      />
    ),
    body: (
      <p className={`display ${s.lifeSentence}`}>
        Space is the Central arena. Fire, the camping zone’s fire pit. Air, the yoga deck. Water, the Elements plaza. Earth, the mound.
      </p>
    ),
  },
];

/*
 * The project on sale, laid out like a tesla.com model page and in the order a buyer decides, one screen a section:
 * the film, its figures and the record; the towers and villas as tabs; a walk through a home; the RERA numbers, the
 * record and the award; the map and the drive; life on the 20 acres as tabs; a row of the renders; the master plan;
 * and the visit booker. The detail behind each (every room, every zone, every picture, the plan full size) is one
 * tap away. Every picture and film is a render, and says so.
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
          <ComposeButton channel="whatsapp" topic={pricesAndPlans.compose} className="btn btn-ghost">
            {pricesAndPlans.label}
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
          <HomesTabs
            families={families}
            place={`${e.name}, ${e.locality}`}
            aside={
              <Link className="text-link" href={links.emi}>
                Work out your monthly EMI <ArrowRight />
              </Link>
            }
          />
        </div>
      </section>

      {/* Step inside: the walk through a home large, a bedroom and the balcony beside it. */}
      <section id="inside" className={s.band} aria-labelledby="inside-title">
        <div className={s.inner}>
          <Head id="inside-title" title="Front door to master bedroom." />
          <div className={s.insideGrid}>
            <figure className={s.walk}>
              <LoopFilm film={home.film} poster={home.poster} sizes="(min-width: 1024px) 66vw, 100vw" />
              <FilmToggle className={s.walkToggle} />
              <figcaption className={s.walkCaption}>{home.poster.caption}</figcaption>
              <span className={s.note}>Artist’s impression</span>
            </figure>
            {moments.map((p) => (
              <figure key={p.src} className={`${s.picture} ${s.moment}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" quality={78} className={s.cover} style={focusPoint(p)} />
                <span className={s.note}>Artist’s impression</span>
                <figcaption className={s.pictureCaption}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* The proof: the RERA numbers to check, the communities already handed over, and the award. */}
      <section id="check" className={`${s.band} ${s.navy}`} data-tone="dark" aria-labelledby="check-title">
        <div className={s.inner}>
          <Head id="check-title" kicker="RERA and record" title="Check us before you visit." tone="dark" />
          <div className={s.check}>
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
              <p className={s.howTo}>
                Search for either number in Karnataka RERA’s list of registered projects. Both are registered to {e.reraPromoter}.
              </p>
              <a className={`text-link ${s.onNavy}`} href={links.rera} target="_blank" rel="noopener noreferrer">
                Open the RERA list <ArrowRight />
                {NEW_TAB}
              </a>
            </div>
            <div className={s.record}>
              <p className={s.small}>Handed over since 2015</p>
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
            <figure className={s.award}>
              <Image
                src={award.image}
                alt={`${award.title} ${award.honour} for ${e.name}`}
                width={315}
                height={227}
                sizes="(min-width: 1024px) 300px, 128px"
                quality={78}
                className={s.awardImg}
              />
              <figcaption>
                <strong>{award.title}</strong>
                {award.honour}: {award.citation}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The map and, beside it on a computer (a tap away on a phone), the drive to work and what is nearby. */}
      <section id="location" className={`${s.band} ${s.surface}`} aria-labelledby="location-title">
        <div className={s.inner}>
          <Head id="location-title" title="Gunjur, East Bengaluru." line="Pick your office, and Google Maps shows today’s drive from the site." />
          <div className={s.where}>
            <ProjectMap items={mapItems} start={mapStart} />
            <CommuteDisclosure label="Check your commute">
              <CommuteLazy />
            </CommuteDisclosure>
          </div>
        </div>
      </section>

      {/* #amenities is the whole section; #clubhouse, #pool, #outdoors and #elements are its tabs. */}
      <section id="amenities" className={`${s.band} ${s.navy}`} data-tone="dark" aria-labelledby="life-title">
        <div className={s.inner}>
          <LifeTabs head={<Head id="life-title" title="Life at Pursuit of the Elements." tone="dark" />} label="Life at Pursuit of the Elements" tabs={life} />
        </div>
      </section>

      <section id="gallery" className={`${s.band} ${s.surface}`} aria-labelledby="gallery-title">
        <div className={s.inner}>
          <Head id="gallery-title" title="The gallery." line="Exteriors, the clubhouse, the grounds and the homes." />
          <Gallery items={gallery} layout="strip" limit={picks.length} label="Artist’s impressions" />
        </div>
      </section>

      <section id="plan" className={`${s.band} ${s.tight}`} aria-labelledby="plan-title">
        <div className={s.inner}>
          <PlanViewer src={e.masterPlan.src} alt={e.masterPlan.alt} width={e.masterPlan.width} height={e.masterPlan.height}>
            <Head
              id="plan-title"
              title="The master plan."
              line="Seven towers, the villas, the clubhouse and the grounds on one sheet. Open it full size to read the legend."
            />
          </PlanViewer>
        </div>
      </section>

      {/* The visit: Guna's invitation and the booker. The phone's action bar goes once this is reached. */}
      <div id="visit">
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
