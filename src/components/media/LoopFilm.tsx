"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Img } from "@/lib/content";
import { type Film, filmMayAutoplay, filmsPaused, filmUrl, onPageLoad, pageLoaded } from "@/lib/film";
import { focusPoint } from "@/lib/focus";
import { MOTION_OK, useMedia } from "@/lib/useMedia";
import { PauseIcon, PlayIcon } from "@/components/showroom/Icons";
import s from "./LoopFilm.module.css";

type Props = {
  film: Film;
  /* The still under the film, shown until the film is actually playing (and instead of it, when it may not play). */
  poster?: Img;
  sizes?: string;
  /* Plays only while this is true (a hovered card, the slide on show); by default, while it is on screen. */
  play?: boolean;
  /* Fetches the film ahead of time without playing it, so the next slide or card starts at once. */
  prefetch?: boolean;
  loop?: boolean;
  /* Goes back to the start when it stops (a slide leaving the screen); by default, whenever `play` turns false. */
  rewind?: boolean;
  /* A small pause button over the film. Pausing it pauses every film on the site. A frame that lays a shade over
   * its film leaves this off and puts a FilmToggle above the shade instead, where it can be seen. */
  controls?: boolean;
  label?: string;
  className?: string;
  onPlaying?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
};

/*
 * A silent film over its still, filling its parent. Nothing is fetched until the page has finished loading
 * and the film is near the screen; it plays only while it is on screen (or while `play` says so), fades in
 * once it is really playing, and the cut is chosen for the frame it fills. Reduced motion, data saver, a
 * slow connection or the visitor's pause keep the still.
 */
export function LoopFilm({
  film,
  poster,
  sizes = "100vw",
  play,
  prefetch,
  loop = true,
  rewind,
  controls,
  label,
  className,
  onPlaying,
  onPause,
  onEnded,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [src, setSrc] = useState<string>();
  const [shown, setShown] = useState(false);
  const loaded = useSyncExternalStore(onPageLoad, pageLoaded, () => false);
  const stopped = useSyncExternalStore(filmsPaused.subscribe, filmsPaused.get, () => false);
  const motionOk = useMedia(MOTION_OK);
  const allowed = loaded && motionOk && !stopped;
  const wanted = allowed && (play ?? inView);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const nearBy = new IntersectionObserver(([e]) => setNear(!!e?.isIntersecting), { rootMargin: "50% 0px" });
    const onScreen = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.35 });
    nearBy.observe(el);
    onScreen.observe(el);
    return () => {
      nearBy.disconnect();
      onScreen.disconnect();
    };
  }, []);

  /* The cut is chosen once, from the frame's size when the film is first wanted. */
  useEffect(() => {
    const el = box.current;
    if (src || !el || !allowed || !near || !(wanted || prefetch) || !filmMayAutoplay()) return;
    const r = el.getBoundingClientRect();
    setSrc(filmUrl(film, { width: r.width, height: r.height }));
  }, [src, allowed, near, wanted, prefetch, film]);

  useEffect(() => {
    const v = video.current;
    if (!v || !src) return;
    if (wanted && near) {
      v.play().catch(() => {});
    } else {
      v.pause();
      if (rewind ?? (play === false && !prefetch)) v.currentTime = 0;
    }
  }, [src, wanted, near, play, prefetch, rewind]);

  /* A hidden tab plays nothing. */
  useEffect(() => {
    const onHide = () => document.hidden && video.current?.pause();
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  return (
    <div ref={box} className={`${s.box} ${className ?? ""}`}>
      {poster && (
        <Image
          className={s.still}
          src={poster.src}
          alt={poster.alt}
          fill
          sizes={sizes}
          quality={78}
          style={focusPoint(poster)}
        />
      )}
      {src && (
        <video
          ref={video}
          className={s.video}
          style={poster ? focusPoint(poster) : undefined}
          data-shown={shown || undefined}
          data-cut={src.endsWith("-p.mp4") ? "portrait" : undefined}
          src={src}
          muted
          loop={loop}
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => {
            setShown(true);
            onPlaying?.();
          }}
          onPause={onPause}
          onEnded={onEnded}
        />
      )}
      {controls && <FilmToggle label={label} />}
    </div>
  );
}

const never = () => () => {};

/*
 * The pause button for every film on the site. It is shown only where a film can actually play: not under
 * reduced motion, data saver or a slow connection, where the stills stay.
 */
export function FilmToggle({ label = "the films", className }: { label?: string; className?: string }) {
  const stopped = useSyncExternalStore(filmsPaused.subscribe, filmsPaused.get, () => false);
  const canPlay = useSyncExternalStore(never, filmMayAutoplay, () => false);
  const motionOk = useMedia(MOTION_OK);
  if (!motionOk || !canPlay) return null;
  return (
    <button
      type="button"
      className={`${s.toggle} ${className ?? ""}`}
      onClick={() => filmsPaused.set(!stopped)}
      aria-label={`${stopped ? "Play" : "Pause"} ${label}`}
    >
      {stopped ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
}
