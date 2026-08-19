import { useCallback, useRef, useState, type CSSProperties } from "react";

import type { ScrollSmoother } from "gsap/ScrollSmoother";

import { Reveal } from "./Reveal";
import { SmoothScroll } from "./SmoothScroll";
import {
  chapters,
  closing,
  credits,
  hero,
  t,
  ui,
  type Chapter,
  type Lang,
} from "./data";
import {
  useEscape,
  useGoToChapter,
  useJourneyScroll,
  useLang,
  useNarrow,
  usePaperTone,
} from "./hooks";
import "./journey.css";
import type { PinView } from "./PinMarker";
import ChapterSection from "./ChapterSection";
import { src } from "./helpers";
import {
  BODY_TEXT,
  EDGE_PADDING,
  OUTLINE_BUTTON,
  PLATE_MASK,
  RAIL_GUTTER,
} from "./constants";

export type JourneyPaperProps = {
  /** Initial language; a visitor's own choice is remembered and wins. */
  lang?: Lang;
  /** One of the keys of `PAPER_TONES`. */
  paperTone?: string;
  /** Entrance animations, count-ups and parallax. */
  motion?: boolean;
  /** Parallax travel in px, 0–120. */
  parallaxAmount?: number;
  showJourneyRail?: boolean;
};

export default function JourneyPaper({
  lang: langProp = "vi",
  paperTone = "Kem nhạt",
  motion = true,
  parallaxAmount = 46,
  showJourneyRail = true,
}: JourneyPaperProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const [lang, setLang] = useLang(langProp);
  const [toc, setToc] = useState(false);
  const [pin, setPin] = useState<PinView | null>(null);

  usePaperTone(paperTone);
  const narrow = useNarrow();
  const active = useJourneyScroll({
    rootRef,
    progressRef,
    motion,
    parallaxAmount,
  });
  const goTo = useGoToChapter(rootRef, smootherRef);

  const dismiss = useCallback(() => {
    if (pin) setPin(null);
    else setToc(false);
  }, [pin]);
  useEscape(dismiss, Boolean(pin) || toc);

  const activeChapter = chapters[active] as Chapter | undefined;
  const showRail = showJourneyRail && !narrow;

  const langButton = (on: boolean): CSSProperties => ({
    font: "inherit",
    fontSize: "11.5px",
    letterSpacing: ".1em",
    padding: "8px 11px",
    minHeight: 36,
    cursor: "pointer",
    border: "none",
    background: on
      ? "color-mix(in srgb, var(--color-accent-700) 20%, transparent)"
      : "transparent",
    color: on
      ? "var(--color-accent-700)"
      : "color-mix(in srgb, var(--color-text) 60%, transparent)",
  });

  return (
    <div className="journey">
      <header
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 60,
          display: "flex",
          alignItems: "center",
          gap: "clamp(10px, 2vw, 22px)",
          padding: "0 clamp(12px, 2.4vw, 26px)",
          height: 58,
          background: "color-mix(in srgb, var(--paper) 92%, transparent)",
          backdropFilter: "blur(9px)",
          borderBottom:
            "1px solid color-mix(in srgb, var(--color-accent-700) 22%, transparent)",
        }}
      >
        <img
          src={src("logo.svg")}
          alt="Nhân Dân"
          style={{
            height: 30,
            width: "auto",
            flex: "none",
            mixBlendMode: "multiply",
          }}
        />
        <div
          style={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 26,
              lineHeight: 1,
              color: "var(--color-accent-700)",
              fontFeatureSettings: "'tnum'",
              flex: "none",
            }}
          >
            {activeChapter ? activeChapter.year : "1941"}
          </span>
          <span
            style={{
              fontSize: "11.5px",
              letterSpacing: ".16em",
              textTransform: "uppercase",
              color: "color-mix(in srgb, var(--color-text) 62%, transparent)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {activeChapter ? t(activeChapter.station, lang) : t(hero.sub, lang)}
          </span>
        </div>
        <button
          type="button"
          className="j-outline-btn"
          onClick={() => setToc((open) => !open)}
          style={{
            ...OUTLINE_BUTTON,
            fontSize: 12,
            padding: "7px 13px",
            minHeight: 36,
          }}
        >
          {t(ui.contents, lang)}
        </button>
        <div
          style={{
            display: "flex",
            border:
              "1px solid color-mix(in srgb, var(--color-accent-700) 45%, transparent)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            flex: "none",
          }}
        >
          <button
            type="button"
            onClick={() => setLang("vi")}
            style={langButton(lang === "vi")}
          >
            VI
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            style={langButton(lang === "en")}
          >
            EN
          </button>
        </div>
      </header>

      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 58,
          left: 0,
          zIndex: 61,
          height: 2,
          width: "0%",
          background: "var(--color-accent-700)",
        }}
      />

      {showRail && (
        <nav
          aria-label="Journey"
          style={{
            position: "fixed",
            right: "clamp(14px, 2vw, 30px)",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 55,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          {chapters.map((chapter, i) => {
            const on = active === i;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => goTo(i)}
                title={`${chapter.year} — ${t(chapter.short, lang)}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 10,
                  background: "transparent",
                  border: "none",
                  padding: "7px 4px",
                  cursor: "pointer",
                  font: "inherit",
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    color: on
                      ? "var(--color-accent-700)"
                      : "color-mix(in srgb, var(--color-text) 42%, transparent)",
                    opacity: on ? 1 : 0.72,
                    transition: "all .3s ease",
                  }}
                >
                  {t(chapter.short, lang)}
                </span>
                <span
                  style={{
                    flex: "none",
                    width: on ? 13 : 7,
                    height: on ? 13 : 7,
                    borderRadius: "50%",
                    background: on ? "var(--color-accent-700)" : "transparent",
                    border: "1px solid var(--color-accent-700)",
                    opacity: on ? 1 : 0.5,
                    transition: "all .3s ease",
                  }}
                />
              </button>
            );
          })}
        </nav>
      )}

      <SmoothScroll enabled={motion} smootherRef={smootherRef}>
        <div
          ref={rootRef}
          style={{
            background: "var(--paper)",
            minHeight: "100vh",
            overflowX: "clip",
          }}
        >
          <section
            style={{
              position: "relative",
              minHeight: "100svh",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              alignItems: "center",
              gap: "clamp(20px, 4vw, 60px)",
              paddingBlock: "clamp(80px, 9vh, 120px) clamp(40px, 7vh, 90px)",
              paddingLeft: EDGE_PADDING,
              /* the lede sits in the right column now, so leave room for the rail */
              paddingRight: showRail ? RAIL_GUTTER : EDGE_PADDING,
            }}
          >
            <div style={{ position: "relative", order: 1 }}>
              <div
                style={{
                  overflow: "hidden",
                  maxWidth: 520,
                  marginInline: "auto",
                }}
              >
                <img
                  src={src("assets/hero-portrait.png")}
                  alt="Chủ tịch Hồ Chí Minh"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "min(72vh, calc(40vw + 220px))",
                    objectFit: "cover",
                    mixBlendMode: "multiply",
                    animation: motion
                      ? "drift 26s ease-in-out infinite alternate"
                      : undefined,
                    ...PLATE_MASK,
                  }}
                />
              </div>
            </div>
            <div style={{ order: 2, maxWidth: "62ch" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    height: 1,
                    width: 46,
                    background: "var(--color-accent-700)",
                  }}
                />
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: ".24em",
                    textTransform: "uppercase",
                    color: "var(--color-accent-700)",
                  }}
                >
                  {t(hero.kicker, lang)}
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "clamp(52px, 9vw, 132px)",
                  lineHeight: 0.92,
                  letterSpacing: "-.01em",
                  margin: "0 0 6px",
                  color: "var(--color-text)",
                }}
              >
                {t(hero.title, lang)}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(20px, 2.6vw, 34px)",
                  fontStyle: "italic",
                  lineHeight: 1.25,
                  margin: "0 0 26px",
                  color: "var(--color-accent-700)",
                }}
              >
                {t(hero.sub, lang)}
              </p>
              <div
                style={{
                  height: 1,
                  background:
                    "color-mix(in srgb, var(--color-accent-700) 34%, transparent)",
                  margin: "0 0 26px",
                }}
              />
              <p
                style={{
                  ...BODY_TEXT,
                  fontSize: "clamp(15.5px, 1.1vw, 17.5px)",
                  lineHeight: 1.85,
                  margin: "0 0 16px",
                  color:
                    "color-mix(in srgb, var(--color-text) 92%, transparent)",
                }}
              >
                {t(hero.lead1, lang)}
              </p>
              <p
                style={{
                  ...BODY_TEXT,
                  fontSize: "clamp(15.5px, 1.1vw, 17.5px)",
                  lineHeight: 1.85,
                  margin: "0 0 30px",
                  color:
                    "color-mix(in srgb, var(--color-text) 78%, transparent)",
                }}
              >
                {t(hero.lead2, lang)}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <button
                  type="button"
                  className="j-outline-btn"
                  onClick={() => goTo(0)}
                  style={{
                    ...OUTLINE_BUTTON,
                    fontSize: 13,
                    letterSpacing: ".14em",
                    border: "1px solid var(--color-accent-700)",
                    padding: "13px 24px",
                    minHeight: 46,
                  }}
                >
                  {t(ui.begin, lang)}
                </button>
                <span
                  style={{
                    fontSize: "12.5px",
                    letterSpacing: ".1em",
                    color:
                      "color-mix(in srgb, var(--color-text) 50%, transparent)",
                    animation: motion
                      ? "cue 2.4s ease-in-out infinite"
                      : undefined,
                  }}
                >
                  {t(ui.scroll, lang)}
                </span>
              </div>
            </div>
          </section>

          {chapters.map((chapter) => (
            <ChapterSection
              key={chapter.id}
              chapter={chapter}
              lang={lang}
              motion={motion}
              showRail={showRail}
              onOpenPin={setPin}
            />
          ))}

          <section
            data-chapter
            data-screen-label="Ba Đình"
            style={{
              position: "relative",
              borderTop:
                "1px solid color-mix(in srgb, var(--color-accent-700) 18%, transparent)",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={src("assets/closing-crowd.png")}
                alt="Ba Đình, 2/9/1945"
                data-parallax
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: 1040,
                  margin: "0 auto",
                  height: "auto",
                  maxHeight: "54vh",
                  objectFit: "cover",
                  objectPosition: "center top",
                  mixBlendMode: "multiply",
                  ...PLATE_MASK,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "auto 0 -1px 0",
                  height: "46%",
                  background:
                    "linear-gradient(to bottom, transparent, var(--paper) 86%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  padding:
                    "clamp(6px, 1.5vh, 18px) clamp(20px, 6vw, 110px) clamp(40px, 7vh, 92px)",
                  textAlign: "center",
                }}
              >
                <Reveal
                  motion={motion}
                  duration={0.8}
                  style={{ maxWidth: "54ch", margin: "0 auto" }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: ".24em",
                      textTransform: "uppercase",
                      color: "var(--color-accent-700)",
                      fontFeatureSettings: "'tnum'",
                    }}
                  >
                    {t(closing.date, lang)}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontStyle: "italic",
                      fontWeight: 300,
                      fontSize: "clamp(24px, 3.6vw, 50px)",
                      lineHeight: 1.28,
                      margin: "16px 0 14px",
                      color: "var(--color-text)",
                      textWrap: "pretty",
                    }}
                  >
                    {t(closing.quote, lang)}
                  </p>
                  <span
                    style={{
                      fontSize: "11.5px",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color:
                        "color-mix(in srgb, var(--color-text) 60%, transparent)",
                    }}
                  >
                    {t(closing.attr, lang)}
                  </span>
                </Reveal>
              </div>
            </div>
          </section>

          <footer
            style={{
              padding:
                "clamp(34px, 6vh, 74px) clamp(20px, 5vw, 90px) clamp(50px, 8vh, 96px)",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "clamp(22px, 3vw, 54px)",
              alignItems: "start",
              borderTop:
                "1px solid color-mix(in srgb, var(--color-accent-700) 18%, transparent)",
              maxWidth: 1680,
              margin: "0 auto",
            }}
          >
            <div>
              <img
                src={src("logo.svg")}
                alt="Nhân Dân"
                style={{ height: 52, width: "auto", mixBlendMode: "multiply" }}
              />
              <p
                style={{
                  margin: "18px 0 0",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color:
                    "color-mix(in srgb, var(--color-text) 58%, transparent)",
                  maxWidth: "34ch",
                }}
              >
                {t(ui.footerNote, lang)}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gap: 12,
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: "color-mix(in srgb, var(--color-text) 76%, transparent)",
              }}
            >
              {credits.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </footer>
        </div>
      </SmoothScroll>

      {toc && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 90,
            background: "color-mix(in srgb, var(--paper) 97%, transparent)",
            backdropFilter: "blur(6px)",
            overflow: "auto",
            padding: "clamp(70px, 10vh, 120px) clamp(20px, 6vw, 110px)",
          }}
        >
          <button
            type="button"
            className="j-outline-btn"
            onClick={() => setToc(false)}
            aria-label="Close"
            style={{
              ...OUTLINE_BUTTON,
              position: "fixed",
              top: 14,
              right: 16,
              fontSize: 20,
              lineHeight: 1,
              width: 42,
              height: 42,
              textTransform: "none",
            }}
          >
            ✕
          </button>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".24em",
                textTransform: "uppercase",
                color: "var(--color-accent-700)",
                marginBottom: 22,
              }}
            >
              {t(ui.contents, lang)}
            </div>
            {chapters.map((chapter, i) => (
              <button
                key={chapter.id}
                type="button"
                className="j-toc-row"
                onClick={() => {
                  setToc(false);
                  goTo(i);
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "5.5ch 1fr",
                  gap: "clamp(14px, 3vw, 40px)",
                  alignItems: "baseline",
                  width: "100%",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    "1px solid color-mix(in srgb, var(--color-accent-700) 18%, transparent)",
                  padding: "16px 4px",
                  cursor: "pointer",
                  font: "inherit",
                  color: "var(--color-text)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(18px, 2vw, 26px)",
                    color: "var(--color-accent-700)",
                    fontFeatureSettings: "'tnum'",
                  }}
                >
                  {chapter.year}
                </span>
                <span style={{ display: "grid", gap: 4 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(21px, 2.6vw, 32px)",
                      lineHeight: 1.15,
                      color: "var(--color-text)",
                    }}
                  >
                    {t(chapter.title, lang)}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color:
                        "color-mix(in srgb, var(--color-text) 55%, transparent)",
                    }}
                  >
                    {t(chapter.short, lang)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {pin && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "var(--paper)",
            display: "grid",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px clamp(12px, 2.4vw, 26px)",
              borderBottom:
                "1px solid color-mix(in srgb, var(--color-accent-700) 22%, transparent)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 22,
                color: "var(--color-accent-700)",
                fontFeatureSettings: "'tnum'",
                flex: "none",
              }}
            >
              {pin.date}
            </span>
            <span
              style={{
                flex: 1,
                minWidth: 0,
                fontSize: 13,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--color-text)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {pin.title}
            </span>
            <button
              type="button"
              className="j-outline-btn"
              onClick={() => setPin(null)}
              style={{
                ...OUTLINE_BUTTON,
                fontSize: 12,
                border: "1px solid var(--color-accent-700)",
                padding: "9px 16px",
                minHeight: 44,
              }}
            >
              {t(ui.close, lang)}
            </button>
          </div>
          <iframe
            src={pin.url}
            title={pin.title}
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            style={{
              width: "100%",
              height: "100%",
              border: 0,
              background: "var(--paper)",
            }}
          />
        </div>
      )}
    </div>
  );
}
