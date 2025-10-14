// src/components/Loader.jsx
import React from "react";
import { Building2 } from "lucide-react";

const Loader = ({
  fullScreen = true,
  size = "default",
  message = "Loading...",
  variant = "building", // building, spinner, or pulse
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-16 h-16",
    large: "w-24 h-24",
  };

  const BuildingLoader = () => (
    <div className="relative">
      <style jsx="true">{`
        @keyframes buildingRise {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes windowGlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .building-container {
          animation: buildingRise 2s ease-in-out infinite;
        }

        .window {
          animation: windowGlow 1.5s ease-in-out infinite;
        }

        .window:nth-child(1) {
          animation-delay: 0s;
        }
        .window:nth-child(2) {
          animation-delay: 0.2s;
        }
        .window:nth-child(3) {
          animation-delay: 0.4s;
        }
        .window:nth-child(4) {
          animation-delay: 0.6s;
        }
        .window:nth-child(5) {
          animation-delay: 0.8s;
        }
        .window:nth-child(6) {
          animation-delay: 1s;
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

      {/* Luxury Building Animation */}
      <div className="building-container">
        {/* Main Building */}
        <svg
          viewBox="0 0 200 200"
          className={sizeClasses[size]}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Building Base */}
          <rect
            x="60"
            y="40"
            width="80"
            height="120"
            fill="#0A2540"
            stroke="#CFAF4E"
            strokeWidth="2"
            rx="2"
          />

          {/* Building Top */}
          <polygon
            points="60,40 100,20 140,40"
            fill="#CFAF4E"
            stroke="#0A2540"
            strokeWidth="1"
          />

          {/* Windows Row 1 */}
          <rect
            className="window"
            x="70"
            y="55"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="94"
            y="55"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="118"
            y="55"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />

          {/* Windows Row 2 */}
          <rect
            className="window"
            x="70"
            y="80"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="94"
            y="80"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="118"
            y="80"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />

          {/* Windows Row 3 */}
          <rect
            className="window"
            x="70"
            y="105"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="94"
            y="105"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="118"
            y="105"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />

          {/* Windows Row 4 */}
          <rect
            className="window"
            x="70"
            y="130"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="94"
            y="130"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />
          <rect
            className="window"
            x="118"
            y="130"
            width="12"
            height="15"
            fill="#CFAF4E"
            rx="1"
          />

          {/* Entrance Door */}
          <rect x="88" y="145" width="24" height="15" fill="#CFAF4E" rx="1" />
          <circle cx="106" cy="152" r="1.5" fill="#0A2540" />
        </svg>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        <div
          className="w-2 h-2 bg-[#CFAF4E] rounded-full animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-[#CFAF4E] rounded-full animate-pulse"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-[#CFAF4E] rounded-full animate-pulse"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );

  const SpinnerLoader = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 border-4 border-[#CFAF4E]/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-[#CFAF4E] rounded-full animate-spin"></div>
        <div
          className="absolute inset-2 border-4 border-transparent border-t-[#0A2540] rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1s" }}
        ></div>
      </div>
    </div>
  );

  const PulseLoader = () => (
    <div className="flex gap-2">
      <Building2
        size={size === "small" ? 24 : size === "large" ? 48 : 32}
        className="text-[#CFAF4E] animate-pulse"
      />
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return <SpinnerLoader />;
      case "pulse":
        return <PulseLoader />;
      case "building":
      default:
        return <BuildingLoader />;
    }
  };

  const content = (
    <div className="text-center fade-in-up">
      {renderLoader()}
      {message && (
        <p className="font-['Inter'] text-[#333333] mt-6 text-sm md:text-base animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{content}</div>;
};

// Export additional preset loaders for convenience
export const FullScreenLoader = ({ message }) => (
  <Loader fullScreen={true} variant="building" message={message} />
);

export const InlineLoader = ({
  size = "default",
  message,
  variant = "building",
}) => (
  <Loader fullScreen={false} size={size} variant={variant} message={message} />
);

export const SmallLoader = () => (
  <Loader fullScreen={false} size="small" variant="spinner" message="" />
);

export default Loader;
