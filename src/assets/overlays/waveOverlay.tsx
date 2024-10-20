import React from "react";

const WaveOverlay: React.FC = () => {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 800"
    >
      <defs>
        <linearGradient
          id="backgroundGradient1"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "rgba(253, 79, 104, 0.5)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "rgba(223, 60, 129, 0.5)", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient
          id="backgroundGradient2"
          x1="100%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            style={{ stopColor: "rgba(255, 255, 255, 0.1)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "rgba(255, 255, 255, 0.3)", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <g opacity="0.3">
        {/* Fluid shapes for the services overlay */}
        <path
          d="M0,400 C200,200 600,600 1200,400 L1200,800 L0,800 Z"
          fill="url(#backgroundGradient1)"
        />
        <path
          d="M0,300 C300,100 600,500 1200,300 L1200,800 L0,800 Z"
          fill="url(#backgroundGradient2)"
        />
        <path
          d="M0,600 C500,700 1200,300 1200,800 L0,800 Z"
          fill="url(#backgroundGradient1)"
        />
        <path
          d="M0,400 C200,500 600,200 1200,400 L1200,800 L0,800 Z"
          fill="url(#backgroundGradient2)"
        />
      </g>
    </svg>
  );
};

export default WaveOverlay;
