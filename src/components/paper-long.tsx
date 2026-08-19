"use client";

import styled from "@emotion/styled";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import React, {
  type Dispatch,
  useCallback,
  useMemo,
  useState,
} from "react";

/* ============ types ============ */
export type Marker = {
  id: string;
  xPct: number; // 0..1
  yPct: number; // 0..1
  color?: string;
  url?: string;
};

export type IconPos = {
  xPct: number; // 0..1
  yPct: number; // 0..1
  id?: string;
};

const FOOTER_TARGET_ID = "img5";
const FOOTER_SRC = "https://s3.yootek.com.vn/yootek/1756541117302-8786.png";
const IFRAME_SRC =
  "https://vr360.yoolife.vn/quang-truong-ba-dinh-zbdsc2149u275784";
const DESKTOP_RATIO = 16 / 9;
const MOBILE_RATIO = 9 / 16;
const DESKTOP_MAX_W = "81.5%";
const MOBILE_MAX_W = "86%";
const MAX_H_VH = 72;
const MIN_H_PX = 220;

export type ImageItem = { id: string; src: string };

type Props = {
  images: ImageItem[];
  initialMarkers?: Record<string, Marker[]>;
  iconsByImg?: Record<string, IconPos[]>;
  onAddMarker?: (imageId: string, m: Marker) => void;
  onSelectMarker?: (imageId: string, m: Marker) => void;
  markerHitSize?: number;
  iconSize?: number;
  iconSrc?: string;
  debug?: boolean;
  widthWindow: number;
  heightWindow: number;
  setSelected: Dispatch<any>;
};

export default function LongImagesMarkers({
  images,
  initialMarkers = {},
  iconsByImg = {},
  markerHitSize = 100,
  widthWindow,
  heightWindow,
  iconSize = 100,
  iconSrc = "https://s3.yootek.com.vn/yootek/1756529700941-2481.gif",
  debug = false,
  setSelected,
}: Props) {
  const isMobile = widthWindow <= 768; // bạn đã dùng kiểu này
  const isPortrait = heightWindow >= widthWindow; // bổ sung: dọc/ngang

  // quyết định tỉ lệ & độ rộng ngay ở JS
  const aspect = isMobile || isPortrait ? MOBILE_RATIO : DESKTOP_RATIO;
  const boxWidth = isMobile || isPortrait ? MOBILE_MAX_W : DESKTOP_MAX_W;
  // state: markers cho từng ảnh
  const [markersByImg, setMarkersByImg] = useState<Record<string, Marker[]>>(
    () =>
      images.reduce(
        (acc, it) => {
          acc[it.id] = initialMarkers[it.id] ?? [];
          return acc;
        },
        {} as Record<string, Marker[]>,
      ),
  );

  // Trang cuộn bằng window qua ScrollSmoother, nên khoá/mở là pause smoother.
  const lockStageScroll = useCallback(() => {
    ScrollSmoother.get()?.paused(true);
  }, []);

  const unlockStageScroll = useCallback(() => {
    ScrollSmoother.get()?.paused(false);
  }, []);

  const prettyByImg = useMemo(() => {
    const out: Record<string, string> = {};
    for (const it of images) {
      const arr = markersByImg[it.id] ?? [];
      out[it.id] = JSON.stringify(
        arr.map((m) => ({
          id: m.id,
          x: round(m.xPct, 6),
          y: round(m.yPct, 6),
        })),
        null,
        2,
      );
    }
    return out;
  }, [images, markersByImg]);

  const clearMarkers = (imageId: string) =>
    setMarkersByImg((prev) => ({ ...prev, [imageId]: [] }));

  return (
    <Stage>
      {images.map((it) => {
        const markers = markersByImg[it.id] ?? [];
        const icons = iconsByImg[it.id] ?? [];
        const pretty = prettyByImg[it.id] ?? "[]";

        return (
          <React.Fragment key={it.id}>
            {/* ẢNH */}
            <Section>
              {debug && (
                <Header>
                  <b>{it.id}</b>
                  <span style={{ flex: 1 }} />
                  <button onClick={() => clearMarkers(it.id)}>
                    Clear markers
                  </button>
                  <button onClick={() => copy(pretty)}>
                    Copy markers JSON
                  </button>
                </Header>
              )}

              <ImgWrap>
                <img
                  src={it.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />

                {/* ICONS */}
                {icons.map((p, idx) => (
                  <IconImg
                    key={p.id ?? `icon-${idx}`}
                    src={iconSrc}
                    alt="icon"
                    draggable={false}
                    style={{
                      left: `${p.xPct * 100}%`,
                      top: `${p.yPct * 100}%`,
                      width: iconSize,
                      height: iconSize,
                      transform: "translate(-50%, -50%)",
                      mixBlendMode: "multiply",
                    }}
                  />
                ))}

                {/* MARKERS */}
                {markers.map((m) => (
                  <MarkerBox
                    key={m.id}
                    style={{
                      left: `${m.xPct * 100}%`,
                      top: `${m.yPct * 100}%`,
                      width: markerHitSize,
                      height: markerHitSize,
                      transform: "translate(-50%, -100%)",
                    }}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setSelected(m);
                    }}
                    title="marker"
                  />
                ))}
              </ImgWrap>

              {debug && (
                <Panel>
                  <small>Markers JSON ({markers.length}):</small>
                  <pre>{pretty}</pre>
                </Panel>
              )}
            </Section>

            {/* IFRAME*/}
            {it.id === FOOTER_TARGET_ID && (
              <InterstitialWrap>
                <InterstitialBox
                  $boxWidth={boxWidth}
                  $aspect={aspect}
                  $maxHvh={MAX_H_VH}
                  $minHpx={MIN_H_PX}
                  // style={{ aspectRatio: String(INTERSTITIAL_ASPECT) }}
                  onMouseEnter={lockStageScroll}
                  onMouseLeave={unlockStageScroll}
                  onTouchStart={lockStageScroll}
                  onTouchEnd={unlockStageScroll}
                  onTouchCancel={unlockStageScroll}
                >
                  <iframe
                    title="Bảo tàng số bác Hồ"
                    allowFullScreen
                    src={IFRAME_SRC}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </InterstitialBox>
              </InterstitialWrap>
            )}
          </React.Fragment>
        );
      })}
    </Stage>
  );
}

/* ============ styles ============ */

// transient-props để styled-components không đẩy props xuống DOM
type BoxProps = {
  $boxWidth: string;
  $aspect: number;
  $maxHvh: number;
  $minHpx: number;
};

const InterstitialWrap = styled.section`
  width: 100vw;
  margin: 0;
  padding: 0;
  background-image: url("https://s3.yootek.com.vn/yootek/1756964377459-7374.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InterstitialBox = styled.div<BoxProps>`
  width: ${({ $boxWidth }) => $boxWidth};
  max-width: ${({ $boxWidth }) => $boxWidth};
  aspect-ratio: ${({ $aspect }) => String($aspect)};
  pointer-events: auto;

  max-height: ${({ $maxHvh }) => $maxHvh}vh;
  min-height: ${({ $minHpx }) => $minHpx}px;
`;

const Stage = styled.div`
  width: 100vw;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

const Section = styled.section`
  width: 100vw;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;
  button {
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #fff;
    border-radius: 8px;
    padding: 4px 10px;
    cursor: pointer;
  }
`;

const ImgWrap = styled.div`
  position: relative;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

const MarkerBox = styled.div`
  position: absolute;
  z-index: 3; /* trên icon nếu muốn */
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 4px;
  opacity: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition:
    transform 120ms ease,
    opacity 120ms ease;
  &:hover {
    transform: translate(-50%, -100%) scale(1.05);
  }
`;

/** ICON hiển thị từ danh sách riêng */
const IconImg = styled.img`
  position: absolute;
  z-index: 2;
  pointer-events: auto;
  user-select: none;
  image-rendering: auto;
  will-change: transform;
  cursor: pointer;
  transition:
    transform 120ms ease,
    filter 120ms ease,
    opacity 120ms ease;
  &:hover {
    transform: translate(-50%, -100%) scale(1.05);
  }
`;

const Panel = styled.div`
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.96);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  pre {
    margin: 8px 0 0;
    font-size: 12px;
    line-height: 1.4;
    white-space: pre-wrap;
    word-break: break-word;
  }
`;

/* ============ utils ============ */
function round(n: number, digits = 4) {
  const p = Math.pow(10, digits);
  return Math.round(n * p) / p;
}
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* empty */
  }
}
