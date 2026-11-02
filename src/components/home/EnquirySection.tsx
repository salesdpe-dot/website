import Image from "next/image";
import { ComposeButton } from "@/components/ComposeButton";
import { Section } from "@/components/ds";
import { AskForCallButton, VisitBooker } from "@/components/VisitBooker";
import { elements } from "@/lib/elements";
import { homemakers } from "@/lib/site";
import s from "./EnquirySection.module.css";

/*
 * The visit section of the project page: Guna's invitation, then the same four-step booker as /contact (where,
 * when, who, then send it on WhatsApp or by email, with a calendar file for a visit), and beside it the call for
 * buyers abroad and the quieter ways to reach the sales team.
 */
export function EnquirySection() {
  const guna = homemakers[0];
  return (
    <Section id="enquire" tone="surface" labelledBy="enquire-title">
      <div className={s.intro}>
        <h2 id="enquire-title" className={`display ${s.title}`}>
          Book a site visit.
        </h2>
        <p className={s.line}>
          At the site in Gunjur, or over coffee at our office on Whitefield Main Road: choose where, then a day and a time.
          The sales team confirms it with you.
        </p>
        <p className={s.byline}>
          <Image src={guna.portrait} alt="" width={96} height={96} sizes="48px" className={s.face} />
          <span>
            {guna.name}
            <small>{guna.role}</small>
          </span>
        </p>
      </div>
      <div className={s.grid}>
        <div className={s.booker}>
          <VisitBooker />
        </div>
        <aside className={s.side} aria-label="Other ways to reach the sales team">
          <section className={s.abroad} aria-labelledby="abroad-title">
            <h3 id="abroad-title" className={`display ${s.sideTitle}`}>
              Buying from abroad?
            </h3>
            <p className={s.note}>
              Ask for a video call instead. Choose a morning, afternoon or evening in India time and add your own time zone; the
              sales team will confirm the time with you.
            </p>
            <AskForCallButton className="btn btn-dark">Ask for a video call</AskForCallButton>
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
        </aside>
      </div>
    </Section>
  );
}
