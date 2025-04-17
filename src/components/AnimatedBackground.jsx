// src/components/AnimatedBackground.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../index.css'; // Ensure this path is correct

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // --- State for Overscroll ---
  const [isOverscrolling, setIsOverscrolling] = useState(false);
  const [backgroundScroll, setBackgroundScroll] = useState(0); // How "deep" into the overscroll we are
  const overscrollDepth = 1000; // Max depth of the background scroll effect
  const [normalScrollPosition, setNormalScrollPosition] = useState(0); // Keep track for normal parallax

  const backgroundRef = useRef(null);
  const isWheelingRef = useRef(false); // Ref to track if wheel event is actively being processed
  const allowScrollRestorationRef = useRef(true); // Ref to manage scroll restoration logic

  // Concepts for the background
  const concepts = [
    // Keeping the same concepts, maybe fewer for less clutter? Adjust as needed.
    { text: "Knowledge", color: "#3b82f6" }, { text: "Growth", color: "#8b5cf6" },
    { text: "Innovation", color: "#6366f1" }, { text: "Problem Solving", color: "#ec4899" },
    { text: "Quality", color: "#14b8a6" }, { text: "Joy", color: "#f59e0b" },
    { text: "Creativity", color: "#ef4444" }, { text: "Exploration", color: "#10b981" },
    { text: "Vision", color: "#7c3aed" }, { text: "Passion", color: "#f97316" },
    { text: "Curiosity", color: "#0ea5e9" }, { text: "Adaptability", color: "#fde047" }
  ];

  // --- Exit Overscroll Mode ---
  const exitBackgroundMode = useCallback(() => {
    if (!isOverscrolling) return; // Only act if currently overscrolling

    allowScrollRestorationRef.current = false; // Prevent immediate re-entry
    setIsOverscrolling(false);
    setBackgroundScroll(0);
    // No need to force scroll position here, just remove overflow:hidden
    // User can naturally scroll up. Reset ref after a short delay.
    setTimeout(() => {
      allowScrollRestorationRef.current = true;
    }, 100); // Small delay to prevent instant re-triggering
  }, [isOverscrolling]);


  // --- Effect for Body Class ---
  useEffect(() => {
    if (isOverscrolling) {
      document.body.classList.add('overflow-hidden');
      document.body.classList.remove('near-bottom'); // Ensure near-bottom hint is removed
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function to ensure class is removed if component unmounts while overscrolling
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOverscrolling]);


  // --- Effect for Event Listeners (Scroll, Wheel, MouseMove) ---
  useEffect(() => {
    let nearBottomTimeout;

    const handleScroll = () => {
       // Only update normal scroll position if not currently processing a wheel event
       // that might lead to overscrolling. This helps prevent conflicts.
      if (!isWheelingRef.current) {
          const position = window.pageYOffset;
          setNormalScrollPosition(position);

          // --- Near Bottom Indicator Logic ---
          const windowHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight; // Use documentElement for consistency
          const scrollableHeight = docHeight - windowHeight;
          const bottomThreshold = scrollableHeight - 50; // 50px from actual bottom

          const isNearBottom = scrollableHeight > 0 && position >= bottomThreshold && !isOverscrolling;

          if (isNearBottom) {
              clearTimeout(nearBottomTimeout);
              if (!document.body.classList.contains('near-bottom')) {
                   document.body.classList.add('near-bottom');
              }
          } else {
               if (document.body.classList.contains('near-bottom')) {
                  // Delay removal slightly to avoid flickering if user scrolls back/forth near edge
                  nearBottomTimeout = setTimeout(() => {
                     document.body.classList.remove('near-bottom');
                  }, 300);
               }
          }
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // --- Central Wheel Handler ---
    const handleWheel = (e) => {
        isWheelingRef.current = true; // Signal that a wheel event is being processed

        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const isAtActualBottom = scrollTop + windowHeight >= docHeight - 2; // Use a small tolerance (2px)

        // Check if we are trying to scroll DOWN at the very bottom
        if (isAtActualBottom && e.deltaY > 0 && allowScrollRestorationRef.current) {
            e.preventDefault(); // Prevent default page scroll
            if (!isOverscrolling) {
                setIsOverscrolling(true); // Enter overscroll mode
            }
            // Increment background scroll, but clamp it
            setBackgroundScroll(prev => Math.min(overscrollDepth, prev + e.deltaY * 0.5)); // Adjust sensitivity (0.5)
        }
        // Check if we are currently overscrolling and trying to scroll UP
        else if (isOverscrolling && e.deltaY < 0) {
            e.preventDefault(); // Prevent default page scroll (scrolling page up)
            // Decrement background scroll
            setBackgroundScroll(prev => {
                const newValue = prev + e.deltaY * 0.5; // deltaY is negative here
                if (newValue <= 0) {
                    // We've scrolled back to the top of the overscroll area
                    setIsOverscrolling(false); // Exit overscroll mode
                    allowScrollRestorationRef.current = false; // Prevent re-entry immediately
                    setTimeout(() => { allowScrollRestorationRef.current = true; }, 50); // Re-enable after small delay
                    return 0; // Clamp at 0
                }
                return newValue;
            });
        }
        // Otherwise (scrolling normally, or scrolling up at the bottom but not overscrolling),
        // let the default scroll behavior happen.
        // We also need to update the normal scroll position here if default isn't prevented.
        else if (!e.defaultPrevented) {
             // Allow default scroll to happen and update our tracked normal scroll position
            setNormalScrollPosition(window.pageYOffset + e.deltaY);
        }

        // Reset the wheeling flag after a short delay to allow scroll updates to catch up
        setTimeout(() => {
            isWheelingRef.current = false;
        }, 50);
    };

    // Add Listeners
    window.addEventListener('scroll', handleScroll, { passive: true }); // Normal scroll can be passive
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false }); // Wheel needs to be active to preventDefault

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
      document.body.classList.remove('overflow-hidden', 'near-bottom'); // Ensure cleanup
      clearTimeout(nearBottomTimeout);
    };
    // Rerun effect if overscroll status changes to correctly manage listeners/classes if needed
    // Also include exitBackgroundMode in dependency array if its definition could change (though useCallback helps)
  }, [isOverscrolling, exitBackgroundMode]);

  // --- Particle Generation ---
  const particles = React.useMemo(() => Array(30).fill().map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1.5, // Slightly smaller particles
    x: Math.random() * 100,
    y: Math.random() * 100,
    speedFactor: Math.random() * 0.3 + 0.1, // For parallax depth
    randomOffsetX: (Math.random() - 0.5) * 50, // Random offsets for visual interest
    randomOffsetY: (Math.random() - 0.5) * 50,
  })), []); // Generate only once


  // --- Calculate Shared Overscroll Progress ---
  const overscrollProgress = isOverscrolling ? Math.min(1, backgroundScroll / overscrollDepth) : 0;


  return (
    <div
      ref={backgroundRef}
      className={`animated-background ${isOverscrolling ? "overscrolling-active" : ""}`} // Use a different class for active overscroll state
      style={{
          // Ensures the background covers the entire viewport height, especially needed when body is overflow:hidden
           minHeight: '100vh',
           width: '100%',
           position: 'fixed', // Make the background fixed so it doesn't scroll with content
           top: 0,
           left: 0,
           zIndex: -1, // Behind the main content
           overflow: 'hidden' // Prevent its own scrollbars if elements go outside
      }}
    >
      {/* --- Gradient Background --- */}
      <div
        className="gradient-bg" // Defined in index.css
        style={{
          opacity: 0.4 + overscrollProgress * 0.6, // Fade in more during overscroll
          transform: `scale(${1 + overscrollProgress * 0.1}) translateY(${
            isOverscrolling ? overscrollProgress * -50 : normalScrollPosition * 0.1 // Gentle parallax normally, pull down in overscroll
          }px)`,
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        }}
      />

      {/* --- Particles --- */}
      {particles.map((p) => {
         // Calculate parallax movement based on both normal scroll and overscroll
         const mouseOffsetX = (mousePosition.x / window.innerWidth - 0.5) * 30 * (1 - overscrollProgress); // Reduce mouse effect during overscroll
         const mouseOffsetY = (mousePosition.y / window.innerHeight - 0.5) * 30 * (1 - overscrollProgress);

         const normalParallaxY = normalScrollPosition * p.speedFactor * 0.5;
         const overscrollParallaxY = backgroundScroll * p.speedFactor * 0.8; // Stronger parallax during overscroll

         const finalTranslateY = - (isOverscrolling ? overscrollParallaxY : normalParallaxY) + mouseOffsetY + p.randomOffsetY;
         const finalTranslateX = mouseOffsetX + p.randomOffsetX;


         return (
              <div
              key={p.id}
              className="floating-particle" // Defined in index.css
              style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                   opacity: 0.1 + overscrollProgress * 0.7, // Fade in during overscroll
                   // Smoothly transition transform, subtly react to mouse
                   transform: `translate(${finalTranslateX}px, ${finalTranslateY}px)`,
                   transition: 'opacity 0.6s ease, transform 0.2s linear', // Faster transform for mouse/scroll reaction
                   // Animation for floating effect can remain if defined in CSS
                   // animationDuration: `${10 + (p.id % 5)}s`,
                   // animationDelay: `${p.id * 0.2}s`,
              }}
              />
         );
      })}


      {/* --- Concepts --- */}
      {concepts.map((concept, idx) => {
        // Determine visibility and position based on overscroll state
        const conceptProgress = Math.max(0, Math.min(1, (backgroundScroll - idx * (overscrollDepth / concepts.length * 0.8)) / (overscrollDepth * 0.5))); // Staggered appearance based on scroll

        const posY = 100 - conceptProgress * 120; // Moves from bottom (100%) towards top (-20%)
        const posX = 50 + Math.sin(idx * 0.5 + backgroundScroll * 0.005) * 30; // Gentle horizontal sway

        const scale = 0.8 + conceptProgress * (1 - conceptProgress) * 1.2; // Scale up then down slightly as it passes center
        const opacity = Math.max(0, Math.min(1, conceptProgress * 2 * (1 - conceptProgress * 0.9))); // Fade in and then out

        if (!isOverscrolling || opacity <= 0) return null; // Only render visible concepts during overscroll

        return (
          <div
            key={idx}
            className="floating-concept overscroll-concept" // Use specific class
            style={{
              color: concept.color,
              left: `${posX}%`,
              top: `${posY}%`,
              opacity: opacity,
              transform: `translate(-50%, -50%) scale(${scale}) rotate(${Math.sin(idx + backgroundScroll * 0.002) * 5}deg)`, // Gentle rotation
              fontWeight: 700, // Consistent weight
              fontSize: `clamp(1.2rem, 1rem + ${scale}vw, 3rem)`, // Responsive font size
              position: 'absolute', // Position within the fixed background container
              whiteSpace: 'nowrap',
              transition: 'opacity 0.3s ease, transform 0.3s ease, top 0.3s ease, left 0.3s ease', // Smooth transitions for properties
              willChange: 'transform, opacity, top, left', // Hint browser for performance
              zIndex: 2 // Ensure concepts are above gradient but potentially below particles if desired
            }}
          >
            {concept.text}
          </div>
        );
      })}


      {/* --- Bottom Indicator (Near Bottom Hint) --- */}
      {/* This is now controlled by the 'near-bottom' class on the BODY tag in CSS */}
      <div className="overscroll-indicator"> {/* Style this using .near-bottom .overscroll-indicator in CSS */}
          <div className="indicator-arrow">↓</div>
          <div className="indicator-text">Scroll to explore concepts</div>
      </div>


      {/* --- Exit Button for Overscroll Mode --- */}
      {isOverscrolling && (
        <button
          className="exit-background-btn"
          onClick={exitBackgroundMode}
           style={{
              // Same styling as before, ensure high z-index within its context
              position: 'fixed', // Fixed position relative to viewport
              bottom: '2rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 100, // Ensure it's above background elements
              // Add the rest of your button styles (padding, color, etc.)
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              padding: '10px 20px', // Slightly smaller padding
              borderRadius: '50px',
              border: 'none',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem', // Slightly smaller font
              fontWeight: '600',
              opacity: Math.min(1, backgroundScroll / (overscrollDepth * 0.2)), // Fade in as user scrolls deeper
           }}
           onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
           }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateX(-50%)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
           }}
        >
          Return to Content ↑
        </button>
      )}
    </div>
  );
};

export default AnimatedBackground;