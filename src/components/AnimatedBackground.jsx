import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const CFG = {
  maxOverscroll: 900,
  particleCount: 40,
  nearBottomThreshold: 120,
  conceptsStart: 0.15,
};

const CONCEPTS = [
  { text: "Innovation",  color: "#38bdf8" },
  { text: "Creativity",  color: "#a78bfa" },
  { text: "Excellence",  color: "#34d399" },
  { text: "Vision",      color: "#f472b6" },
  { text: "Quality",     color: "#fb923c" },
  { text: "Growth",      color: "#facc15" },
  { text: "Passion",     color: "#f87171" },
  { text: "Future",      color: "#22d3ee" },
];

// ─── Stable particle seed (created once) ─────────────────────────────────────
const PARTICLES = Array.from({ length: CFG.particleCount }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  depth: Math.random() * 0.7 + 0.3,
  hue: Math.floor(Math.random() * 60 + 200), // blue-violet range
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────
function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

function getScrollInfo() {
  const wh = window.innerHeight;
  const dh = document.documentElement.scrollHeight;
  const st = window.pageYOffset;
  const scrollable = dh - wh;
  return {
    scrollTop: st,
    scrollable,
    isAtBottom: scrollable > 0 && scrollable - st <= 5,
    distFromBottom: Math.max(0, scrollable - st),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const AnimatedBackground = () => {
  const [mouse, setMouse]           = useState({ x: 0.5, y: 0.5 }); // 0-1 normalized
  const [scrollTop, setScrollTop]   = useState(0);
  const [overscroll, setOverscroll] = useState(0);      // 0 → CFG.maxOverscroll
  const [active, setActive]         = useState(false);  // overscroll mode
  const [nearBottom, setNearBottom] = useState(false);
  const [tick, setTick]             = useState(0);      // drives aurora shimmer

  const rafMouse  = useRef(null);
  const rafTick   = useRef(null);
  const wheelRef  = useRef(null);

  const progress = overscroll / CFG.maxOverscroll; // 0-1

  // ── Aurora shimmer tick ──────────────────────────────────────────────────
  useEffect(() => {
    let t = 0;
    const loop = () => {
      t += 0.008;
      setTick(t);
      rafTick.current = requestAnimationFrame(loop);
    };
    rafTick.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafTick.current);
  }, []);

  // ── Exit overscroll ──────────────────────────────────────────────────────
  const exit = useCallback(() => {
    setActive(false);
    setOverscroll(0);
    document.body.style.overflow = "";
    const { scrollable } = getScrollInfo();
    window.scrollTo({ top: scrollable, behavior: "smooth" });
  }, []);

  // ── Wheel ────────────────────────────────────────────────────────────────
  const handleWheel = useCallback((e) => {
    const info = getScrollInfo();
    if (wheelRef.current) clearTimeout(wheelRef.current);

    if (info.isAtBottom && e.deltaY > 0 && !active) {
      e.preventDefault();
      setActive(true);
      setNearBottom(false);
      document.body.style.overflow = "hidden";
      setOverscroll(clamp(e.deltaY * 0.8, 0, CFG.maxOverscroll));
      return;
    }

    if (active) {
      e.preventDefault();
      setOverscroll((prev) => {
        const next = prev + e.deltaY * 0.55;
        if (next <= 0) {
          wheelRef.current = setTimeout(exit, 40);
          return 0;
        }
        return clamp(next, 0, CFG.maxOverscroll);
      });
    }
  }, [active, exit]);

  // ── Scroll ───────────────────────────────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (active) return;
    const { scrollTop: st, distFromBottom } = getScrollInfo();
    setScrollTop(st);
    setNearBottom(distFromBottom <= CFG.nearBottomThreshold);
  }, [active]);

  // ── Mouse ────────────────────────────────────────────────────────────────
  const handleMouse = useCallback((e) => {
    cancelAnimationFrame(rafMouse.current);
    rafMouse.current = requestAnimationFrame(() => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    });
  }, []);

  // ── Keyboard ─────────────────────────────────────────────────────────────
  const handleKey = useCallback((e) => {
    if (e.key === "Escape" && active) exit();
  }, [active, exit]);

  useEffect(() => {
    window.addEventListener("scroll",    handleScroll, { passive: true });
    window.addEventListener("wheel",     handleWheel,  { passive: false });
    window.addEventListener("mousemove", handleMouse,  { passive: true });
    window.addEventListener("keydown",   handleKey);
    return () => {
      window.removeEventListener("scroll",    handleScroll);
      window.removeEventListener("wheel",     handleWheel);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("keydown",   handleKey);
      document.body.style.overflow = "";
      cancelAnimationFrame(rafMouse.current);
    };
  }, [handleScroll, handleWheel, handleMouse, handleKey]);

  // ── Aurora mesh gradient (tick-driven) ───────────────────────────────────
  const aurora = useMemo(() => {
    const t = tick;
    const mx = mouse.x * 100;
    const my = mouse.y * 100;
    // 3 drifting blobs + mouse-reactive blob
    return [
      { cx: 20 + Math.sin(t * 0.7) * 15,  cy: 30 + Math.cos(t * 0.5) * 20,  color: "rgba(56,189,248,0.18)",  r: "55%" },
      { cx: 75 + Math.cos(t * 0.6) * 12,  cy: 60 + Math.sin(t * 0.8) * 18,  color: "rgba(167,139,250,0.16)", r: "50%" },
      { cx: 50 + Math.sin(t * 0.4) * 20,  cy: 80 + Math.cos(t * 0.3) * 10,  color: "rgba(52,211,153,0.12)",  r: "45%" },
      { cx: mx,                            cy: my,                             color: "rgba(248,113,113,0.10)", r: "40%" },
    ]
      .map(b => `radial-gradient(ellipse ${b.r} at ${b.cx}% ${b.cy}%, ${b.color}, transparent 70%)`)
      .join(", ");
  }, [tick, mouse]);

  // ── Derived values ────────────────────────────────────────────────────────
  const bgOpacity    = active ? clamp(0.15 + progress * 0.82, 0, 0.97) : 0.04;
  const vignette     = active ? `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,6,${clamp(progress * 0.85, 0, 0.85)}) 100%)` : "none";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');

        .ab-root {
          position: fixed; inset: 0;
          width: 100vw; height: 100vh;
          overflow: hidden;
          pointer-events: ${active ? "auto" : "none"};
          z-index: ${active ? 999 : -1};
        }

        /* ── noise grain overlay ── */
        .ab-root::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px 180px;
          opacity: .35;
          pointer-events: none;
          z-index: 10;
          mix-blend-mode: overlay;
        }

        /* ── base void ── */
        .ab-void {
          position: absolute; inset: 0;
          background: #02040a;
          opacity: ${bgOpacity};
          transition: opacity .5s ease;
        }

        /* ── aurora ── */
        .ab-aurora {
          position: absolute; inset: 0;
          opacity: ${active ? clamp(progress * 1.3, 0, 0.9) : 0};
          transition: opacity .6s ease;
        }

        /* ── vignette ── */
        .ab-vignette {
          position: absolute; inset: 0;
          background: ${vignette};
          pointer-events: none;
          z-index: 5;
        }

        /* ── concept words ── */
        .ab-concept {
          position: absolute;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(1.4rem, 3.5vw, 2.8rem);
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          letter-spacing: -0.02em;
          filter: blur(0px);
          text-shadow: 0 0 30px currentColor;
          z-index: 6;
        }

        /* ── exit button ── */
        .ab-exit {
          position: fixed;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1001;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          font-size: .9rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(255,255,255,.9);
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.12);
          padding: 12px 32px;
          border-radius: 999px;
          cursor: pointer;
          transition: background .2s, border-color .2s, transform .2s;
          opacity: ${clamp((progress - 0.08) * 3, 0, 1)};
          box-shadow: 0 0 40px rgba(56,189,248,.15);
        }
        .ab-exit:hover {
          background: rgba(255,255,255,.12);
          border-color: rgba(255,255,255,.25);
          transform: translateX(-50%) translateY(-2px);
        }

        /* ── near-bottom hint ── */
        .ab-hint {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.7);
          background: rgba(2,4,10,.55);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.08);
          padding: 9px 22px;
          border-radius: 999px;
          animation: hintIn .4s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes hintIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* ── scroll ring ── */
        .ab-ring {
          width: 18px; height: 18px;
          border: 1.5px solid rgba(56,189,248,.6);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin .9s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="ab-root">
        {/* Void base */}
        <div className="ab-void" />

        {/* Aurora mesh */}
        <div
          className="ab-aurora"
          style={{ background: aurora }}
        />

        {/* Vignette */}
        <div className="ab-vignette" />

        {/* Particles */}
        {PARTICLES.map((p) => {
          const mx = (mouse.x - 0.5) * 60 * p.depth;
          const my = (mouse.y - 0.5) * 60 * p.depth;
          const sy = active
            ? overscroll * p.depth * 0.25
            : scrollTop * p.depth * 0.08;
          const op = active
            ? clamp(progress * 1.4, 0, 0.75)
            : clamp(scrollTop / (document.documentElement.scrollHeight || 1) * 0.3, 0.02, 0.12);

          return (
            <div
              key={p.id}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: "50%",
                background: `hsl(${p.hue}, 80%, 70%)`,
                opacity: op,
                transform: `translate(${mx}px, ${my - sy}px)`,
                transition: "opacity .4s ease",
                boxShadow: `0 0 ${p.size * 3}px hsl(${p.hue}, 80%, 70%)`,
                zIndex: 4,
                willChange: "transform",
              }}
            />
          );
        })}

        {/* Floating concept words */}
        {active && CONCEPTS.map((c, i) => {
          const localProgress = clamp(
            (progress - CFG.conceptsStart - i * 0.06) / 0.28,
            0, 1
          );
          if (localProgress <= 0) return null;

          const ease = 1 - Math.pow(1 - localProgress, 3);
          const angle = (i / CONCEPTS.length) * Math.PI * 2 + overscroll * 0.0008;
          const rx = 32 + Math.sin(tick * 0.4 + i) * 6;
          const ry = 20 + Math.cos(tick * 0.3 + i) * 4;
          const cx = 50 + Math.cos(angle) * rx;
          const cy = 50 + Math.sin(angle) * ry;

          return (
            <div
              key={c.text}
              className="ab-concept"
              style={{
                left: `${cx}%`,
                top: `${cy}%`,
                color: c.color,
                opacity: ease,
                transform: `translate(-50%, -50%) scale(${0.7 + ease * 0.4}) translateY(${(1 - ease) * 40}px)`,
              }}
            >
              {c.text}
            </div>
          );
        })}

        {/* Exit */}
        {active && (
          <button className="ab-exit" onClick={exit}>
            ← Return
          </button>
        )}
      </div>

      {/* Near-bottom hint */}
      {nearBottom && !active && (
        <div className="ab-hint">
          <div className="ab-ring" />
          <span>Keep scrolling to explore</span>
        </div>
      )}
    </>
  );
};

export default AnimatedBackground;