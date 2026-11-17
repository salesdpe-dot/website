/*
 * The quarterly newsletter of Disha Pursuit of the Elements, as web pages (the 17 November 2026 review asked for the
 * PDFs to become a page people can open on a phone, with analytics on who reads it).
 *
 * Each issue is one entry below, filled from Disha's own newsletter: the same words, the same photographs (site
 * photographs, not renders), the same order. Two things are left out on purpose: the price block (prices stay with
 * the sales team) and the lenders' logos. A new quarter is a new entry at the top of `issues`, with its photographs
 * in public/images/newsletter/<slug>/. The earlier issues stay as Disha's PDFs, in `archive`.
 */
export type NewsPhoto = {
  src: string;
  width: number;
  height: number;
  caption: string;
};
export type Tower = {
  name: string;
  family: string;
  levels: string;
  floorLevels: number;
  photo: NewsPhoto;
  updates: string[];
};
export type VillaRow = {
  row: string;
  facing: string;
  bhk: number;
  photo: NewsPhoto;
  updates: string[];
};
export type Issue = {
  slug: string;
  quarter: string;
  month: string;
  number: number;
  of: number;
  /* Disha's PDF of the same issue. */
  pdf: string;
  feature: { title: string; text: string; photos: NewsPhoto[] };
  phases: { phase: string; rera: string; towers: Tower[] }[];
  clubhouse: { photos: NewsPhoto[]; updates: string[] };
  villas: { aerial: NewsPhoto; rows: VillaRow[] };
  /* Photographs of the work, in the newsletter's groups. */
  groups: { title: string; photos: NewsPhoto[] }[];
  soldOut: string[];
  next: string;
};

export const issues: Issue[] = [
  {
    slug: "2026-q4",
    quarter: "Q4 2026",
    month: "October 2026",
    number: 12,
    of: 16,
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/6add15cf7a97182f307cdb14_DishaPursuitoftheElements%20Newsletter%20Q4-2026_compressed%20(1).pdf",
    feature: {
      title: "First sample display",
      text: "The first-sample display at the Experience Centre is now ready for viewing. All the artistic hand-made sculptures are in their final life-size form, as they will be displayed at the project site before December 2027. Some of the landscaping elements that are part of the outdoor amenities are also part of this display, for you to experience first-hand with your family and friends.",
      photos: [
        {
          src: "/images/newsletter/2026-q4/walkways.webp",
          width: 971,
          height: 449,
          caption: "Landscaping walkways",
        },
        {
          src: "/images/newsletter/2026-q4/bollards.webp",
          width: 972,
          height: 449,
          caption: "Landscaping bollards and garden lights",
        },
        {
          src: "/images/newsletter/2026-q4/barbeque-pit.webp",
          width: 971,
          height: 449,
          caption: "Barbeque pit",
        },
        {
          src: "/images/newsletter/2026-q4/pergola.webp",
          width: 471,
          height: 305,
          caption: "Pergola",
        },
        {
          src: "/images/newsletter/2026-q4/globe.webp",
          width: 470,
          height: 305,
          caption: "Five Elements Globe",
        },
        {
          src: "/images/newsletter/2026-q4/plaza.webp",
          width: 971,
          height: 449,
          caption: "Elements Plaza prototype",
        },
        {
          src: "/images/newsletter/2026-q4/earth.webp",
          width: 300,
          height: 443,
          caption: "Earth element sculpture",
        },
        {
          src: "/images/newsletter/2026-q4/space.webp",
          width: 299,
          height: 443,
          caption: "Space element sculpture",
        },
        {
          src: "/images/newsletter/2026-q4/water.webp",
          width: 299,
          height: 443,
          caption: "Water element sculpture",
        },
        {
          src: "/images/newsletter/2026-q4/fire.webp",
          width: 354,
          height: 443,
          caption: "Fire element sculpture",
        },
        {
          src: "/images/newsletter/2026-q4/air.webp",
          width: 354,
          height: 442,
          caption: "Air element sculpture",
        },
      ],
    },
    phases: [
      {
        phase: "Phase 1",
        rera: "PRM/KA/RERA/1251/308/PR/280324/006756",
        towers: [
          {
            name: "Tower E",
            family: "Presidential",
            levels: "B2+B1+P1+P2+29",
            floorLevels: 31,
            photo: {
              src: "/images/newsletter/2026-q4/tower-e.webp",
              width: 297,
              height: 487,
              caption: "Tower E, October 2026",
            },
            updates: [
              "Terrace pergola work: 90% completed.",
              "Basement 1: VDF flooring 95% completed.",
              "Basement 2: VDF flooring 95% completed.",
              "Domestic tank and flush tank 100% completed.",
              "2nd to 28th Floor putty work completed.",
              "2nd to 29th Floor bathroom and utility waterproofing completed.",
              "2nd to 29th Floor bathroom and utility piping completed.",
              "2nd to 29th Floor flush tank and diverter fixing completed.",
              "2nd to 29th Floor bathroom pipes pressure testing completed.",
              "2nd to 29th Floor fire-fighting pipe fixing completed.",
              "2nd to 24th Floor tiling completed. 25th to 27th Floor in progress.",
              "2nd to 19th Floor granite coping for bathroom and balcony ledge completed.",
              "2nd to 16th Floor internal flat wiring completed.",
              "2nd to 29th Floor external elevation UPVC windows completed.",
              "2nd to 18th Floor balcony sliding doors completed.",
              "2nd to 5th Floor corridor tiling completed. 6th Floor in progress.",
              "2nd to 21st Floor corridor false-ceiling work completed.",
              "External wall grinding work 95% completed.",
              "External wall primer 90% completed.",
              "External texture work 30% completed.",
              "Staircase 1 railings: 1st to 29th Floor completed.",
              "Staircase 2 railings: 1st to 29th Floor completed.",
            ],
          },
          {
            name: "Tower F",
            family: "Premium",
            levels: "B+P1+P2+25",
            floorLevels: 27,
            photo: {
              src: "/images/newsletter/2026-q4/tower-f.webp",
              width: 310,
              height: 474,
              caption: "Tower F, October 2026",
            },
            updates: [
              "Terrace pergola work 100% completed.",
              "Lift machine room work 100% completed.",
              "Domestic tank and flush tank 100% completed.",
              "Basement VDF flooring 90% completed.",
              "Parking 2: VDF flooring 90% completed.",
              "2nd to 22nd Floor coarse putty completed.",
              "2nd to 23rd Floor bathroom waterproofing completed.",
              "2nd to 21st Floor utility waterproofing completed. 22nd Floor in progress.",
              "2nd to 24th Floor bathroom and utility piping completed.",
              "2nd to 22nd Floor flush tank and diverter fixing completed. 23rd Floor in progress.",
              "2nd to 22nd Floor bathroom pressure testing completed.",
              "2nd to 25th Floor fire-fighting pipe fixing completed.",
              "2nd to 23rd Floor fire-fighting pipe pressure testing completed.",
              "2nd to 18th Floor tiling completed. 19th Floor in progress.",
              "2nd to 18th Floor granite coping for bathroom and balcony ledge completed.",
              "2nd to 9th Floor internal flat wiring completed.",
              "2nd to 25th Floor external elevation UPVC windows completed.",
              "2nd to 15th Floor balcony sliding doors completed.",
              "2nd to 25th Floor balcony railing completed.",
              "2nd to 24th Floor corridor false-ceiling completed.",
              "External wall grinding 80% completed.",
              "External wall primer 30% completed.",
              "External texture work 10% completed.",
              "Staircase 1 railings: 1st to 25th Floor completed.",
              "Staircase 2 railings: 1st to 14th Floor completed.",
            ],
          },
          {
            name: "Tower G",
            family: "Premium",
            levels: "B+P1+P2+25",
            floorLevels: 27,
            photo: {
              src: "/images/newsletter/2026-q4/tower-g.webp",
              width: 362,
              height: 443,
              caption: "Tower G, October 2026",
            },
            updates: [
              "Terrace pergola work 100% completed.",
              "Lift machine room work 100% completed.",
              "Domestic tank and flush tank 100% completed.",
              "Basement VDF flooring 95% completed.",
              "Parking 2: VDF flooring 90% completed.",
              "2nd to 23rd Floor second coat coarse putty completed.",
              "2nd to 24th Floor bathroom waterproofing completed.",
              "2nd to 22nd Floor utility waterproofing completed. 23rd and 24th Floor in progress.",
              "2nd to 22nd Floor bathroom and utility piping completed. 23rd Floor in progress.",
              "2nd to 21st Floor bathroom pressure testing completed.",
              "2nd to 21st Floor flush tank and diverter fixing completed.",
              "2nd to 25th Floor fire-fighting pipe fixing completed.",
              "2nd to 23rd Floor fire-fighting pipe pressure test completed.",
              "2nd to 19th Floor tiling completed. 20th Floor in progress.",
              "2nd to 20th Floor granite coping for bathroom and balcony ledge completed.",
              "2nd to 7th Floor internal flat wiring completed.",
              "2nd to 25th Floor external elevation UPVC windows completed.",
              "2nd to 14th Floor balcony sliding door completed.",
              "2nd to 25th Floor balcony railing completed.",
              "2nd to 24th Floor corridor false-ceiling completed.",
              "External wall grinding 100% completed.",
              "External wall primer 90% completed.",
              "External texture work 30% completed.",
              "Staircase 1 railings: 100% completed.",
              "Staircase 2 railings: 30% completed.",
            ],
          },
          {
            name: "Tower C",
            family: "Millennium",
            levels: "B2+B1+P1+P2+23",
            floorLevels: 25,
            photo: {
              src: "/images/newsletter/2026-q4/tower-c.webp",
              width: 362,
              height: 553,
              caption: "Tower C, October 2026",
            },
            updates: [
              "Terrace slab completed.",
              "Terrace parapet walls: 50% completed.",
              "Pergola structure: 50% completed.",
              "OHT tanks work in progress.",
              "Basement 2: VDF flooring 85% completed.",
              "Basement 1: Putty work 50% completed.",
              "2nd to 10th Floor coarse putty work completed.",
              "2nd and 3rd Floor waterproofing in progress.",
              "2nd to 23rd Floor GI wire pulling completed.",
              "2nd to 19th Floor balcony railing completed.",
              "Staircase 1 railings: 2nd to 15th Floor work in progress.",
              "Staircase 2 railings: 2nd to 15th Floor work in progress.",
            ],
          },
        ],
      },
      {
        phase: "Phase 2",
        rera: "PRM/KA/RERA/1251/308/PR/060924/007003",
        towers: [
          {
            name: "Tower D",
            family: "Presidential",
            levels: "B2+B1+P1+P2+29",
            floorLevels: 31,
            photo: {
              src: "/images/newsletter/2026-q4/tower-d.webp",
              width: 371,
              height: 474,
              caption: "Tower D, October 2026",
            },
            updates: [
              "12th Floor slab completed. 13th Floor in progress.",
              "Basement 2: VDF 95% completed.",
              "Basement 1: VDF 100% completed.",
              "Basement 2: Putty work 70% completed.",
              "Basement 2: Putty work 60% completed.",
              "2nd to 7th Floor GI wire pulling completed.",
              "2nd to 7th Floor internal wall-grinding completed.",
              "3rd Floor balcony railing work in progress.",
            ],
          },
          {
            name: "Tower B",
            family: "Premium",
            levels: "B+P1+P2+25",
            floorLevels: 27,
            photo: {
              src: "/images/newsletter/2026-q4/tower-b.webp",
              width: 459,
              height: 258,
              caption: "Tower B, October 2026",
            },
            updates: [
              "6th Floor slab completed. 7th Floor slab in progress.",
              "Basement slab completed.",
              "Basement grade slab 95% completed.",
              "Parking 1 slab completed.",
              "Parking 2 slab completed.",
              "Parking driveway ramp concrete completed.",
              "Basement to Parking 2 internal wall-grinding completed.",
              "2nd and 3rd Floor internal wall-grinding completed.",
            ],
          },
          {
            name: "Tower A",
            family: "Premium",
            levels: "B+P1+P2+25",
            floorLevels: 27,
            photo: {
              src: "/images/newsletter/2026-q4/tower-a.webp",
              width: 542,
              height: 271,
              caption: "Tower A, October 2026",
            },
            updates: [
              "1st Floor slab work in progress.",
              "Basement slab completed.",
              "Basement grade slab 100% completed.",
              "Parking 1 slab completed.",
              "Parking 2 slab completed.",
              "Parking driveway ramps completed.",
              "Basement to Parking 2 internal grinding 90% completed.",
            ],
          },
        ],
      },
    ],
    clubhouse: {
      photos: [
        {
          src: "/images/newsletter/2026-q4/clubhouse-1.webp",
          width: 461,
          height: 587,
          caption: "The clubhouse, October 2026",
        },
        {
          src: "/images/newsletter/2026-q4/clubhouse-2.webp",
          width: 461,
          height: 319,
          caption: "The clubhouse, October 2026",
        },
        {
          src: "/images/newsletter/2026-q4/clubhouse-3.webp",
          width: 461,
          height: 298,
          caption: "The clubhouse, October 2026",
        },
        {
          src: "/images/newsletter/2026-q4/clubhouse-4.webp",
          width: 461,
          height: 298,
          caption: "The clubhouse, October 2026",
        },
      ],
      updates: [
        "Ground Floor slab 100% completed.",
        "1st Floor slab work in progress.",
        "Basement PCC work 100% completed.",
        "STP tank 100% completed.",
        "Rainwater Harvesting Tank 100% completed.",
      ],
    },
    villas: {
      aerial: {
        src: "/images/newsletter/2026-q4/villas-aerial.webp",
        width: 1042,
        height: 569,
        caption: "The villa rows from above, October 2026",
      },
      rows: [
        {
          row: "R1",
          facing: "East",
          bhk: 4,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r1.webp",
            width: 542,
            height: 343,
            caption: "Villa row R1, October 2026",
          },
          updates: [
            "Villa 1: Brickwork 100% completed.",
            "Villa 1: Internal and external plastering 80% completed.",
            "Villa 1: Backyard structure work 100% completed.",
            "Villa 2: Brickwork 100% completed.",
            "Villa 2: Internal and external plastering 80% completed.",
            "Villa 2: Backyard structure work completed.",
            "Villa 3, 4, 5: Backyard structure work 100% completed.",
            "Villa 3, 4, 5: First coat putty work completed.",
            "Villa 6, 7, 8: Backyard work 100% completed.",
            "Villa 6, 7, 8: Plumbing and AC core-cutting completed.",
          ],
        },
        {
          row: "R2",
          facing: "East",
          bhk: 5,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r2.webp",
            width: 423,
            height: 343,
            caption: "Villa row R2, October 2026",
          },
          updates: [
            "Villa 9, 10, 11, 12, 13, 14, 15, 16, 17: Plumbing and AC core cutting completed.",
            "Villa 9, 10, 11, 12, 13, 14, 15, 16, 17: Walkway excavation for plumbing completed.",
            "Villa 9, 10, 11, 12, 13, 14, 15, 16, 17: Backyard structure work 100% completed.",
            "Villa 12, 13, 14, 15, 16, 17: Waterproofing completed. Protection screed concrete in progress.",
          ],
        },
        {
          row: "R3",
          facing: "North",
          bhk: 5,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r3.webp",
            width: 493,
            height: 343,
            caption: "Villa row R3, October 2026",
          },
          updates: [
            "Villa 18, 19, 20: Internal and external plastering 100% completed.",
            "Villa 21, 22: Brickwork 100% completed.",
            "Villa 21, 22: Internal and external plastering work in progress.",
            "Villa 18, 19, 20: Backyard structure work 100% completed.",
            "Villa 21, 22: Backyard structure work in progress.",
          ],
        },
        {
          row: "R4",
          facing: "West",
          bhk: 5,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r4.webp",
            width: 470,
            height: 372,
            caption: "Villa row R4, October 2026",
          },
          updates: [
            "Villa 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33: Plumbing and AC core cutting completed.",
            "Villa 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33: Backyard brickwork and plastering 100% completed.",
            "Villa 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33: Walkway excavation for plumbing completed.",
          ],
        },
        {
          row: "R5",
          facing: "West",
          bhk: 4,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r5.webp",
            width: 542,
            height: 343,
            caption: "Villa row R5, October 2026",
          },
          updates: [
            "Villa 34, 35, 36, 37, 38, 39, 40, 41, 42: AC and plumbing core cutting in progress.",
            "Villa 34, 35, 36, 37, 38, 39: External texture work 100% completed.",
            "Villa 34, 35, 36, 37, 38, 39, 40: Backyard brickwork and plastering 100% completed.",
          ],
        },
        {
          row: "R6",
          facing: "North",
          bhk: 4,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r6.webp",
            width: 542,
            height: 343,
            caption: "Villa row R6, October 2026",
          },
          updates: [
            "Villa 43, 44, 45, 46, 47, 48, 49: Texture work 100% completed.",
            "Villa 43, 44, 45, 46, 47, 48, 49: Internal first coat putty work completed.",
            "Villa 43, 44, 45, 46, 47, 48, 49: Backyard brickwork and plastering 100% completed.",
          ],
        },
        {
          row: "R7",
          facing: "North",
          bhk: 4,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r7.webp",
            width: 542,
            height: 416,
            caption: "Villa row R7, October 2026",
          },
          updates: [
            "Villa 50, 51, 52, 53, 54: External texture work in progress.",
            "Villa 50, 51, 52, 53: First coat putty work completed.",
            "Villa 55: Electrical work 100% completed.",
            "Villa 50, 51, 52, 53, 54, 55: Backyard structure work 100% completed.",
          ],
        },
        {
          row: "R8",
          facing: "North",
          bhk: 5,
          photo: {
            src: "/images/newsletter/2026-q4/villas-r8.webp",
            width: 542,
            height: 343,
            caption: "Villa row R8, October 2026",
          },
          updates: [
            "Villa 57, 58, 59, 60: Internal and external plastering 100% completed.",
            "Villa 56, 57, 58, 59, 60: Backyard structure work 100% completed.",
            "Villa 56, 57, 58, 59, 60: First coat putty work in progress.",
          ],
        },
      ],
    },
    groups: [
      {
        title: "Inside the villas",
        photos: [
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-internal-plastering-work.webp",
            width: 471,
            height: 305,
            caption: "Internal plastering work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-internal-putty-work.webp",
            width: 471,
            height: 305,
            caption: "Internal putty work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-external-plinth-work.webp",
            width: 470,
            height: 306,
            caption: "External plinth work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-backyard-structure-work.webp",
            width: 471,
            height: 305,
            caption: "Backyard structure work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-internal-core-cutting-work.webp",
            width: 471,
            height: 305,
            caption: "Internal core-cutting work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-electrical-panel-installation.webp",
            width: 471,
            height: 305,
            caption: "Electrical panel installation",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-internal-plumbing-work.webp",
            width: 374,
            height: 443,
            caption: "Internal plumbing work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-villas-backyard-wall-work.webp",
            width: 569,
            height: 442,
            caption: "Backyard wall work",
          },
        ],
      },
      {
        title: "Inside the towers",
        photos: [
          {
            src: "/images/newsletter/2026-q4/inside-the-towers-internal-walls-putty-work.webp",
            width: 971,
            height: 408,
            caption: "Internal walls putty work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-towers-internal-tiling-work.webp",
            width: 393,
            height: 443,
            caption: "Internal tiling work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-towers-balcony-waterproofing.webp",
            width: 547,
            height: 442,
            caption: "Balcony waterproofing",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-towers-balcony-railings-work.webp",
            width: 474,
            height: 384,
            caption: "Balcony railings work",
          },
          {
            src: "/images/newsletter/2026-q4/inside-the-towers-bathroom-piping-work.webp",
            width: 471,
            height: 385,
            caption: "Bathroom piping work",
          },
        ],
      },
      {
        title: "Phase 1 terraces",
        photos: [
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-terrace-parapet-wall-work-in-progress.webp",
            width: 971,
            height: 372,
            caption: "Terrace parapet wall work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-terrace-domestic-water-storage-tank.webp",
            width: 471,
            height: 305,
            caption: "Terrace domestic water storage tank",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-terrace-recycled-flush-water-storage-tank.webp",
            width: 471,
            height: 305,
            caption: "Terrace recycled flush water storage tank",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-terrace-pergola-work-in-progress.webp",
            width: 971,
            height: 494,
            caption: "Terrace pergola work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-c-tower-terrace.webp",
            width: 970,
            height: 495,
            caption: "C Tower terrace",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-e-tower-terrace.webp",
            width: 971,
            height: 417,
            caption: "E Tower terrace",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-f-tower-terrace.webp",
            width: 971,
            height: 413,
            caption: "F Tower terrace",
          },
          {
            src: "/images/newsletter/2026-q4/phase-1-terraces-g-tower-terrace.webp",
            width: 971,
            height: 495,
            caption: "G Tower terrace",
          },
        ],
      },
      {
        title: "Common utilities",
        photos: [
          {
            src: "/images/newsletter/2026-q4/common-utilities-staircase-railings-work.webp",
            width: 470,
            height: 443,
            caption: "Staircase railings work",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-lift-lobby-area-work-in-progress.webp",
            width: 470,
            height: 442,
            caption: "Lift lobby area work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-basement-vdf-flooring.webp",
            width: 471,
            height: 305,
            caption: "Basement VDF flooring",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-parking-bays-work-in-progress.webp",
            width: 471,
            height: 305,
            caption: "Parking bays work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-common-corridor-tiling-work.webp",
            width: 392,
            height: 442,
            caption: "Common corridor tiling work",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-common-corridor-false-ceiling-work.webp",
            width: 547,
            height: 442,
            caption: "Common corridor false-ceiling work",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-f-tower-parking-2.webp",
            width: 471,
            height: 383,
            caption: "F Tower Parking 2",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-stormwater-drain-work-in-progress.webp",
            width: 475,
            height: 383,
            caption: "Stormwater drain work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-east-side-compound-wall-work-in-progress.webp",
            width: 971,
            height: 393,
            caption: "East side compound wall work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/common-utilities-a-and-b-towers-parking-ramp.webp",
            width: 971,
            height: 449,
            caption: "A and B Towers parking ramp",
          },
        ],
      },
      {
        title: "Outdoor amenities",
        photos: [
          {
            src: "/images/newsletter/2026-q4/outdoor-amenities-community-space-above-the-parking-ramp.webp",
            width: 898,
            height: 634,
            caption: "Community space above the parking ramp",
          },
          {
            src: "/images/newsletter/2026-q4/outdoor-amenities-outdoor-pergola-work-in-progress.webp",
            width: 470,
            height: 305,
            caption: "Outdoor pergola work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/outdoor-amenities-planter-boxes-work-in-progress.webp",
            width: 471,
            height: 305,
            caption: "Planter boxes work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/outdoor-amenities-pet-park-excavation-work-in-progress.webp",
            width: 475,
            height: 384,
            caption: "Pet park excavation work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/outdoor-amenities-walking-track-work-in-progress.webp",
            width: 473,
            height: 384,
            caption: "Walking track work in progress",
          },
          {
            src: "/images/newsletter/2026-q4/outdoor-amenities-highpoint-pavilion-structure-work-in-progress.webp",
            width: 972,
            height: 449,
            caption: "Highpoint Pavilion structure work in progress",
          },
        ],
      },
    ],
    soldOut: ["Millennium Homes", "Villas"],
    next: "January 2027",
  },
];

/* The issues before the web version, as Disha published them (PDF, on dishapursuitoftheelements.com). */
export const archive: { quarter: string; month: string; pdf: string }[] = [
  {
    quarter: "Q3 2026",
    month: "July 2026",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/6a574bd4f496bf7a275858d0_DishaPursuitoftheElements%20Newsletter%20Q3-2026_.pdf",
  },
  {
    quarter: "Q2 2026",
    month: "April 2026",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/69d8890ce3a4234c0425fe00_DishaPursuitoftheElements%20Newsletter%20Q2-2026-2_260410_083806.pdf",
  },
  {
    quarter: "Q1 2026",
    month: "January 2026",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/695f63de84290dbd73712d86_DishaPursuitoftheElements%20Newsletter%20Q1-2026%20(2).pdf",
  },
  {
    quarter: "Q4 2025",
    month: "October 2025",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/695e13b256cc0bcd85655b82_DishaPursuitoftheElements%20Newsletter%20Q4-2025-2_251008_205740%20(1).pdf",
  },
  {
    quarter: "Q3 2025",
    month: "July 2025",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/687f0f36e4bb9530a3b851f2_DPoE-07Jul-25.pdf.pdf",
  },
  {
    quarter: "Q2 2025",
    month: "April 2025",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/687f0f36388376ed03d57194_DPoE-07Apr-25.pdf",
  },
  {
    quarter: "Q1 2025",
    month: "January 2025",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/67912d4ae37c5a252015f402_DPOE-JAN2025%20.pdf",
  },
  {
    quarter: "Q4 2024",
    month: "October 2024",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/67065d77965b4c5ab4d273b2_DPOE-Oct24.pdf",
  },
  {
    quarter: "Q3 2024",
    month: "July 2024",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/6690e93b55371864d08ca892_DishaPursuitoftheElements%20Newsletter03July2024.pdf",
  },
  {
    quarter: "Q2 2024",
    month: "April 2024",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/66e928c751d907d52be69115_DPOE-Apr-24.pdf",
  },
  {
    quarter: "Q1 2024",
    month: "January 2024",
    pdf: "https://cdn.prod.website-files.com/6533539b97cd72e210c603f6/66e78f5a4728c479670d677d_DPOE-Jan-24..pdf",
  },
];

export const latestIssue = issues[0]!;
export const issueHref = (i: Issue) => `/updates/${i.slug}`;
