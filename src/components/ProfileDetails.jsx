import React from "react";
import { FaWhatsapp, FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import MovingEyes from "./MovingEyes"; // Make sure to import the new component

const ProfileDetails = () => (
  <div className="max-w-md mx-auto mt-4 bg-white rounded-lg overflow-hidden shadow-lg p-6">
    <p>
      👋 Hi, I'm Bruce the IT guy, Full-Stack Developer, Linux SysAdmin, Tech
      Philosopher and the Owner of BruceMinangas.world. I Offer:
    </p>

    <div className="mb-4">
      <ul className="list-disc list-inside">
        <li>
          Web & Android App Development (2019-present) Frontend: JavaScript
          (React), CSS (Bootstrap, Tailwind CSS) Backend: Python (Django)
        </li>
        <li>Linux SysAdmin & DevOps (2020-present) Docker/Podman expertise</li>
      </ul>
    </div>

    <div className="mb-4">
      <h3 className="font-bold text-lg mb-2">My Strategy</h3>
      <p>
        I blend technical expertise with a deep understanding of philosophical
        concepts in tech. This unique perspective allows me to approach problems
        creatively and build solutions that are not just functional, but
        thoughtful and forward-thinking.
      </p>
    </div>
    <div className="mb-4">
      <h3>
        In frontend development, I leverage psychological principles to design
        user interfaces that are not only visually appealing but also
        cognitively friendly. This approach results in products that resonate
        more deeply with users, improving engagement and overall user
        experience. By combining technical skills with insights from philosophy
        and psychology, I strive to develop solutions that address both the
        logical and emotional needs of users, creating more holistic and
        impactful digital experiences.
      </h3>
    </div>

    <div className="mt-6">
      <h3 className="font-bold text-lg mb-2">Mission, vission & motto</h3>
      <p className="mb-2">
        🌟使命🌟Make the world a better place🌟想象🌟A model person who provides
        quality services🌟座右铭🌟 Knowing & understanding my job+Moving
        On+Spread Joy.
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

export default ProfileDetails;
