import React, { useState, useEffect, lazy, Suspense } from "react"; // Removed useRef as it's not used here directly anymore
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import AnimatedBackground from "./components/AnimatedBackground"; // Import the separated component
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

// AnimatedBackground component is now imported from its own file

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup timer on component unmount
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
        <main className="flex-grow relative z-10 py-20 px-4 sm:px-6 lg:px-8"> {/* Added padding */}
          {/* Centered container for routes */}
          <div className="max-w-md mx-auto space-y-4">
            <Suspense fallback={<TechLoading />}> {/* Fallback for lazy loaded routes */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyServices" element={<MyServicesPage />} />
                {/* Ensure these paths match your service structure */}
                <Route path="/services/:category/:id" element={<ItemDetailView />} />
                <Route path="/services/:category" element={<CategoryPage />} />
                {/* Optional: Add a 404 or catch-all route */}
                {/* <Route path="*" element={<NotFound />} /> */}
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
// Can also be moved to its own file (e.g., src/pages/Home.js) if desired
function Home() {
  return (
    <>
      <ProfileCard />
      <ProfileDetails />
    </>
  );
}

// Footer component
// Can also be moved to its own file (e.g., src/components/Footer.js) if desired
function Footer() {
  const quotes = [
    "The projects featured on this website are my all-time favorites. For more of my projects, please visit my GitHub account.",
    "My eyesight got worse due to too much exposure on laptops screen.",
    "Don't act surprised if you come across Chinese characters in my apps. I'm working on my KungFu skills",
  ];

  return (
    // Added some padding and ensured footer text is visible
    <footer id="main-footer" className="relative z-10 py-4 px-4 bg-gray-100 bg-opacity-70 backdrop-blur-sm">
      <div className="marquee-container"> {/* Ensure CSS for marquee exists */}
        <div className="marquee-content quotes">
          {/* Repeat quotes for seamless looping effect if using CSS animation */}
          {[...quotes, ...quotes].map((quote, index) => (
            <span key={index} className="inline-block px-4">{quote}</span>
          ))}
        </div>
      </div>
      <div className="text-center mt-2 text-sm text-gray-600">
        © {new Date().getFullYear()}, built with Reactjs & Tailwind; Powered by Genz
      </div>
    </footer>
  );
}

export default App;