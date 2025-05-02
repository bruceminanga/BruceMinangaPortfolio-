import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import MovingEyes from "./MovingEyes";

const ProfileDetails = () => {
  // --- CONSTANTS (Defined before hooks that use them) ---
  const roleDescriptions = {
    "Full-Stack Developer":
      "Proficient in both frontend(JavaScript, React, Bootstrap, CSS, Tailwind) and backend technologies (Python, Django).",
    "DevOps Engineer":
      "Experienced in managing Linux systems and implementing DevOps practices for efficient software delivery.",
    "Owner of BruceMinangas.world":
      "A project showcasing my own unique perceptual world. Wanna explore my world? Then hire me or use my systems!",
  };

  const testimonials = [
    {
      text: "Bruce's strategy of focusing on core principles rather than just tools has completely transformed how our team approaches new technology. We're adapting much faster to industry changes.",
      author: "Pascal Oduor",
      position: "CTO, M-treat company",
      focus: "Strategy",
      color: "blue",
    },
    {
      text: "His philosophical approach to problem-solving is refreshing. When our project hit roadblocks, Bruce's methodology of identifying missing concepts led us to elegant solutions we wouldn't have discovered otherwise.",
      author: "Brax Otieno",
      position: "Software Engineer",
      focus: "Philosophy",
      color: "purple",
    },
    {
      text: "Working with someone who has such a clear mission and vision is inspiring. Bruce genuinely aims to make the world better through technology, and that purpose-driven approach elevates the quality of everything he creates.",
      author: "Joan Wamboi",
      position: "Supervisor, Kenya Pipeline Company",
      focus: "Mission & Vision",
      color: "indigo",
    },
    {
      text: "'Applying Concepts to solve problems' isn't just a motto for Bruce--it's how he operates daily. I've seen him transform complex challenges into manageable pieces through this practical philosophy.",
      author: "Collaboration Partner",
      focus: "Motto",
      color: "green",
    },
  ];

  // --- STATE HOOKS ---
  const [hoveredTestimonial, setHoveredTestimonial] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [windowWidth, setWindowWidth] = useState(() => {
    return typeof window !== "undefined" ? window.innerWidth : 0;
  });

  // --- EFFECT HOOKS ---
  useEffect(() => {
    // Handles resizing and initial visibility animation
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      setWindowWidth(window.innerWidth); // Set initial width
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }
    return () => {}; // Cleanup for SSR/server case
  }, []);

  useEffect(() => {
    // Auto rotate testimonials - testimonials is defined above
    let intervalId = null;
    if (hoveredTestimonial === null && testimonials.length > 0) {
      intervalId = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
    // Cleanup function clears interval if component unmounts or dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [hoveredTestimonial, testimonials.length]); // Dependencies

  // --- HELPER FUNCTION for Testimonial Colors ---
  const getTextColorClass = (color) => {
    switch (color) {
      case "blue":
        return "text-blue-600";
      case "purple":
        return "text-purple-600";
      case "indigo":
        return "text-indigo-600";
      case "green":
        return "text-green-600";
      default:
        return "text-gray-600"; // Fallback
    }
  };

  // --- RETURN JSX ---
  return (
    // *** REMOVED overflow-hidden ***
    <div
      className={`rounded-xl shadow-2xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Overall Padding */}
      <div className="p-4 md:p-6">
        {/* --- Introduction Section (FIXED NESTING) --- */}
        <div className="mb-6 md:mb-8">
          <p className="text-sm md:text-base leading-relaxed text-gray-700">
            👋 Hi, I'm Bruce the IT guy,{" "}
            {Object.keys(roleDescriptions).map((role, index) => (
              <span key={index} className="group relative inline-block mx-1">
                {/* Trigger Text */}
                <span className="inline-block cursor-pointer font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300 border-b border-dotted border-blue-400 hover:border-blue-600">
                  {role}
                </span>

                {/* Tooltip Span */}
                {/* *** CHANGED w-64 to max-w-xs *** */}
                <span
                  className="invisible absolute z-50 max-w-xs p-4 bg-gray-900 text-white text-sm rounded-lg
                              shadow-lg opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity
                              duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2
                              pointer-events-none"
                >
                  {/* Triangle */}
                  <span
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0
                                border-l-8 border-r-8 border-t-8
                                border-l-transparent border-r-transparent border-t-gray-900"
                  ></span>
                  {roleDescriptions[role]}
                </span>
                {/* Comma/Period */}
                {index < Object.keys(roleDescriptions).length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>

        {/* --- Strategy Section --- */}
        <div className="mb-6 md:mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-base md:text-lg font-bold mb-3 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-3 flex-shrink-0 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            My Strategy
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            My approach to learning new tools, both in and out of tech, centers
            on grasping their fundamental principles and underlying patterns.
            This focus ensures that as technologies evolve or new ones appear, I
            can adapt quickly because the core concepts often remain consistent
            or share common philosophies. Understanding one fundamental makes
            learning the next much faster.
          </p>
          <blockquote className="mt-3 pl-4 border-l-4 border-purple-200 italic text-gray-600 text-sm md:text-base">
            It's the power of mastering transferable concepts.
          </blockquote>
        </div>

        {/* --- Philosophy Section --- */}
        <div className="mb-6 md:mb-8 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-base md:text-lg font-bold mb-3 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full mr-3 flex-shrink-0 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </span>
            My Philosophy
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            When I encounter a challenge or something isn't behaving as
            expected, my first step is to identify the established principles I
            might be overlooking or need to understand more deeply. If existing
            concepts don't provide a clear path forward, I embrace the
            opportunity to architect a novel solution. I'm continually refining
            my problem-solving methods, actively seeking approaches that lead to
            robust and automated outcomes.
          </p>
          <blockquote className="mt-3 pl-4 border-l-4 border-purple-200 italic text-gray-600 text-sm md:text-base">
            Thank you for reading. This approach defines how I tackle
            challenges. It's Who I Am.
          </blockquote>
        </div>

        {/* --- Mission Section --- */}
        <div className="mb-6 md:mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100">
          <h3 className="text-base md:text-lg font-bold mb-3 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full mr-3 flex-shrink-0 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            My Mission, Vision & Motto
          </h3>
          <div className="bg-white p-3 rounded-lg mb-3 shadow-inner">
            <div className="text-gray-700 flex flex-wrap items-center justify-center text-center gap-2">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
                🌟 使命 🌟 Make the world a better place
              </span>
              <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs sm:text-sm">
                🌟 想象 🌟 A model person who provides quality services
              </span>
              <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs sm:text-sm">
                🌟 座右铭 🌟 Applying Concepts{" "}
                <span className="inline-block animate-spin text-[1em]">⚙️</span>{" "}
                to solve problems + Moving On + Spread Joy
              </span>
            </div>
          </div>
        </div>

        {/* --- Testimonials Section --- */}
        <div className="mb-6 md:mb-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <h3 className="text-base md:text-lg font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-full mr-3 flex-shrink-0 shadow">
              <FaQuoteLeft className="w-4 h-4" />
            </span>
            What People Say
          </h3>
          {/* Container for rotating testimonials */}
          <div
            className="relative overflow-hidden"
            style={{ minHeight: windowWidth < 640 ? "280px" : "220px" }}
          >
            {testimonials.map((testimonial, index) => {
              // Determine color classes based on testimonial.color
              let borderColorClass = "border-gray-400";
              let quoteColorClass = "text-gray-400";
              let badgeBgColorClass = "bg-gray-100 text-gray-700";

              if (testimonial.color === "blue") {
                borderColorClass = "border-blue-400";
                quoteColorClass = "text-blue-400";
                badgeBgColorClass = "bg-blue-100 text-blue-700";
              } else if (testimonial.color === "purple") {
                borderColorClass = "border-purple-400";
                quoteColorClass = "text-purple-400";
                badgeBgColorClass = "bg-purple-100 text-purple-700";
              } else if (testimonial.color === "indigo") {
                borderColorClass = "border-indigo-400";
                quoteColorClass = "text-indigo-400";
                badgeBgColorClass = "bg-indigo-100 text-indigo-700";
              } else if (testimonial.color === "green") {
                borderColorClass = "border-green-400";
                quoteColorClass = "text-green-400";
                badgeBgColorClass = "bg-green-100 text-green-700";
              }

              return (
                <div
                  key={index}
                  className={`absolute w-full transform transition-all duration-500 cursor-pointer ${
                    index === activeTestimonial
                      ? "opacity-100 translate-x-0" // Active slide
                      : index < activeTestimonial
                      ? "opacity-0 -translate-x-full" // Slide out left
                      : "opacity-0 translate-x-full" // Slide out right
                  }`}
                  onMouseEnter={() => setHoveredTestimonial(index)}
                  onMouseLeave={() => setHoveredTestimonial(null)}
                >
                  {/* Individual Testimonial Card */}
                  <div
                    className={`bg-white p-3 sm:p-4 rounded-lg shadow-sm border-l-4 ${borderColorClass} transition-all duration-300 ${
                      hoveredTestimonial === index
                        ? "shadow-lg transform scale-[1.01]"
                        : ""
                    }`}
                  >
                    <div className="mb-3 flex items-start">
                      <FaQuoteLeft
                        className={`${quoteColorClass} text-opacity-30 text-3xl mr-2 mt-1 hidden sm:block`}
                      />
                      <p className="text-gray-700 leading-relaxed italic text-xs sm:text-sm">
                        {testimonial.text}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-1 sm:mb-0">
                        <p className="font-medium text-gray-800 text-sm sm:text-base">
                          {testimonial.author}
                        </p>
                        {/* Use helper function for position/focus text color */}
                        <p
                          className={`${getTextColorClass(
                            testimonial.color
                          )} text-xs sm:text-sm`}
                        >
                          {testimonial.position || `On my ${testimonial.focus}`}
                        </p>
                      </div>
                      {/* Pagination Badge */}
                      <span
                        className={`px-2 py-0.5 text-[10px] sm:text-xs rounded-full ${badgeBgColorClass} self-start sm:self-auto mt-1 sm:mt-0`}
                      >
                        {index + 1}/{testimonials.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2.5 h-2.5 rounded-full mx-1.5 transition-all duration-300 ${
                  index === activeTestimonial
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* --- Social Links Section --- */}
        <div className="mt-6 md:mt-8 text-center">
          <h3 className="font-bold text-base md:text-lg mb-4 text-gray-800 flex items-center justify-center flex-wrap">
            <span className="mr-2">Spy on me via </span>
            <span className="inline-flex transform scale-75 md:scale-90">
              <MovingEyes />
            </span>
          </h3>
          <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-6 mt-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/bruce-minanga-768a55240/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 group flex flex-col items-center"
            >
              <div className="bg-white p-2 sm:p-3 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-blue-50 transition-all duration-300">
                <FaLinkedin className="text-xl sm:text-2xl md:text-3xl text-blue-600" />
              </div>
              <span className="block mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                LinkedIn
              </span>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/bruceminanga"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 group flex flex-col items-center"
            >
              <div className="bg-white p-2 sm:p-3 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-gray-100 transition-all duration-300">
                <FaGithub className="text-xl sm:text-2xl md:text-3xl text-gray-800" />
              </div>
              <span className="block mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                GitHub
              </span>
            </a>
            {/* HackerRank */}
            <a
              href="https://www.hackerrank.com/profile/bruceminanga"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 group flex flex-col items-center"
            >
              <div className="bg-white p-2 sm:p-3 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-green-50 transition-all duration-300">
                <SiHackerrank className="text-xl sm:text-2xl md:text-3xl text-green-600" />
              </div>
              <span className="block mt-1 text-[10px] sm:text-xs md:text-sm text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                HackerRank
              </span>
            </a>
          </div>
        </div>
      </div>{" "}
      {/* End of overall padding div */}
    </div> // End of component root div
  );
};

export default ProfileDetails;
