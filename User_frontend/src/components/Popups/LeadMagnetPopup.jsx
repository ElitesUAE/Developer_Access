// src/components/LeadMagnetPopup.jsx - FIXED VERSION
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../Button";
import { useLeadStore } from "../../store/useLeadStore"; // ⚠️ Check this path!

const LeadMagnetPopup = ({ type = "blunders", onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get store functions and log them
  const store = useLeadStore();


  const { submitBlundersLead, submitStrategiesLead, submitting, clearError } =
    store;

  // Content configuration
  const popupContent = {
    blunders: {
      heading:
        "Avoid the 20 blunders most investors regret. Your next Dubai property depends on it.",
      buttonText: "Send Me the Guide",
      successTitle: "You're in!",
      successMessage:
        "Your guide to the 20 biggest investor mistakes is on its way. Check your inbox and start avoiding costly errors today.",
      emoji: "🚫",
    },
    strategies: {
      heading:
        "3 powerful strategies most investors only learn the hard way — get them first.",
      buttonText: "Send Me the Strategies",
      successTitle: "You're in!",
      successMessage:
        "Your exclusive strategies guide is heading to your inbox. Get ready to invest smarter than 99% of buyers.",
      emoji: "💡",
    },
  };

  const content = popupContent[type];

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      // console.log("🎯 Popup opened, type:", type);
      setIsSubmitted(false);
      setFormData({ name: "", email: "" });
      setErrors({});
      clearError();
    }
  }, [isOpen, clearError, type]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();




    try { 
      // Show success message
      setIsSubmitted(true);
      // Auto-close after 5 seconds
      setTimeout(() => {
        onClose?.();
      }, 5000);
    } catch (error) {
      console.error("💥 Submit error:", error);
      setErrors({
        email: error.message || "Failed to submit. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2540]/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 p-2 hover:bg-[#F4F4F4] rounded-full transition-colors z-10"
          aria-label="Close popup"
        >
          <X size={24} className="text-[#333333]" />
        </button>

        {!isSubmitted ? (
          // Form View
          <div className="p-8 md:p-10">
            {/* Emoji Icon */}
            <div className="text-6xl text-center mb-6">{content.emoji}</div>

            {/* Heading */}
            <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#0A2540] text-center mb-8 leading-tight">
              {content.heading}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-[#333333] font-medium mb-2 font-['Inter'] text-sm">
                  Name (optional)
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={submitting}
                  className="w-full px-4 py-3 bg-[#F4F4F4] border border-[#CFAF4E]/30 rounded-lg text-[#333333] placeholder-[#333333]/50 focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] focus:border-transparent transition-all font-['Inter'] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[#333333] font-medium mb-2 font-['Inter'] text-sm">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={submitting}
                  className={`w-full px-4 py-3 bg-[#F4F4F4] border rounded-lg text-[#333333] placeholder-[#333333]/50 focus:outline-none focus:ring-2 transition-all font-['Inter'] disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[#CFAF4E]/30 focus:ring-[#CFAF4E] focus:border-transparent"
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 font-['Inter']">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={submitting}
                className="w-full"
              >
                {content.buttonText}
              </Button>

              {/* Privacy Note */}
              <p className="text-xs text-[#333333]/60 text-center font-['Inter'] mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        ) : (
          // Success View
          <div className="p-8 md:p-10 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Title */}
            <h3 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A2540] mb-4">
              {content.successTitle}
            </h3>

            {/* Success Message */}
            <p className="font-['Inter'] text-[#333333]/80 text-lg leading-relaxed mb-6">
              {content.successMessage}
            </p>

            {/* Close Button */}
            <Button
              variant="secondary"
              size="md"
              onClick={onClose}
              type="button"
            >
              Continue Browsing
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadMagnetPopup;
