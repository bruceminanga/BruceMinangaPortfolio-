import React, { useState, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import AnimatedBackground from "./components/AnimatedBackground";
import "./index.css";

// ── Lazy routes ───────────────────────────────────────────────────────────────
const MyServicesPage = lazy(() => import("./components/MyServices/MyServicesPage"));
const ItemDetailView = lazy(() =>
  import("./components/MyServices/MyServicesPage").then((m) => ({ default: m.ItemDetailView }))
);
const CategoryPage = lazy(() => import("./components/MyServices/CategoryPage"));

// ── Route suspense fallback ───────────────────────────────────────────────────
const RouteFallback = () => (
  <div className="route-fallback">
    <div className="route-fallback-ring" />
    <span>Loading</span>
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true);

  if (loading) return <TechLoading onComplete={() => setLoading(false)} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,700;9..144,800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg:     #f4f1ec;
          --text-1: #111010;
          --text-2: #6b6560;
          --accent: #c8502a;
          --border: rgba(0,0,0,.07);
          --surface: #ffffff;
          --sh-sm: 0 1px 3px rgba(0,0,0,.05), 0 4px 14px rgba(0,0,0,.05);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          min-height: 100%;
          background: var(--bg);
          color: var(--text-1);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ── layout shell ── */
        .app-shell {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .app-main {
          flex: 1;
          position: relative;
          z-index: 10;
          padding: 48px 16px 32px;
        }

        .app-content {
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── route fallback ── */
        .route-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 64px 0;
          color: var(--text-2);
          font-size: .82rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .route-fallback-ring {
          width: 28px; height: 28px;
          border: 2px solid rgba(200,80,42,.2);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin .8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── 404 page ── */
        .notfound {
          text-align: center;
          padding: 80px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .notfound-code {
          font-family: 'Fraunces', serif;
          font-size: clamp(4rem, 16vw, 7rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -.04em;
          color: var(--text-1);
          opacity: .08;
          user-select: none;
        }
        .notfound-title {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -.02em;
        }
        .notfound-sub {
          font-size: .85rem;
          color: var(--text-2);
          max-width: 280px;
          line-height: 1.6;
        }
        .notfound-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          font-size: .82rem;
          font-weight: 500;
          color: var(--text-1);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 9px 20px;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: var(--sh-sm);
          transition: box-shadow .2s, background .15s;
        }
        .notfound-link:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,.1);
          background: var(--bg);
        }

        /* ── footer ── */
        .app-footer {
          position: relative;
          z-index: 10;
          padding: 20px 0 max(16px, env(safe-area-inset-bottom));
          border-top: 1px solid var(--border);
          background: rgba(244,241,236,.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* marquee */
        .marquee-wrap {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          margin-bottom: 10px;
        }
        .marquee-track {
          display: flex;
          gap: 0;
          width: max-content;
          animation: marquee 36s linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-item {
          white-space: nowrap;
          font-size: .75rem;
          color: var(--text-2);
          padding: 0 32px;
          letter-spacing: .01em;
          line-height: 2;
        }
        .marquee-item::before {
          content: '✦';
          margin-right: 14px;
          color: var(--accent);
          opacity: .6;
          font-size: .6rem;
          vertical-align: middle;
        }

        /* copyright */
        .footer-copy {
          text-align: center;
          font-size: .72rem;
          color: var(--text-2);
          letter-spacing: .04em;
          opacity: .7;
        }
        .footer-copy strong {
          color: var(--accent);
          font-weight: 500;
        }
      `}</style>

      <Router>
        <div className="app-shell">
          <AnimatedBackground />

          <main className="app-main">
            <div className="app-content">
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/"                    element={<Home />} />
                  <Route path="/MyServices"           element={<MyServicesPage />} />
                  <Route path="/services/:category/:id" element={<ItemDetailView />} />
                  <Route path="/services/:category"  element={<CategoryPage />} />
                  <Route path="*"                    element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
function Home() {
  return (
    <>
      <ProfileCard />
      <ProfileDetails />
    </>
  );
}

// ── 404 ───────────────────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-code">404</div>
      <h2 className="notfound-title">Page not found</h2>
      <p className="notfound-sub">
        This corner of Bruce's world doesn't exist — yet.
      </p>
      <a href="#/" className="notfound-link">
        ← Back home
      </a>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
const QUOTES = [
  "The projects featured here are my all-time favourites — for more, visit my GitHub.",
  "My eyesight got worse from too much screen time. You've been warned.",
  "Don't act surprised if you spot Chinese characters in my apps — I'm working on my Kung Fu skills.",
];

function Footer() {
  const doubled = [...QUOTES, ...QUOTES]; // seamless loop

  return (
    <footer className="app-footer">
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((q, i) => (
            <span key={i} className="marquee-item">{q}</span>
          ))}
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} BruceMinanga &nbsp;·&nbsp; Built with React &amp; love &nbsp;·&nbsp; <strong>Powered by GenZ</strong>
      </p>
    </footer>
  );
}

export default App;