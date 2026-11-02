"use client";

import Image from "next/image";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { LoopFilm } from "@/components/media/LoopFilm";
import { fiveElements } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import s from "./ElementsSwitcher.module.css";

const tabs = fiveElements.tabs;
const n = tabs.length;

/*
 * The five elements as five tabs across the foot of a full screen, each showing the place on the 20 acres that
 * stands for it. While the section is on screen the tabs advance by themselves, a sky-blue line filling under
 * the one on show; pointing at the section or working in it holds it, and choosing a tab stops it for good.
 * Arrow keys, Home and End move between the tabs. Without motion nothing advances.
 */
export function ElementsSwitcher() {
  const root = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [reach, setReach] = useState(1);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const motionOk = useMedia(MOTION_OK);
  const running = motionOk && auto && inView && !hold;
  const tab = tabs[index] ?? tabs[0];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const next = (i + n) % n;
    setIndex(next);
    /* The picture after the one on show is fetched too, so the next change is instant. */
    setReach((r) => Math.max(r, Math.min(n - 1, next + 1)));
  };

  const choose = (i: number, focus = false) => {
    setAuto(false);
    go(i);
    if (focus) buttons.current[(i + n) % n]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const to = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    choose(to, true);
  };

  return (
    <section
      ref={root}
      id="five-elements"
      className={s.section}
      data-tone="dark"
      aria-labelledby="elements-title"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false);
      }}
    >
      <div className={s.stage} aria-hidden="true">
        {tabs.map((t, i) =>
          i <= reach || i === index ? (
            <div key={t.name} className={s.layer} data-active={i === index || undefined}>
              {t.film ? (
                <LoopFilm film={t.film} poster={{ ...t.image, alt: "" }} sizes="100vw" play={i === index && inView} />
              ) : (
                <Image className={s.media} src={t.image.src} alt="" fill sizes="100vw" quality={75} style={focusPoint(t.image)} />
              )}
            </div>
          ) : null,
        )}
      </div>
      <div className={s.shade} aria-hidden="true" />

      <div className={`${s.head} reveal`}>
        <h2 id="elements-title" className={`display ${s.title}`}>
          {fiveElements.title}
        </h2>
        <p className={s.line}>{fiveElements.line}</p>
      </div>

      <div className={s.foot}>
        <div className={s.panel} role="tabpanel" id="element-panel" aria-labelledby={`element-tab-${index}`}>
          <p key={tab.name} className={s.caption}>
            <span className={s.place}>{tab.place}</span>
            <span className={s.what}>{tab.line}</span>
            <span className="sr-only"> {tab.image.alt}</span>
          </p>
        </div>
        <div className={s.tabs} role="tablist" aria-label="The five elements">
          {tabs.map((t, i) => (
            <button
              key={t.name}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              id={`element-tab-${i}`}
              type="button"
              role="tab"
              className={s.tab}
              aria-selected={i === index}
              aria-controls="element-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => choose(i)}
              onKeyDown={onKey}
            >
              <span className={s.track} aria-hidden="true">
                <span
                  className={s.fill}
                  data-run={(i === index && motionOk && auto) || undefined}
                  style={{ animationPlayState: running ? "running" : "paused" }}
                  onAnimationEnd={() => i === index && go(i + 1)}
                />
              </span>
              {t.name}
            </button>
          ))}
        </div>
      </div>
      <p className={s.note}>Artist’s impression</p>
    </section>
  );
}
