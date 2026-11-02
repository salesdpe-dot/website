import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs, PageIntro } from "@/components/ds";
import { pageMeta } from "@/lib/launch";
import { CompareTool } from "./CompareTool";
import { communities, defaults, rowOrder } from "./data";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "Compare our communities",
  description: "Pick up to three Disha Habitat communities and see homes, land, floors, built-up area and build time side by side.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Compare communities" }]} />}
        title="Six communities, side by side."
        line="Pick up to three. Homes, land, floors, built-up area and the months each one took to build, in one table."
      />
      <div className={s.wrap}>
        <Suspense fallback={<CompareTool communities={communities} rows={rowOrder} initial={defaults} />}>
          <CompareTool communities={communities} rows={rowOrder} initial={defaults} fromUrl />
        </Suspense>
      </div>
    </>
  );
}
