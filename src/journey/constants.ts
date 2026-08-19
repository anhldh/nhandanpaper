import type { CSSProperties } from "react";

export const PLATE_MASK: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0, #000 3.5%, #000 96.5%, transparent 100%), linear-gradient(to right, transparent 0, #000 3.5%, #000 96.5%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0, #000 3.5%, #000 96.5%, transparent 100%), linear-gradient(to right, transparent 0, #000 3.5%, #000 96.5%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

/**
 * Như PLATE_MASK nhưng mép trên tan dần sâu hơn một chút (9% thay vì 3.5%),
 * để chỗ giáp ranh giữa con số năm và ảnh chapter mềm hơn.
 */
export const PLATE_MASK_SOFT_TOP: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0, #000 9%, #000 96.5%, transparent 100%), linear-gradient(to right, transparent 0, #000 3.5%, #000 96.5%, transparent 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0, #000 9%, #000 96.5%, transparent 100%), linear-gradient(to right, transparent 0, #000 3.5%, #000 96.5%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

export const OUTLINE_BUTTON: CSSProperties = {
  font: "inherit",
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--color-accent-700)",
  background: "transparent",
  border:
    "1px solid color-mix(in srgb, var(--color-accent-700) 45%, transparent)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
};

/** Right padding that keeps text clear of the fixed journey rail. */
export const RAIL_GUTTER = "clamp(180px, 13.5vw, 215px)";
export const EDGE_PADDING = "clamp(20px, 5vw, 90px)";

export const BODY_TEXT: CSSProperties = {
  fontSize: "clamp(15.5px, 1.05vw, 17.5px)",
  lineHeight: 1.9,
  textAlign: "justify",
  hyphens: "auto",
  textWrap: "pretty",
  margin: "0 0 20px",
  color: "color-mix(in srgb, var(--color-text) 90%, transparent)",
};
