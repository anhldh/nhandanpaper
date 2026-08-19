import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { useRevealOnce } from "./hooks";

type RevealProps = {
  as?: "div" | "p" | "figure";
  motion?: boolean;
  duration?: number;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Content is authored visible; this only opts it into the entrance animation. */
export function Reveal({ as = "div", motion = true, duration = 0.7, style, children }: RevealProps) {
  const { ref, shown } = useRevealOnce(motion);
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: `opacity ${duration}s ease, transform ${duration}s ease`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, motion = true }: { value: number; motion?: boolean }) {
  const { ref, shown } = useRevealOnce(motion);
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (!motion || !shown) return;

    const duration = value > 400 ? 1100 : 900;
    const start = performance.now();
    let frameId = 0;

    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      setCounted(Math.round(value * (1 - Math.pow(1 - k, 3))));
      if (k < 1) frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [shown, value, motion]);

  return <span ref={ref as never}>{motion ? counted : value}</span>;
}
