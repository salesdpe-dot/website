import Link from "next/link";
import { CookieSettingsLink } from "@/components/consent/ConsentBanner";
import { SlashBreak } from "@/components/ds/SlashBreak";
import { communities, communityHref, company, links } from "@/lib/content";
import { company as site } from "@/lib/site";
import { ChevronDown } from "./Icons";
import { Logo } from "./Logo";
import s from "./SiteFooter.module.css";

const columns = [
  {
    title: "Communities",
    links: [...communities.map((c) => ({ label: c.name, href: communityHref(c.slug), meta: c.eyebrow })), { label: "All homes", href: links.homes }],
  },
  {
    title: "Disha Habitat",
    links: [
      { label: "Our story", href: links.story },
      { label: "The founders", href: "/story#homemakers" },
      { label: "Buyer reviews", href: links.reviews },
      { label: "Contact", href: links.contact },
    ],
  },
  {
    title: "Plan your home",
    links: [
      { label: "Book a site visit", href: links.bookVisit },
      { label: "Homebuyer’s checklist", href: links.checklist },
      { label: "EMI calculator", href: links.emi },
      { label: "Compare communities", href: "/compare" },
      { label: "Construction updates", href: links.updates },
    ],
  },
] as const;

/* A column's heading, which opens and closes the column on a phone. */
function Fold({ title }: { title: string }) {
  return (
    <summary className={s.fold}>
      <h2 className={s.head}>{title}</h2>
      <ChevronDown className={s.chevron} />
    </summary>
  );
}

/*
 * Every page ends on the brand, the same footer everywhere: the guideline's navy field with the white lock-up on it
 * (page 5; the lock-up already carries "come home"), the sales line and a button, then the pages in three short
 * columns, every way to reach Disha, the footnotes, and one line of small print.
 */
export function SiteFooter() {
  return (
    <footer className={`band-navy ${s.footer}`} data-tone="dark">
      <div className={s.top}>
        {/* The guideline's white lock-up on navy, with its clear space (the height of the home icon) kept around it. */}
        <Link href="/" prefetch={false} className={s.brand} aria-label="Disha Habitat, home">
          <Logo className={s.logo} monochrome title="Disha Habitat" />
        </Link>
      </div>

      <div className={s.call}>
        <p className={s.callLabel}>Sales, Pursuit of the Elements</p>
        <a href={company.sales.tel} className={`display ${s.phone}`}>
          {company.sales.display}
        </a>
        <div className={s.callActions}>
          <Link href={links.bookVisit} className="btn btn-primary">
            Book a visit
          </Link>
          <a href={company.whatsapp} className="btn btn-line">
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* On a phone each column is a row that opens, as on apple.com; from 768 px they stand open side by side. */}
      <div className={s.grid}>
        {columns.map((col) => (
          <details key={col.title} className={s.col}>
            <Fold title={col.title} />
            <nav aria-label={col.title}>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? <Link href={l.href}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        ))}
        <details className={s.col}>
          <Fold title="Talk to us" />
          <ul>
            <li>
              <a href={company.sales.tel}>Sales <span className="whitespace-nowrap">{company.sales.display}</span></a>
            </li>
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href}>Office <span className="whitespace-nowrap">{p.display}</span></a>
              </li>
            ))}
            <li>
              <a href={company.whatsapp}>WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`}><span className="whitespace-nowrap">{company.email}</span></a>
            </li>
            <li>
              <a href={site.office.mapUrl}>{company.office}</a>
            </li>
          </ul>
        </details>
      </div>

      <div className={s.notes}>
        <p id="note-1">
          <sup>1</sup> From 29 reviews of Disha Central Park on <a href={links.mygate}>MyGate</a>, checked October 2026.
        </p>
        <p>
          Images and films marked “Artist’s impression” are computer renders; all others are photographs or real footage.
          The reviews are filmed with Disha’s own buyers, in their own words.
        </p>
        <p>
          Pursuit of the Elements is registered with Karnataka RERA:{" "}
          {company.rera.map((r, i) => (
            <span key={r.no}>
              {r.phase} <span className={s.code}><SlashBreak code={r.no} /></span>
              {i < company.rera.length - 1 ? ", " : ". "}
            </span>
          ))}
          Any registration number can be checked in <a href={links.rera}>Karnataka RERA’s list of registered projects</a>.
        </p>
      </div>

      <ul className={s.links}>
        <li>
          {company.copyright} © {company.year}
        </li>
        <li>
          <Link href={links.privacy}>Privacy</Link>
        </li>
        <li>
          <CookieSettingsLink />
        </li>
        {company.socials.map((x) => (
          <li key={x.label}>
            <a href={x.href}>{x.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
