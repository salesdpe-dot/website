import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsLink } from "@/components/consent/ConsentBanner";
import { Accordion, Breadcrumbs, PageIntro, Section } from "@/components/ds";
import { pageMeta } from "@/lib/launch";
import { company } from "@/lib/site";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "Privacy",
  description: "What this website does and does not do with your information.",
  path: "/privacy",
});

/*
 * A plain statement of what this website actually does with information. It describes the site as built: the
 * short version first, then each part in full behind its own row (a link to /privacy#messages opens that row).
 */
export default function PrivacyPage() {
  const email = <a href={`mailto:${company.email}`}>{company.email}</a>;
  const sections = [
    {
      id: "cookies",
      title: "Cookies and analytics",
      body: (
        <p>
          This website runs no analytics and no advertising or tracking tools. If we ever add one, it will stay switched off until you accept it
          in the notice at the bottom of the page. Your choice is saved in your browser, and you can change it at any time.{" "}
          <CookieSettingsLink className="text-link" />
        </p>
      ),
    },
    {
      id: "browser",
      title: "What is saved in your browser",
      body: (
        <>
          <p>The site saves two small items on your device only. Neither is a tracking cookie, and neither is sent to us.</p>
          <ul>
            <li>
              <code>disha-consent</code>: your cookie choice and the date you made it.
            </li>
            <li>
              <code>disha-checklist-v1</code>: the points you have ticked on the homebuyer’s checklist, so you can come back to it. “Start over”
              clears it, as does clearing your browser’s site data.
            </li>
          </ul>
          <p>
            If you leave a note with the Feedback tab on the right edge of the page, the site also saves a random number (
            <code>disha-visitor</code>) so that notes from the same browser can be read together. It is sent only with your notes.
          </p>
        </>
      ),
    },
    {
      id: "messages",
      title: "When you send us a message",
      body: (
        <p>
          The site visit booker and the message form open WhatsApp or your email app with the message ready, and you choose whether to send
          it. When you press a Send button (or the sales number in the booker), we also keep what you entered: your name, number,
          email if you gave one, what you asked about, the date and time you chose, the page you sent it from, the page that linked you there and
          your browser type. We keep it on our website’s servers so that we can reply
          even if your message does not reach us. We use it only to reply to you about your enquiry or site visit, and we do not sell it or give it
          to anyone else. A message you send on WhatsApp or by email reaches Disha Habitat like any other message, and WhatsApp and your email
          provider handle it under their own policies.
        </p>
      ),
    },
    {
      id: "feedback",
      title: "Feedback notes",
      body: (
        <p>
          When you send a note with the Feedback tab, we keep what you wrote, your name and email if you gave them, the page and the part of
          it the note is about, your screen size, the kind of device, your browser type and language, and that random number, so that the
          people working on the site can see what each note refers to.
        </p>
      ),
    },
    {
      id: "host",
      title: "Our website host",
      body: (
        <p>
          Like any website, ours is served by a hosting company, whose servers log every request (such as your IP address, the pages asked for
          and your browser type) to run the site and keep it secure. When you send a request, your IP address is also used for a short while,
          in memory only, to stop the same connection sending too many; it is not stored with your request. The fonts, photographs and the map
          of our communities are served from this site itself (the map is drawn from OpenStreetMap data), so opening a page contacts no other
          company.
        </p>
      ),
    },
    {
      id: "calculators",
      title: "Calculators",
      body: (
        <p>
          The EMI calculator and the affordability tool work out their figures on your device. What you enter there is never sent anywhere. The
          commute checker only opens Google Maps, with the place you typed, when you press its button.
        </p>
      ),
    },
    {
      id: "links",
      title: "Maps and links",
      body: (
        <p>
          Other services are contacted only when you tap a link to them: Google Maps (directions and the commute checker), WhatsApp, your email
          app, Instagram, Facebook, LinkedIn, YouTube, MyGate, the Pursuit of the Elements project website and the Karnataka RERA website. They open in a new tab or app and have their own
          privacy policies. Nothing from them loads on this site until you follow the link.
        </p>
      ),
    },
    {
      id: "rights",
      title: "Your rights",
      body: (
        <p>
          To see, correct or delete what we hold about you, write to {email} or see our <Link href="/contact">contact page</Link>.
        </p>
      ),
    },
  ].map(({ id, title, body }) => ({ id, title, body: <div className={s.body}>{body}</div> }));

  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />}
        title="Privacy"
        line="What this website does, and does not do, with your information."
        size="large"
      />
      {/* On a computer the short version on the left, each part in full on the right; one under the other on a phone. */}
      <Section space="tight" split>
        <div>
          <p className={s.updated}>Last updated 27 October 2026.</p>
          <h2 className={`display ${s.h2}`}>In short</h2>
          <ul className={s.short}>
            <li>No analytics and no advertising or tracking tools. If we ever add one, it stays switched off until you accept it.</li>
            <li>
              Two small items are saved in your browser, and neither is sent to us. If you leave a feedback note, a random number is saved too,
              and sent only with your notes.
            </li>
            <li>
              When you press a Send button in the booker or the message form (or the sales number in the booker), we keep what you entered, so that we
              can reply about your enquiry or site visit. We do not sell it or give it to anyone else.
            </li>
            <li>The calculators work on your device. Other services are contacted only when you tap a link to them.</li>
            <li>To see, correct or delete what we hold about you, write to {email}.</li>
          </ul>
        </div>
        <div>
          <h2 className={`display ${s.h2} ${s.full}`}>In full</h2>
          <Accordion items={sections} defaultOpen={null} />
        </div>
      </Section>
    </>
  );
}
