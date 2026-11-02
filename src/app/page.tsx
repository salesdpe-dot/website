import type { Metadata } from "next";
import { ClubhousePanel } from "@/components/home/ClubhousePanel";
import { CommunityRow } from "@/components/home/CommunityRow";
import { ElementsSwitcher } from "@/components/home/ElementsSwitcher";
import { ModelRow } from "@/components/home/ModelRow";
import { AmenityRow } from "@/components/showroom/AmenityRow";
import { ClosingCta } from "@/components/showroom/ClosingCta";
import { Hero } from "@/components/showroom/Hero";
import { MapSection } from "@/components/showroom/MapSection";
import { ProofPanel } from "@/components/showroom/ProofPanel";
import { communities, heroSlides, mapHead } from "@/lib/content";
import { pageMeta } from "@/lib/launch";
import s from "./page.module.css";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Disha Habitat | Homes in East Bengaluru",
    description:
      "Pursuit of the Elements, now selling in Gunjur: 2, 3 & 4 BHK apartments and 4 & 5 BHK villas on 20 acres. 1,102 homes handed over across five Disha Habitat communities since 2015.",
    path: "/",
  }),
  title: { absolute: "Disha Habitat | Homes in East Bengaluru" },
};

/*
 * As tesla.com's home page, with more of everything: the hero's four films; the homes as tesla.com's row of
 * models; then the proof while the visitor is still deciding (the brand band with the record, the six communities
 * on one map, and the five handed over as they look now); the amenities, filtered; the clubhouse and the five
 * elements, a full screen each; and the closing step over the community at night.
 * The page ends on that film, so it is marked to meet the footer edge to edge (SiteFooter.module.css).
 */
export default function Home() {
  return (
    <div className={s.page} data-flush-end="">
      <h1 className="sr-only">Disha Habitat: Pursuit of the Elements in Gunjur, and five communities handed over in Bengaluru</h1>
      <Hero slides={heroSlides} />
      <ModelRow />
      <ProofPanel />
      <MapSection
        title={mapHead.title}
        line={mapHead.line}
        items={communities.map(({ slug, name, place, eyebrow }) => ({ slug, name, place, eyebrow }))}
      />
      <CommunityRow />
      <AmenityRow />
      <ClubhousePanel />
      <ElementsSwitcher />
      <ClosingCta />
    </div>
  );
}
