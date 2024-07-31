import React from "react";
import { FaWhatsapp, FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";
import MovingEyes from "./MovingEyes"; // Make sure to import the new component

const ProfileDetails = () => (
  <div className="max-w-md mx-auto mt-4 bg-white rounded-lg overflow-hidden shadow-lg p-6">
    <p>
      Hi👋 I'm Bruce, the IT guy & the owner of BruceMiningas.world, Let me
      bring your digital dreams to life(He/him)
    </p>
    <div className="mb-4">
      <h3 className="font-bold">UseCase:</h3>
      <p>
        -If you text/call & I'm unavailable, Easy! I'll get back to you shortly
      </p>
    </div>
    <div className="mb-4">
      <h3>⚡Fun fact: I'm here to help because why not? I can help with:</h3>
      <ul className="list-disc list-inside">
        <li>Website Development since 2020</li>
        <li>SysAdmin/DevOps Engineering since 2019</li>
        <li>Data Science since 2024</li>
        <li>Sharing Systems @BruceMinangas.world since 2024</li>
      </ul>
    </div>

    <div className="mb-4">
      <h3>
        -My current strengths lie in Linux system administration and web
        development, where I specialize in using Python with Django, JavaScript,
        and the React library.
      </h3>
    </div>
    <div className="mb-4">
      <h3>
        💰You know someone who could use my services? Refer them to me by
        clicking the share button above and get a 30% commission on 1st payment.
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
      </div>
    </div>
  </div>
);

export default ProfileDetails;
