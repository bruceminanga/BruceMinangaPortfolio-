import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

const AnimatedBackground = () => {
  // State management
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [normalScrollPosition, setNormalScrollPosition] = useState(0);
  const [isOverscrolling, setIsOverscrolling] = useState(false);
  const [overscrollProgress, setOverscrollProgress] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);

  // Refs for cleanup and performance
  const wheelTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Configuration constants
  const CONFIG = useMemo(
    () => ({
      maxOverscrollDepth: 800,
      transitionDuration: 600,
      nearBottomThreshold: 100,
      conceptsStartShow: 0.2,
      particleCount: 25,
    }),
    []
  );

  // Concepts data
  const concepts = useMemo(
    () => [
      { text: "Innovation", color: "#3b82f6", delay: 0 },
      { text: "Creativity", color: "#8b5cf6", delay: 0.2 },
      { text: "Excellence", color: "#6366f1", delay: 0.4 },
      { text: "Vision", color: "#ec4899", delay: 0.6 },
      { text: "Quality", color: "#14b8a6", delay: 0.8 },
      { text: "Growth", color: "#f59e0b", delay: 1.0 },
      { text: "Passion", color: "#ef4444", delay: 1.2 },
      { text: "Future", color: "#10b981", delay: 1.4 },
    ],
    []
  );

  // Generate particles with memoization
  const particles = useMemo(
    () =>
      Array.from({ length: CONFIG.particleCount }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        parallaxDepth: Math.random() * 0.8 + 0.2,
      })),
    [CONFIG.particleCount]
  );

  // Utility function to get scroll info
  const getScrollInfo = useCallback(() => {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset;
    const scrollableHeight = docHeight - windowHeight;

    return {
      windowHeight,
      docHeight,
      scrollTop,
      scrollableHeight,
      isAtBottom: scrollableHeight > 0 && scrollableHeight - scrollTop <= 5,
      distanceFromBottom: Math.max(0, scrollableHeight - scrollTop),
    };
  }, []);

  // Exit overscroll mode
  const exitOverscroll = useCallback(() => {
    setIsOverscrolling(false);
    setOverscrollProgress(0);
    document.body.style.overflow = "";

    // Smooth scroll back to bottom
    const { docHeight, windowHeight } = getScrollInfo();
    window.scrollTo({
      top: docHeight - windowHeight,
      behavior: "smooth",
    });
  }, [getScrollInfo]);

  // Check bottom proximity
  const checkBottomProximity = useCallback(() => {
    const scrollInfo = getScrollInfo();
    const { scrollableHeight, distanceFromBottom } = scrollInfo;

    if (scrollableHeight <= 0) {
      setIsNearBottom(false);
      return scrollInfo;
    }

    setIsNearBottom(
      distanceFromBottom <= CONFIG.nearBottomThreshold && !isOverscrolling
    );

    return scrollInfo;
  }, [isOverscrolling, CONFIG.nearBottomThreshold, getScrollInfo]);

  // Throttled resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(checkBottomProximity, 100);
  }, [checkBottomProximity]);

  // Handle regular scroll
  const handleScroll = useCallback(() => {
    if (isOverscrolling) return;

    const scrollTop = window.pageYOffset;
    setNormalScrollPosition(scrollTop);
    checkBottomProximity();
  }, [isOverscrolling, checkBottomProximity]);

  // Throttled mouse movement handler
  const handleMouseMove = useCallback((e) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  // Main wheel handler
  const handleWheel = useCallback(
    (e) => {
      const scrollInfo = checkBottomProximity();
      if (!scrollInfo) return;

      const { isAtBottom } = scrollInfo;

      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Enter overscroll mode
      if (isAtBottom && e.deltaY > 0 && !isOverscrolling) {
        e.preventDefault();

        setIsOverscrolling(true);
        setIsNearBottom(false);
        document.body.style.overflow = "hidden";
        setOverscrollProgress(
          Math.min(CONFIG.maxOverscrollDepth, e.deltaY * 0.8)
        );
        return;
      }

      // Handle overscroll
      if (isOverscrolling) {
        e.preventDefault();

        setOverscrollProgress((prev) => {
          const newProgress = prev + e.deltaY * 0.6;

          // Exit overscroll when scrolling back up
          if (newProgress <= 0) {
            wheelTimeoutRef.current = setTimeout(exitOverscroll, 50);
            return 0;
          }

          return Math.min(CONFIG.maxOverscrollDepth, Math.max(0, newProgress));
        });
      }
    },
    [
      isOverscrolling,
      checkBottomProximity,
      exitOverscroll,
      CONFIG.maxOverscrollDepth,
    ]
  );

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && isOverscrolling) {
        exitOverscroll();
      }
    },
    [isOverscrolling, exitOverscroll]
  );

  // Event listeners setup
  useEffect(() => {
    const scrollHandler = { passive: true };
    const wheelHandler = { passive: false };
    const mouseMoveHandler = { passive: true };
    const resizeHandler = { passive: true };

    window.addEventListener("scroll", handleScroll, scrollHandler);
    window.addEventListener("wheel", handleWheel, wheelHandler);
    window.addEventListener("mousemove", handleMouseMove, mouseMoveHandler);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize, resizeHandler);

    // Initial check
    checkBottomProximity();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);

      // Cleanup
      document.body.style.overflow = "";
      [wheelTimeoutRef, animationFrameRef, resizeTimeoutRef].forEach((ref) => {
        if (ref.current) {
          ref.current.clearTimeout
            ? clearTimeout(ref.current)
            : cancelAnimationFrame(ref.current);
        }
      });
    };
  }, [
    handleScroll,
    handleWheel,
    handleMouseMove,
    handleKeyDown,
    handleResize,
    checkBottomProximity,
  ]);

  // Calculate animation values
  const progressNormalized = overscrollProgress / CONFIG.maxOverscrollDepth;
  const backgroundOpacity = isOverscrolling
    ? Math.min(0.95, 0.3 + progressNormalized * 0.65)
    : 0.05;

  // Styles
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: isOverscrolling ? 999 : -1,
    overflow: "hidden",
    transition: `z-index 0s ${
      isOverscrolling ? "0s" : `${CONFIG.transitionDuration}ms`
    }`,
    pointerEvents: isOverscrolling ? "auto" : "none",
  };

  const gradientStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
    opacity: backgroundOpacity,
    transform: `scale(${1 + progressNormalized * 0.1})`,
    transition: `opacity ${CONFIG.transitionDuration}ms ease, transform ${CONFIG.transitionDuration}ms ease`,
  };

  const exitButtonStyle = {
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
  };

  const indicatorStyle = {
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
  };

  return (
    <>
      {/* Main background container */}
      <div style={containerStyle}>
        {/* Gradient Background */}
        <div style={gradientStyle} />

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
                background: "radial-gradient(circle, #6366f1 0%, #8b5cf6 100%)",
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
            (progressNormalized -
              CONFIG.conceptsStartShow -
              concept.delay * 0.1) /
              0.3
          );
          const opacity = Math.min(1, conceptProgress * 2);
          const scale = 0.8 + Math.min(0.4, conceptProgress * 1.2);
          const yOffset = (1 - conceptProgress) * 100;

          // Spiral pattern
          const angle =
            (idx / concepts.length) * Math.PI * 2 + overscrollProgress * 0.001;
          const radius = 30 + Math.sin(overscrollProgress * 0.005) * 10;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius * 0.6;

          if (!isOverscrolling || opacity <= 0) return null;

          return (
            <div
              key={concept.text}
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
            style={exitButtonStyle}
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
        <div style={indicatorStyle}>
          <span style={{ animation: "bounce 1.5s infinite" }}>↓</span>
          <span>Keep scrolling to explore</span>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
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
          0%, 20%, 50%, 80%, 100% {
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
