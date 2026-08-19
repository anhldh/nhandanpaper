import { t, type Lang, type Pin } from "./data";

export type PinView = { title: string; date: string; url: string };

export default function PinMarker({
  pin,
  lang,
  onOpen,
}: {
  pin: Pin;
  lang: Lang;
  onOpen: (view: PinView) => void;
}) {
  return (
    <button
      type="button"
      title={t(pin.title, lang)}
      onClick={() =>
        onOpen({ title: t(pin.title, lang), date: pin.date, url: pin.url })
      }
      style={{
        position: "absolute",
        left: pin.x,
        top: pin.y,
        transform: "translate(-50%,-100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        background: "transparent",
        border: "none",
        padding: 4,
        cursor: "pointer",
        font: "inherit",
        zIndex: 3,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "var(--color-accent-700)",
          border: "2px solid var(--color-accent-100)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--color-accent-100)",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "1px solid var(--color-accent-700)",
            animation: "halo 2.6s ease-out infinite",
          }}
        />
      </span>
      <span
        style={{
          fontSize: "11.5px",
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: "var(--color-text)",
          background: "var(--color-accent-100)",
          border:
            "1px solid color-mix(in srgb, var(--color-accent-700) 40%, transparent)",
          padding: "5px 9px",
          borderRadius: "var(--radius-sm)",
          whiteSpace: "nowrap",
        }}
      >
        {t(pin.label, lang)}
      </span>
    </button>
  );
}
