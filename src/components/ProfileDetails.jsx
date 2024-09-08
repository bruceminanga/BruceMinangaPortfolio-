import React, { useState } from "react";
import { FaWhatsapp, FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import MovingEyes from "./MovingEyes";

const ProfileDetails = () => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const roleDescriptions = {
    "Full-Stack Developer":
      "Proficient in both frontend(JavaScript, React, Bootstrap, CSS, Tailwind) and backend technologies (Python, Django).",
    "Linux SysAdmin/DevOps Engineer":
      "Experienced in managing Linux systems and implementing DevOps practices for efficient software delivery.",
    Philosopher:
      "Passionate about exploring deep questions and applying philosophical concepts to problem-solving.",
    "Owner of BruceMinangas.world":
      "A project where i share my systems. These systems include: Life framework system.",
  };

  return (
    <div className="max-w-md mx-auto mt-4 bg-white rounded-lg overflow-hidden shadow-lg p-6">
      <div>
        <p>
          👋 Hi, I'm Bruce the IT guy,{" "}
          {Object.keys(roleDescriptions).map((role, index) => (
            <span key={index}>
              <span
                className="relative inline-block cursor-pointer text-blue-600 hover:text-blue-800"
                onMouseEnter={() => setHoveredRole(role)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                {role}
                {hoveredRole === role && (
                  <span className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-black rounded-lg shadow-lg left-1/2 transform -translate-x-1/2 whitespace-normal">
                    {roleDescriptions[role]}
                  </span>
                )}
              </span>
              {index < Object.keys(roleDescriptions).length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>

      <div className="mb-4 mt-8">
        <h3 className="font-bold text-lg mb-2">My Strategy</h3>
        <p>
          I blend technical expertise with a deep understanding of philosophical
          concepts(Which i use as formulas). This unique perspective allows me
          to approach all types of problems creatively and build solutions that
          are not just functional, but thoughtful and forward-thinking. With
          this strategy, i strongly believe if something doesn't work as
          expected, then there is a proven working concept missing or not
          applied correctly.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">How i apply my strategy</h3>
        <p>
          1. In frontend web development, I use psychological principles to
          design user interfaces that are not only visually appealing but also
          cognitively friendly.
        </p>
        <p>
          2. Another philosophical concept i use alot is the game theory, a
          concept used in almost all industries.
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">My mission, vission & motto</h3>
        <p className="mb-2">
          🌟使命🌟Make the world a better place🌟想象🌟A model person who
          provides quality services🌟座右铭🌟 Knowing & understanding my
          job+Moving On+Spread Joy.
        </p>
        <h3 className="font-bold text-lg mb-2" style={{ color: "#005675" }}>
          Spy on me via <MovingEyes />:
        </h3>
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/in/bruce-minanga-768a55240/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl text-blue-700 hover:text-blue-800" />
          </a>
          <a
            href="https://github.com/bruceminanga"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-2xl text-gray-800 hover:text-gray-900" />
          </a>
          <a
            href="https://www.hackerrank.com/bruceminanga"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiHackerrank className="text-2xl text-green-600 hover:text-green-700" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
