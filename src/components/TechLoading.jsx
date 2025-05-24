import React, { useState, useEffect, useMemo } from "react";

const TechLoading = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const fullText = useMemo(
    () =>
      " Loading modules...\n Optimizing performance...\n portfolio successfully started...",
    []
  );

  useEffect(() => {
    let index = 0;
    let statusTimeout;
    let completeTimeout;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        // Add delay before showing status bar to let user read the output
        statusTimeout = setTimeout(() => {
          setShowStatus(true);
          // Give users time to read the completion status, then signal we're done
          completeTimeout = setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 2000); // 2 seconds to read the status
        }, 2000); // 2 second delay
      }
    }, 80);

    return () => {
      clearInterval(timer);
      if (statusTimeout) {
        clearTimeout(statusTimeout);
      }
      if (completeTimeout) {
        clearTimeout(completeTimeout);
      }
    };
  }, [fullText, onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-700 px-4 py-2 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-300 text-sm font-medium">
            BruceMinanga@Fedora: ~
          </div>
          <div className="w-16"></div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm bg-gray-900">
          {/* Powerline-style prompt */}
          <div className="flex items-center mb-4">
            {/* User segment */}
            <div className="relative">
              <div className="bg-blue-600 text-white px-3 py-1 font-bold">
                BruceMinanga
              </div>
              <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-blue-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>

            {/* System segment */}
            <div className="relative ml-2">
              <div className="bg-green-600 text-white px-3 py-1 font-bold">
                Fedora
              </div>
              <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-green-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>

            {/* Path segment */}
            <div className="relative ml-2">
              <div className="bg-purple-600 text-white px-3 py-1">~</div>
              <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-purple-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>

            {/* Git segment */}
            <div className="relative ml-2">
              <div className="bg-orange-600 text-white px-3 py-1 flex items-center">
                <span className="mr-1">⎇</span>
                <span>main</span>
              </div>
              <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-orange-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>

            <span className="text-gray-300 ml-4"> {">"} </span>
          </div>

          {/* Command input line (static) */}
          <div className="text-green-400 mb-2">
            <span className="text-gray-300">BruceMinanga@Fedora</span>
            <span className="text-gray-400"> ~ </span>
            <span className="text-gray-300">{">"} </span>
            <span className="text-blue-400">systemctl start portfolio.sh</span>
          </div>

          {/* Command output (animated) */}
          <div className="text-green-400">
            <pre className="whitespace-pre-wrap leading-relaxed">{text}</pre>
            <span
              className={`inline-block w-2 h-5 ml-1 bg-green-400 ${
                !isComplete ? "animate-pulse" : ""
              }`}
            ></span>
          </div>

          {/* Status line at bottom (powerline style) */}
          {showStatus && (
            <div className="mt-6 flex items-center">
              <div className="relative">
                <div className="bg-green-600 text-white px-3 py-1 text-xs font-bold">
                  ✓ SUCCESS
                </div>
                <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-green-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>

              <div className="relative ml-2">
                <div className="bg-blue-600 text-white px-3 py-1 text-xs">
                  Portfolio Ready
                </div>
                <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-blue-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>

              <div className="relative ml-2">
                <div className="bg-gray-600 text-white px-3 py-1 text-xs">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechLoading;
