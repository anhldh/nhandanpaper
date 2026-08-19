import gsap from "gsap";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { PAPER_TONES, type Lang } from "./data";
import type { SmootherRef } from "./SmoothScroll";

const LANG_KEY = "hcm-journey-lang";

/** Language, seeded from the prop and then persisted per visitor. */
export function useLang(initial: Lang): [Lang, (next: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "vi" || saved === "en") return saved;
    } catch {
      /* storage unavailable */
    }
    return initial;
  });

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* storage unavailable */
    }
    setLangState(next);
  }, []);

  return [lang, setLang];
}

/** Paints the chosen paper tone onto the `--paper` custom property. */
export function usePaperTone(tone: string) {
  useEffect(() => {
    const color = PAPER_TONES[tone] ?? PAPER_TONES["Kem nhạt"];
    document.documentElement.style.setProperty("--paper", color);
  }, [tone]);
}

/** The journey rail is dropped below this width. */
export function useNarrow(breakpoint = 1180) {
  const query = `(max-width: ${breakpoint - 1}px)`;
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const sync = () => setNarrow(mql.matches);
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, [query]);

  return narrow;
}

export function useEscape(handler: () => void, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler, active]);
}

type ScrollOptions = {
  rootRef: RefObject<HTMLDivElement | null>;
  progressRef: RefObject<HTMLDivElement | null>;
  motion: boolean;
  parallaxAmount: number;
};

/**
 * Drives the reading-progress bar, the active-chapter index and the parallax
 * plates from a single frame, ticked by GSAP.
 *
 * It runs off `gsap.ticker` rather than scroll events because ScrollSmoother
 * animates a transform on the content instead of scrolling it — the frame has
 * to follow the smoothed position, not the raw one. The frame early-outs when
 * the root has not moved, so an idle page costs one rect read per tick.
 *
 * All geometry is read from the root element's viewport rect rather than a
 * scrollTop, so the page also behaves when it is mounted inside a host scroll
 * container — as in the original document.
 */
export function useJourneyScroll({ rootRef, progressRef, motion, parallaxAmount }: ScrollOptions) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let lastTop: number | null = null;
    let dirty = true;

    const frame = () => {
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = rect.height - vh;

      const bar = progressRef.current;
      if (bar) {
        const pct = span > 0 ? Math.max(0, Math.min(100, (-rect.top / span) * 100)) : 0;
        bar.style.width = `${pct}%`;
      }

      const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter]"));
      let next = -1;
      sections.forEach((section, i) => {
        const r = section.getBoundingClientRect();
        if (r.top < vh * 0.45 && r.bottom > vh * 0.3) next = i;
      });
      setActive((prev) => (prev === next ? prev : next));

      if (!motion) return;
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const host = el.closest<HTMLElement>("[data-chapter]") ?? el.parentElement;
        if (!host) return;
        const r = host.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, 0.5 - (r.top + r.height / 2) / vh));
        el.style.transform = `translate3d(0,${(p * parallaxAmount).toFixed(1)}px,0) scale(${(
          1.06 +
          Math.abs(p) * 0.03
        ).toFixed(3)})`;
      });
    };

    const tick = () => {
      const top = Math.round(root.getBoundingClientRect().top);
      if (top === lastTop && !dirty) return;
      lastTop = top;
      dirty = false;
      frame();
    };

    const invalidate = () => {
      dirty = true;
    };

    frame();
    gsap.ticker.add(tick);
    window.addEventListener("resize", invalidate);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", invalidate);
    };
  }, [rootRef, progressRef, motion, parallaxAmount]);

  return active;
}

/** Nearest scrollable ancestor of the root, falling back to the window. */
function scrollerFor(root: HTMLElement): HTMLElement | Window {
  let el: HTMLElement | null = root;
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    if (/(auto|scroll|overlay)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 4) return el;
    el = el.parentElement;
  }
  const se = (document.scrollingElement ?? document.documentElement) as HTMLElement;
  return se.scrollHeight > se.clientHeight + 4 ? se : window;
}

const HEADER_HEIGHT = 58;

export function useGoToChapter(rootRef: RefObject<HTMLDivElement | null>, smootherRef: SmootherRef) {
  return useCallback(
    (index: number) => {
      const root = rootRef.current;
      if (!root) return;
      const target = root.querySelectorAll<HTMLElement>("[data-chapter]")[index];
      if (!target) return;

      const smoother = smootherRef.current;
      if (smoother) {
        smoother.scrollTo(target, true, `top ${HEADER_HEIGHT}px`);
        return;
      }

      const scroller = scrollerFor(root);
      const delta = target.getBoundingClientRect().top - HEADER_HEIGHT;
      if (scroller === window) {
        window.scrollTo({ top: window.scrollY + delta, behavior: "smooth" });
      } else {
        const el = scroller as HTMLElement;
        el.scrollTo({ top: el.scrollTop + delta, behavior: "smooth" });
      }
    },
    [rootRef, smootherRef],
  );
}

/** Reveals its element once, the first time it scrolls near the viewport. */
export function useRevealOnce(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, shown: !enabled || seen };
}
