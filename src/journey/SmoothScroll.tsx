import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export type SmootherRef = RefObject<ScrollSmoother | null>;

type Props = {
  enabled: boolean;
  /** Filled with the live smoother so callers can drive `scrollTo`. */
  smootherRef: SmootherRef;
  children: ReactNode;
};

/**
 * Wraps the scrolling content in GSAP's ScrollSmoother.
 *
 * ScrollSmoother animates a transform on `#smooth-content`, which makes it a
 * containing block for `position: fixed` descendants — so the page's fixed
 * chrome (header, progress bar, rail, overlays) has to be rendered *outside*
 * this component, not passed as children.
 */
export function SmoothScroll({ enabled, smootherRef, children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!enabled || !wrapperRef.current || !contentRef.current) return;

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.2,
      normalizeScroll: true,
      ignoreMobileResize: true,
      effects: false,
    });
    smootherRef.current = smoother;

    return () => {
      smootherRef.current = null;
      smoother.kill();
    };
  }, [enabled, smootherRef]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
