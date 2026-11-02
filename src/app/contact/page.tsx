import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ComposeButton } from "@/components/ComposeButton";
import { Breadcrumbs, PageIntro, Section, SectionHead } from "@/components/ds";
import { SocialCards } from "@/components/Socials";
import { VisitBooker } from "@/components/VisitBooker";
import { elements } from "@/lib/elements";
import { focusPoint } from "@/lib/focus";
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

      <Section space="tight" label="Ways to reach us">
        <ul className={`${s.reach} reveal-stagger`}>
          <li className={s.lead}>
            <p className={s.label}>Sales, {elements.shortName}</p>
            <a href={elements.phone.href} className={`display ${s.value}`}>
              {elements.phone.display}
            </a>
            <p className={s.note}>Calls and WhatsApp, for visits, floor plans and new enquiries</p>
          </li>
          <li>
            <p className={s.label}>WhatsApp</p>
            <ComposeButton channel="whatsapp" className={`display ${s.value}`}>
              Message us
            </ComposeButton>
            <p className={s.note}>Opens WhatsApp with your message ready to send</p>
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
            <p className={s.note}>Opens your email app with your message ready</p>
          </li>
        </ul>
      </Section>

      <Section tone="surface" labelledBy="book-title">
        <div className="reveal">
          <SectionHead
            id="book-title"
            size="large"
            title="Book a site visit."
            line="Four steps. The request goes from your own WhatsApp or email, and the sales team confirms the time with you."
          />
        </div>
        <div className={s.layout}>
          <div id="book" className={s.booker}>
            <VisitBooker />
          </div>
          <aside className={s.places} aria-labelledby="find-title">
            <h3 id="find-title" className={s.placesTitle}>
              Where to find us
            </h3>
            <article>
              <Link href={elements.href} className={s.placeMedia} tabIndex={-1} aria-hidden="true">
                <Image
                  src={elements.cover.src}
                  alt=""
                  fill
                  sizes="(min-width: 1100px) 22rem, 100vw"
                  quality={75}
                  style={focusPoint(elements.cover)}
                />
                <span className={s.placeNote}>Artist’s impression</span>
              </Link>
              <p className={s.label}>Sales site, now selling</p>
              <h4 className={`display ${s.place}`}>
                <Link href={elements.href}>{elements.shortName}</Link>
              </h4>
              <p className={s.note}>{elements.locality}</p>
              <a href={siteDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                Get directions<span className="sr-only"> to {elements.shortName} (opens in a new tab)</span>
              </a>
            </article>
            <article>
              <p className={s.label}>Corporate office</p>
              <h4 className={`display ${s.place}`}>{company.legalName}</h4>
              <address className={s.note}>{company.office.lines.join(", ")}</address>
              <a href={officeDirections} target="_blank" rel="noopener noreferrer" className="text-link">
                Get directions<span className="sr-only"> to the office (opens in a new tab)</span>
              </a>
            </article>
            <Link href="/homes" className="text-link">
              All communities
            </Link>
          </aside>
        </div>
      </Section>

      <Section labelledBy="follow-title">
        <div className="reveal">
          <SectionHead id="follow-title" size="large" title={socialHandle} line="Instagram, Facebook, LinkedIn and YouTube." />
        </div>
        <SocialCards />
      </Section>
    </>
  );
}
