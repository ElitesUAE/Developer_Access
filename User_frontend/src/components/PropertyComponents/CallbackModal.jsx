// src/components/CallbackModal.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Mail,
  User,
  MessageSquare,
  Clock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import { useCallbackStore } from "../../store/useCallbackStore";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CallbackModal = ({ isOpen, onClose, property }) => {
  const {
    submitCallbackRequest,
    loading,
    error,
    successMessage,
    clearMessages,
  } = useCallbackStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredTime: "Anytime",
  });

  const [errors, setErrors] = useState({});
  const [feedbackMessage, setFeedbackMessage] = useState(null); // { type: 'success' | 'error', message: string }

  // Clear form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        preferredTime: "Anytime",
      });
      setErrors({});
      setFeedbackMessage(null);
      clearMessages();
    }
  }, [isOpen]);

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous feedback
    setFeedbackMessage(null);

    if (!validateForm()) {
      setFeedbackMessage({
        type: "error",
        message: "Please fix the errors above before submitting.",
      });
      return;
    }

    try {
      const requestData = {
        propertyId: property.id,
        propertyTitle: property.title,
        ...formData,
      };

      await submitCallbackRequest(requestData);

      // Show inline success message
      setFeedbackMessage({
        type: "success",
        message:
          "Callback request submitted successfully! 🎉 We'll contact you soon.",
      });

      // Close modal after 2.5 seconds to allow user to see success message
      setTimeout(() => {
        onClose();
        setFeedbackMessage(null);
      }, 2500);

      navigate("/thankyou");
    } catch (err) {
      setFeedbackMessage({
        type: "error",
        message: error || "Failed to submit request. Please try again.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#0A2540] to-[#1A3A5C] text-white px-6 py-5 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold flex items-center gap-2">
              <Phone className="text-[#CFAF4E]" size={28} />
              Request a Callback
            </h2>
            <p className="text-sm text-white/80 mt-1 font-['Inter']">
              We'll get back to you as soon as possible
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            disabled={loading}
          >
            <X size={24} />
          </button>
        </div>

        {/* Property Info */}
        <div className="px-6 py-4 bg-[#F4F4F4] border-b border-[#CFAF4E]/20">
          <p className="text-sm text-[#333333]/70 font-['Inter'] mb-1">
            Interested in:
          </p>
          <h3 className="font-['Playfair_Display'] text-lg font-semibold text-[#0A2540]">
            {property.title}
          </h3>
          <p className="text-sm text-[#333333]/70 font-['Inter'] mt-1">
            {property.location}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
                <User className="inline text-[#CFAF4E]" size={16} /> Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter your full name"
                disabled={loading}
                className={`w-full px-4 py-3 border ${
                  errors.name ? "border-red-500" : "border-[#CFAF4E]/30"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-['Inter']">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
                <Mail className="inline text-[#CFAF4E]" size={16} /> Email
                Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your.email@example.com"
                disabled={loading}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-[#CFAF4E]/30"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-['Inter']">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
                <Phone className="inline text-[#CFAF4E]" size={16} /> Phone
                Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+xx xx xxx xxxx"
                disabled={loading}
                className={`w-full px-4 py-3 border ${
                  errors.phone ? "border-red-500" : "border-[#CFAF4E]/30"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed`}
              />
              {errors?.phone && (
                <p className="text-red-500 text-sm mt-1 font-['Inter']">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
                <Clock className="inline text-[#CFAF4E]" size={16} /> Preferred
                Callback Time
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) =>
                  setFormData({ ...formData, preferredTime: e.target.value })
                }
                disabled={loading}
                className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="Anytime">Anytime</option>
                <option value="Morning">Morning (9 AM - 12 PM)</option>
                <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
                <option value="Evening">Evening (5 PM - 8 PM)</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
                <MessageSquare className="inline text-[#CFAF4E]" size={16} />{" "}
                Message (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us more about your requirements..."
                rows={4}
                maxLength={500}
                disabled={loading}
                className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFAF4E] font-['Inter'] resize-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-[#333333]/60 mt-1 text-right font-['Inter']">
                {formData.message.length}/500 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={loading}
              leftIcon={
                loading ? <Loader2 className="animate-spin" size={18} /> : null
              }
            >
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>

          {/* ✅ INLINE FEEDBACK MESSAGE - Displayed Below Submit Buttons */}
          <AnimatePresence>
            {feedbackMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-4 w-full px-4 py-3 rounded-lg flex items-start gap-3 ${
                    feedbackMessage.type === "success"
                      ? "bg-green-500/20 border border-green-500/50"
                      : "bg-red-500/20 border border-red-500/50"
                  }`}
                >
                  {feedbackMessage.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm sm:text-base font-medium font-['Inter'] ${
                      feedbackMessage.type === "success"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {feedbackMessage.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
