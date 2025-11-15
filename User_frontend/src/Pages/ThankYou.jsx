import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleBackToProperties = () => {
    navigate("/properties");
  };

  // 🔥 Trigger conversion event on page load
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17408508305/k1XKCMnwkL8bEJGDg-1A",
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-4xl font-bold text-[#0a1a33] mb-4 flex items-center justify-center gap-2">
        Thank You! <span className="text-4xl">🎉</span>
      </h1>

      <p className="text-gray-600 text-lg max-w-md leading-relaxed mb-1">
        Your enquiry has been received.
      </p>
      <p className="text-gray-600 text-lg max-w-md leading-relaxed mb-8">
        Our team will contact you shortly with the details.
      </p>

      <button
        onClick={handleBackToProperties}
        className="relative text-lg font-semibold text-[#0a1a33] flex items-center gap-2 
             transition-all duration-200
             hover:text-[#c29b45] 
             active:scale-95"
      >
        👉 Continue Browsing Properties
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#c29b45] transition-all duration-300 hover:w-full" />
      </button>
    </div>
  );
}
