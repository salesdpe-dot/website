import { ComposeButton } from "@/components/ComposeButton";
import { Section } from "@/components/ds";
import { AskForCallButton, VisitBooker } from "@/components/VisitBooker";
import { elements } from "@/lib/elements";
import s from "./EnquirySection.module.css";

/*
 * The visit section of the project page: one line, then the same four-step booker as /contact (where,
 * when, who, then send it on WhatsApp or by email, with a calendar file for a visit), and beside it the call for
 * buyers abroad and the quieter ways to reach the sales team. Kept to about a screen: the heading beside its line
 * on a computer, and the booker in its compact form.
 */
export function EnquirySection() {
  return (
    <Section id="enquire" tone="surface" space="tight" labelledBy="enquire-title">
      <div className={s.intro}>
        <h2 id="enquire-title" className={`display ${s.title}`}>
          Book a site visit.
        </h2>
        <div className={s.introText}>
          <p className={s.line}>
            See the towers, the villas and the master plan at the site in Gunjur: choose a day and a time, and the sales team
            confirms it with you.
          </p>
        </div>
      </div>
      <div className={s.grid}>
        <div className={s.booker}>
          <VisitBooker compact />
        </div>
        <div role="group" className={s.side} aria-label="Other ways to reach the sales team">
          <section className={s.abroad} aria-labelledby="abroad-title">
            <h3 id="abroad-title" className={`display ${s.sideTitle}`}>
              Buying from abroad?
            </h3>
            <p className={s.note}>
              Start with a video call instead. Choose a morning, afternoon or evening in India time and add your own time zone; the
              sales team will confirm the time with you.
            </p>
            <AskForCallButton className="btn btn-dark">Start with a video call</AskForCallButton>
          </section>
          <ul className={s.reach}>
            <li>
              <span className={s.label}>Rather write?</span>
              <ComposeButton channel="whatsapp" topic={elements.name} className={s.value}>
                Message us on WhatsApp
              </ComposeButton>
            </li>
            <li>
              <span className={s.label}>Call sales</span>
              <a href={elements.phone.href} className={s.value}>
                {elements.phone.display}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
