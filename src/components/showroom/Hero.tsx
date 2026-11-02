"use client";

import Image from "next/image";
import Link from "next/link";
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { ComposeButton } from "@/components/ComposeButton";
import { LoopFilm } from "@/components/media/LoopFilm";
import { type Slide, trust } from "@/lib/content";
import { focusPoint } from "@/lib/focus";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import { ChevronLeft, ChevronRight, PauseIcon, PlayIcon } from "./Icons";
import s from "./Hero.module.css";

/*
 * tesla.com's hero changes every ten seconds; so does this one, unless motion is reduced or paused. A slide with a
 * film stays until its film ends. On a computer the slide marks carry a word each: Towers, Clubhouse, and so on.
 */
const DELAY = 10_000;

export function Hero({ slides }: { slides: Slide[] }) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  /* The next slide loads a few seconds in, so it never competes with the first picture; later ones as they come up. */
  const [rest, setRest] = useState(false);
  const [reach, setReach] = useState(0);
  /* The slide whose film is playing now: it stays until the film ends. */
  const [filmFor, setFilmFor] = useState<string | null>(null);
  /* Halfway through a film, the next slide's film is fetched, so the two never compete for the connection. */
  const [aheadOf, setAheadOf] = useState<string | null>(null);
  const motionOk = useMedia(MOTION_OK);
  /* On a phone each slide's words fill the screen, so a slide stays until the visitor moves on: a change mid-read loses their place. */
  const roomy = useMedia("(min-width: 768px)");
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  /* Holds still while the visitor points at it, works inside it, or has scrolled past it. */
  const playing = motionOk && roomy && !paused && !hover && !focusWithin && onScreen;
  /* A film keeps playing (and loops) under the pointer; Pause, reduced motion or scrolling away stop it. */
  const run = motionOk && !paused && onScreen;
  /* A slide whose film is playing stays until the film ends. */
  const filming = filmFor === slides[index]?.id;
  const ahead = filming && aheadOf === filmFor;

  const show = useCallback((next: number) => {
    setIndex(next);
    setReach((r) => Math.max(r, next));
  }, []);

  useEffect(() => {
    if (!playing || filming) return;
    const t = window.setTimeout(() => show((index + 1) % n), DELAY);
    return () => window.clearTimeout(t);
  }, [playing, filming, index, n, show]);

  useEffect(() => {
    if (!filmFor) return;
    const t = window.setTimeout(() => setAheadOf(filmFor), DELAY / 2);
    return () => window.clearTimeout(t);
  }, [filmFor]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(!!e?.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Slides two and three are fetched a few seconds in, after the first screen has settled. */
  useEffect(() => {
    const t = window.setTimeout(() => setRest(true), 4000);
    return () => window.clearTimeout(t);
  }, []);

  const go = (i: number, focus = false) => {
    const next = (i + n) % n;
    setRest(true);
    show(next);
    if (focus) tabs.current[next]?.focus();
  };

  /* A slide's picture and film exist once it has been shown, or once it is next in line. */
  const mounted = (i: number) => i <= reach || i === index || (rest && i === (index + 1) % n);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const to = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    go(to, true);
  };

  return (
    <section
      ref={root}
      className={s.hero}
      data-tone="dark"
      data-moved={reach > 0 || undefined}
      aria-roledescription="carousel"
      aria-label="Featured"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <div className={s.slides} aria-live={playing ? "off" : "polite"}>
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              id={`hero-slide-${slide.id}`}
              className={s.slide}
              data-active={active || undefined}
              data-film={slide.film ? "" : undefined}
              role="tabpanel"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              aria-hidden={!active}
              inert={!active}
            >
              {mounted(i) && (
                <Image
                  className={s.media}
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  sizes="(orientation: portrait) 80vh, 100vw"
                  quality={i === 0 ? 75 : 78}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  style={focusPoint(slide.image)}
                />
              )}
              {slide.film && mounted(i) && (
                <LoopFilm
                  film={slide.film}
                  play={active && run}
                  rewind={!active}
                  prefetch={ahead && i === (index + 1) % n}
                  loop={!playing}
                  onPlaying={() => setFilmFor(slide.id)}
                  onPause={() => setFilmFor((f) => (f === slide.id ? null : f))}
                  onEnded={() => show((index + 1) % n)}
                />
              )}
              <div className={s.scrim} aria-hidden="true" />
              <div className={`photo-copy ${s.copy}`}>
                <p className={s.eyebrow}>{slide.eyebrow}</p>
                <h2 className={`display ${s.title}`}>{slide.title}</h2>
                <p className={s.line}>{slide.line}</p>
              </div>
              <div className={`photo-foot ${s.foot}`}>
                <div className={s.ctas}>
                  <Link className="btn btn-primary" href={slide.primary.href}>
                    {slide.primary.label}
                  </Link>
                  {"compose" in slide.secondary ? (
                    <ComposeButton channel="whatsapp" topic={slide.secondary.compose} className="btn btn-ghost">
                      {slide.secondary.label}
                      <span className="sr-only">: {slide.title}</span>
                    </ComposeButton>
                  ) : (
                    <Link className="btn btn-ghost" href={slide.secondary.href}>
                      {slide.secondary.label}
                      <span className="sr-only">: {slide.title}</span>
                    </Link>
                  )}
                </div>
                <p className={s.trust}>
                  <span className={s.fact}>{trust.record}</span>
                  <span className={s.dot} aria-hidden="true">
                    {" · "}
                  </span>
                  <span className={s.fact}>
                    {trust.rera}{" "}
                    <Link href={trust.verify}>
                      Verify<span className="sr-only"> the RERA registration</span>
                    </Link>
                  </span>
                </p>
                <p className={s.note}>{slide.note}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={s.controls}>
        <div className={s.tabs} role="tablist" aria-label="Choose a slide">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              className={s.tab}
              aria-selected={i === index}
              aria-controls={`hero-slide-${slide.id}`}
              aria-label={slide.title}
              tabIndex={i === index ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={onTabKey}
            >
              <span className={s.tabLabel} aria-hidden="true">
                {slide.tab}
              </span>
            </button>
          ))}
        </div>
        {motionOk && (
          <button
            type="button"
            className={s.pause}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}
      </div>

      <button type="button" className={`${s.arrow} ${s.prev}`} onClick={() => go(index - 1)} aria-label="Previous slide">
        <ChevronLeft />
      </button>
      <button type="button" className={`${s.arrow} ${s.next}`} onClick={() => go(index + 1)} aria-label="Next slide">
        <ChevronRight />
      </button>
    </section>
  );
}
