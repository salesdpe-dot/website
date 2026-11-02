"use client";

import { type ReactNode, useId, useRef, useState } from "react";
import { CloseIcon } from "@/components/showroom/Icons";
import s from "./MoreDialog.module.css";

/*
 * A button that opens the rest of a section full screen: its heading and line at the top, then whatever it holds
 * (every room, every zone). Nothing inside is laid out or fetched until it opens. Escape or the close button shuts
 * it, and focus returns to the button.
 */
export function MoreDialog({ label, title, line, className = "btn btn-primary", children }: { label: ReactNode; title: string; line?: string; className?: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <button
        ref={opener}
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        {label}
      </button>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby={`${id}-title`}
        data-tone="dark"
        onClose={() => {
          setOpen(false);
          opener.current?.focus();
        }}
      >
        <div className={s.bar}>
          <div className={s.head}>
            <h2 id={`${id}-title`} className={`display ${s.title}`}>
              {title}
            </h2>
            {line && <p className={s.line}>{line}</p>}
          </div>
          <button type="button" className={s.close} onClick={() => dialog.current?.close()} aria-label="Close" autoFocus>
            <CloseIcon />
          </button>
        </div>
        <div className={s.body}>{open && children}</div>
      </dialog>
    </>
  );
}
