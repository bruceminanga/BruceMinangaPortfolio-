import React, { useState, useEffect, useMemo, useRef } from "react";

const LINES = [
  { text: "Initializing runtime environment", delay: 0 },
  { text: "Resolving dependency graph", delay: 600 },
  { text: "Compiling source modules", delay: 1200 },
  { text: "Optimizing bundle size", delay: 1900 },
  { text: "Bootstrapping portfolio.sh", delay: 2600 },
];

const STATUS_DELAY = 3600;
const COMPLETE_DELAY = 5800;

const Spinner = ({ done }) =>
  done ? (
    <span style={{ color: "#4ade80" }}>✓</span>
  ) : (
    <span className="spinner" aria-hidden="true" />
  );

const TechLoading = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [doneLines, setDoneLines] = useState([]);
  const [showStatus, setShowStatus] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const timerRef = useRef(null);

  useEffect(() => {
    const timeouts = [];

    LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        setTimeout(() => setDoneLines((prev) => [...prev, i]), 420);
      }, line.delay);
      timeouts.push(t);
    });

    const statusT = setTimeout(() => setShowStatus(true), STATUS_DELAY);
    const completeT = setTimeout(() => onComplete?.(), COMPLETE_DELAY);
    timeouts.push(statusT, completeT);

    timerRef.current = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(timerRef.current);
    };
  }, [onComplete]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Outfit:wght@300;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #060910; }

        .tl-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, #0d1f3c 0%, #060910 70%);
          font-family: 'JetBrains Mono', monospace;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* ambient orbs */
        .tl-root::before,
        .tl-root::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: .18;
          pointer-events: none;
        }
        .tl-root::before {
          width: 600px; height: 600px;
          background: #2563eb;
          top: -200px; left: -150px;
        }
        .tl-root::after {
          width: 500px; height: 500px;
          background: #7c3aed;
          bottom: -200px; right: -100px;
        }

        /* grid texture */
        .tl-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .tl-card {
          position: relative;
          width: 100%;
          max-width: 780px;
          border-radius: 16px;
          background: rgba(13, 18, 30, 0.75);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          border: 1px solid rgba(148, 163, 184, 0.1);
          box-shadow:
            0 0 0 1px rgba(255,255,255,.04) inset,
            0 32px 80px rgba(0,0,0,.6),
            0 0 60px rgba(37,99,235,.08);
          overflow: hidden;
          animation: cardIn .5s cubic-bezier(.22,1,.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── TITLE BAR ── */
        .tl-titlebar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(255,255,255,.03);
          border-bottom: 1px solid rgba(148,163,184,.07);
        }

        .tl-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
        }
        .tl-dot-r { background: #ff5f57; }
        .tl-dot-y { background: #febc2e; }
        .tl-dot-g { background: #28c840; }

        .tl-title {
          flex: 1;
          text-align: center;
          font-size: .72rem;
          letter-spacing: .12em;
          color: rgba(148,163,184,.5);
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          text-transform: uppercase;
        }

        /* ── BODY ── */
        .tl-body {
          padding: 28px 28px 32px;
        }

        /* ── PROMPT ROW ── */
        .tl-prompt {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0;
          margin-bottom: 22px;
        }

        .tl-badge {
          font-size: .72rem;
          font-weight: 700;
          padding: 3px 12px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          letter-spacing: .03em;
        }
        .tl-badge-user  { background: #1d4ed8; color: #bfdbfe; }
        .tl-badge-host  { background: #15803d; color: #bbf7d0; margin-left: 2px; }
        .tl-badge-path  { background: #7e22ce; color: #e9d5ff; margin-left: 2px; }
        .tl-badge-git   { background: #c2410c; color: #fed7aa; margin-left: 2px; }

        .tl-arrow {
          color: rgba(148,163,184,.4);
          font-size: .85rem;
          margin: 0 8px;
        }

        /* ── COMMAND LINE ── */
        .tl-cmd {
          font-size: .82rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(148,163,184,.5);
        }
        .tl-cmd-text { color: #93c5fd; }
        .tl-cmd-file { color: #c4b5fd; }

        /* ── LOG LINES ── */
        .tl-lines {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }

        .tl-line {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: .8rem;
          opacity: 0;
          transform: translateX(-10px);
          transition: opacity .35s ease, transform .35s ease;
        }
        .tl-line.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .tl-line-icon {
          width: 18px;
          text-align: center;
          flex-shrink: 0;
        }

        .tl-line-bar {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .tl-line-label { color: rgba(203,213,225,.7); letter-spacing: .01em; }

        .tl-line-track {
          width: 90px;
          height: 3px;
          background: rgba(255,255,255,.07);
          border-radius: 9999px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .tl-line-fill {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #2563eb, #7c3aed);
          border-radius: 9999px;
          transition: width .5s cubic-bezier(.4,0,.2,1) .1s;
        }
        .tl-line.done .tl-line-fill { width: 100%; }

        .tl-line-ok {
          font-size: .68rem;
          color: #4ade80;
          letter-spacing: .06em;
          opacity: 0;
          transition: opacity .3s .5s;
        }
        .tl-line.done .tl-line-ok { opacity: 1; }

        /* spinner */
        .spinner {
          display: inline-block;
          width: 12px; height: 12px;
          border: 2px solid rgba(99,102,241,.3);
          border-top-color: #818cf8;
          border-radius: 50%;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── STATUS BAR ── */
        .tl-status {
          display: flex;
          align-items: center;
          gap: 0;
          opacity: 0;
          transform: translateY(8px);
          animation: statusIn .4s cubic-bezier(.22,1,.36,1) forwards;
        }
        @keyframes statusIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .tl-st-badge {
          font-size: .68rem;
          font-weight: 700;
          padding: 4px 14px;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%);
          letter-spacing: .08em;
        }
        .tl-st-ok    { background: #15803d; color: #bbf7d0; }
        .tl-st-ready { background: #1d4ed8; color: #bfdbfe; margin-left: 2px; }
        .tl-st-time  {
          background: rgba(255,255,255,.06);
          color: rgba(148,163,184,.6);
          font-size: .68rem;
          padding: 4px 12px;
          margin-left: 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* glow pulse on success */
        .tl-card.success {
          box-shadow:
            0 0 0 1px rgba(255,255,255,.06) inset,
            0 32px 80px rgba(0,0,0,.6),
            0 0 80px rgba(37,99,235,.18);
        }
      `}</style>

      <div className="tl-root">
        <div className="tl-grid" />

        <div className={`tl-card${showStatus ? " success" : ""}`}>
          {/* Title bar */}
          <div className="tl-titlebar">
            <div className="tl-dot tl-dot-r" />
            <div className="tl-dot tl-dot-y" />
            <div className="tl-dot tl-dot-g" />
            <span className="tl-title">BruceMinanga@Fedora — portfolio.sh</span>
          </div>

          {/* Body */}
          <div className="tl-body">
            {/* Powerline prompt */}
            <div className="tl-prompt">
              <span className="tl-badge tl-badge-user">BruceMinanga</span>
              <span className="tl-badge tl-badge-host">Fedora</span>
              <span className="tl-badge tl-badge-path">~</span>
              <span className="tl-badge tl-badge-git">⎇ main</span>
              <span className="tl-arrow">›</span>
            </div>

            {/* Command */}
            <div className="tl-cmd">
              <span>$</span>
              <span className="tl-cmd-text">systemctl start</span>
              <span className="tl-cmd-file">portfolio.sh</span>
            </div>

            {/* Log lines */}
            <div className="tl-lines">
              {LINES.map((line, i) => (
                <div
                  key={i}
                  className={`tl-line${visibleLines.includes(i) ? " visible" : ""}${doneLines.includes(i) ? " done" : ""}`}
                >
                  <div className="tl-line-icon">
                    <Spinner done={doneLines.includes(i)} />
                  </div>
                  <div className="tl-line-bar">
                    <span className="tl-line-label">{line.text}</span>
                    <div className="tl-line-track">
                      <div className="tl-line-fill" />
                    </div>
                    <span className="tl-line-ok">OK</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Status bar */}
            {showStatus && (
              <div className="tl-status">
                <span className="tl-st-badge tl-st-ok">✓ SUCCESS</span>
                <span className="tl-st-badge tl-st-ready">Portfolio Ready</span>
                <span className="tl-st-time">{time}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TechLoading;