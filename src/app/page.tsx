import type { Metadata } from "next";
import { ClubhousePanel } from "@/components/home/ClubhousePanel";
import { CommunityRow } from "@/components/home/CommunityRow";
import { ElementsSwitcher } from "@/components/home/ElementsSwitcher";
import { ModelRow } from "@/components/home/ModelRow";
import { WatchRow } from "@/components/home/WatchRow";
import { AmenityRow } from "@/components/showroom/AmenityRow";
import { ClosingCta } from "@/components/showroom/ClosingCta";
import { Hero } from "@/components/showroom/Hero";
import { MapSection } from "@/components/showroom/MapSection";
import { PromoGrid } from "@/components/showroom/PromoGrid";
import { ProofPanel } from "@/components/showroom/ProofPanel";
import { communities, heroSlides, mapHead } from "@/lib/content";
import { pageMeta } from "@/lib/launch";
import s from "./page.module.css";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Disha Habitat | Homes in East Bengaluru",
    description:
      "Pursuit of the Elements, now selling in Gunjur: 2, 3 & 4 BHK apartments and 4 & 5 BHK villas on 20 acres. 1,102 homes handed over across five Disha Habitat communities since 2014.",
    path: "/",
  }),
  title: { absolute: "Disha Habitat | Homes in East Bengaluru" },
};

/*
 * As tesla.com's home page, with more of everything: the hero's four films; the homes as tesla.com's row of
 * models; the amenities, filtered; the clubhouse and the five elements, a full screen each; the brand band
 * with the record; the client's walkthrough films; the communities handed over; the map; the two tools; and
 * the closing step over the community at night.
 */
export default function Home() {
  return (
    <div className={s.page}>
      <h1 className="sr-only">Disha Habitat: Pursuit of the Elements in Gunjur, and five communities handed over in Bengaluru</h1>
      <Hero slides={heroSlides} />
      <ModelRow />
      <AmenityRow />
      <ClubhousePanel />
      <ElementsSwitcher />
      <ProofPanel />
      <WatchRow />
      <CommunityRow />
      <MapSection
        title={mapHead.title}
        line={mapHead.line}
        items={communities.map(({ slug, name, place, eyebrow }) => ({ slug, name, place, eyebrow }))}
      />
      <PromoGrid />
      <ClosingCta />
    </div>
  );
}
