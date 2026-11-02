# Asset manifest

Every image and film in `public/`, with its source, the files that use it, and whether it shows a verified Disha
Habitat development. The photographs of delivered communities were downloaded from Disha’s websites on 12 October 2026.
Everything for Pursuit of the Elements comes from the client’s own asset library (see the last section).

**Source prefixes**

- `A/` = `https://cdn.prod.website-files.com/635226f781aee9d7782ad7cb/` (dishahabitat.com project pages)
- `B/` = `https://cdn.prod.website-files.com/635226f681aee917032ad7c7/` (dishahabitat.com homepage / journey)
- `C/` = `https://cdn.prod.website-files.com/63f227497d75412ed1b7b057/` (dishapursuitofsunshine.com)

**Verified** means it is the company’s own photograph of the named development, taken from the page for that
development. **Render** means it’s an artist’s impression, and the site labels it as one.

| File (`public/…`) | Size (px) | Source | Used in (`src/…`) | Status |
| --- | --- | --- | --- | --- |
| `images/central-park/clubhouse-dusk.jpg` | 1920×1280 | `A/6378809ad60031377da23745_726A5025 low-res v2 hero.jpg` | `lib/projects.ts` | Verified · Central Park |
| `images/central-park/clubhouse-night.jpg` | 1920×1280 | `A/637881089e2f6124e92b735f_1.jpg` | `lib/projects.ts` | Verified · Central Park |
| `images/central-park/staircase.jpg` | 1920×1280 | `A/6378817a96fd6b167e6da67f_2.jpg` | `lib/projects.ts` | Verified · Central Park |
| `images/central-park/living-room.jpg` | 1920×1280 | `A/63788090f3d6aa023afc7b29_726A5016 low-res central pk2.jpg` | `lib/projects.ts` | Verified · Central Park |
| `images/courtyard/pool-court.jpg` | 1920×1480 | `A/63787b6d6a668a6396976d26_courtyard-hero.jpg` | `lib/content.ts`, `lib/projects.ts` | Verified · Courtyard |
| `images/courtyard/facade.jpg` | 1920×1280 | `A/6378803020daa964b8ec6fde_0Z8A7498 low-res sunshine.jpg` | `lib/projects.ts` | Verified · Courtyard (from the Courtyard page; the filename says “sunshine”) |
| `images/courtyard/facade-pool.jpg` | 1920×1280 | `A/63787ee56a668a029e9786d8_2.jpg` | `lib/projects.ts` | Verified · Courtyard |
| `images/courtyard/yoga-lawn.jpg` | 1920×1280 | `A/63787ee5e86a45130e2b2a33_3.jpg` | `lib/projects.ts` | Verified · Courtyard |
| `images/courtyard/giant-chess.jpg` | 1920×1280 | `A/63787ee5a818d702305d7cc9_4.jpg` | `lib/projects.ts` | Verified · Courtyard |
| `images/park-west/facade.jpg` | 1440×960 | `A/637896dacf5b92d2bc60e2b9_Parkwest 2.jpg` | `lib/content.ts`, `lib/projects.ts` | Verified · Park West |
| `images/park-west/entrance.jpg` | 1440×960 | `A/637896da9d37fd34848c64d6_Parkwest 1.jpg` | `lib/projects.ts` | Verified · Park West |
| `images/windsor-gardens/aerial.jpg` | 1313×739 | `A/6378984d54cc5019a5e9bccb_Windsor 2.jpg` | `lib/content.ts`, `lib/projects.ts` | Verified · Windsor Gardens |
| `images/windsor-gardens/play-area.jpg` | 1440×960 | `A/6378984dab34506ba4f4e41f_Windsor 1.jpg` | `lib/projects.ts` | Verified · Windsor Gardens |
| `images/pursuit-of-sunshine/towers.webp` | 1313×739 | `A/69999fce4a6808d2f051e414_PoS-main.webp` | `lib/projects.ts` | Verified · Pursuit of Sunshine |
| `images/pursuit-of-sunshine/pool-aerial.webp` | 1313×739 | `A/6999a179146eca61be4f561f_PoS-Gal3.webp` | `lib/content.ts`, `lib/projects.ts` | Verified · PoS |
| `images/pursuit-of-sunshine/sundial.webp` | 1313×739 | `A/6999a7942031a05f7403b81c_PoS-Gal5.webp` | `lib/projects.ts` | Verified · PoS |
| `images/pursuit-of-sunshine/treehouse.webp` | 1313×739 | `A/699b1960988f9410fb008c2f_PoS-Gal7.webp` | `lib/projects.ts` | Verified · PoS |
| `images/pursuit-of-sunshine/cafe.webp` | 1313×739 | `A/6999a7947b79dfef2f003daa_PoS-Gal6.webp` | `lib/projects.ts` | Verified · PoS |
| `images/pursuit-of-sunshine/games-room.webp` | 1313×739 | `A/6999a17903c92db082a2102a_PoS-Gal1.webp` | `lib/projects.ts` | Verified · PoS |
| `images/pursuit-of-sunshine/entrance-aerial.webp` | 1313×739 | `A/6999a179e2c7dc2ed0752685_PoS-Gal4.webp` | `lib/projects.ts` | Verified · PoS |
| `images/pursuit-of-sunshine/render-surya-stambh.jpg` | 1440×850 | `C/63ff641e3aebea50185a95f8_tower-img.jpg` | `lib/projects.ts` | **Render** · labelled |
| `images/pursuit-of-sunshine/render-sundeck.jpg` | 1920×1080 | `C/640c3aaeac6f56933218b62e_gal-night-balcony.jpg` | `lib/projects.ts` | **Render** · labelled |
| `images/pursuit-of-sunshine/master-plan.webp` | 1000×707 | `C/64f0b43c8007e61f47b7ff20_master-plan.webp` | `lib/projects.ts` | Plan · labelled |
| `src/app/icon.svg` | vector | House mark from the official logo | Favicon | Derived |

## Not used, deliberately

- Pexels stock photos left over from the Webflow template on dishahabitat.com, plus the checklist stock images
  (`CL 1–5`). They aren’t Disha developments.
- The Pursuit of Sunshine site’s background video (`production ID_4480592`), which is stock footage.
- Two black-and-white founder portraits. We couldn’t verify which founder each one shows.

## Added after the first pass (12 to 14 October 2026)

| Folder (`public/…`) | Files | Source | Used on | Status |
| --- | --- | --- | --- | --- |
| `images/people/` | Founder portraits, homeowner families, team (`-1600`/`-1000` WebP) | dishahabitat.com /homemakers and /our-journey | Our story, home | Company photos; founders matched by position on /homemakers (client to confirm) |
| `images/community/site-team-1600.webp` | The site team | dishahabitat.com homepage (`B/63a07273d4fdce4234d7ef3b_1L6A7590.jpg`) | `app/story/page.tsx` | Company photo |
| `images/checklist/` | Checklist illustrations | dishahabitat.com /checklist and /solution/* | Checklist pages | Company images |
| `images/events/et-award-certificate.webp` | The ET award certificate | Cut from the events collage on dishahabitat.com /our-journey | `lib/proof.ts` | Company image |

## Pursuit of the Elements: the client’s asset library (1 and 2 November 2026)

The client handed over a library of renders, films and the brand guideline (`assets/` at the repo root, 5 GB, kept out
of git). Everything below was made from it. Paths in the Source column are inside `assets/`. All of it is computer
rendered, and the site labels each one “Artist’s impression”.

**Films** live in `public/media/elements/`. The loops are silent and 5 to 14 seconds long. The four `short-*` films
are the client's own 20-second edits with their music; they load only when a visitor presses play. Batch two (2
November 2026) added the clubhouse rooms (`room-*`), the clubhouse outside (`club-*`), the grounds (`out-*`) and the
shorts. `scripts/encode-films.sh` rebuilds every film from the library. The cuts are 1080 (1920×1080), 720
(1280×720), p (540×960, upright, for phones) and card (640×800, for rows of cards). `src/lib/film.ts` picks a cut for
each screen. Each loop's first frame is its poster, kept in `public/images/pursuit-of-the-elements/` under the film's
name, with an upright `-card` crop where the film has a card cut.

| Film | Cuts | Length | Source clip | Used in (`src/…`) |
| --- | --- | --- | --- | --- |
| `media/elements/card-badminton-*.mp4` | card | 5 s | `assets 2/Clubhouse Individual shots/Indoor Badminton 2.mp4` | `lib/content.ts` |
| `media/elements/card-courts-*.mp4` | card | 5 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Pickle ball to fulsall 1.mp4` | `lib/content.ts` |
| `media/elements/card-gym-*.mp4` | card | 5 s | `assets 2/Clubhouse Individual shots/Gym 2.mp4` | `lib/content.ts` |
| `media/elements/card-lounge-*.mp4` | card | 5 s | `assets 2/Clubhouse Individual shots/Business Centre 6.mp4` | `lib/content.ts` |
| `media/elements/card-petpark-*.mp4` | card | 5 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/24.MP4` | `lib/content.ts` |
| `media/elements/card-pool-*.mp4` | card | 5 s | `assets 2/Clubhouse Individual shots/Swimming pool Timelapse .mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/card-terrace-*.mp4` | card | 5 s | `assets 2/Clubhouse Individual shots/3rd Floor Terrace cafe.mp4` | `lib/content.ts` |
| `media/elements/card-theatre-*.mp4` | card | 5 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Mini Theatre.mp4` | `lib/content.ts` |
| `media/elements/club-aerial-*.mp4` | 720, p | 6.0 s | `assets 2/Clubhouse Individual shots/Clubhouse Semi Aerial .mp4` | `lib/elements.ts` |
| `media/elements/club-elevation-*.mp4` | 720, p | 6.0 s | `assets 2/Clubhouse Individual shots/Clubhouse Elevation 1.mp4` | `lib/elements.ts` |
| `media/elements/club-night-*.mp4` | 720, p | 5.0 s | `assets 2/Clubhouse Individual shots/Clubhouse Night shot .mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/hero-clubhouse-*.mp4` | 1080, 720, p | 10 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Amphitheatre to globe.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/hero-outdoors-*.mp4` | 1080, 720, p | 8 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Pickleball to Outdoor cafe aerial.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/hero-towers-*.mp4` | 1080, 720, p | 10 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/1.MP4` | `lib/content.ts`, `lib/elements.ts`, `lib/film.ts` |
| `media/elements/out-balcony-*.mp4` | 720, p | 5.0 s | `assets 2/Exterior Individual shots /15.10.2026/BALCONY TO CLUBHOUSE 2.mp4` | `lib/elements.ts` |
| `media/elements/out-elements-*.mp4` | 720, card, p | 6.0 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Elements to villa 1.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/out-golf-*.mp4` | 720, card, p | 5.0 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/22.MP4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/out-kids-play-*.mp4` | 720, card | 5.0 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/32.MP4` | `lib/elements.ts` |
| `media/elements/out-petpark-*.mp4` | 720, card, p | 6.0 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/PET Park to Aqua 1.mp4` | `lib/elements.ts` |
| `media/elements/out-podium-*.mp4` | 720, card | 5.0 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/35.MP4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/out-skate-*.mp4` | 720, card | 5.0 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/16.MP4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/out-villa-front-*.mp4` | 720, p | 6.0 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Villa front to aerial 2.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/out-villas-*.mp4` | 720, p | 6.0 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/43.MP4` | `lib/elements.ts` |
| `media/elements/out-volleyball-*.mp4` | 720, card | 5.0 s | `assets 2/Exterior Individual shots /Individual Shot/Individual shots set 1/15.MP4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/out-yoga-gym-*.mp4` | 720, card, p | 6.0 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/yoga to outdoor gym 1.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/pote-hero-*.mp4` | 1080, 720, p | 8 s | `assets 2/Exterior Individual shots /15.10.2026/BALCONY TO CLUBHOUSE 1.mp4` | `lib/elements.ts` |
| `media/elements/pote-home-*.mp4` | 720, p | 13.83 s | `concat: 41.MP4 0–5 + Living new.mp4 0–5 + Master bedroom new.mp4 0–5, 0.6 s fades` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/pote-night-*.mp4` | 720, p | 10 s | `assets 2/Exterior Individual shots /Individual Shot/Night shot.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/pote-outdoors-*.mp4` | 720, p | 8 s | `assets 2/Exterior Individual shots /updated individual shot 14.10.2026/Amphitheatre to Highpoint 1.mp4` | `lib/elements.ts` |
| `media/elements/pote-villas-*.mp4` | 720, p | 10 s | `assets 2/Exterior Individual shots /Individual Shot/villa pull back.mp4` | `lib/elements.ts` |
| `media/elements/room-badminton-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/Indoor Badminton 1.mp4` | `lib/elements.ts` |
| `media/elements/room-banquet-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/Banquet Hall 1.mp4` | `lib/elements.ts` |
| `media/elements/room-cafe-*.mp4` | 720 | 6.0 s | `assets 2/Clubhouse Individual shots/3rd Floor Terrace cafe.mp4` | `lib/elements.ts` |
| `media/elements/room-classroom-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Classroom 1 - Revise.mp4` | `lib/elements.ts` |
| `media/elements/room-conference-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Conferance business centre.mp4` | `lib/elements.ts` |
| `media/elements/room-cowork-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Co working Business centre.mp4` | `lib/elements.ts` |
| `media/elements/room-dance-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/Dance floor.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/room-games-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/Indoor Games 1.mp4` | `lib/elements.ts` |
| `media/elements/room-guest-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/Guest room .mp4` | `lib/elements.ts` |
| `media/elements/room-gym-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/Gym 1.mp4` | `lib/elements.ts` |
| `media/elements/room-library-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Library 1.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/room-lobby-*.mp4` | 720, card, p | 8.0 s | `assets 2/Clubhouse Individual shots/tripple height lobby skylight.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/room-music-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/Music Room 1.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/room-reception-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/reception 1.mp4` | `lib/elements.ts` |
| `media/elements/room-senior-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/senior lounge 1.mp4` | `lib/elements.ts` |
| `media/elements/room-terrace-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/2nd Floor Terrace Seating.mp4` | `lib/elements.ts` |
| `media/elements/room-theatre-*.mp4` | 720 | 5.0 s | `assets 2/Clubhouse Individual shots/Updated Shots 21.10.2026/Mini Theatre.mp4` | `lib/elements.ts` |
| `media/elements/room-tt-*.mp4` | 720, card | 5.0 s | `assets 2/Clubhouse Individual shots/Table tennis 1.mp4` | `lib/elements.ts` |
| `media/elements/room-yoga-*.mp4` | 720, card | 6.0 s | `assets 2/Clubhouse Individual shots/1st Floor Yoga deck.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/short-1-*.mp4` | 1080, 720 | 20.033 s | `assets 2/Walkthrough videos/Short Videos /short video 1.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/short-4-*.mp4` | 1080, 720 | 21.167 s | `assets 2/Walkthrough videos/Short Videos /short video 4.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/short-clubhouse-1-*.mp4` | 1080, 720 | 20.2 s | `assets 2/Walkthrough videos/Short Videos /clubhouse short 1.mp4` | `lib/content.ts`, `lib/elements.ts` |
| `media/elements/short-clubhouse-2-*.mp4` | 1080, 720 | 20.2 s | `assets 2/Walkthrough videos/Short Videos /clubhouse short 2.mp4` | `lib/content.ts`, `lib/elements.ts` |

**Stills** are WebP at quality 86, at most 2560 px on the long side. `next/image` resizes them for each screen.

| File (`public/…`) | Size (px) | Source | Used in (`src/…`) |
| --- | --- | --- | --- |
| `images/pursuit-of-the-elements/aerial-arena.webp` | 2560×1440 | `brand assets/Central Arena Aerial View.tif` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/aerial-day.webp` | 2560×1440 | `assets 2/Final updated_HD/Frame and Last/Aerial day_000.jpg` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/aerial-night.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Aerial night_350.jpg` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/aqua-park.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Element park_Revised.JPEG` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/badminton.webp` | 1920×1080 | `brand assets/Clubhouse internal/walk through/Copy of badminton 12.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/balcony-view.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Balcony shot_Sun Shadown shot ani_FIRST.jpg` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/banquet.webp` | 1920×1080 | `brand assets/Clubhouse internal/walk through/Copy of banquet.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/beach-volleyball.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Beach volleyball.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/bedroom-2.webp` | 1920×1080 | Frame from the home walkthrough film (client library) | `lib/elements.ts` |
| `images/pursuit-of-the-elements/bedroom.webp` | 1920×1080 | Frame from the home walkthrough film (client library) | `lib/elements.ts` |
| `images/pursuit-of-the-elements/camping.webp` | 1920×1080 | `assets 2/Extra images for presentation /Camping zone.JPEG` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/card-badminton.webp` | 864×1080 | First frame of `media/elements/card-badminton` | `lib/content.ts` |
| `images/pursuit-of-the-elements/card-courts.webp` | 864×1080 | First frame of `media/elements/card-courts` | `lib/content.ts` |
| `images/pursuit-of-the-elements/card-gym.webp` | 864×1080 | First frame of `media/elements/card-gym` | `lib/content.ts` |
| `images/pursuit-of-the-elements/card-lounge.webp` | 864×1080 | First frame of `media/elements/card-lounge` | `lib/content.ts` |
| `images/pursuit-of-the-elements/card-petpark.webp` | 864×1080 | First frame of `media/elements/card-petpark` | `lib/content.ts` |
| `images/pursuit-of-the-elements/card-pool.webp` | 864×1080 | First frame of `media/elements/card-pool` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/card-terrace.webp` | 864×1080 | First frame of `media/elements/card-terrace` | `lib/content.ts` |
| `images/pursuit-of-the-elements/card-theatre.webp` | 864×1080 | First frame of `media/elements/card-theatre` | `lib/content.ts` |
| `images/pursuit-of-the-elements/classroom.webp` | 2560×1440 | `brand assets/Clubhouse internal/CLASSROOM 1.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/club-aerial.webp` | 1920×1080 | First frame of `media/elements/club-aerial` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/club-elevation.webp` | 1920×1080 | First frame of `media/elements/club-elevation` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/club-night.webp` | 1920×1080 | First frame of `media/elements/club-night` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/clubhouse-aerial.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Clubhouse semi aerial_Revised.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/clubhouse-elevation.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Clubhouse Elevation shot_FIRST.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/clubhouse-front.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Clubhouse Front shot_LAST.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/clubhouse-globe.webp` | 1920×1080 | `brand assets/Copy of Drop off_shot ani_Revised.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/clubhouse-top.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Clubhouse_Top shot ani_Revised.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/clubhouse.webp` | 1440×750 | dishapursuitoftheelements.com (October 2026) | `app/homes/pursuit-of-the-elements/page.tsx`, `components/home/ClubhousePanel.tsx`, `lib/content.ts` |
| `images/pursuit-of-the-elements/coffee-cup.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Coffee Cup_Closeup_Revised.JPEG` | `lib/content.ts` |
| `images/pursuit-of-the-elements/courts.webp` | 1920×1080 | `assets 2/Extra images for presentation /Courts view.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/dance.webp` | 2500×1406 | `brand assets/Clubhouse internal/DANCE Studio.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/driveway.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Driveway_Revised_02.JPEG` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/elements-plaza.webp` | 2560×1440 | `brand assets/Elements plaza.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/elements-sculpture.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Elements plaza_Closeup_Revised.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/entrance-tower.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Entrance tower_Revised_02.JPEG` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/entry-gate.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Entry Gate.JPEG` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/entry-wall.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Entry compound wall.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/fountain-walk.webp` | 1920×1080 | `assets 2/Extra images for presentation /water fountain view.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/front-door.webp` | 1920×1080 | Frame from the home walkthrough film (client library) | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/giant-chess.webp` | 1920×1080 | `assets 2/Extra images for presentation /Giant Chess.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/guest-room.webp` | 2560×1440 | `brand assets/Clubhouse internal/GUEST BEDROOM.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/gym.webp` | 1920×1080 | `brand assets/Clubhouse internal/walk through/Copy of gym 237.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/hero-clubhouse.webp` | 1920×1080 | First frame of `media/elements/hero-clubhouse` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/hero-outdoors.webp` | 1920×1080 | First frame of `media/elements/hero-outdoors` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/hero-towers.webp` | 1920×1080 | First frame of `media/elements/hero-towers` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/highpoint.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/mound full view.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/indoor-games.webp` | 2560×1440 | `brand assets/Clubhouse internal/Indoor games.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/jogging-track.webp` | 2560×1440 | `assets 2/Extra images for presentation /Jogging track_TIFF.tif` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/juice-bar.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Bar_Juice_closeup.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/kids-play-epdm.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Kid_s Play Area on Epdm_FIRST.jpg` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/library.webp` | 2560×1440 | `brand assets/Clubhouse internal/Library 1.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/lily-pond.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Lily Pond Pavilion.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/living.webp` | 1920×1080 | Frame from the home walkthrough film (client library) | `lib/elements.ts` |
| `images/pursuit-of-the-elements/lobby-sign.webp` | 2560×1440 | `assets 2/Clubhouse Interiors /Updated images 20.10.2026/002.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/lobby.webp` | 2560×1707 | `brand assets/Clubhouse internal/Lobby 1.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/lounge-lobby.webp` | 2560×1440 | `brand assets/Clubhouse internal/Business Lounge Lobby.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/lounge.webp` | 2560×1440 | `brand assets/Clubhouse internal/Busuness Lounge.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/master-plan.jpg` | 2200×1414 | dishapursuitoftheelements.com (October 2026) | `lib/projects.ts` |
| `images/pursuit-of-the-elements/mound-opening.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Mound close to round opening.JPEG` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/music.webp` | 2560×1440 | `brand assets/Clubhouse internal/Music room.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-balcony.webp` | 1920×1080 | First frame of `media/elements/out-balcony` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-elements-card.webp` | 864×1080 | First frame of `media/elements/out-elements`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-elements.webp` | 1920×1080 | First frame of `media/elements/out-elements` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-golf-card.webp` | 864×1080 | First frame of `media/elements/out-golf`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-golf.webp` | 1920×1080 | First frame of `media/elements/out-golf` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-kids-play-card.webp` | 864×1080 | First frame of `media/elements/out-kids-play`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-kids-play.webp` | 1920×1080 | First frame of `media/elements/out-kids-play` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-petpark-card.webp` | 864×1080 | First frame of `media/elements/out-petpark`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-petpark.webp` | 1920×1080 | First frame of `media/elements/out-petpark` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-podium-card.webp` | 864×1080 | First frame of `media/elements/out-podium`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-podium.webp` | 1920×1080 | First frame of `media/elements/out-podium` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-skate-card.webp` | 864×1080 | First frame of `media/elements/out-skate`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-skate.webp` | 1920×1080 | First frame of `media/elements/out-skate` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-villa-front.webp` | 1920×1080 | First frame of `media/elements/out-villa-front` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-villas.webp` | 1920×1080 | First frame of `media/elements/out-villas` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-volleyball-card.webp` | 864×1080 | First frame of `media/elements/out-volleyball`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-volleyball.webp` | 1920×1080 | First frame of `media/elements/out-volleyball` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-yoga-gym-card.webp` | 864×1080 | First frame of `media/elements/out-yoga-gym`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/out-yoga-gym.webp` | 1920×1080 | First frame of `media/elements/out-yoga-gym` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/outdoor-gym-aerial.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Outdoor Gym_semi aerial.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/outdoor-gym.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Outdoor Gym_closeup.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pet-park.webp` | 2560×1440 | `brand assets/Pet park.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pickleball-court.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Pickle ball court.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pickleball-futsal.webp` | 1920×1080 | dishapursuitoftheelements.com (October 2026) | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pickleball-paddles.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Pickle ball_Closeup.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/picnic-tents.webp` | 1920×1080 | `assets 2/Extra images for presentation /Picnic Tents.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/podium-deck.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Podium Level_03.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/podium-plaza.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Podium Level_04.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/podium.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Podium Level_02.JPEG` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/pool-day.webp` | 2560×1440 | `assets 2/4K Render 2/Swimming pool_Revised_02.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pool-full.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/TIFF/Swimming pool full view.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pool-night.webp` | 2560×1440 | `brand assets/Clubhouse internal/Pool Deck night.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pool-rooftop-night.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Aerial night_000.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/poolside-cafe.webp` | 2000×1125 | `brand assets/Clubhouse internal/Poolside Cafe night.jpg` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/pote-hero.webp` | 1920×1080 | First frame of `media/elements/pote-hero` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pote-home.webp` | 1920×1080 | First frame of `media/elements/pote-home` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/pote-night.webp` | 1920×1080 | First frame of `media/elements/pote-night` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/pote-outdoors.webp` | 1920×1080 | First frame of `media/elements/pote-outdoors` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/pote-villas.webp` | 1920×1080 | First frame of `media/elements/pote-villas` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/rock-garden.webp` | 1920×1080 | `assets 2/Extra images for presentation /Rock garden_JPEG.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-badminton-card.webp` | 864×1080 | First frame of `media/elements/room-badminton`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-badminton.webp` | 1920×1080 | First frame of `media/elements/room-badminton` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-banquet-card.webp` | 864×1080 | First frame of `media/elements/room-banquet`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-banquet.webp` | 1920×1080 | First frame of `media/elements/room-banquet` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-cafe.webp` | 1920×1080 | First frame of `media/elements/room-cafe` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-classroom-card.webp` | 864×1080 | First frame of `media/elements/room-classroom`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-classroom.webp` | 1920×1080 | First frame of `media/elements/room-classroom` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-conference-card.webp` | 864×1080 | First frame of `media/elements/room-conference`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-conference.webp` | 1920×1080 | First frame of `media/elements/room-conference` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-cowork-card.webp` | 864×1080 | First frame of `media/elements/room-cowork`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-cowork.webp` | 1920×1080 | First frame of `media/elements/room-cowork` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-dance-card.webp` | 864×1080 | First frame of `media/elements/room-dance`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-dance.webp` | 1920×1080 | First frame of `media/elements/room-dance` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-games-card.webp` | 864×1080 | First frame of `media/elements/room-games`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-games.webp` | 1920×1080 | First frame of `media/elements/room-games` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-guest-card.webp` | 864×1080 | First frame of `media/elements/room-guest`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-guest.webp` | 1920×1080 | First frame of `media/elements/room-guest` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-gym-card.webp` | 864×1080 | First frame of `media/elements/room-gym`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-gym.webp` | 1920×1080 | First frame of `media/elements/room-gym` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-library-card.webp` | 864×1080 | First frame of `media/elements/room-library`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-library.webp` | 1920×1080 | First frame of `media/elements/room-library` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-lobby-card.webp` | 864×1080 | First frame of `media/elements/room-lobby`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-lobby.webp` | 1920×1080 | First frame of `media/elements/room-lobby` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-music-card.webp` | 864×1080 | First frame of `media/elements/room-music`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-music.webp` | 1920×1080 | First frame of `media/elements/room-music` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-reception-card.webp` | 864×1080 | First frame of `media/elements/room-reception`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-reception.webp` | 1920×1080 | First frame of `media/elements/room-reception` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-senior-card.webp` | 864×1080 | First frame of `media/elements/room-senior`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-senior.webp` | 1920×1080 | First frame of `media/elements/room-senior` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-terrace-card.webp` | 864×1080 | First frame of `media/elements/room-terrace`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-terrace.webp` | 1920×1080 | First frame of `media/elements/room-terrace` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-theatre.webp` | 1920×1080 | First frame of `media/elements/room-theatre` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-tt-card.webp` | 864×1080 | First frame of `media/elements/room-tt`, cropped upright | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-tt.webp` | 1920×1080 | First frame of `media/elements/room-tt` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-yoga-card.webp` | 864×1080 | First frame of `media/elements/room-yoga`, cropped upright | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/room-yoga.webp` | 1920×1080 | First frame of `media/elements/room-yoga` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/sand-pit.webp` | 1920×1080 | `assets 2/Extra images for presentation /Sand pit_JPEG.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/senior-lounge.webp` | 2560×1518 | `brand assets/Clubhouse internal/Senior Lounge 1.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/short-1.webp` | 1920×1080 | Frame at 13.3 s of `media/elements/short-1` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/short-4.webp` | 1920×1080 | Frame at 10.0 s of `media/elements/short-4` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/short-clubhouse-1.webp` | 1920×1080 | Frame at 12.0 s of `media/elements/short-clubhouse-1` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/short-clubhouse-2.webp` | 1920×1080 | Frame at 10.5 s of `media/elements/short-clubhouse-2` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/skate-park.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Skate Park_shot ani_FIRST.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/skate.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/Skate_Closeup.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/table-tennis.webp` | 2560×1440 | `brand assets/Clubhouse internal/TT room 1.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/tennis-futsal.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/The Twin Tennis & Futsal Courts_FIRST.jpg` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/terrace-cafe.webp` | 1920×1080 | dishapursuitoftheelements.com (October 2026) | `lib/elements.ts` |
| `images/pursuit-of-the-elements/theatre.webp` | 2560×1440 | `brand assets/Clubhouse internal/MINI THEATRE.png` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/toddler-sand-pit.webp` | 1920×1080 | `assets 2/Extra images for presentation /Toddler_s-Sand Pit and Floral Garden.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/towers-4k.webp` | 2560×1440 | `assets 2/4K Render 2/Tower Enter view_Revised.JPEG` | `lib/content.ts`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/towers-sky.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Landscape shot 2 shot ani_LAST.jpg` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/towers.webp` | 1600×900 | dishapursuitoftheelements.com (October 2026) | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/content.ts`, `lib/projects.ts` |
| `images/pursuit-of-the-elements/vegetable-garden.webp` | 1920×1080 | `assets 2/Extra images for presentation /Vegetable Garden.JPEG` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/villa-lane.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Villa_Revised_LAST.jpg` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/villa-pavilion-pool.webp` | 1920×1080 | `assets 2/Extra images for presentation /Pavilion and Kids play area.TIFF` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/villas-aerial.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Villa semi aerial_Sun shadown shot ani_Revised_LAST.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/villas-street.webp` | 1920×1080 | `assets 2/Final updated_HD/Image TIFF and JPEG/JPEG/villa Front street view_Revised.JPEG` | `app/homes/pursuit-of-the-elements/page.tsx`, `lib/elements.ts` |
| `images/pursuit-of-the-elements/villas.webp` | 1440×750 | dishapursuitoftheelements.com (October 2026) | `lib/content.ts` |
| `images/pursuit-of-the-elements/yoga-cafe.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Coffee shop To Yoga Kitchen shot ani_Sun Shadown shot ani_FIRST.jpg` | `lib/elements.ts` |
| `images/pursuit-of-the-elements/yoga-deck.webp` | 1920×1080 | `assets 2/Final updated_HD/Frame and Last/Yoga area_FIRST.jpg` | `lib/elements.ts` |

**Other files**

| File | Source | Used for |
| --- | --- | --- |
| `public/images/og/home.jpg`, `og/pursuit-of-the-elements.jpg` | `towers-4k` and `aerial-day` at 1200×630, labelled "Artist’s impression" on the picture | Link previews |
| `docs/brand/*.svg` | Disha Habitat Guidelines 2025, page 2 | Masters for `components/showroom/Logo.tsx`, the favicon and the apple icon |
| `public/media/brand-film-720.mp4`, `brand-film.webp` | 12 s of Disha’s brand film (dishahabitat.com, 3.6 s to 15.6 s), 1280×720, and its first frame | The awards panel on the home page |

The library also contains the guideline PDF, TIFF masters, duplicates (“Copy of …”) and long walkthrough films. They are
not on the site. Pick from them with `scripts/encode-films.sh` if a page needs more.
