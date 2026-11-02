/*
 * Silent films across the site: which encoding suits the screen, whether one may start by itself, and the
 * visitor's one switch that pauses them all. Every film is encoded several ways from the client's renders
 * (scripts/encode-films.sh): a 1920 and a 1280 wide cut, a 540 × 960 portrait cut for phones held upright,
 * and a 640 × 800 cut for the amenity cards. A film is named by its path without the ending, e.g.
 * "/media/elements/hero-towers", and lists the cuts it has.
 */
export type Rendition = "1080" | "720" | "p" | "card";
export type Film = { src: string; renditions: readonly Rendition[] };

type Connection = { saveData?: boolean; effectiveType?: string };
const connection = () => (navigator as Navigator & { connection?: Connection }).connection;

/* Whether a silent film may start by itself: not with data saver on or on a slow connection. Reduced
 * motion is checked where the film is shown (useMedia), so it follows the visitor's setting live. */
export function filmMayAutoplay() {
  const c = connection();
  return !(c?.saveData || /^(slow-2g|2g|3g)$/.test(c?.effectiveType ?? ""));
}

/* The cut for a frame of this size: the portrait cut for an upright frame on a phone, the full-HD cut only for a
 * big frame on a fast connection, and the 1280 cut otherwise. The portrait cut stops at 768 px, where the stills
 * switch from their phone framing to the wide one, so a film always lines up with the still it replaces. */
export function filmUrl(film: Film, frame: { width: number; height: number }) {
  const has = (r: Rendition) => film.renditions.includes(r);
  const px = frame.width * Math.min(window.devicePixelRatio || 1, 2);
  const fast = (connection()?.effectiveType ?? "4g") === "4g";
  const phone = window.matchMedia("(max-width: 767px)").matches;
  const pick: Rendition =
    has("p") && phone && frame.height > frame.width * 1.05
      ? "p"
      : has("1080") && px > 1440 && fast
        ? "1080"
        : has("720")
          ? "720"
          : (film.renditions[0] ?? "720");
  return `${film.src}-${pick}.mp4`;
}

/*
 * One switch for every film on the site (WCAG 2.2.2): pausing any film pauses them all, for the rest of
 * the visit. Kept in sessionStorage, which can be missing or blocked, so it also lives in memory.
 */
const KEY = "disha-films-paused";
let paused: boolean | null = null;
const listeners = new Set<() => void>();

export const filmsPaused = {
  get() {
    if (paused === null) {
      try {
        paused = sessionStorage.getItem(KEY) === "1";
      } catch {
        paused = false;
      }
    }
    return paused;
  },
  set(value: boolean) {
    paused = value;
    try {
      sessionStorage.setItem(KEY, value ? "1" : "0");
    } catch {}
    listeners.forEach((l) => l());
  },
  subscribe(onChange: () => void) {
    listeners.add(onChange);
    return () => listeners.delete(onChange);
  },
};

/* The window's load event, for useSyncExternalStore: films wait until the page has finished loading. */
export const onPageLoad = (onChange: () => void) => {
  window.addEventListener("load", onChange);
  return () => window.removeEventListener("load", onChange);
};
export const pageLoaded = () => document.readyState === "complete";
