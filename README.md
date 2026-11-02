# Disha Habitat: website redesign

The redesign of [Disha Habitat](https://www.dishahabitat.com/)'s website, built for client review. It is **not**
connected to the live website, its CMS, hosting or domain.

## Run it

Requires Node.js 20.9 or newer to run the site. `npm test` needs Node 23.6+ (it runs TypeScript natively).

```bash
npm install
npm run dev          # http://localhost:3000
```

For a client demo, use the production build (faster, no dev overlay):

```bash
npm run build
npm start            # http://localhost:3000
```

Checks:

```bash
npm test             # node:test: loan maths and ₹ formatting, phone numbers
npx tsc --noEmit     # types
npm run lint
```

## Launch

Search engines are kept out until launch. Set `SITE_URL` and `SITE_INDEXING=true` in Vercel on launch day. Redirects
from every old dishahabitat.com address are in `next.config.ts`. The full checklist is in [`docs/LAUNCH.md`](docs/LAUNCH.md).

## What’s inside

Every page is built around the buyer’s questions, each answered with proof (research in
[`docs/RESEARCH-BRIEF.md`](docs/RESEARCH-BRIEF.md)).

| Route | Page |
| --- | --- |
| `/` | Laid out like tesla.com: a four-film hero with the project's figures → the seven towers and the villas as model cards → 20 amenity films, filtered by category → the clubhouse at night with its rooms → the five elements, one tab each → the navy “come home” band with the record and the ET award → the client's four walkthrough films with sound → the five delivered communities → the map → EMI and checklist tiles → a closing film with Book a visit |
| `/homes` | “1,102 homes, handed over.”: Pursuit of the Elements first, then the five delivered communities and a chart of months from ground-breaking to occupancy certificate |
| `/homes/pursuit-of-the-elements` | The project on sale, laid out like a tesla.com model page: a film hero with figures, the walk-in films, tower and villa tabs, the five elements, a clubhouse browser of 19 room films, the rooftop pool by day and night, a browser of 24 outdoor zones, the four walkthrough films, 78 renders by group, the master plan, a live commute checker, RERA and the ET award, enquiry |
| `/homes/[slug]` | Each delivered community as a case study: figures, the build record on a navy timeline, photographs, homeowners' words; ends by pointing to the project on sale |
| `/story` | The founders' poem and story (draft wording for their approval), the five communities, the record in figures, the ET award, and a link to the brand film on YouTube |
| `/contact` | Every channel, a four-step visit booker, what happens next, office map, every community with directions |
| `/checklist`, `/checklist/[slug]` | A working checklist of five must-knows, with a guide for each |
| `/plan` | EMI calculator with notes on how the estimate is made |
| `/privacy` | What the site does and doesn’t do with information |

**Look.** The client’s brand guideline (Disha Habitat Guidelines 2025): navy `#082032`, sky blue `#00b1ff` and white,
with greys `#1d1d1b` and `#534c4e` and the light canvas `#f7f6f5`. Montserrat SemiBold for headlines, Hanken Grotesk
for text. The logo is drawn from the guideline’s own vector paths (`components/showroom/Logo.tsx`; masters in
`docs/brand/`). Primary buttons are sky with navy text; sky is never used for small text on white. Tokens live in
`src/app/globals.css`.

**Films.** Short silent loops from the client’s renders, and the client's four walkthrough films with sound, which
play in a full-screen player only when pressed (`components/brand/WatchFilm.tsx`). All live in `public/media/elements/`
and are rebuilt by `scripts/encode-films.sh`. None is fetched before the page has loaded. Each starts when it nears the screen and stops
when it leaves. `src/lib/film.ts` picks a cut to suit the frame and connection, including an upright cut for phones.
Reduced motion, Save-Data and 2G/3G keep the still picture instead. One pause button stops every film for the rest of
the visit (`components/media/LoopFilm.tsx`).

**Interaction.** Every WhatsApp or email action opens a short form that shows the exact message before the visitor
sends it. Everything is static or calmer under reduced motion.

**Honesty rules.** Only published or client-confirmed facts appear. Unconfirmed sections (water, paperwork status,
promised RERA dates) are not shown. No call-back is promised. Renders are labelled. No em dashes in site copy.

Stack: Next.js 16 (App Router, static pages plus two API routes), React 19, TypeScript, Tailwind CSS v4,
`lucide-react`.

```
src/
  app/                    routes, layout, design tokens (globals.css), api/leads and api/feedback
  components/showroom/    site chrome and home sections: SiteHeader, SiteFooter, Logo, Hero, AmenityRow, MapSection, ProofPanel, ClosingCta
  components/home/        ModelRow and Rail (the sideways card rows), EnquirySection (the visit section), CountUp
  components/brand/       SpecRow (big figures) and WatchFilm (the full-screen player for films with sound)
  components/media/       LoopFilm, the one film player
  components/ds/          shared pieces: PhotoHero, Gallery, Feature, FactList, Accordion, …
  components/             MessageComposer, VisitBooker, CommuteChecker, ChecklistTool, AffordabilityExplorer, …
  lib/content.ts          the home page’s words and pictures
  lib/elements.ts         the project on sale; lib/projects.ts the five delivered communities
  lib/site.ts             company facts and founders; lib/proof.ts delivery record, award, rating
  lib/film.ts             which film cut to play, and the site-wide pause
  lib/emi.ts (+ .test.ts) loan maths and ₹ formatting
  lib/server/store.ts     where leads and feedback are saved (Supabase, or a local file in development)
public/                   photographs, renders, films (public/media), the map tiles (public/map)
scripts/                  encode-films.sh (films), build-map.py + fetch-osm.sh (the map)
docs/                     research brief, content sources, asset manifest, logo masters
assets/                   the client’s asset library and brand guideline (not in git)
documents/                client documents (not in git)
```

All copy and figures live in `src/lib/`. Change them there, not in the components.

## Home Affordability Explorer

The explorer is an **illustrative planning tool**, not a Disha Habitat financing, eligibility or loan service.

- **Inputs:** property price, down payment, interest rate, tenure and optional monthly income. Sliders sit alongside
  exact Indian-formatted inputs. The defaults are neutral examples, not Disha prices.
- **Maths:** the reducing-balance EMI, `P·r·(1+r)ⁿ / ((1+r)ⁿ − 1)`, with a separate `P/n` case for 0%. It also
  calculates total interest, total repaid, a yearly principal/interest schedule, and EMI as a share of income
  (indicative only).
- **Accessibility:** results update live and are announced to screen readers. The chart is backed by an accessible
  year-by-year table.
- **Privacy:** no data leaves the browser.

## Enquiries

Enquiries and visit bookings are posted to `/api/leads` and saved by `src/lib/server/store.ts`. With `SUPABASE_URL` and
`SUPABASE_SERVICE_ROLE_KEY` set they go to Supabase (schema in `supabase/migrations/`). In development they go to a
file in `.data/`, and in production without Supabase they are written to the server log. WhatsApp and email messages
are still sent from the visitor’s own app.

## Content and assets

Every fact, quote and photograph of a delivered community comes from Disha Habitat’s own public websites. The
renders and films of Pursuit of the Elements come from the client’s asset library. Renders and plans are labelled
“Artist’s impression”.

- [`docs/CONTENT-SOURCES.md`](docs/CONTENT-SOURCES.md): verified facts and the items the client must confirm.
- [`docs/ASSET-MANIFEST.md`](docs/ASSET-MANIFEST.md): every file, its source URL, where it’s used, and whether it shows a
  verified development.

Until launch day the site sets `noindex` (see Launch above).
