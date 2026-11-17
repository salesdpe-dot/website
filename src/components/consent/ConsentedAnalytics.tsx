"use client";

import { Analytics } from "@vercel/analytics/next";
import { useSyncExternalStore } from "react";
import { hasConsent, onConsentChange } from "@/lib/consent";

const allowed = () => hasConsent("analytics");
const never = () => false;

/*
 * Vercel Web Analytics: page views per page (which newsletter issues are read, which pages lead to a visit), with
 * no cookies and nothing that names a visitor. It still loads only once the visitor has accepted analytics in the
 * cookie notice, and stops if they turn it off. Counts appear on the project's Analytics tab in Vercel.
 */
export function ConsentedAnalytics() {
  const on = useSyncExternalStore(onConsentChange, allowed, never);
  return on ? <Analytics /> : null;
}
