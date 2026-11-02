import type { Metadata } from "next";

/*
 * Launch settings, read at build time.
 *
 * SITE_URL       the public address, e.g. https://www.dishahabitat.com (defaults to the Vercel
 *                production address, then to localhost).
 * SITE_INDEXING  set to "true" on launch day to let search engines index the site. Until then
 *                every page carries noindex and robots.txt disallows crawling, so the preview
 *                never competes with the live dishahabitat.com.
 */
export const siteUrl = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const indexing = process.env.SITE_INDEXING === "true";

/*
 * Per-page metadata: title, description, the canonical address (so the preview address and the
 * www/non-www forms never compete in search), and complete sharing tags for WhatsApp and social.
 */
/* The towers of Pursuit of the Elements, with "Artist’s impression" on the picture itself. */
const defaultImage = { url: "/images/og/home.jpg", width: 1200, height: 630, alt: "The Pursuit of the Elements towers above landscaped gardens, artist’s impression" };

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Disha Habitat",
      locale: "en_IN",
      url: path,
      // A link preview shows no tab title, so "Our story" alone would not say whose story.
      title: title.includes("Disha") ? title : `${title} · Disha Habitat`,
      description,
      images: [image ?? defaultImage],
    },
  };
}
