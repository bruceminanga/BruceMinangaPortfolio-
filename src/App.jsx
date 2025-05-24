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

const ItemDetailView = lazy(() =>
  import("./components/MyServices/MyServicesPage").then((module) => ({
    default: module.ItemDetailView,
  }))
);

const CategoryPage = lazy(() => import("./components/MyServices/CategoryPage"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show TechLoading until it signals completion
  if (isLoading) {
    return <TechLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative text-gray-800">
        <AnimatedBackground />

        <main className="flex-grow relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto space-y-4">
            <Suspense
              fallback={
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading...</p>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyServices" element={<MyServicesPage />} />
                <Route
                  path="/services/:category/:id"
                  element={<ItemDetailView />}
                />
                <Route path="/services/:category" element={<CategoryPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <ProfileCard />
      <ProfileDetails />
    </>
  );
}

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

function Footer() {
  const quotes = [
    "The projects featured on this website are my all-time favorites. For more of my projects, please visit my GitHub account.",
    "My eyesight got worse due to too much exposure on laptops screen.",
    "Don't act surprised if you come across Chinese characters in my apps. I'm working on my KungFu skills",
  ];

  return (
    <footer id="main-footer" className="relative z-10 py-6 px-4">
      <div className="marquee-container mb-4">
        <div className="marquee-content quotes">
          {quotes.map((quote, index) => (
            <span key={index}>{quote}</span>
          ))}
          {quotes.map((quote, index) => (
            <span key={`dup-${index}`}>{quote}</span>
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
