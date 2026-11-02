"use client";

import { type ReactNode, useRef, useState } from "react";
import type { Img } from "@/lib/content";
import { CloseIcon } from "@/components/showroom/Icons";
import { filmsPaused } from "@/lib/film";
import s from "./WatchFilm.module.css";

/* One of the client's edited films with music: "<src>-1080.mp4" and "<src>-720.mp4", and its poster. */
export type Short = { src: string; poster: Img; title: string };

/*
 * A button (any shape: a word, a card) that opens one of the client's films with its music, in a full-screen
 * player with the browser's own controls. Nothing is fetched until it is opened; closing it stops the film and
 * returns focus to the button. The silent loops on the page hold still while it plays, and resume after.
 */
export function WatchFilm({ short, className, children }: { short: Short; className?: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [src, setSrc] = useState<string>();
  const loopsWerePaused = useRef(false);

  const open = () => {
    const wide = window.matchMedia("(min-width: 1024px) and (min-resolution: 1.5dppx), (min-width: 1600px)").matches;
    // Each film opens on 2.5 s of a white "Disha Habitat presents" card; start just after it, on the first picture.
    setSrc(`${short.src}-${wide ? "1080" : "720"}.mp4#t=2.8`);
    loopsWerePaused.current = filmsPaused.get();
    filmsPaused.set(true);
    dialog.current?.showModal();
  };

  return (
    <>
      <button ref={opener} type="button" className={className} onClick={open}>
        {children}
      </button>
      <dialog
        ref={dialog}
        className={s.player}
        aria-label={short.title}
        onClose={() => {
          setSrc(undefined);
          filmsPaused.set(loopsWerePaused.current);
          opener.current?.focus();
        }}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className={s.frame}>
          <div className={s.bar}>
            <p className={s.title}>{short.title}</p>
            <button type="button" className={s.close} onClick={() => dialog.current?.close()} aria-label="Close the film" autoFocus>
              <CloseIcon />
            </button>
          </div>
          {src && (
            <video className={s.video} src={src} poster={short.poster.src} controls autoPlay playsInline preload="auto">
              <track kind="captions" />
            </video>
          )}
          <p className={s.note}>Artist’s impression</p>
        </div>
      </dialog>
    </>
  );
}
