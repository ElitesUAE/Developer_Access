import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";

export default function ThankYou() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#eef2f6] px-4 overflow-hidden animate-fadeIn">
      {/* Confetti burst */}
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={180} gravity={0.35} />
      )}

      {/* Soft floating golden/white blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-72 h-72 bg-[#d4b26a26] rounded-full blur-3xl animate-orbFloat" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 w-80 h-80 bg-white/60 rounded-full blur-3xl animate-orbFloatSlow" />

      {/* Center content without solid box */}
      <div className="relative max-w-2xl w-full text-center animate-popIn">
        {/* Glow ring behind icon */}
        <div className="absolute left-1/2 -top-16 -translate-x-1/2 w-36 h-36 rounded-full bg-[#d5b36a33] blur-3xl" />

        {/* Icon */}
        <div className="relative flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-white border border-[#e5e7eb] flex items-center justify-center shadow-lg animate-iconPop">
            <CheckCircle
              size={70}
              className="text-green-600 drop-shadow-[0_0_12px_rgba(22,163,74,0.6)] animate-checkPulse"
            />
          </div>
        </div>

        {/* Better content text */}
        <h1 className="text-4xl font-semibold text-[#0a1a33] mb-4 tracking-wide animate-staggerFade delay-[120ms]">
          Thank you! Your inquiry has been submitted
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-3 animate-staggerFade delay-[200ms]">
          We’ve successfully recorded your details and shared them with our
          property team.
        </p>

        <p className="text-sm text-gray-500 mb-10 animate-staggerFade delay-[320ms]">
          In the meantime, you can continue exploring more properties or return
          to the home page.
        </p>

        {/* CTA button */}
        <a
          href="/"
          className="relative inline-flex items-center justify-center rounded-xl
                     bg-gradient-to-r from-[#d5b36a] via-[#facc6b] to-[#c29b45]
                     text-white font-medium text-lg px-8 py-3
                     shadow-lg hover:shadow-2xl
                     transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d5b36a] focus:ring-offset-[#eef2f6]
                     overflow-hidden group animate-staggerFade delay-[420ms]"
        >
          <span className="relative z-10">Back to Home</span>
          {/* Shimmer */}
          <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-[120%] transition-all duration-700" />
        </a>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes popIn {
          0% { transform: scale(0.97) translateY(8px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-popIn {
          animation: popIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes orbFloat {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(10px, -12px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-orbFloat {
          animation: orbFloat 18s ease-in-out infinite;
        }

        @keyframes orbFloatSlow {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-16px, 14px, 0) scale(1.03); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        .animate-orbFloatSlow {
          animation: orbFloatSlow 24s ease-in-out infinite;
        }

        @keyframes iconPop {
          0% { transform: scale(0.4) translateY(12px); opacity: 0; }
          60% { transform: scale(1.06) translateY(0); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-iconPop {
          animation: iconPop 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }

        @keyframes checkPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          40% { transform: scale(1.08) rotate(-2deg); }
          70% { transform: scale(1.02) rotate(1.5deg); }
        }
        .animate-checkPulse {
          animation: checkPulse 1.3s ease-out 0.25s 1;
        }

        @keyframes staggerFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-staggerFade {
          animation: staggerFade 0.65s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
