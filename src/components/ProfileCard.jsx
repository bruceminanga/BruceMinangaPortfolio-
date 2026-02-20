

import React, { useState, useEffect, useRef, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import myLogo from "../assets/images/My-logo.png";
import coverImage from "../assets/images/cover.jpg";

// ---------------------------------------------------------------------------
// Animations (moved out of component — injected once, not on every render)
// ---------------------------------------------------------------------------
const ANIMATION_STYLES = `
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }
  @keyframes musicNote {
    0%, 100% { transform: translateY(0)   rotate(0deg); }
    25%       { transform: translateY(-3px) rotate(5deg); }
    75%       { transform: translateY(3px)  rotate(-5deg); }
  }
  @keyframes pulseRing {
    0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
  }
  .dream-text {
    background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 8s ease-in-out infinite;
    cursor: pointer;
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
  }
  .dream-text:hover { transform: translateY(-2px); }
  .music-icon { animation: musicNote 2s ease-in-out infinite; }
  .dream-container:hover .click-hint { opacity: 1; }
  .pulse-ring {
    position: absolute;
    top: 50%; left: 50%;
    width: 20px; height: 20px;
    border: 2px solid #c4b5fd;
    border-radius: 9999px;
    opacity: 0.3;
    pointer-events: none;
    animation: pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite;
  }
`;

// ---------------------------------------------------------------------------
// Custom hook — returns live Nairobi time & open/closed status
// Derived values, not stored state. Re-runs on a 1-minute interval.
// ---------------------------------------------------------------------------
function useNairobiTime() {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Nairobi",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const getSnapshot = () => {
    const timeStr = formatter.format(new Date());
    const hour = parseInt(timeStr.split(":")[0], 10);
    return { currentTime: timeStr, isOpen: hour >= 6 && hour < 24 };
  };

  const [snapshot, setSnapshot] = useState(getSnapshot);

  useEffect(() => {
    const id = setInterval(() => setSnapshot(getSnapshot()), 60_000);
    return () => clearInterval(id);
    // formatter is stable (created outside) — no deps needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return snapshot;
}

// ---------------------------------------------------------------------------
// UI state — three modal/menu flags collapsed into a reducer
// https://react.dev/reference/react/useReducer
// ---------------------------------------------------------------------------
const INITIAL_UI = { messageOpen: false, shareOpen: false, imageOpen: false };

function uiReducer(state, action) {
  switch (action.type) {
    case "OPEN_MESSAGE":  return { ...INITIAL_UI, messageOpen: true };
    case "OPEN_SHARE":    return { ...INITIAL_UI, shareOpen: true };
    case "OPEN_IMAGE":    return { ...INITIAL_UI, imageOpen: true };
    case "CLOSE_ALL":     return INITIAL_UI;
    case "TOGGLE_SHARE":  return { ...INITIAL_UI, shareOpen: !state.shareOpen };
    default:              return state;
  }
}

// ---------------------------------------------------------------------------
// Share / message platform config — data out of JSX for readability
// ---------------------------------------------------------------------------
const SHARE_PLATFORMS = ["Facebook", "Twitter", "WhatsApp", "Instagram", "TikTok"];
const MESSAGE_PLATFORMS = [
  { name: "WhatsApp", url: "https://wa.me/+254705071138",  color: "bg-green-500 hover:bg-green-600 focus:ring-green-300" },
  { name: "Telegram", url: "https://t.me/bruceminanga",   color: "bg-blue-500  hover:bg-blue-600  focus:ring-blue-300"  },
];

function buildShareUrl(platform) {
  const websiteUrl = encodeURIComponent("https://your-website-url.com");
  const text       = encodeURIComponent("Check out Bruce Minanga's website!");
  switch (platform) {
    case "Facebook":  return `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`;
    case "Twitter":   return `https://twitter.com/intent/tweet?url=${websiteUrl}&text=${text}`;
    case "WhatsApp":  return `https://api.whatsapp.com/send?text=${text} ${websiteUrl}`;
    default:          return null; // Instagram / TikTok → clipboard
  }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
const ProfileCard = () => {
  const { currentTime, isOpen } = useNairobiTime();
  const [ui, dispatch] = useReducer(uiReducer, INITIAL_UI);
  const navigate = useNavigate();

  // Refs for outside-click detection (share menu only; dialogs handle their own)
  const shareButtonRef = useRef(null);
  const shareMenuRef   = useRef(null);

  // Inject animation styles once
  useEffect(() => {
    if (document.getElementById("profile-card-styles")) return;
    const tag = document.createElement("style");
    tag.id = "profile-card-styles";
    tag.textContent = ANIMATION_STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  // Outside-click for the share menu (dialogs handle Escape/outside natively)
  useEffect(() => {
    if (!ui.shareOpen) return;
    const handler = (e) => {
      if (
        !shareMenuRef.current?.contains(e.target) &&
        !shareButtonRef.current?.contains(e.target)
      ) {
        dispatch({ type: "CLOSE_ALL" });
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ui.shareOpen]);

  // Dialog refs — the browser handles focus-trap & Escape automatically
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
  const messageDlgRef = useRef(null);
  const imageDlgRef   = useRef(null);

  useEffect(() => {
    ui.messageOpen ? messageDlgRef.current?.showModal() : messageDlgRef.current?.close();
  }, [ui.messageOpen]);

  useEffect(() => {
    ui.imageOpen ? imageDlgRef.current?.showModal() : imageDlgRef.current?.close();
  }, [ui.imageOpen]);

  // Handlers
  const handleShareOption = async (platform) => {
    const url = buildShareUrl(platform);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // Instagram / TikTok — copy to clipboard
      const text = `Check out Bruce Minanga's website! https://your-website-url.com`;
      try {
        await navigator.clipboard.writeText(text);
        // Prefer a toast/snackbar over alert() in production
        alert(`Link copied! Paste it on ${platform}.`);
      } catch {
        alert("Clipboard write failed. Please copy the URL manually.");
      }
    }
    dispatch({ type: "CLOSE_ALL" });
  };

  const handleMessageOption = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
    dispatch({ type: "CLOSE_ALL" });
  };

  // Icon helpers (extracted to avoid repetition)
  const MusicNote = ({ size = 5 }) => (
    <svg className={`music-icon w-${size} h-${size} text-purple-400 opacity-70`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative">

      {/* ── Cover / Header ─────────────────────────────────────────── */}
      <div className="relative h-48">
        <img src={coverImage} alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-50" />

        {/* Profile avatar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <button
            className="w-24 h-24 rounded-full border-4 border-white overflow-hidden
                       transition-transform duration-200 hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => dispatch({ type: "OPEN_IMAGE" })}
            aria-label="View full profile image"
            type="button"
          >
            <img src={myLogo} alt="Bruce Minanga" className="w-full h-full object-cover" loading="lazy" />
          </button>
        </div>
      </div>

      {/* ── Profile content ─────────────────────────────────────────── */}
      <div className="pt-16 pb-8 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Bruce Minanga</h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          DevSecOps Engineer • Building Secure, Scalable Infrastructure with Docker, Kubernetes & CI/CD
        </p>
        <p className={`text-sm mt-2 font-medium ${isOpen ? "text-green-500" : "text-red-500"}`} aria-live="polite">
          {isOpen ? "🟢 Open" : "🔴 Closed"} • Current time: {currentTime} (Nairobi, Kenya)
        </p>

        {/* ── Action buttons ────────────────────────────────────────── */}
        <div className="mt-6 flex justify-center flex-wrap gap-2">

          {/* Playground */}
          <button
            className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700
                       text-sm hover:bg-gray-200 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => navigate("/MyServices")}
            type="button"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Playground
          </button>

          {/* Message */}
          <button
            className="flex items-center px-3 py-2 bg-blue-500 rounded-md text-white
                       text-sm hover:bg-blue-600 transition-colors
                       focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => dispatch({ type: "OPEN_MESSAGE" })}
            type="button"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Message
          </button>

          {/* Share */}
          <div className="relative">
            <button
              ref={shareButtonRef}
              className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700
                         text-sm hover:bg-gray-200 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => dispatch({ type: "TOGGLE_SHARE" })}
              aria-expanded={ui.shareOpen}
              aria-haspopup="true"
              type="button"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

            {ui.shareOpen && (
              <div ref={shareMenuRef}
                className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md shadow-xl
                           border border-gray-200 overflow-hidden z-10"
                role="menu" aria-orientation="vertical"
              >
                {SHARE_PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    className="block w-full px-4 py-2 text-sm text-gray-700 text-left
                               hover:bg-gray-100 transition-colors
                               focus:outline-none focus:bg-gray-100"
                    onClick={() => handleShareOption(platform)}
                    role="menuitem"
                    type="button"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Dreams / music link ───────────────────────────────────── */}
        <div className="dream-container relative inline-block mt-6">
          <div className="flex items-center justify-center gap-3">
            <MusicNote size={5} />
            <p
              className="dream-text text-sm font-light tracking-wide leading-relaxed"
              onClick={() => window.open("https://www.youtube.com/watch?v=dcCZ8ZS88NI", "_blank", "noopener,noreferrer")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && window.open("https://www.youtube.com/watch?v=dcCZ8ZS88NI", "_blank", "noopener,noreferrer")}
              aria-label="Play song: Dreams that keep me awake"
            >
              Dreams that keep me awake.
            </p>
            <MusicNote size={4} />
          </div>
          <div className="click-hint absolute -bottom-6 left-1/2 -translate-x-1/2
                          text-xs text-purple-400 opacity-0 transition-opacity duration-300
                          pointer-events-none font-light whitespace-nowrap">
            🎵 click to play song 🎵
          </div>
          <div className="pulse-ring" />
        </div>
      </div>

      {/* ── Full-image dialog ─────────────────────────────────────────
           <dialog> gives us:  focus-trap, Escape-to-close, ::backdrop,
           and correct ARIA for free — no manual listeners needed.
           https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
      ──────────────────────────────────────────────────────────────── */}
      <dialog
        ref={imageDlgRef}
        className="p-0 rounded-lg max-w-[95vw] max-h-[95vh] bg-transparent
                   backdrop:bg-black/75 open:flex open:items-center open:justify-center"
        onClick={() => dispatch({ type: "CLOSE_ALL" })}
        aria-label="Full profile image"
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <img
            src={myLogo}
            alt="Bruce Minanga — full profile"
            className="block max-w-full max-h-[90vh] object-contain rounded-lg"
          />
          <button
            title="Close (Escape)"
            className="absolute top-2 right-2 p-2 bg-black/40 text-white rounded-full
                       hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            onClick={() => dispatch({ type: "CLOSE_ALL" })}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
      </dialog>

      {/* ── Message dialog ───────────────────────────────────────────── */}
      <dialog
        ref={messageDlgRef}
        className="p-0 rounded-lg w-full max-w-sm shadow-xl
                   backdrop:bg-black/50"
        aria-labelledby="message-title"
      >
        <div className="p-6">
          <h2 id="message-title" className="text-xl font-bold text-gray-900 mb-4">
            Send me a message via:
          </h2>
          <div className="flex flex-col gap-3">
            {MESSAGE_PLATFORMS.map(({ name, url, color }) => (
              <button
                key={name}
                className={`flex items-center justify-center px-4 py-3 text-white rounded-md
                            transition duration-200 hover:scale-105
                            focus:outline-none focus:ring-2 ${color}`}
                onClick={() => handleMessageOption(url)}
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
          <button
            className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md
                       hover:bg-gray-300 transition duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={() => dispatch({ type: "CLOSE_ALL" })}
            type="button"
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default ProfileCard;