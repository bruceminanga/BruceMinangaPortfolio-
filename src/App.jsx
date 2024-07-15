import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TechLoading from "./components/TechLoading";
import ProfileCard from "./components/ProfileCard";
import ProfileDetails from "./components/ProfileDetails";
import CatalogPage from "./components/catalogpage/CatalogPage";
import CategoryPage from "./components/catalogpage/CategoryPage";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  if (isLoading) {
    return <TechLoading />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-grow py-8">
          <div className="max-w-md mx-auto space-y-4">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ProfileCard />
                    <ProfileDetails />
                  </>
                }
              />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
            </Routes>
          </div>
        </div>
        <footer id="main-footer">
          <div className="marquee-container">
            <div className="marquee-content quotes">
              <span>
                The projects featured on this website are my all-time favorites.
                For more of my projects, please visit my GitHub account.
              </span>
              <span>
                My eyesight got worse due to too much exposure on laptops
                screen.
              </span>
              <span>
                Don't act surprised if you come across Chinese characters in my
                apps. I'm working on my KungFu skills
              </span>
            </div>
          </div>
          <div className="text-center mt-2">
            © 2024, built with Reactjs & Tailwind; Powered by Genz
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
