import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Hanken_Grotesk, Montserrat } from "next/font/google";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { MessageComposer } from "@/components/MessageComposer";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { SiteFooter } from "@/components/showroom/SiteFooter";
import { SiteHeader } from "@/components/showroom/SiteHeader";
import { indexing, siteUrl } from "@/lib/launch";
import { company } from "@/lib/site";
import "./globals.css";

/* Text and controls: Hanken Grotesk, as plain as tesla.com's own face. */
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

/* Headlines and figures: Montserrat, the typeface of Disha Habitat's brand guideline. One variable file, Latin only. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Disha Habitat | Homes in East Bengaluru",
    template: "%s · Disha Habitat",
  },
  description:
    "Pursuit of the Elements, now selling in Gunjur, and 1,102 homes handed over across five Disha Habitat communities in East Bengaluru since 2014.",
  openGraph: {
    type: "website",
    siteName: "Disha Habitat",
    locale: "en_IN",
    images: [{ url: "/images/og/home.jpg", width: 1200, height: 630 }],
  },
  /* Out of search indexes until launch day (SITE_INDEXING=true; see lib/launch.ts). */
  robots: indexing ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

/* What search engines read about the company: published facts only (lib/site.ts). */
const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.legalName,
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: company.phones.map((p) => p.display),
  address: {
    "@type": "PostalAddress",
    streetAddress: company.office.lines[0],
    addressLocality: "Bengaluru",
    postalCode: "560066",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: company.socials.map((s) => s.href),
};

/* Marks that scripts run, before the first paint, so controls that need them only show when they work. */
/* A first visit also gets "consent-pending", which reserves the cookie bar's height (globals.css) so the bar never covers or moves anything. */
const bootstrap =
  "var d=document.documentElement;d.classList.add('js');try{var c=localStorage.getItem('disha-consent');if(!c||c.indexOf('\"version\":1')<0)d.classList.add('consent-pending')}catch(e){d.classList.add('consent-pending')}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${hanken.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }} />
        <SiteHeader />
        <main id="main">
          {/* Route changes cross-fade; named elements (a community photograph) morph between pages. */}
          <ViewTransition>{children}</ViewTransition>
        </main>
        <SiteFooter />
        {/* Reviewers' notes need somewhere to be stored: off in production until the database is connected. */}
        {process.env.NEXT_PUBLIC_FEEDBACK === "on" || process.env.NODE_ENV !== "production" ? <FeedbackWidget /> : null}
        <MessageComposer />
        <ConsentBanner />
      </body>
    </html>
  );
}
