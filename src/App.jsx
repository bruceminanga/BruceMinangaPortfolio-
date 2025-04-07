import React, { useState, useEffect, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import "./index.css"; // Make sure this import is present

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

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = position / scrollHeight;
      const conceptsCount = concepts.length;

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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Removed concepts from dependency array if it was there

  const particles = Array(20)
    .fill()
    .map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.3 + 0.1,
    }));

  const concepts = [
    { text: "Knowledge", color: "#3b82f6" },
    { text: "Growth", color: "#8b5cf6" },
    { text: "Innovation", color: "#6366f1" },
    { text: "Problem Solving", color: "#ec4899" },
    { text: "Quality", color: "#14b8a6" },
    { text: "Joy", color: "#f59e0b" },
  ];

  return (
    // Ensure this div covers the screen and is behind content
    <div className="animated-background">
      <div
        className="gradient-bg"
        style={{
          transform: `translateY(${scrollPosition * 0.2}px)`,
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
            // Keep particles subtle
            opacity: Math.max(0, 0.5 - scrollPosition / 2000),
            transform: `translate(${
              (mousePosition.x / window.innerWidth - 0.5) * 20
            }px, ${(mousePosition.y / window.innerHeight - 0.5) * 20}px)`,
          }}
        />
      ))}

      {concepts.map((concept, idx) => {
        const isActive = idx === activeConceptIndex;
        const isNearActive = Math.abs(idx - activeConceptIndex) === 1;

        // --- REFINED OPACITY LOGIC ---
        let conceptOpacity;
        if (isActive) {
          conceptOpacity = 1; // Fully opaque when active
        } else if (isNearActive) {
          conceptOpacity = 0.4; // Visible when near active
        } else {
          conceptOpacity = 0.2; // Base visibility (matches CSS base opacity)
        }
        // Optional subtle fade on very deep scroll - keep if desired, otherwise remove
        // conceptOpacity = Math.max(0.1, conceptOpacity - scrollPosition / 15000);

        return (
          <div
            key={idx}
            // Apply active-concept class for CSS targeting
            className={`floating-concept ${isActive ? "active-concept" : ""}`}
            style={{
              color: concept.color,
              left: isActive ? "50%" : `${15 + ((idx * 15) % 70)}%`,
              top: isActive ? "50%" : `${20 + ((idx * 12) % 60)}%`,
              animationDuration: isActive ? "0s" : `${15 + (idx % 7)}s`,
              animationDelay: `${idx * 0.5}s`,
              // Use the calculated opacity
              opacity: conceptOpacity,
              transform: isActive
                ? `translate(-50%, -50%) scale(1.2)` // Active concept centered and scaled
                : `rotate(${scrollPosition * 0.01}deg) translate(${
                    // Non-active concepts react to mouse/scroll
                    (mousePosition.x / window.innerWidth - 0.5) * -30
                  }px, ${
                    (mousePosition.y / window.innerHeight - 0.5) * -30
                  }px)`,
              transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)", // Smooth transitions
              // Text shadow is now handled purely in CSS via .floating-concept and .active-concept classes
              zIndex: isActive ? 5 : "auto", // Active concept appears above others
              fontWeight: isActive ? 900 : 800,
            }}
          >
            {concept.text}
          </div>
        );
      })}

      {/* Keep scroll indicator if desired */}
      <div
        className="scroll-indicator"
        style={{ opacity: Math.max(0, 1 - scrollPosition / 300) }}
      >
        <div className="scroll-icon">
          <div className="scroll-wheel"></div>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>

      {/* No need for <style jsx> here if styles are in index.css */}
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Increased loading time for demonstration if needed, otherwise keep original
    const timer = setTimeout(() => setIsLoading(false), 2000); // Example: 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TechLoading />;
  }

  return (
    <Router>
      {/* Main container */}
      <div className="min-h-screen flex flex-col relative text-gray-800">
        {" "}
        {/* Added default text color */}
        {/* Background component is fixed and behind everything (z-0) */}
        <AnimatedBackground />
        {/* Main content area */}
        {/* Needs relative positioning and z-index > 0 to be above background */}
        {/* Added more vertical padding (py-16 or py-20) */}
        <main className="flex-grow relative z-10 py-20">
          {/* This inner div receives the semi-transparent background styles */}
          <div className="max-w-md mx-auto space-y-4">
            {" "}
            {/* space-y might need adjustment based on ProfileCard/Details margins */}
            <Suspense fallback={<TechLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyServices" element={<MyServicesPage />} />
                {/* Ensure correct path param names */}
                <Route
                  path="/services/:category/:id"
                  element={<ItemDetailView />}
                />
                {/* Check route duplication/specificity */}
                <Route path="/services/:category" element={<CategoryPage />} />
                {/* Original routes - check if needed */}
                {/* <Route path="/category/:category" element={<MyServicesPage />} /> */}
                {/* <Route path="/category/:category" element={<CategoryPage />} /> */}
              </Routes>
            </Suspense>
          </div>
        </main>
        {/* Footer needs z-index > 0 */}
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
    // Footer is styled via #main-footer id in CSS
    <footer id="main-footer" className="relative z-10">
      {" "}
      {/* Ensure z-index */}
      <div className="marquee-container">
        <div className="marquee-content quotes">
          {quotes.map((quote, index) => (
            <span key={index}>{quote}</span>
          ))}
        </div>
      </div>
      <div className="text-center mt-2 text-sm">
        {" "}
        {/* Adjusted text size */}© {new Date().getFullYear()}, built with
        Reactjs & Tailwind; Powered by Genz
      </div>
    </footer>
  );
}

export default App;
