import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import "./index.css";

// Lazy-loaded components
const MyServicesPage = lazy(() =>
  import("./components/MyServices/MyServicesPage")
);
const ItemDetailView = lazy(() =>
  import("./components/MyServices/MyServicesPage").then((module) => ({
    default: module.ItemDetailView,
  }))
);
const CategoryPage = lazy(() => import("./components/MyServices/CategoryPage"));

// Enhanced AnimatedBackground component
const AnimatedBackground = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeConceptIndex, setActiveConceptIndex] = useState(-1);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isOverscrolling, setIsOverscrolling] = useState(false);
  const [backgroundScroll, setBackgroundScroll] = useState(0);
  const backgroundRef = useRef(null);
  
  // Concepts for the background
  const concepts = [
    { text: "Knowledge", color: "#3b82f6" },
    { text: "Growth", color: "#8b5cf6" },
    { text: "Innovation", color: "#6366f1" },
    { text: "Problem Solving", color: "#ec4899" },
    { text: "Quality", color: "#14b8a6" },
    { text: "Joy", color: "#f59e0b" },
    { text: "Creativity", color: "#ef4444" },
    { text: "Exploration", color: "#10b981" },
    { text: "Vision", color: "#7c3aed" },
    { text: "Passion", color: "#f97316" },
    { text: "Curiosity", color: "#0ea5e9" },
  ];

  const exitBackgroundMode = () => {
    // First remove the overflow-hidden class directly
    document.body.classList.remove('overflow-hidden');
    
    // Update states
    setIsOverscrolling(false);
    setBackgroundScroll(0);
    
    // Give DOM time to update
    setTimeout(() => {
      const scrollTarget = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }, 50);
  };

  useEffect(() => {
    let bottomIndicatorTimeout;
    
    const handleScroll = () => {
      if (isOverscrolling) return; // Don't process normal scroll when in background mode
      
      const position = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight;
      const scrollHeight = docHeight - windowHeight;
      const scrollProgress = position / scrollHeight;
      const conceptsCount = concepts.length / 2; // Only use half for normal scrolling
      
      setScrollPosition(position);

      // Check if user has reached near the bottom (90% of scrollable area)
      const bottomThreshold = docHeight - windowHeight - 50; // 50px from the bottom
      const isNearBottom = position >= bottomThreshold;
      
      if (isNearBottom !== isAtBottom) {
        setIsAtBottom(isNearBottom);
        
        // Show bottom indicator pulsing when near bottom
        if (isNearBottom) {
          clearTimeout(bottomIndicatorTimeout);
          document.body.classList.add('near-bottom');
        } else {
          bottomIndicatorTimeout = setTimeout(() => {
            document.body.classList.remove('near-bottom');
          }, 300);
        }
      }

      // Check for beginning to overscroll - more sensitive detection
      if (isNearBottom && position >= scrollHeight) {
        setIsOverscrolling(true);
        document.body.classList.add('overflow-hidden');
        document.body.classList.remove('near-bottom');
      }

      // Set active concept during normal scrolling
      if (position > 100 && scrollProgress < 0.9 && scrollHeight > 0) {
        const index = Math.min(
          Math.floor(scrollProgress * conceptsCount * 1.5),
          conceptsCount - 1
        );
        setActiveConceptIndex(index);
      } else if (position <= 100) {
        setActiveConceptIndex(-1);
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // This handles scrolling in background mode
    const handleBackgroundScroll = (e) => {
      if (isOverscrolling) {
        e.preventDefault();
        // Adjust background scroll based on wheel delta
        setBackgroundScroll(prev => {
          const delta = e.deltaY * 0.5; // Reduce sensitivity
          const newValue = Math.max(0, Math.min(1000, prev + delta));
          return newValue;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleBackgroundScroll, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleBackgroundScroll);
      document.body.classList.remove('overflow-hidden', 'near-bottom');
      clearTimeout(bottomIndicatorTimeout);
    };
  }, [isOverscrolling, isAtBottom, concepts.length]);

  const particles = Array(30)
    .fill()
    .map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.3 + 0.1,
    }));

  return (
    <div 
      ref={backgroundRef}
      className={`animated-background ${isOverscrolling ? "overscrolling" : ""} ${isAtBottom ? "at-bottom" : ""}`}
    >
      <div
        className="gradient-bg"
        style={{
          transform: isOverscrolling 
            ? `scale(1.1) translateY(${backgroundScroll * 0.05}px)` 
            : `translateY(${scrollPosition * 0.2}px)`,
          opacity: isAtBottom || isOverscrolling ? 1 : 0.5
        }}
      />

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${10 + (particle.id % 5)}s`,
            animationDelay: `${particle.id * 0.2}s`,
            opacity: isOverscrolling 
              ? Math.min(0.9, 0.5 + backgroundScroll / 1000) 
              : Math.max(0, 0.5 - scrollPosition / 2000),
            transform: isOverscrolling
              ? `translate(${(mousePosition.x / window.innerWidth - 0.5) * 30}px, ${
                  (mousePosition.y / window.innerHeight - 0.5) * 30 - backgroundScroll * 0.3
                }px)`
              : `translate(${(mousePosition.x / window.innerWidth - 0.5) * 20}px, ${
                  (mousePosition.y / window.innerHeight - 0.5) * 20
                }px)`,
          }}
        />
      ))}

      {concepts.map((concept, idx) => {
        const isActive = idx === activeConceptIndex;
        const isNearActive = Math.abs(idx - activeConceptIndex) === 1;
        const showInBackground = isOverscrolling || idx < concepts.length / 2;

        // Skip concepts that shouldn't be shown
        if (!showInBackground) return null;

        // Calculate position for background scrolling mode
        let backgroundX, backgroundY;
        if (isOverscrolling) {
          // Create a spiral or interesting pattern
          const angle = (idx / concepts.length) * Math.PI * 6 + backgroundScroll / 100;
          const radius = 25 + (backgroundScroll / 20) % 20;
          backgroundX = 50 + Math.cos(angle) * radius;
          backgroundY = 50 + Math.sin(angle) * radius - (backgroundScroll * 0.1) % 100;
          
          // Wrap around when scrolled far enough
          if (backgroundY < -20) backgroundY += 140;
          if (backgroundY > 120) backgroundY -= 140;
        }

        // Calculate opacity based on mode
        let conceptOpacity;
        if (isOverscrolling) {
          // Fade concepts in/out based on their vertical position when in background mode
          const distanceFromCenter = Math.abs(backgroundY - 50);
          conceptOpacity = distanceFromCenter > 50 ? 0.3 : 1 - (distanceFromCenter / 80);
        } else if (isActive) {
          conceptOpacity = 1;
        } else if (isNearActive) {
          conceptOpacity = 0.4;
        } else {
          conceptOpacity = 0.2;
        }

        // Scale based on position in background mode
        const scale = isOverscrolling
          ? 1 + (1 - Math.min(1, Math.abs(backgroundY - 50) / 40)) * 0.8
          : isActive ? 1.2 : 1;

        return (
          <div
            key={idx}
            className={`floating-concept ${isActive ? "active-concept" : ""} ${
              isOverscrolling ? "overscroll-concept" : ""
            }`}
            style={{
              color: concept.color,
              left: isOverscrolling 
                ? `${backgroundX}%` 
                : (isActive ? "50%" : `${15 + ((idx * 15) % 70)}%`),
              top: isOverscrolling 
                ? `${backgroundY}%` 
                : (isActive ? "50%" : `${20 + ((idx * 12) % 60)}%`),
              animationDuration: (isActive && !isOverscrolling) ? "0s" : `${15 + (idx % 7)}s`,
              animationDelay: `${idx * 0.5}s`,
              opacity: conceptOpacity,
              transform: isOverscrolling
                ? `translate(-50%, -50%) scale(${scale}) rotate(${backgroundScroll * 0.02}deg)`
                : isActive
                  ? `translate(-50%, -50%) scale(1.2)`
                  : `rotate(${scrollPosition * 0.01}deg) translate(${
                      (mousePosition.x / window.innerWidth - 0.5) * -30
                    }px, ${
                      (mousePosition.y / window.innerHeight - 0.5) * -30
                    }px)`,
              transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              zIndex: (isActive || (isOverscrolling && Math.abs(backgroundY - 50) < 20)) ? 5 : "auto",
              fontWeight: (isActive || isOverscrolling) ? 900 : 800,
              fontSize: isOverscrolling 
                ? `calc(${1 + scale * 0.5}rem + ${scale * 0.5}vw)` 
                : "",
            }}
          >
            {concept.text}
          </div>
        );
      })}

      {/* Bottom indicator that appears when near the bottom */}
      <div className="overscroll-indicator">
        <div className="indicator-arrow">↓</div>
        <div className="indicator-text">Keep scrolling to explore concepts</div>
      </div>

      {/* Regular scroll indicator */}
      <div
        className="scroll-indicator"
        style={{ opacity: isOverscrolling || isAtBottom ? 0 : Math.max(0, 1 - scrollPosition / 300) }}
      >
        <div className="scroll-icon">
          <div className="scroll-wheel"></div>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>

      {/* Exit button for background mode */}
      {isOverscrolling && (
        <button 
          className="exit-background-btn"
          onClick={exitBackgroundMode}
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '50px',
            border: 'none',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
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
          Return to content ↑
        </button>
      )}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TechLoading />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative text-gray-800">
        <AnimatedBackground />
        <main className="flex-grow relative z-10 py-20">
          <div className="max-w-md mx-auto space-y-4">
            <Suspense fallback={<TechLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyServices" element={<MyServicesPage />} />
                <Route path="/services/:category/:id" element={<ItemDetailView />} />
                <Route path="/services/:category" element={<CategoryPage />} />
              </Routes>
            </Suspense>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Home component renders the profile parts
function Home() {
  return (
    <>
      <ProfileCard />
      <ProfileDetails />
    </>
  );
}

// Footer component
function Footer() {
  const quotes = [
    "The projects featured on this website are my all-time favorites. For more of my projects, please visit my GitHub account.",
    "My eyesight got worse due to too much exposure on laptops screen.",
    "Don't act surprised if you come across Chinese characters in my apps. I'm working on my KungFu skills",
  ];

  return (
    <footer id="main-footer" className="relative z-10">
      <div className="marquee-container">
        <div className="marquee-content quotes">
          {quotes.map((quote, index) => (
            <span key={index}>{quote}</span>
          ))}
        </div>
      </div>
      <div className="text-center mt-2 text-sm">
        © {new Date().getFullYear()}, built with
        Reactjs & Tailwind; Powered by Genz
      </div>
    </footer>
  );
}

export default App;