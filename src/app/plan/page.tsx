import type { Metadata } from "next";
import { Accordion, Breadcrumbs, PageIntro, Section, SectionHead } from "@/components/ds";
import { AffordabilityExplorer } from "@/components/AffordabilityExplorer";
import { pageMeta } from "@/lib/launch";

export const metadata: Metadata = pageMeta({
  title: "EMI calculator",
  description: "Work out a monthly home-loan EMI, the total interest and the total repayment from a price, down payment, rate and tenure.",
  path: "/plan",
});

const notes = [
  {
    title: "How the EMI is calculated",
    body: "We use the standard reducing-balance formula: EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1), where P is the loan amount, r the monthly interest rate and n the number of monthly payments. At 0% interest, the EMI is simply P ÷ n.",
  },
  {
    title: "What it doesn’t include",
    body: "GST, processing fees, insurance, stamp duty, registration, maintenance deposits and changes in floating rates are not included. Banks usually lend at most 75 to 90% of a home’s value, depending on the loan size. Lenders may round or schedule payments differently.",
  },
  {
    title: "What it is not",
    body: "This is an illustrative planning tool, not an offer of finance, a loan approval or an eligibility check by Disha Habitat or any lender. Speak to your bank for an actual quote.",
  },
];

export default function PlanPage() {
  return (
    <>
      <PageIntro
        above={<Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "EMI calculator" }]} />}
        title="Work out your EMI."
        line="Home price, down payment, interest rate and tenure. The monthly EMI, the total interest and the total repayment change as you type."
      />
      <Section label="EMI calculator" space="tight">
        <AffordabilityExplorer />
      </Section>
      <Section tone="surface" split labelledBy="notes-title">
        <SectionHead id="notes-title" size="large" title="How the figure is worked out" />
        <Accordion items={notes} defaultOpen={null} />
      </Section>
    </>
  );
}
