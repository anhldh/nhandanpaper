import { BODY_TEXT, PLATE_MASK, RAIL_GUTTER } from "./constants";
import { t, type Chapter, type Lang } from "./data";
import { src } from "./helpers";
import PinMarker, { type PinView } from "./PinMarker";
import { CountUp, Reveal } from "./Reveal";

type ChapterProps = {
  chapter: Chapter;
  lang: Lang;
  motion: boolean;
  /** A full-width chapter has to keep clear of the fixed rail. */
  showRail: boolean;
  onOpenPin: (pin: PinView) => void;
};

export default function ChapterSection({
  chapter,
  lang,
  motion,
  showRail,
  onOpenPin,
}: ChapterProps) {
  const wide = chapter.wide === true;

  return (
    <section
      data-chapter
      data-screen-label={chapter.label}
      style={{
        position: "relative",
        borderTop:
          "1px solid color-mix(in srgb, var(--color-accent-700) 18%, transparent)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: wide
            ? "1fr"
            : "repeat(auto-fit, minmax(min(100%, 390px), 1fr))",
          gap: "clamp(22px, 3.4vw, 62px)",
          paddingBlock: "clamp(28px, 5vh, 74px) clamp(50px, 9vh, 120px)",
          paddingLeft: "clamp(18px, 5vw, 90px)",
          paddingRight:
            wide && showRail ? RAIL_GUTTER : "clamp(18px, 5vw, 90px)",
          maxWidth: wide ? "none" : 1680,
          margin: "0 auto",
        }}
      >
        <div
          style={
            wide
              ? undefined
              : { position: "sticky", top: 74, alignSelf: "start" }
          }
        >
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: "-.34em",
                left: "-.02em",
                zIndex: 0,
                fontFamily: "var(--font-heading)",
                fontWeight: 300,
                fontSize: "clamp(96px, 15vw, 230px)",
                lineHeight: 0.8,
                color:
                  "color-mix(in srgb, var(--color-accent-700) 16%, transparent)",
                fontFeatureSettings: "'tnum'",
                pointerEvents: "none",
              }}
            >
              {chapter.year}
            </span>
            <div
              style={{ position: "relative", zIndex: 1, overflow: "hidden" }}
            >
              <div
                data-parallax
                style={{ position: "relative", willChange: "transform" }}
              >
                <img
                  src={src(chapter.img)}
                  alt={t(chapter.alt, lang)}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    maxHeight: wide ? "78vh" : "70vh",
                    objectFit: wide ? "cover" : "contain",
                    mixBlendMode: "multiply",
                    ...PLATE_MASK,
                  }}
                />
                {(chapter.pins ?? []).map((p) => (
                  <PinMarker
                    key={`${p.x}-${p.y}`}
                    pin={p}
                    lang={lang}
                    onOpen={onOpenPin}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 2,
                margin: "-34px 0 0 auto",
                width: "min(42%, 190px)",
                overflow: "hidden",
                outline:
                  "1px solid color-mix(in srgb, var(--color-accent-700) 22%, transparent)",
                transform: "rotate(-1.4deg)",
              }}
            >
              <img
                src={src(chapter.img2)}
                alt={t(chapter.alt2, lang)}
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                  ...PLATE_MASK,
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: wide ? "none" : "66ch" }}>
          <Reveal motion={motion}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  height: 1,
                  width: 30,
                  background: "var(--color-accent-700)",
                }}
              />
              <span
                style={{
                  fontSize: "11.5px",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-700)",
                  fontFeatureSettings: "'tnum'",
                }}
              >
                {t(chapter.dateLabel, lang)}
              </span>
              <span
                style={{
                  fontSize: "11.5px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color:
                    "color-mix(in srgb, var(--color-text) 55%, transparent)",
                }}
              >
                {t(chapter.station, lang)}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontSize: "clamp(34px, 4.6vw, 66px)",
                lineHeight: 1.02,
                margin: "0 0 8px",
                color: "var(--color-text)",
              }}
            >
              {t(chapter.title, lang)}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-heading)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.7vw, 25px)",
                lineHeight: 1.3,
                margin: "0 0 26px",
                color: "var(--color-accent-700)",
              }}
            >
              {t(chapter.sub, lang)}
            </p>
          </Reveal>

          {chapter.paras[lang].map((para) => (
            <Reveal
              key={para.slice(0, 40)}
              as="p"
              motion={motion}
              style={BODY_TEXT}
            >
              {para}
            </Reveal>
          ))}

          {chapter.stats && chapter.stats.length > 0 && (
            <Reveal
              motion={motion}
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "8px 0 30px",
              }}
            >
              {chapter.stats.map((stat) => (
                <div
                  key={t(stat.label, lang)}
                  style={{
                    flex: "1 1 140px",
                    background: "transparent",
                    border:
                      "1px solid color-mix(in srgb, var(--color-accent-700) 24%, transparent)",
                    margin: "0 -1px -1px 0",
                    padding: "16px 18px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 400,
                      fontSize: "clamp(30px, 3.4vw, 46px)",
                      lineHeight: 1,
                      color: "var(--color-accent-700)",
                      fontFeatureSettings: "'tnum'",
                    }}
                  >
                    <CountUp value={stat.value} motion={motion} />
                    {t(stat.suffix, lang)}
                  </div>
                  <div
                    style={{
                      marginTop: 7,
                      fontSize: 12,
                      letterSpacing: ".07em",
                      lineHeight: 1.45,
                      color:
                        "color-mix(in srgb, var(--color-text) 62%, transparent)",
                    }}
                  >
                    {t(stat.label, lang)}
                  </div>
                </div>
              ))}
            </Reveal>
          )}

          {chapter.quote && (
            <Reveal
              as="figure"
              motion={motion}
              style={{
                margin: "6px 0 26px",
                borderLeft: "2px solid var(--color-accent-700)",
                padding: "clamp(20px, 2.6vw, 34px)",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(20px, 2.1vw, 30px)",
                  fontStyle: "italic",
                  lineHeight: 1.4,
                  color: "var(--color-text)",
                  textWrap: "pretty",
                }}
              >
                {t(chapter.quote, lang)}
              </blockquote>
              <figcaption
                style={{
                  marginTop: 16,
                  fontSize: "11.5px",
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--color-accent-700)",
                }}
              >
                {t(chapter.quoteAttr, lang)}
              </figcaption>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
