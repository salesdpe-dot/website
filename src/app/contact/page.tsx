import type { Metadata } from "next";
import Link from "next/link";
import { ComposeButton } from "@/components/ComposeButton";
import { Breadcrumbs, PageIntro, Section, SectionHead } from "@/components/ds";
import { SocialIcons } from "@/components/Socials";
import { VisitBooker } from "@/components/VisitBooker";
import { elements } from "@/lib/elements";
import { pageMeta } from "@/lib/launch";
import { siteDirectionsUrl } from "@/lib/proof";
import { company, socialHandle } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "Contact and site visits",
  description: "Book a site visit, call, WhatsApp or write to Disha Habitat, Whitefield Main Road, Bengaluru.",
  path: "/contact",
});

const officeDirections = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.legalName}, ${company.office.lines.join(", ")}`)}`;

/*
 * One band under the invitation: the booker, and beside it (under it on a phone) every other way to reach us and
 * where we are. WhatsApp is the button at the top, so it is not repeated in the list; the social channels are four
 * icons, as in the footer.
 */
export default function ContactPage() {
  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} />}
        eyebrow="Gunaranjan J, founder"
        title="“Let’s meet for coffee.”"
        line="Come to the site in Gunjur, sit down with us at the office on Whitefield Main Road, or ask the sales team to call you."
      >
        <div className={s.hero}>
          <a href="#book" className="btn btn-primary">
            Book a site visit
          </a>
          <ComposeButton channel="whatsapp" className="btn btn-line">
            WhatsApp us
          </ComposeButton>
        </div>
      </PageIntro>

      {/* "#book" is the whole section, so every "Book a visit" link lands on its title, not under it. */}
      <Section id="book" tone="surface" space="tight" labelledBy="book-title">
        <SectionHead
          id="book-title"
          title="Book a site visit."
          line="Four steps. The request goes from your own WhatsApp or email, and the sales team confirms the time with you."
        />
        <div className={s.layout}>
          <div className={s.booker}>
            <VisitBooker />
          </div>
          <aside className={s.side} aria-label="Other ways to reach us">
            <div className={s.block}>
              <h3 className={s.blockTitle}>Call or write</h3>
              <ul className={s.reach}>
                <li>
                  <p className={s.label}>Sales, {elements.shortName}</p>
                  <a href={elements.phone.href} className={`display ${s.value}`}>
                    {elements.phone.display}
                  </a>
                  <p className={s.note}>Calls and WhatsApp, for visits, floor plans and new enquiries</p>
                </li>
                <li>
                  <p className={s.label}>Office</p>
                  <a href={company.phones[0].href} className={`display ${s.value}`}>
                    {company.phones[0].display}
                  </a>
                  <p className={s.note}>
                    Or <a href={company.phones[1].href}>{company.phones[1].display}</a>
                  </p>
                </li>
                <li>
                  <p className={s.label}>Email</p>
                  <ComposeButton channel="email" className={`display ${s.value} ${s.email}`}>
                    {company.email.split("@")[0]}@<wbr />
                    {company.email.split("@")[1]}
                  </ComposeButton>
                </li>
              </ul>
            </div>

            <div className={s.block}>
              <h3 className={s.blockTitle}>Where to find us</h3>
              <article className={s.placeText}>
                <p className={s.label}>Sales site, now selling</p>
                <h4 className={`display ${s.place}`}>
                  <Link href={elements.href}>{elements.shortName}</Link>
                </h4>
                <p className={s.note}>{elements.locality}</p>
                <a href={siteDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                  Get directions<span className="sr-only"> to {elements.shortName} (opens in a new tab)</span>
                </a>
              </article>
              <article className={s.office}>
                <p className={s.label}>Corporate office</p>
                <h4 className={`display ${s.place}`}>{company.legalName}</h4>
                <address className={s.note}>{company.office.lines.join(", ")}</address>
                <a href={officeDirections} target="_blank" rel="noopener noreferrer" className="text-link">
                  Get directions<span className="sr-only"> to the office (opens in a new tab)</span>
                </a>
              </article>
            </div>

            <div className={s.follow}>
              <p>
                <span className={s.label}>Follow us</span>
                <span className={`display ${s.handle}`}>{socialHandle}</span>
              </p>
              <SocialIcons />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
