import React, { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, BookOpen, BookMarked } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { MyServicesItems } from "./MyServicesPage";

const ITEMS_PER_PAGE = 3;

const formatDescription = (text) =>
  text.split("*").map((part, i) =>
    i % 2 === 0 ? part : <strong key={i}>{part}</strong>
  );

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const DetailModal = ({ item, onClose }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="detail-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="detail-card">
        {/* Close pill */}
        <button className="detail-close" onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>

        {/* Carousel */}
        <div className="detail-carousel">
          <ImageCarousel images={item.images} />
        </div>

        {/* Body */}
        <div className="detail-body">
          <div className="detail-header">
            <h2 className="detail-title">{item.title}</h2>
            {item.price && (
              <span className="detail-price">{item.price}</span>
            )}
          </div>

          <p className="detail-desc">
            {formatDescription(
              expanded ? item.fullDescription : item.description
            )}
          </p>

          {item.fullDescription && (
            <button
              className="detail-toggle"
              onClick={() => setExpanded((p) => !p)}
            >
              {expanded ? (
                <><BookMarked size={14} /> Read less</>
              ) : (
                <><BookOpen size={14} /> Read more</>
              )}
            </button>
          )}

          {item.referral && (
            <p className="detail-referral">{item.referral}</p>
          )}
        </div>

        {/* Footer CTA */}
        <div className="detail-footer">
          <button className="detail-cta" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const CategoryPage = () => {
  const { category } = useParams();
  const items = MyServicesItems[category] || [];
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);
  const [selected, setSelected] = useState(null);

  const loadMore = useCallback(
    () => setVisible((v) => Math.min(v + ITEMS_PER_PAGE, items.length)),
    [items.length]
  );

  const label = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --bg:      #f5f3ef;
          --surface: #ffffff;
          --border:  rgba(0,0,0,0.06);
          --text-1:  #111010;
          --text-2:  #6b6560;
          --accent:  #c8502a;
          --accent-light: #fdf0eb;
          --radius:  14px;
          --shadow-sm: 0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04);
          --shadow-md: 0 8px 30px rgba(0,0,0,.10), 0 2px 8px rgba(0,0,0,.06);
        }

        .cp-page {
          min-height: 100svh;
          background: var(--bg);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Top bar ── */
        .cp-topbar {
          position: sticky;
          top: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: rgba(245,243,239,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid var(--border);
        }

        .cp-back {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-1);
          box-shadow: var(--shadow-sm);
          transition: box-shadow .2s, transform .15s;
          text-decoration: none;
        }
        .cp-back:hover {
          transform: translateX(-2px);
          box-shadow: var(--shadow-md);
        }

        .cp-heading {
          font-family: 'Fraunces', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-1);
          letter-spacing: -.02em;
        }

        .cp-count {
          margin-left: auto;
          font-size: .75rem;
          font-weight: 500;
          color: var(--text-2);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 3px 10px;
          border-radius: 999px;
        }

        /* ── List ── */
        .cp-list {
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 680px;
          margin: 0 auto;
        }

        /* ── Card ── */
        .cp-card {
          display: grid;
          grid-template-columns: 72px 1fr 28px;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s, border-color .2s;
          -webkit-tap-highlight-color: transparent;
        }
        .cp-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          border-color: rgba(0,0,0,.1);
        }
        .cp-card:active {
          transform: translateY(0);
        }

        .cp-thumb {
          width: 72px; height: 72px;
          border-radius: 10px;
          object-fit: cover;
          display: block;
          background: var(--bg);
        }

        .cp-card-title {
          font-family: 'Fraunces', serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-1);
          letter-spacing: -.01em;
          line-height: 1.3;
          margin-bottom: 3px;
        }

        .cp-card-snippet {
          font-size: .8rem;
          color: var(--text-2);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cp-card-price {
          display: inline-block;
          margin-top: 6px;
          font-size: .78rem;
          font-weight: 500;
          color: var(--accent);
          background: var(--accent-light);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .cp-chevron {
          color: var(--text-2);
          opacity: .5;
          transition: opacity .2s, transform .2s;
        }
        .cp-card:hover .cp-chevron {
          opacity: 1;
          transform: translateX(2px);
        }

        /* ── Load more ── */
        .cp-loadmore-wrap {
          display: flex;
          justify-content: center;
          padding: 8px 16px 40px;
        }

        .cp-loadmore {
          font-family: 'DM Sans', sans-serif;
          font-size: .85rem;
          font-weight: 500;
          letter-spacing: .04em;
          color: var(--text-1);
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 10px 28px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: background .2s, box-shadow .2s, transform .15s;
        }
        .cp-loadmore:hover {
          background: var(--text-1);
          color: var(--bg);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* ── Modal backdrop ── */
        .detail-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 50;
          animation: backdropIn .25s ease both;
          padding: 0 0 env(safe-area-inset-bottom, 0);
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Modal card (bottom sheet on mobile, centered on desktop) ── */
        .detail-card {
          position: relative;
          background: var(--surface);
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 560px;
          max-height: 90svh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: sheetUp .35s cubic-bezier(.22,1,.36,1) both;
          box-shadow: 0 -8px 40px rgba(0,0,0,.18);
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @media (min-width: 600px) {
          .detail-backdrop { align-items: center; padding: 20px; }
          .detail-card {
            border-radius: 20px;
            animation: cardPop .3s cubic-bezier(.22,1,.36,1) both;
          }
          @keyframes cardPop {
            from { opacity: 0; transform: scale(.94) translateY(12px); }
            to   { opacity: 1; transform: scale(1)  translateY(0); }
          }
        }

        /* drag handle */
        .detail-card::before {
          content: '';
          display: block;
          width: 40px; height: 4px;
          background: rgba(0,0,0,.12);
          border-radius: 9999px;
          margin: 12px auto 0;
          flex-shrink: 0;
        }
        @media (min-width: 600px) {
          .detail-card::before { display: none; }
        }

        .detail-close {
          position: absolute;
          top: 14px; right: 14px;
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,.06);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          color: var(--text-1);
          transition: background .15s;
          z-index: 10;
        }
        .detail-close:hover { background: rgba(0,0,0,.12); }

        .detail-carousel { flex-shrink: 0; }

        .detail-body {
          padding: 20px 22px 12px;
          overflow-y: auto;
          flex: 1;
        }

        .detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .detail-title {
          font-family: 'Fraunces', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-1);
          letter-spacing: -.02em;
          line-height: 1.25;
        }

        .detail-price {
          flex-shrink: 0;
          font-size: .82rem;
          font-weight: 500;
          color: var(--accent);
          background: var(--accent-light);
          padding: 4px 12px;
          border-radius: 999px;
          margin-top: 3px;
        }

        .detail-desc {
          font-size: .88rem;
          color: var(--text-2);
          line-height: 1.7;
          white-space: pre-line;
          margin-bottom: 14px;
        }

        .detail-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: .8rem;
          font-weight: 500;
          color: var(--accent);
          background: var(--accent-light);
          border: none;
          padding: 6px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: opacity .15s;
          margin-bottom: 10px;
        }
        .detail-toggle:hover { opacity: .8; }

        .detail-referral {
          font-size: .78rem;
          color: var(--accent);
          margin-top: 10px;
          opacity: .8;
        }

        .detail-footer {
          padding: 14px 22px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .detail-cta {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
          font-weight: 500;
          color: var(--bg);
          background: var(--text-1);
          border: none;
          padding: 13px;
          border-radius: 10px;
          cursor: pointer;
          transition: opacity .15s, transform .15s;
        }
        .detail-cta:hover { opacity: .85; }
        .detail-cta:active { transform: scale(.98); }
      `}</style>

      <div className="cp-page">
        {/* Top bar */}
        <header className="cp-topbar">
          <Link to="/" className="cp-back" aria-label="Go back">
            <ChevronLeft size={18} />
          </Link>
          <h1 className="cp-heading">{label}</h1>
          <span className="cp-count">{items.length} items</span>
        </header>

        {/* List */}
        <div className="cp-list">
          {items.slice(0, visible).map((item) => (
            <div
              key={item.id}
              className="cp-card"
              onClick={() => setSelected(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(item)}
            >
              <img
                src={item.images[0]}
                alt={item.title}
                className="cp-thumb"
                loading="lazy"
              />
              <div>
                <p className="cp-card-title">{item.title}</p>
                <p className="cp-card-snippet">{item.description}</p>
                {item.price && (
                  <span className="cp-card-price">{item.price}</span>
                )}
              </div>
              <ChevronRight className="cp-chevron" size={18} />
            </div>
          ))}
        </div>

        {/* Load more */}
        {visible < items.length && (
          <div className="cp-loadmore-wrap">
            <button className="cp-loadmore" onClick={loadMore}>
              Load more
            </button>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <DetailModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default CategoryPage;