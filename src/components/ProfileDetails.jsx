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
          I integrate concepts with technical knowlege to craft solutions that
          are not just functional, but thoughtful and forward-thinking. This
          approach allows me to:{" "}
        </p>
        <p>
          1. Design user interfaces that are both visually appealing and
          cognitively friendly.
        </p>{" "}
        <p>
          2. Tackle tech problems from multiple angles, combining my IT skills
          with concepts from philosophy to find creative solutions.{" "}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold text-lg mb-2">My Philosophy</h3>
        <p>
          If something doesn't work for me as expected, there's likely a proven
          concept I'm missing or not fully grasping. However, if a concept for
          solving a particular problem doesn't exist, I strive to create one on
          my own. I'm always eager to refine this strategy and learn new
          approaches to problem-solving.
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
