import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useWindowSize } from "react-use";
import ReactPlayer from "react-player";

import { useIframe } from "./IframeContext";

const isReactPlayerUrl = (u: string) => {
  try {
    const url = new URL(u);
    const host = url.hostname.toLowerCase();
    return (
      host.includes("youtube.com") ||
      host.includes("youtu.be") ||
      host.includes("vimeo.com")
    );
  } catch {
    return false;
  }
};

const DisplayIframe = ({
  onClose,
  url,
  backgroundUrl,
  bgMobileUrl,
}: {
  onClose: () => void;
  url: string;
  backgroundUrl: string;
  bgMobileUrl: string;
}) => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showPage, setShowPage] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const { width } = useWindowSize();
  const isMobile = width < 820;

  const { setIframeVisible } = useIframe();

  const useReactPlayer = useMemo(() => isReactPlayerUrl(url), [url]);

  useEffect(() => {
    if (useReactPlayer) {
      setShowOverlay(false);
      setShowPage(true);
      setIframeLoaded(true);
      setIframeVisible(true);
      return;
    }
    // Non-ReactPlayer case: hiển thị overlay và chạy progress
    setShowOverlay(true);
  }, [useReactPlayer, setIframeVisible]);

  useEffect(() => {
    if (useReactPlayer) return;

    setIframeVisible(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 0 && !iframeLoaded) {
          setIframeLoaded(true);
        }
        if (prev === 100) {
          setShowPage(true);
          setIframeVisible(true);
          setShowOverlay(false);
          clearInterval(interval);
        }
        return prev < 100 ? prev + 1 : 100;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [setIframeVisible, iframeLoaded, useReactPlayer]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return ReactDOM.createPortal(
    <>
      {/* Overlay CHỈ hiện khi không dùng ReactPlayer */}
      {showOverlay && !useReactPlayer && (
        <StyledDivOverlay
          className={
            !!backgroundUrl ? "overlay-countdown-custom" : "overlay-countdown"
          }
          style={{
            backgroundImage: isMobile
              ? `url(${bgMobileUrl})`
              : `url(${backgroundUrl})`,
          }}
        >
          <div className="circular-gradient-container">
            <svg className="circular-gradient" width="120" height="120">
              <circle
                className="background-circle"
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="#D9D9D9"
                strokeWidth="13"
              />
              <circle
                className="progress-circle"
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="13"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
              <defs>
                <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={"#A40A0A"} />
                  <stop offset="100%" stopColor={"#EA7331"} />
                </linearGradient>
              </defs>
            </svg>
            <div
              className="progress-text"
              style={{ color: "unset" }}
            >{`${progress}%`}</div>
          </div>
        </StyledDivOverlay>
      )}

      <div>
        {useReactPlayer ? (
          // ReactPlayer
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 201,
              background: "#000",
            }}
          >
            <ReactPlayer
              src={url}
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>
        ) : // Non-ReactPlayer
        iframeLoaded ? (
          <iframe
            src={url}
            style={{
              width: "100%",
              height: "100%",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: showPage ? 201 : 199,
              background: "#ffffff",
            }}
            allowFullScreen
          />
        ) : null}

        <BackButton
          onClick={(event) => {
            event.stopPropagation();
            setIframeVisible(false);
            onClose();
          }}
        >
          ← Quay lại
        </BackButton>
      </div>
    </>,
    document.body
  );
};

const BackButton = styled.button`
  position: fixed;
  top: 80px;
  left: 30px;
  z-index: 202;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  border-radius: 12px;
  background: #ffffffcc;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 600;
  color: #195658;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #fff;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StyledDivOverlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center 0%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 200;

  &.overlay-countdown {
    @media (max-width: 820px) {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover !important;
    }
  }

  &.overlay-countdown-custom {
    @media (max-width: 820px) {
      background-size: cover !important;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 1000px 100vh;
    }
  }

  .circular-gradient-container {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
  .circular-gradient {
    transform: rotate(-90deg);
  }
  .background-circle {
    stroke: #d9d9d9;
  }
  .progress-circle {
    stroke-linecap: butt;
    transition: stroke-dashoffset 0.3s ease-out;
  }
  .progress-text {
    position: absolute;
    font-size: 1rem;
    font-weight: bold;
    color: #8f8f8f;
  }
`;

export default DisplayIframe;
