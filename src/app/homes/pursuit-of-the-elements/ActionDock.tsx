"use client";

import { useEffect, useState } from "react";
import { ComposeButton } from "@/components/ComposeButton";
import { ChatIcon, PhoneIcon } from "@/components/showroom/Icons";
import { elements as e } from "@/lib/elements";
import s from "./ActionDock.module.css";

/*
 * On a phone, a slim bar along the foot of the screen with the three things a buyer does next: call sales,
 * write on WhatsApp, book a visit. It rises once the hero (which has its own buttons) has scrolled away, and goes
 * once the section with id `until` reaches the screen, since that section has the same buttons, and stays away
 * below it. It sits on top of the cookie bar while that is up (--consent-h), and under the Feedback tab.
 */
export function ActionDock({ until, book }: { until: string; book: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("page-title")?.closest("section");
    const end = document.getElementById(until);
    if (!hero || !end) return;
    let pastHero = false;
    let beforeEnd = true;
    const update = () => setShown(pastHero && beforeEnd);
    /* Past the hero: less than a tenth of it is left at the top of the screen. */
    const heroObs = new IntersectionObserver(
      ([en]) => {
        pastHero = !en.isIntersecting && en.boundingClientRect.top < 0;
        update();
      },
      { rootMargin: "-10% 0px 0px 0px" },
    );
    /*
     * Before the end: its top is still below the foot of the screen. The watched area reaches far up above the
     * screen, so the section counts as reached from the moment its top comes up from below until you scroll back
     * above it, and a jump from the footer to mid-page still brings the bar back.
     */
    const endObs = new IntersectionObserver(
      ([en]) => {
        beforeEnd = !en.isIntersecting;
        update();
      },
      { rootMargin: "10000% 0px 0px 0px" },
    );
    heroObs.observe(hero);
    endObs.observe(end);
    return () => {
      heroObs.disconnect();
      endObs.disconnect();
    };
  }, [until]);

  return (
    <div className={s.dock} data-show={shown} aria-hidden={!shown || undefined} inert={!shown || undefined}>
      <nav className={s.row} aria-label="Call, message or book a visit">
        <a href={e.phone.href} className={s.action}>
          <PhoneIcon className={s.icon} />
          Call
          <span className="sr-only"> sales on {e.phone.display}</span>
        </a>
        <ComposeButton channel="whatsapp" topic={e.name} className={s.action}>
          <ChatIcon className={s.icon} />
          WhatsApp
        </ComposeButton>
        <a href={book} className={`btn btn-primary ${s.book}`}>
          Book a visit
        </a>
      </nav>
    </div>
  );
}
