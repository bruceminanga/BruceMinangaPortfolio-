import React, { useState, useEffect, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import AnimatedBackground from "./components/AnimatedBackground";
import "./index.css";

// Lazy-loaded components
const MyServicesPage = lazy(() =>
  import("./components/MyServices/MyServicesPage")
);

// Fixed: Proper lazy loading for ItemDetailView from MyServicesPage
const ItemDetailView = lazy(() =>
  import("./components/MyServices/MyServicesPage").then((module) => ({
    default: module.ItemDetailView,
  }))
);

const CategoryPage = lazy(() => import("./components/MyServices/CategoryPage"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading component until ready
  if (isLoading) {
    return <TechLoading />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative text-gray-800">
        {/* Render the background component */}
        <AnimatedBackground />

        {/* Main content area */}
        <main className="flex-grow relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          {/* Centered container for routes */}
          <div className="max-w-md mx-auto space-y-4">
            <Suspense fallback={<TechLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyServices" element={<MyServicesPage />} />
                <Route
                  path="/services/:category/:id"
                  element={<ItemDetailView />}
                />
                <Route path="/services/:category" element={<CategoryPage />} />
                {/* Add a catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        {/* Footer component */}
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

// Simple 404 component
function NotFound() {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-gray-600">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}

// Footer component - Fixed styling and marquee
function Footer() {
  const quotes = [
    "The projects featured on this website are my all-time favorites. For more of my projects, please visit my GitHub account.",
    "My eyesight got worse due to too much exposure on laptops screen.",
    "Don't act surprised if you come across Chinese characters in my apps. I'm working on my KungFu skills",
  ];

  return (
    <footer className="relative z-10 py-6 px-4 bg-white bg-opacity-90 backdrop-blur-sm border-t border-gray-200">
      {/* Fixed: Simplified marquee with CSS animation */}
      <div className="overflow-hidden whitespace-nowrap mb-4">
        <div className="inline-block animate-marquee">
          {quotes.map((quote, index) => (
            <span
              key={index}
              className="inline-block px-8 text-sm text-gray-700"
            >
              {quote}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {quotes.map((quote, index) => (
            <span
              key={`dup-${index}`}
              className="inline-block px-8 text-sm text-gray-700"
            >
              {quote}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        © {new Date().getFullYear()}, built with React.js & Tailwind; Powered by
        GenZ
      </div>
    </footer>
  );
}

export default App;
