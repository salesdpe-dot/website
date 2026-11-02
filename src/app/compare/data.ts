import { elements } from "@/lib/elements";
import { projects } from "@/lib/projects";

export type Community = {
  slug: string;
  name: string;
  locality: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
  /* The picture is a computer render, so it carries an "Artist’s impression" label. */
  render: boolean;
  /* Row label to value. Only real fields are present; a missing key shows as a dash. */
  values: Record<string, string>;
};

const pick = (facts: readonly { label: string; value: string }[], label: string) => facts.find((f) => f.label === label)?.value;

const fromProject = (p: (typeof projects)[number]): Community => ({
  slug: p.slug,
  name: p.shortName,
  locality: p.locality,
  href: `/homes/${p.slug}`,
  image: p.cover,
  render: p.cover.kind === "render",
  /*
   * Related facts share a row (handover with status, start with the build time), so a delivered
   * community and the one on sale line up on more rows and the table shows fewer dashes.
   */
  values: Object.fromEntries(
    Object.entries({
      Status: `Handed over ${p.timeline.handover}`,
      Location: p.locality,
      Homes: pick(p.facts, "Homes"),
      Land: pick(p.facts, "Project size"),
      "Home types": pick(p.facts, "Home types"),
      Floors: pick(p.facts, "Floors"),
      "Saleable area": pick(p.facts, "Saleable area"),
      "Built-up area": pick(p.facts, "Built-up area"),
      "Signature feature": pick(p.facts, "Signature feature"),
      "Start to finish": `${p.timeline.months} months, from ${p.timeline.start}`,
    }).filter((e): e is [string, string] => Boolean(e[1])),
  ),
});

const ec = (label: string) => pick(elements.facts, label);

const selling: Community = {
  slug: elements.slug,
  name: elements.shortName,
  locality: elements.locality,
  href: elements.href,
  image: elements.cover,
  render: elements.cover.kind === "render",
  values: Object.fromEntries(
    Object.entries({
      Status: elements.status,
      Location: elements.locality,
      Land: ec("Land"),
      "Home types": [ec("Apartments") && `${ec("Apartments")} apartments`, ec("Villas") && `${ec("Villas")} villas`]
        .filter(Boolean)
        .join(" and "),
      Floors: "Up to 29, in 7 towers",
      Amenities: ec("Amenities") && `${ec("Amenities")}${ec("Clubhouse") ? `, and a ${ec("Clubhouse")} clubhouse` : ""}`,
    }).filter((e): e is [string, string] => Boolean(e[1])),
  ),
};

export const communities: Community[] = [selling, ...[...projects].reverse().map(fromProject)];

/* Row order; a row appears only when a selected community has a value. */
export const rowOrder = [
  "Status",
  "Location",
  "Homes",
  "Home types",
  "Land",
  "Floors",
  "Saleable area",
  "Built-up area",
  "Amenities",
  "Signature feature",
  "Start to finish",
];

export const defaults = [elements.slug, "disha-courtyard", "disha-central-park"];
