"use client";

import type { ReactNode } from "react";
import { ShareIcon } from "@/components/showroom/Icons";

/*
 * Sends a page (or one place on it, by its #hash) to someone else, usually the family's WhatsApp group: the
 * phone's own share sheet where there is one, otherwise WhatsApp with the words and the link ready to send.
 */
export function ShareButton({ text, hash, className = "text-link", children = "Send to family" }: { text: string; hash?: string; className?: string; children?: ReactNode }) {
  const share = async () => {
    const url = `${location.origin}${location.pathname}${hash ? `#${hash}` : ""}`;
    if (navigator.share) {
      // Closing the share sheet rejects; nothing to do then.
      await navigator.share({ text, url }).catch(() => {});
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className={className} onClick={share}>
      <ShareIcon />
      {children}
    </button>
  );
}
