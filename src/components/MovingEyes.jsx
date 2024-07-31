import React, { useState, useEffect } from "react";

const MovingEyes = () => {
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const moveEyes = () => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      setEyePosition({ x, y });
    };

    const interval = setInterval(moveEyes, 2000);
    return () => clearInterval(interval);
  }, []);

  const eyeStyle = {
    transform: `translate(${(eyePosition.x - 50) * 0.04}px, ${
      (eyePosition.y - 50) * 0.04
    }px)`,
  };

  return (
    <span
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: "5px",
      }}
    >
      <svg width="40" height="20" viewBox="0 0 40 20">
        <g className="eye" transform="translate(10 10)">
          <circle
            cx="0"
            cy="0"
            r="9"
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="4" fill="black" style={eyeStyle} />
        </g>
        <g className="eye" transform="translate(30 10)">
          <circle
            cx="0"
            cy="0"
            r="9"
            fill="white"
            stroke="black"
            strokeWidth="1"
          />
          <circle cx="0" cy="0" r="4" fill="black" style={eyeStyle} />
        </g>
      </svg>
    </span>
  );
};

export default MovingEyes;
