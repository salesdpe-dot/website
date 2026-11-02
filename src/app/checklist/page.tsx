import type { Metadata } from "next";
import { Accordion, Breadcrumbs, CtaBand, PageIntro, Section } from "@/components/ds";
import { ChecklistTool } from "@/components/ChecklistTool";
import { checklist } from "@/lib/checklist";
import { links } from "@/lib/content";
import { elements } from "@/lib/elements";
import { pageMeta } from "@/lib/launch";
import s from "./page.module.css";

export const metadata: Metadata = pageMeta({
  title: "The checklist: five things to check before you buy",
  description: "Khata certificate, occupancy certificate, carpet area, deviation assessment and sewage treatment plants: what each is and what to ask.",
  path: "/checklist",
});

/* Plain definitions of the terms buyers meet most often. */
const words = [
  ["BHK", "Bedroom, hall, kitchen. A 3 BHK home has three bedrooms, a living room and a kitchen."],
  ["RERA", "The Real Estate (Regulation and Development) Act, 2016. A project must be registered with the state’s RERA authority before it is sold, and the registration records its promised completion date."],
  ["Carpet area", "The usable floor area inside a home’s walls. Under RERA, a developer must state each home’s carpet area."],
  ["Super built-up area", "Carpet area plus the walls, balconies and a share of the common areas such as lobbies and the clubhouse."],
  ["OC", "Occupancy certificate: issued by the local authority when a building is complete and fit to live in."],
  ["Khata", "A property’s entry in the city’s tax register. It is not proof of ownership on its own."],
  ["EMI", "Equated monthly instalment: the fixed monthly payment on a home loan, covering interest and part of the loan."],
  ["STP", "Sewage treatment plant: it treats a community’s waste water on site so the water can be reused."],
] as const;

export default function ChecklistPage() {
  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Checklist" }]} />}
        title="Five things to check before you buy."
        line="What each one is, and what to ask about it before you sign."
      />
      <Section label="The must-knows" space="tight">
        <ChecklistTool items={checklist} />
        {/* The words buyers meet, BHK to STP, one tap away under the list. */}
        <div className={s.words}>
          <Accordion
            defaultOpen={null}
            items={[
              {
                id: "words",
                title: "Words you’ll hear: BHK to STP",
                body: (
                  <dl className={s.glossary}>
                    {words.map(([term, meaning]) => (
                      <div key={term}>
                        <dt>{term}</dt>
                        <dd>{meaning}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              },
            ]}
          />
        </div>
      </Section>
      <CtaBand
        title="Ask us about any document."
        line="Our team will explain the khata, the OC or the RERA registration for any Disha home, as plainly as you need."
        actions={[
          { label: "Book a visit", href: links.bookVisit },
          { label: "Call sales", href: elements.phone.href },
        ]}
      />
    </>
  );
}
