import React, { useState, useEffect, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import "./index.css";

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <TechLoading />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <main className="flex-grow py-8">
          <div className="max-w-md mx-auto space-y-4">
            <Suspense fallback={<TechLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/MyServices" element={<MyServicesPage />} />
                <Route path="/:category/:id" element={<ItemDetailView />} />
                <Route
                  path="/category/:category"
                  element={<MyServicesPage />}
                />
                <Route path="/category/:category" element={<CategoryPage />} />
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

function Footer() {
  const quotes = [
    "The projects featured on this website are my all-time favorites. For more of my projects, please visit my GitHub account.",
    "My eyesight got worse due to too much exposure on laptops screen.",
    "Don't act surprised if you come across Chinese characters in my apps. I'm working on my KungFu skills",
  ];

  return (
    <footer id="main-footer">
      <div className="marquee-container">
        <div className="marquee-content quotes">
          {quotes.map((quote, index) => (
            <span key={index}>{quote}</span>
          ))}
        </div>
      </div>
      <div className="text-center mt-2">
        © {new Date().getFullYear()}, built with Reactjs & Tailwind; Powered by
        Genz
      </div>
    </footer>
  );
}

export default App;
