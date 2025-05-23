// src/components/AnimatedBackground.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import "../index.css";

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalScrollPosition, setNormalScrollPosition] = useState(0);

  // Overscroll states
  const [isOverscrolling, setIsOverscrolling] = useState(false);
  const [overscrollProgress, setOverscrollProgress] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);

  // Configuration
  const maxOverscrollDepth = 800; // How far you can "scroll" into the background
  const transitionDuration = 600; // ms for smooth transitions

  const wheelTimeoutRef = useRef();
  const animationFrameRef = useRef();

  // Concepts for the background experience
  const concepts = [
    { text: "Innovation", color: "#3b82f6", delay: 0 },
    { text: "Creativity", color: "#8b5cf6", delay: 0.2 },
    { text: "Excellence", color: "#6366f1", delay: 0.4 },
    { text: "Vision", color: "#ec4899", delay: 0.6 },
    { text: "Quality", color: "#14b8a6", delay: 0.8 },
    { text: "Growth", color: "#f59e0b", delay: 1.0 },
    { text: "Passion", color: "#ef4444", delay: 1.2 },
    { text: "Future", color: "#10b981", delay: 1.4 },
  ];

  // Exit overscroll mode
  const exitOverscroll = useCallback(() => {
    setIsOverscrolling(false);
    setOverscrollProgress(0);
    document.body.style.overflow = "";

    // Smooth scroll back to bottom of actual content
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: docHeight - windowHeight,
      behavior: "smooth",
    });
  }, []);

  // Check if user is near bottom of page
  const checkBottomProximity = useCallback(() => {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollableHeight = docHeight - windowHeight;

    if (scrollableHeight <= 0) {
      setIsNearBottom(false);
      return;
    }

    const distanceFromBottom = scrollableHeight - scrollTop;
    const nearBottomThreshold = 100;

    setIsNearBottom(
      distanceFromBottom <= nearBottomThreshold && !isOverscrolling
    );

    return {
      isAtBottom: distanceFromBottom <= 5, // Very close to bottom
      scrollableHeight,
      scrollTop,
    };
  }, [isOverscrolling]);

  // Handle regular scroll
  const handleScroll = useCallback(() => {
    if (isOverscrolling) return;

    setNormalScrollPosition(window.pageYOffset);
    checkBottomProximity();
  }, [isOverscrolling, checkBottomProximity]);

  // Handle mouse movement
  const handleMouseMove = useCallback((e) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  // Main wheel handler for overscroll effect
  const handleWheel = useCallback(
    (e) => {
      const bottomInfo = checkBottomProximity();
      if (!bottomInfo) return;

      const { isAtBottom } = bottomInfo;

      // Clear any existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // If at bottom and scrolling down, enter overscroll mode
      if (isAtBottom && e.deltaY > 0 && !isOverscrolling) {
        e.preventDefault();

        // Smooth transition into overscroll mode
        setIsOverscrolling(true);
        setIsNearBottom(false);
        document.body.style.overflow = "hidden";

        // Add initial scroll momentum
        setOverscrollProgress(Math.min(maxOverscrollDepth, e.deltaY * 0.8));

        return;
      }

      // If in overscroll mode, handle the overscroll
      if (isOverscrolling) {
        e.preventDefault();

        setOverscrollProgress((prev) => {
          const newProgress = prev + e.deltaY * 0.6;

          // If scrolling back up and reach the top, exit overscroll
          if (newProgress <= 0) {
            // Delay exit to prevent immediate re-entry
            wheelTimeoutRef.current = setTimeout(() => {
              exitOverscroll();
            }, 50);
            return 0;
          }

          // Clamp to maximum depth
          return Math.min(maxOverscrollDepth, Math.max(0, newProgress));
        });
      }
    },
    [isOverscrolling, checkBottomProximity, exitOverscroll]
  );

  // Keyboard handler for escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOverscrolling) {
        exitOverscroll();
      }
    },
    [isOverscrolling, exitOverscroll]
  );

  // Setup event listeners
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", checkBottomProximity, { passive: true });

    // Initial check
    checkBottomProximity();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", checkBottomProximity);

      // Cleanup
      document.body.style.overflow = "";
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    handleScroll,
    handleWheel,
    handleMouseMove,
    handleKeyDown,
    checkBottomProximity,
  ]);

  // Generate particles
  const particles = React.useMemo(
    () =>
      Array(25)
        .fill()
        .map((_, i) => ({
          id: i,
          size: Math.random() * 4 + 2,
          x: Math.random() * 100,
          y: Math.random() * 100,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.3,
          parallaxDepth: Math.random() * 0.8 + 0.2,
        })),
    []
  );

  // Calculate animation values
  const progressNormalized = overscrollProgress / maxOverscrollDepth;
  const backgroundOpacity = isOverscrolling
    ? Math.min(0.95, 0.3 + progressNormalized * 0.65)
    : 0.05;
  const conceptsStartShow = 0.2; // Start showing concepts at 20% progress

  return (
    <>
      {/* Main background container */}
      <div
        className="animated-background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: isOverscrolling ? 999 : -1,
          overflow: "hidden",
          transition: `z-index 0s ${
            isOverscrolling ? "0s" : `${transitionDuration}ms`
          }`,
          pointerEvents: isOverscrolling ? "auto" : "none",
        }}
      >
        {/* Gradient Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
            opacity: backgroundOpacity,
            transform: `scale(${1 + progressNormalized * 0.1})`,
            transition: `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`,
          }}
        />

        {/* Particles */}
        {particles.map((particle) => {
          const mouseInfluenceX =
            (mousePosition.x / window.innerWidth - 0.5) * 50;
          const mouseInfluenceY =
            (mousePosition.y / window.innerHeight - 0.5) * 50;
          const scrollInfluence = isOverscrolling
            ? overscrollProgress * particle.parallaxDepth * 0.3
            : normalScrollPosition * particle.parallaxDepth * 0.1;

          const particleOpacity = isOverscrolling
            ? Math.min(0.8, progressNormalized * 1.2)
            : 0.05 +
              (normalScrollPosition /
                (document.documentElement.scrollHeight || 1)) *
                0.1;

          return (
            <div
              key={particle.id}
              style={{
                position: "absolute",
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: `radial-gradient(circle, #6366f1 0%, #8b5cf6 100%)`,
                borderRadius: "50%",
                opacity: particleOpacity,
                transform: `translate(${
                  mouseInfluenceX * particle.parallaxDepth
                }px, ${
                  mouseInfluenceY * particle.parallaxDepth - scrollInfluence
                }px)`,
                transition: "opacity 0.3s ease",
                boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)",
              }}
            />
          );
        })}

        {/* Floating Concepts */}
        {concepts.map((concept, idx) => {
          const conceptProgress = Math.max(
            0,
            (progressNormalized - conceptsStartShow - concept.delay * 0.1) / 0.3
          );
          const opacity = Math.min(1, conceptProgress * 2);
          const scale = 0.8 + Math.min(0.4, conceptProgress * 1.2);
          const yOffset = (1 - conceptProgress) * 100;

          // Arrange concepts in a spiral pattern
          const angle =
            (idx / concepts.length) * Math.PI * 2 + overscrollProgress * 0.001;
          const radius = 30 + Math.sin(overscrollProgress * 0.005) * 10;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius * 0.6;

          if (!isOverscrolling || opacity <= 0) return null;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%) scale(${scale}) translateY(${yOffset}px)`,
                color: concept.color,
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: "700",
                opacity: opacity,
                textShadow: `0 0 20px ${concept.color}40`,
                whiteSpace: "nowrap",
                transition: "all 0.4s ease",
                userSelect: "none",
              }}
            >
              {concept.text}
            </div>
          );
        })}

        {/* Exit Button */}
        {isOverscrolling && progressNormalized > 0.1 && (
          <button
            onClick={exitOverscroll}
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              zIndex: 1000,
              boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
              opacity: Math.min(1, (progressNormalized - 0.1) * 2),
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateX(-50%) translateY(-3px)";
              e.target.style.boxShadow = "0 12px 35px rgba(99, 102, 241, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateX(-50%)";
              e.target.style.boxShadow = "0 8px 25px rgba(99, 102, 241, 0.4)";
            }}
          >
            ← Return to Content
          </button>
        )}
      </div>

      {/* Bottom scroll indicator */}
      {isNearBottom && !isOverscrolling && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(99, 102, 241, 0.9)",
            backdropFilter: "blur(10px)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "30px",
            fontSize: "0.9rem",
            fontWeight: "500",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 8px 25px rgba(99, 102, 241, 0.3)",
            animation: "fadeInUp 0.4s ease",
          }}
        >
          <span style={{ animation: "bounce 1.5s infinite" }}>↓</span>
          <span>Keep scrolling to explore</span>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedBackground;
