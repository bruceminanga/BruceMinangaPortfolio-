import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import myLogo from "../assets/images/My-logo.jpg";
import backgroundVideo from "../assets/videos/fire.mp4";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showMessageAlert, setShowMessageAlert] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const shareButtonRef = useRef(null);
  const shareMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateOpenStatus = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Africa/Nairobi",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      const nairobiTime = formatter.format(now);
      setCurrentTime(nairobiTime);
      const hour = parseInt(nairobiTime.split(":")[0], 10);
      setIsOpen(hour >= 6 && hour < 24);
    };

    updateOpenStatus();
    const intervalId = setInterval(updateOpenStatus, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareMenuRef.current &&
        !shareMenuRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCatalogClick = () => {
    navigate("/catalog");
  };

  const handleMessageClick = () => {
    setShowMessageAlert(true);
    setTimeout(() => setShowMessageAlert(false), 3000);
  };

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleShareOption = (platform) => {
    const websiteUrl = encodeURIComponent("https://your-website-url.com");
    const text = encodeURIComponent("Check out Bruce Minanga's website!");
    let shareUrl = "";

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}`;
        break;
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${websiteUrl}&text=${text}`;
        break;
      case "WhatsApp":
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${websiteUrl}`;
        break;
      case "Instagram":
        navigator.clipboard.writeText(
          `${text} ${decodeURIComponent(websiteUrl)}`
        );
        alert("Link copied to clipboard. You can paste it on Instagram.");
        break;
      case "TikTok":
        navigator.clipboard.writeText(
          `${text} ${decodeURIComponent(websiteUrl)}`
        );
        alert("Link copied to clipboard. You can paste it on TikTok.");
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }

    setShowShareMenu(false);
  };

  const handleImageClick = () => {
    setShowFullImage(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative">
      <div className="relative h-48">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-50"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div
            className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white overflow-hidden cursor-pointer"
            onClick={handleImageClick}
          >
            <img
              src={myLogo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="pt-16 pb-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Bruce Minanga</h2>
        <p className="text-sm text-gray-600 mt-2">
          Philosopher • Linux SysAdmin(DevOps Engineer) • Web/Android Developer
          • Entrepreneur • Blogger
        </p>
        <p
          className={`text-sm mt-2 ${
            isOpen ? "text-green-500" : "text-red-500"
          }`}
        >
          {isOpen ? "Open" : "Closed"} • Current time: {currentTime} (Nairobi,
          Kenya)
        </p>
        <div className="mt-6 flex justify-center space-x-2">
          <button
            className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 text-sm"
            onClick={handleCatalogClick}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Catalog
          </button>
          <button
            className="flex items-center px-3 py-2 bg-blue-500 rounded-md text-white text-sm"
            onClick={handleMessageClick}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            Message
          </button>
          <div className="relative">
            <button
              ref={shareButtonRef}
              className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 text-sm group"
              onClick={handleShareClick}
            >
              <svg
                className="w-4 h-4 mr-1 group-hover:animate-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
            {showShareMenu && (
              <div
                ref={shareMenuRef}
                className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
              >
                {["Facebook", "Twitter", "WhatsApp", "Instagram", "TikTok"].map(
                  (platform) => (
                    <button
                      key={platform}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleShareOption(platform)}
                    >
                      {platform}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-6">Dreams that keep me awake.</p>
      </div>
      {showMessageAlert && (
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-blue-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Message Feature Unavailable</p>
              <p className="text-sm">
                We're sorry, the messaging feature is not available yet. Kindly
                send me a message on WhatsApp or telegram for now!
              </p>
            </div>
          </div>
        </div>
      )}
      {showFullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-3xl">
            <img
              src={myLogo}
              alt="Full Profile"
              className="max-w-full max-h-full object-contain"
            />
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowFullImage(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
