import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";

const ImageCarousel = ({ images = [] }) => {
  const [index, setIndex]       = useState(0);
  const [errors, setErrors]     = useState({});
  const [dragging, setDragging] = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const [animDir, setAnimDir]   = useState(null); // "left" | "right" | null
  const dragStart = useRef(null);
  const trackRef  = useRef(null);

  // Reset index when images swap
  useEffect(() => {
    if (images.length > 0 && index >= images.length) setIndex(0);
  }, [images]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length]);

  const go = useCallback((dir) => {
    if (images.length < 2) return;
    setAnimDir(dir > 0 ? "right" : "left");
    setTimeout(() => setAnimDir(null), 320);
    setIndex((i) => (i + dir + images.length) % images.length);
  }, [images.length]);

  // ── Touch / mouse drag ──────────────────────────────────────────────────
  const onPointerDown = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX;
    setDragging(true);
    setDragDelta(0);
  };
  const onPointerMove = (e) => {
    if (!dragging || dragStart.current == null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    setDragDelta(x - dragStart.current);
  };
  const onPointerUp = () => {
    if (Math.abs(dragDelta) > 50) go(dragDelta < 0 ? 1 : -1);
    setDragging(false);
    setDragDelta(0);
    dragStart.current = null;
  };

  // ── Empty state ─────────────────────────────────────────────────────────
  if (!images.length) {
    return (
      <div className="ic-empty">
        <ImageOff size={28} />
        <span>No images available</span>
      </div>
    );
  }

  const multi = images.length > 1;
  const translateX = dragging ? dragDelta * 0.35 : 0;

  return (
    <>
      <style>{`
        .ic-root {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #0d0d12;
          overflow: hidden;
          user-select: none;
          -webkit-user-select: none;
          touch-action: pan-y;
        }

        /* ── Image ── */
        .ic-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transform: translateX(${translateX}px);
          transition: ${dragging ? "none" : "transform .05s ease"};
          will-change: transform;
        }

        /* slide animations */
        .ic-img.anim-right {
          animation: slideFromRight .3s cubic-bezier(.22,1,.36,1) both;
        }
        .ic-img.anim-left {
          animation: slideFromLeft .3s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes slideFromRight {
          from { transform: translateX(6%) scale(.97); opacity: .6; }
          to   { transform: translateX(0)  scale(1);   opacity: 1; }
        }
        @keyframes slideFromLeft {
          from { transform: translateX(-6%) scale(.97); opacity: .6; }
          to   { transform: translateX(0)   scale(1);   opacity: 1; }
        }

        /* ── Gradient overlays ── */
        .ic-grad-left,
        .ic-grad-right {
          position: absolute; top: 0; bottom: 0;
          width: 18%;
          pointer-events: none;
          z-index: 2;
        }
        .ic-grad-left  { left: 0;  background: linear-gradient(to right, rgba(0,0,0,.35), transparent); }
        .ic-grad-right { right: 0; background: linear-gradient(to left,  rgba(0,0,0,.35), transparent); }

        /* ── Nav buttons ── */
        .ic-btn {
          position: absolute;
          top: 50%; z-index: 3;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          transform: translateY(-50%);
          transition: background .2s, transform .2s, opacity .2s;
          opacity: 0;
        }
        .ic-root:hover .ic-btn { opacity: 1; }
        .ic-btn:hover {
          background: rgba(255,255,255,.25);
          transform: translateY(-50%) scale(1.08);
        }
        .ic-btn:active { transform: translateY(-50%) scale(.94); }
        .ic-btn-prev { left: 12px; }
        .ic-btn-next { right: 12px; }

        /* ── Counter pill ── */
        .ic-counter {
          position: absolute;
          top: 12px; right: 12px;
          z-index: 3;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .06em;
          color: rgba(255,255,255,.9);
          background: rgba(0,0,0,.45);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.1);
          padding: 3px 10px;
          border-radius: 999px;
        }

        /* ── Dots ── */
        .ic-dots {
          position: absolute;
          bottom: 14px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          z-index: 3;
        }
        .ic-dot {
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: width .25s cubic-bezier(.22,1,.36,1), background .25s, opacity .25s;
          padding: 0;
          height: 4px;
          background: rgba(255,255,255,.9);
        }
        .ic-dot-active { width: 20px; opacity: 1; }
        .ic-dot-inactive { width: 4px; opacity: .4; }
        .ic-dot-inactive:hover { opacity: .7; }

        /* ── Error state ── */
        .ic-error {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          background: #111118;
          color: rgba(255,255,255,.3);
          font-size: .8rem;
        }

        /* ── Empty state ── */
        .ic-empty {
          width: 100%;
          aspect-ratio: 16/9;
          background: #0d0d12;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px;
          color: rgba(255,255,255,.25);
          font-size: .82rem;
          font-family: system-ui, sans-serif;
          border-radius: 12px;
        }
      `}</style>

      <div
        ref={trackRef}
        className="ic-root"
        role="region"
        aria-label="Image carousel"
        onMouseDown={multi ? onPointerDown : undefined}
        onMouseMove={multi ? onPointerMove : undefined}
        onMouseUp={multi ? onPointerUp : undefined}
        onMouseLeave={multi ? onPointerUp : undefined}
        onTouchStart={multi ? onPointerDown : undefined}
        onTouchMove={multi ? onPointerMove : undefined}
        onTouchEnd={multi ? onPointerUp : undefined}
        style={{ cursor: dragging ? "grabbing" : multi ? "grab" : "default" }}
      >
        {/* Image or error */}
        {errors[index] ? (
          <div className="ic-error">
            <ImageOff size={24} />
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            key={index}
            src={images[index]}
            alt={`Slide ${index + 1} of ${images.length}`}
            className={`ic-img${animDir === "right" ? " anim-right" : animDir === "left" ? " anim-left" : ""}`}
            onError={() => setErrors((p) => ({ ...p, [index]: true }))}
            draggable={false}
          />
        )}

        {multi && (
          <>
            {/* Gradient edges */}
            <div className="ic-grad-left" />
            <div className="ic-grad-right" />

            {/* Counter */}
            <div className="ic-counter" aria-live="polite">
              {index + 1} / {images.length}
            </div>

            {/* Prev / Next */}
            <button
              className="ic-btn ic-btn-prev"
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="ic-btn ic-btn-next"
              onClick={() => go(1)}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Pill dots */}
            <div className="ic-dots" role="tablist">
              {images.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`ic-dot ${i === index ? "ic-dot-active" : "ic-dot-inactive"}`}
                  onClick={() => {
                    setAnimDir(i > index ? "right" : "left");
                    setTimeout(() => setAnimDir(null), 320);
                    setIndex(i);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageCarousel;