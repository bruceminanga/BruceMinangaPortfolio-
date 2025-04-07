import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import MovingEyes from "./MovingEyes";

const ProfileDetails = () => {
  const [hoveredRole, setHoveredRole] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const roleDescriptions = {
    "Full-Stack Developer":
      "Proficient in both frontend(JavaScript, React, Bootstrap, CSS, Tailwind) and backend technologies (Python, Django).",
    "Linux SysAdmin/DevOps Engineer":
      "Experienced in managing Linux systems and implementing DevOps practices for efficient software delivery.",
    Philosopher:
      "Passionate about exploring deep questions and applying philosophical concepts to problem-solving.",
    "Owner of BruceMinangas.world":
      "A project where I share my systems. These systems include: Life framework system.",
  };

  return (
    <div
      className={`max-w-3xl mx-auto mt-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Content Container */}
      <div className="p-4 md:p-8">
        {/* Introduction Section */}
        <div className="mb-8">
          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            👋 Hi, I'm Bruce the IT guy,{" "}
            {Object.keys(roleDescriptions).map((role, index) => (
              <span key={index} className="relative">
                <span
                  className="relative inline-block cursor-pointer font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300 border-b border-dotted border-blue-300"
                  onMouseEnter={() => setHoveredRole(role)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  {role}
                  {hoveredRole === role && (
                    <span
                      className="absolute z-10 w-64 md:w-72 p-3 text-sm text-white bg-gray-900 rounded-lg shadow-xl whitespace-normal opacity-95 backdrop-blur-sm border border-gray-700"
                      style={{
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        marginTop: "8px",
                      }}
                    >
                      <span
                        className="absolute w-3 h-3 bg-gray-900 transform rotate-45"
                        style={{
                          top: "-6px",
                          left: "50%",
                          marginLeft: "-6px",
                        }}
                      ></span>
                      {roleDescriptions[role]}
                    </span>
                  )}
                </span>
                {index < Object.keys(roleDescriptions).length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>

        {/* Strategy Section */}
        <div className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full mr-3 flex-shrink-0">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            My Strategy
          </h3>
          <p className="text-gray-700 leading-relaxed">
            When learning any tool in technology (sometimes tools outside tech),
            I focus on understanding its core principles/concepts which
            generally are just patterns they are built on. This way, when tools
            change or new ones emerge, I can quickly adapt because I understand
            the underlying principles/concepts they're built on. Also, most
            concepts share the same philosophy; therefore, understanding one
            concept makes it easier to understand newer concepts that are in
            newer tools.
          </p>
        </div>

        {/* Philosophy Section */}
        <div className="mb-8 p-4 md:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded-full mr-3 flex-shrink-0">
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
          <p className="text-gray-700 leading-relaxed">
            If something doesn't work for me as expected, there's likely a
            proven concept I'm missing or not fully grasping. However, if a
            concept for solving a particular problem doesn't exist, I strive to
            create one on my own. I'm always eager to refine this philosophy and
            learn new approaches to problem-solving.
          </p>
          <blockquote className="mt-4 pl-4 border-l-4 border-purple-200 italic text-gray-600">
            Thank you for taking the time to read my about section.
          </blockquote>
        </div>

        {/* Mission Section */}
        <div className="mb-8 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100">
          <h3 className="text-lg md:text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="inline-block w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full mr-3 flex-shrink-0">
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
          <div className="bg-white p-3 md:p-4 rounded-lg mb-4 shadow-inner">
            <div className="text-gray-700 flex flex-wrap items-center justify-center text-center gap-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm md:text-base">
                🌟 使命 🌟 Make the world a better place
              </span>
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm md:text-base">
                🌟 想象 🌟 A model person who provides quality services
              </span>
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm md:text-base">
                🌟 座右铭 🌟 Applying knowledge to solve problems + Moving On +
                Spread Joy
              </span>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="mt-8 text-center">
          <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center justify-center flex-wrap">
            <span className="mr-2">Spy on me via </span>
            <span className="inline-flex">
              <MovingEyes />
            </span>
          </h3>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://www.linkedin.com/in/bruce-minanga-768a55240/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 group"
            >
              <div className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-blue-50 transition-all duration-300">
                <FaLinkedin className="text-2xl md:text-3xl text-blue-600" />
              </div>
              <span className="block mt-2 text-xs md:text-sm text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                LinkedIn
              </span>
            </a>
            <a
              href="https://github.com/bruceminanga"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 group"
            >
              <div className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-gray-50 transition-all duration-300">
                <FaGithub className="text-2xl md:text-3xl text-gray-800" />
              </div>
              <span className="block mt-2 text-xs md:text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                GitHub
              </span>
            </a>
            <a
              href="https://www.hackerrank.com/bruceminanga"
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition-transform hover:scale-110 group"
            >
              <div className="bg-white p-3 rounded-full shadow-md group-hover:shadow-lg group-hover:bg-green-50 transition-all duration-300">
                <SiHackerrank className="text-2xl md:text-3xl text-green-600" />
              </div>
              <span className="block mt-2 text-xs md:text-sm text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                HackerRank
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
