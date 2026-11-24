"use client";

import { type ReactNode, useRef, useState } from "react";
import type { Img } from "@/lib/content";
import { CloseIcon } from "@/components/showroom/Icons";
import { filmSources, filmsPaused } from "@/lib/film";
import s from "./WatchFilm.module.css";

/*
 * One of the client's edited films with sound: "<src>-1080" and "<src>-720", each in AV1 and H.264, and its poster.
 * `start` is where it opens (the walkthroughs skip their white title card); `upright` is a 9:16 film, which the
 * player fits by its height; `filmed` is footage of real people and places, so it carries no "Artist's impression".
 */
export type Short = { src: string; poster: Img; title: string; start?: number; upright?: boolean; filmed?: boolean };

/*
 * A button (any shape: a word, a card) that opens one of the client's films with its music, in a full-screen
 * player with the browser's own controls. Nothing is fetched until it is opened; closing it stops the film and
 * returns focus to the button. The silent loops on the page hold still while it plays, and resume after.
 */
export function WatchFilm({ short, className, children }: { short: Short; className?: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [cut, setCut] = useState<string>();
  const loopsWerePaused = useRef(false);

  const open = () => {
    const wide = window.matchMedia("(min-width: 1024px) and (min-resolution: 1.5dppx), (min-width: 1600px)").matches;
    setCut(`${short.src}-${wide ? "1080" : "720"}`);
    loopsWerePaused.current = filmsPaused.get();
    filmsPaused.set(true);
    dialog.current?.showModal();
  };

  return (
    <>
      <button
        ref={opener}
        type="button"
        className={className}
        onClick={open}
        aria-haspopup="dialog"
        onFocus={(e) => {
          /* In a row that scrolls sideways (the reviews), a card reached with the keyboard comes fully into view. */
          if (e.currentTarget.matches(":focus-visible")) e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" });
        }}
      >
        {children}
      </button>
      <dialog
        ref={dialog}
        className={s.player}
        data-upright={short.upright || undefined}
        aria-label={short.title}
        onClose={() => {
          setCut(undefined);
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
          {/* No <track>: the review films carry their captions in the picture, and the walkthroughs are music only. An
              empty track only added a captions menu that did nothing. */}
          {cut && (
            <video className={s.video} poster={short.poster.src} controls autoPlay playsInline preload="auto">
              {/* A walkthrough opens on 2.5 s of a white "Disha Habitat presents" card; it starts just after it, on the first picture. */}
              {filmSources(cut, true).map((f) => (
                <source key={f.src} src={`${f.src}#t=${short.start ?? 2.8}`} type={f.type} />
              ))}
            </video>
          )}
          {!short.filmed && <p className={s.note}>Artist’s impression</p>}
        </div>
      </dialog>
    </>
  );
}
