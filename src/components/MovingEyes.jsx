import React, { useState, useEffect, useRef } from "react";

const EYE_RADIUS = 13;
const PUPIL_RADIUS = 5;
const IRIS_RADIUS = 8;
const MAX_TRAVEL = 5.5;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const Eye = ({ targetX, targetY }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetX, 0.07);
      currentPos.current.y = lerp(currentPos.current.y, targetY, 0.07);
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetX, targetY]);

  const id = Math.random().toString(36).slice(2);

  return (
    <g>
      {/* Outer glow ring */}
      <circle
        cx="0" cy="0"
        r={EYE_RADIUS + 3}
        fill="none"
        stroke="rgba(99,102,241,0.25)"
        strokeWidth="1.5"
      />
      {/* Sclera */}
      <circle
        cx="0" cy="0"
        r={EYE_RADIUS}
        fill="url(#scleraGrad)"
        stroke="rgba(99,102,241,0.5)"
        strokeWidth="1"
      />
      {/* Iris */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={IRIS_RADIUS}
        fill="url(#irisGrad)"
      />
      {/* Pupil */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={PUPIL_RADIUS}
        fill="#0a0a14"
      />
      {/* Specular highlight */}
      <circle
        cx={pos.x + 2}
        cy={pos.y - 2}
        r={1.4}
        fill="rgba(255,255,255,0.85)"
      />
      <circle
        cx={pos.x + 4}
        cy={pos.y - 3.5}
        r={0.7}
        fill="rgba(255,255,255,0.4)"
      />
    </g>
  );
};

const MovingEyes = () => {
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const useMouseRef = useRef(false);

  // Follow mouse if available
  useEffect(() => {
    const handleMouse = (e) => {
      useMouseRef.current = true;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Normalize relative to center of component
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      // Cap travel
      const scale = Math.min(dist / 120, 1);
      setTarget({
        x: (dx / dist) * MAX_TRAVEL * scale,
        y: (dy / dist) * MAX_TRAVEL * scale,
      });
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Idle drift when no mouse
  useEffect(() => {
    const drift = () => {
      if (useMouseRef.current) return;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * MAX_TRAVEL;
      setTarget({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    };
    const id = setInterval(drift, 2200);
    return () => clearInterval(id);
  }, []);

  // Blink
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 4000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => {
          setBlink(false);
          scheduleBlink();
        }, 130);
      }, delay);
    };
    const t = scheduleBlink();
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes eyeFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-2px); }
        }
        .me-wrap {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          vertical-align: middle;
          animation: eyeFloat 3.5s ease-in-out infinite;
        }
        .me-svg {
          overflow: visible;
          filter: drop-shadow(0 0 8px rgba(99,102,241,0.4));
          transition: filter .3s ease;
        }
        .me-svg:hover {
          filter: drop-shadow(0 0 14px rgba(99,102,241,0.7));
        }
        .me-lid {
          transform-origin: center;
          transition: transform 0.08s ease;
        }
      `}</style>

      <span className="me-wrap" ref={containerRef}>
        <svg
          className="me-svg"
          width="92"
          height="36"
          viewBox="-18 -18 92 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="scleraGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#e8eaf6" />
              <stop offset="100%" stopColor="#c5c8e8" />
            </radialGradient>
            <radialGradient id="irisGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="40%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#1e1b4b" />
            </radialGradient>
          </defs>

          {/* Left eye */}
          <g transform="translate(0 0)">
            <Eye targetX={target.x} targetY={target.y} />
            {/* Eyelid blink */}
            {blink && (
              <rect
                x={-EYE_RADIUS}
                y={-EYE_RADIUS}
                width={EYE_RADIUS * 2}
                height={EYE_RADIUS * 2}
                rx={EYE_RADIUS}
                fill="#0f0f1a"
                className="me-lid"
              />
            )}
          </g>

          {/* Right eye */}
          <g transform="translate(56 0)">
            <Eye targetX={target.x} targetY={target.y} />
            {blink && (
              <rect
                x={-EYE_RADIUS}
                y={-EYE_RADIUS}
                width={EYE_RADIUS * 2}
                height={EYE_RADIUS * 2}
                rx={EYE_RADIUS}
                fill="#0f0f1a"
                className="me-lid"
              />
            )}
          </g>
        </svg>
      </span>
    </>
  );
};

export default MovingEyes;