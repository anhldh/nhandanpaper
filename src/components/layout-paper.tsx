"use client";
import styled from "@emotion/styled";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";

import { SmoothScroll } from "../journey/SmoothScroll";
import type { ScrollSmoother } from "gsap/ScrollSmoother";
import LongImagesMarkers from "./paper-long";
import { IframeProvider } from "./iframe/IframeContext";
import DisplayIframe from "./iframe/DisplayIframe";

type Lang = "vi" | "en";

const IMAGES_VI = [
  {
    id: "img1",
    src: "https://anhldh.com/images/nhandanen/1-vi.jpg",
  },
  {
    id: "img2",
    src: "https://cdn.yoolife.com.vn/yootek/1756975092188-9536.jpg",
  },
  {
    id: "img3",
    src: "https://cdn.yoolife.com.vn/yootek/1756975894325-1650.jpg",
  },
  {
    id: "img4",
    src: "https://cdn.yoolife.com.vn/yootek/1756975913911-9679.jpg",
  },
  {
    id: "img5",
    src: "https://anhldh.com/images/nhandanen/5-vi.jpg",
  },
  {
    id: "img6",
    src: "https://anhldh.com/images/nhandanen/6-vi.jpg",
  },
];

// TODO: thay bằng link ảnh tiếng Anh thật (giữ nguyên thứ tự id).
const IMAGES_EN = [
  { id: "img1", src: "https://anhldh.com/images/nhandanen/1.jpg" },
  { id: "img2", src: "https://anhldh.com/images/nhandanen/2.jpg" },
  { id: "img3", src: "https://anhldh.com/images/nhandanen/3new.jpg" },
  { id: "img4", src: "https://anhldh.com/images/nhandanen/4.jpg" },
  { id: "img5", src: "https://anhldh.com/images/nhandanen/6.jpg" },
  {
    id: "img6",
    src: "https://anhldh.com/images/nhandanen/6-vi.jpg",
  },
];

const MARKER_VI = {
  img1: [{ xPct: 0.554, yPct: 0.476 }],
  img3: [{ xPct: 0.828, yPct: 0.696 }],
  img4: [
    // { xPct: 0.1175, yPct: 0.498 },
    // { xPct: 0.8625, yPct: 0.82 },
    { xPct: 0.583, yPct: 0.928 },
  ],
  img5: [{ xPct: 0.860938, yPct: 0.813 }],
};

const MARKER_EN = {
  img1: [{ xPct: 0.554, yPct: 0.476 }],
  img3: [{ xPct: 0.831, yPct: 0.679 }],
  img4: [
    // { xPct: 0.1175, yPct: 0.498 },
    // { xPct: 0.8625, yPct: 0.82 },
    { xPct: 0.583, yPct: 0.921 },
  ],
  img5: [{ xPct: 0.860938, yPct: 0.78 }],
};

export default function LayoutPaper() {
  const [selected, setSelected] = useState<any>(null);
  const [lang, setLang] = useState<Lang>("vi");
  const { width, height } = useWindowSize();
  const isMobile = width <= 768;

  const stageRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  const [scrolled, setScrolled] = useState(false);

  const images = lang === "vi" ? IMAGES_VI : IMAGES_EN;
  const iconsByImg = lang === "vi" ? MARKER_VI : MARKER_EN;

  /** Thanh cuộn chỉ ẩn ở trang này, không đụng tới các route khác. */
  useEffect(() => {
    document.documentElement.classList.add("hide-scrollbar");
    return () => document.documentElement.classList.remove("hide-scrollbar");
  }, []);

  /** Gợi ý "cuộn xuống" tắt hẳn ngay khi người dùng đã cuộn. */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Ảnh dùng `loading="lazy"` + `height:auto`, nên chiều cao trang chỉ đúng sau
   * khi ảnh tải xong. ScrollSmoother phải đo lại, nếu không sẽ không cuộn tới đáy.
   * `load` không bubble nên phải nghe ở capture phase.
   */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const refresh = () => ScrollTrigger.refresh();
    el.addEventListener("load", refresh, true);
    return () => el.removeEventListener("load", refresh, true);
  }, []);

  /** Nạp sẵn bộ ảnh còn lại để lần đổi ngôn ngữ đầu tiên không bị giật. */
  useEffect(() => {
    const other = lang === "vi" ? IMAGES_EN : IMAGES_VI;
    const preload = () => other.forEach((it) => (new Image().src = it.src));
    if (document.readyState === "complete") {
      preload();
      return;
    }
    window.addEventListener("load", preload, { once: true });
    return () => window.removeEventListener("load", preload);
  }, [lang]);

  return (
    <>
      <LangToggle
        type="button"
        onClick={() => setLang((p) => (p === "vi" ? "en" : "vi"))}
        aria-label={
          lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"
        }
        title={lang === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={lang}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {lang === "vi" ? "EN" : "VI"}
          </motion.span>
        </AnimatePresence>
      </LangToggle>

      <SmoothScroll enabled smootherRef={smootherRef}>
        <Stage ref={stageRef}>
          <LongImagesMarkers
            widthWindow={width}
            heightWindow={height}
            images={images}
            initialMarkers={{
              img1: [
                {
                  id: "bac26f77-d06f-437c-9b4c-bcfd586641a3",
                  xPct: 0.551859,
                  yPct: 0.49778,
                  url: "https://vr360.yoolife.vn/pac-bo-cao-bang-ver-zbdsc278u26822",
                },
              ],
              img2: [],
              img3: [
                {
                  id: "4e4a3b80-cbaf-41ad-bd10-90ff693eeb53",
                  xPct: 0.832681,
                  yPct: 0.719,
                  url: "https://vr360.yoolife.vn/cay-da-tan-trao-zbdsc240u26822",
                },
              ],
              img4: [
                {
                  id: "adfb6f91-7edf-49c7-9320-dcf01d57eb72",
                  xPct: 0.583,
                  yPct: 0.943,
                  url: "https://vr360.yoolife.vn/nha-ong-cong-ngoc-kha-zac2624u275784",
                },
              ],
              img5: [
                {
                  id: "adfb6f91-7edf-49c7-9320-dcf01d57eb72",
                  xPct: 0.85829,
                  yPct: 0.83,
                  url: "https://youtu.be/dyefeqChQZQ",
                },
              ],
            }}
            iconsByImg={iconsByImg}
            setSelected={setSelected}
            markerHitSize={isMobile ? 50 : 100}
            iconSize={isMobile ? 70 : 100}
            iconSrc="https://cdn.yoolife.com.vn/yootek/1756529700941-2481.gif"
          />
        </Stage>
      </SmoothScroll>

      <ScrollHint $hidden={scrolled || !!selected} aria-hidden="true">
        <span>{lang === "vi" ? "Cuộn xuống" : "Scroll down"}</span>
        <i />
      </ScrollHint>

      <IframeProvider>
        {selected && (
          <DisplayIframe
            url={selected?.url}
            onClose={() => {
              setSelected(null);
            }}
            backgroundUrl={
              "https://cdn.yoolife.com.vn/yootek/1756542385292-3072.jpg"
            }
            bgMobileUrl="https://cdn.yoolife.com.vn/yootek/1756542426048-6042.jpg"
          />
        )}
      </IframeProvider>
    </>
  );
}

const Stage = styled.div`
  width: 100%;
`;

const ScrollHint = styled.div<{ $hidden: boolean }>`
  position: fixed;
  left: 50%;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  z-index: 40;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  pointer-events: none;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 400ms ease;

  span {
    font:
      600 11px/1 system-ui,
      sans-serif;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5a4632;
    animation: scroll-hint-breathe 2s ease-in-out infinite;
  }

  /* Đường dọc: vệt sáng chạy từ trên xuống, lặp lại. */
  i {
    position: relative;
    width: 1px;
    height: 44px;
    overflow: hidden;
    background: rgba(90, 70, 50, 0.22);
  }
  i::after {
    content: "";
    position: absolute;
    inset: 0 0 auto 0;
    height: 16px;
    background: #5a4632;
    animation: scroll-hint-travel 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes scroll-hint-travel {
    0% {
      transform: translateY(-16px);
      opacity: 0;
    }
    30% {
      opacity: 1;
    }
    100% {
      transform: translateY(44px);
      opacity: 0;
    }
  }
  @keyframes scroll-hint-breathe {
    0%,
    100% {
      opacity: 0.55;
    }
    50% {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    span,
    i::after {
      animation: none;
    }
  }
`;

const LangToggle = styled(motion.button)`
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 50;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden; /* nhãn trượt lên/xuống trong lòng nút */
  font:
    600 13px/1 ui-monospace,
    Menlo,
    monospace;
  letter-spacing: 0.1em;
  color: #5a4632;
  background: rgba(247, 240, 229, 0.82);
  border: 1px solid rgba(90, 70, 50, 0.28);
  box-shadow:
    0 1px 2px rgba(90, 70, 50, 0.12),
    0 6px 18px rgba(90, 70, 50, 0.14);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition:
    background 200ms ease,
    border-color 200ms ease;
  &:hover {
    background: rgba(250, 245, 237, 0.95);
    border-color: rgba(90, 70, 50, 0.45);
  }
`;
