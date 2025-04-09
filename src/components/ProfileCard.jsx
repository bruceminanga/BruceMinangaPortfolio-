import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import myLogo from "../assets/images/My-logo.png";
import backgroundVideo from "../assets/videos/fire.mp4";

const ProfileCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const shareButtonRef = useRef(null);
  const shareMenuRef = useRef(null);
  const messagePopupRef = useRef(null);
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
      if (
        messagePopupRef.current &&
        !messagePopupRef.current.contains(event.target)
      ) {
        // Check if the click is outside the message popup *or* if the full image is showing
        // This prevents the message popup from closing if you click to open the full image
        if (!showFullImage) {
            setShowMessagePopup(false);
        }
      }
      // Note: Closing the full image is handled separately by its own close handlers
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFullImage]); // Add showFullImage as a dependency

  const handleMyServicesClick = () => {
    navigate("/MyServices");
  };

  const handleMessageClick = () => {
    setShowMessagePopup(true);
  };

  const handleMessageOption = (platform) => {
    let url = "";
    switch (platform) {
      case "WhatsApp":
        url = "https://wa.me/+254705071138"; // Replace with your WhatsApp number
        break;
      case "Telegram":
        url = "https://t.me/bruceminanga"; // Replace with your Telegram username
        break;
      default:
        break;
    }
    if (url) {
      window.open(url, "_blank");
    }
    setShowMessagePopup(false);
  };

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const handleShareOption = (platform) => {
    // *** Remember to replace this with your actual website URL ***
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
        )
        .then(() => alert("Link copied to clipboard. You can paste it on Instagram."))
        .catch(err => console.error('Failed to copy: ', err));
        break;
      case "TikTok":
         navigator.clipboard.writeText(
          `${text} ${decodeURIComponent(websiteUrl)}`
        )
        .then(() => alert("Link copied to clipboard. You can paste it on TikTok."))
        .catch(err => console.error('Failed to copy: ', err));
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

  const handleCloseFullImage = () => {
    setShowFullImage(false);
  };


  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg relative">
      {/* ... (rest of the video and profile header) ... */}
      <div className="relative h-48">
        <video
          autoPlay
          loop
          muted
          playsInline /* Add playsInline for better mobile compatibility */
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-50"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div
            className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105" // Added hover effect
            onClick={handleImageClick}
          >
            <img
              src={myLogo}
              alt="Profile Thumbnail" // Changed alt text slightly
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ... (rest of the profile content and buttons) ... */}
       <div className="pt-16 pb-8 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Bruce Minanga</h2>
        <p className="text-sm text-gray-600 mt-2">
          Philosopher • Philanthropist • DevOps Engineer • Web Developer • Open
          Source Enthusiast • Entrepreneur • Blogger
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
            className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 text-sm hover:bg-gray-200 transition-colors"
            onClick={handleMyServicesClick}
          >
            <svg
              className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> </svg>
            MyServices
          </button>
          <button
            className="flex items-center px-3 py-2 bg-blue-500 rounded-md text-white text-sm hover:bg-blue-600 transition-colors"
            onClick={handleMessageClick}
          >
            <svg
              className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> </svg>
            Message
          </button>
          <div className="relative">
            <button
              ref={shareButtonRef}
              className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 text-sm group hover:bg-gray-200 transition-colors"
              onClick={handleShareClick}
            >
              <svg
                className="w-4 h-4 mr-1 group-hover:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              > <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /> </svg>
              Share
            </button>
            {showShareMenu && (
              <div
                ref={shareMenuRef}
                className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 border border-gray-200" // Added border
              >
                {["Facebook", "Twitter", "WhatsApp", "Instagram", "TikTok"].map(
                  (platform) => (
                    <button
                      key={platform}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left transition-colors"
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

      {/* --- MODIFIED Full Image Modal --- */}
      {showFullImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 cursor-zoom-out"
          onClick={handleCloseFullImage}
        >
          <div
            className="relative max-w-[95vw] max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={myLogo}
              alt="Full Profile"
              className="block max-w-full max-h-[95vh] object-contain"
            />
            <button
              title="Close"
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-40 text-white rounded-full leading-none hover:bg-opacity-60"
              onClick={handleCloseFullImage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* --- End of Full Image Modal --- */}

      {/* Message Popup (No changes needed here for the image issue) */}
      {showMessagePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={messagePopupRef}
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all duration-300 ease-in-out shadow-xl" // Added shadow
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Text me via?
            </h3>
            <div className="flex flex-col space-y-4">
              <button
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleMessageOption("WhatsApp")}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                WhatsApp
              </button>
              <button
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleMessageOption("Telegram")}
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                Telegram
              </button>
            </div>
            <button
              className="mt-4 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
              onClick={() => setShowMessagePopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;