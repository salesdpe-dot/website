/*
 * The proof a homebuyer asks for, gathered in one place. Only facts already published by Disha
 * (projects.ts, elements.ts, site.ts) or by a named third party with a link are used here.
 * Anything not yet confirmed by the client (promised RERA dates, water sources, Khata status)
 * is deliberately absent: see docs/RESEARCH-BRIEF.md and the client launch checklist.
 */
import { elements } from "@/lib/elements";
import { siteQuery } from "@/lib/nearby";
import { projectsByHandover } from "@/lib/projects";

export { directionsUrl } from "@/lib/nearby";

export const delivered = projectsByHandover.map((p) => ({
  slug: p.slug,
  name: p.shortName,
  locality: p.locality,
  homes: Number(p.facts.find((f) => f.label === "Homes")?.value ?? 0),
  start: p.timeline.start,
  handoverYear: p.handoverYear,
  months: p.timeline.months,
}));

export const homesHandedOver = delivered.reduce((n, d) => n + d.homes, 0);

/* A third-party view of life after handover. Checked October 2026; link so anyone can verify. */
export const residentRating = {
  community: "Disha Central Park",
  score: "4.7",
  reviews: 29,
  outOf: "5",
  source: "MyGate",
  href: "https://mygate.com/bengaluru/disha-central-park-499.html",
  checked: "October 2026",
};

/* Karnataka RERA's list of registered projects, searchable by number, name or promoter. */
export const reraSearch = "https://rera.karnataka.gov.in/viewAllProjects";

/*
 * Commute: we don't quote travel times (they change by the hour). Instead each destination opens
 * live directions from the project in Google Maps, so the buyer sees today's real figure.
 */
export const commuteFrom = {
  label: elements.shortName,
  query: siteQuery,
};

export const commuteDestinations = [
  { label: "ITPL, Whitefield", query: "International Tech Park Bangalore, Whitefield" },
  { label: "Ecospace, Bellandur (ORR)", query: "RMZ Ecospace, Bellandur, Bengaluru" },
  { label: "Wipro, Sarjapur Road", query: "Wipro Corporate Office, Sarjapur Road, Bengaluru" },
  { label: "Manyata Tech Park", query: "Embassy Manyata Business Park, Bengaluru" },
  { label: "Whitefield metro", query: "Whitefield (Kadugodi) Metro Station, Bengaluru" },
  { label: "Kempegowda International Airport", query: "Kempegowda International Airport, Bengaluru" },
];

/* What else is around the site, as live Google Maps searches: no distances or names are claimed by us. */
export const nearbySearches = [
  { label: "Temples nearby", query: "temples near Gunjur, Bengaluru" },
  { label: "Supermarkets nearby", query: "supermarkets near Gunjur, Bengaluru" },
];
export const mapsSearchUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
/* Directions to the site from wherever the visitor is. */
export const siteDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(commuteFrom.query)}`;

/* The ET Business Awards 2025 citation, exactly as printed on the certificate. */
export const award = {
  title: "ET Business Awards 2025",
  honour: "Certificate of Excellence",
  citation: "Innovation Real Estate Project of the Year (Residential)",
  project: elements.shortName,
  image: "/images/events/et-award-certificate.webp",
};
