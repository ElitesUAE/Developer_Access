// src/components/ContactFormModal.jsx
import React, { useState } from "react";
import {
  X,
  Send,
  Loader2,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useContactStore } from "../store/useContactStore";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const ContactFormModal = ({ isOpen, onClose, title, description }) => {
  const { createContact, loading } = useContactStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [feedbackMessage, setFeedbackMessage] = useState(null); // { type: 'success' | 'error', message: string }

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Clear feedback when modal opens
      setFeedbackMessage(null);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous feedback
    setFeedbackMessage(null);

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setFeedbackMessage({
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFeedbackMessage({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    try {
      const result = await createContact(formData);

      // Show inline success message
      setFeedbackMessage({
        type: "success",
        message:
          result.message ||
          "Message sent successfully! 🎉 We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Close modal after 2.5 seconds to show success message
      setTimeout(() => {
        onClose();
        setFeedbackMessage(null);
      }, 2500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFeedbackMessage({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to send message. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setFeedbackMessage(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative pointer-events-auto transform transition-all animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            fontFamily: "var(--font-luxury)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={loading}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#CFAF4E] to-[#b89a3e] rounded-full mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-2">
              {title || "Get in Touch"}
            </h2>
            <div className="w-24 h-1 bg-[#CFAF4E] mx-auto mb-4"></div>
            <p className="text-gray-600 text-base">
              {description ||
                "Fill out the form below and we'll get back to you soon."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                <User className="w-4 h-4 text-[#CFAF4E]" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-base"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                <Mail className="w-4 h-4 text-[#CFAF4E]" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-base"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                <Phone className="w-4 h-4 text-[#CFAF4E]" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-base"
              />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                <MessageSquare className="w-4 h-4 text-[#CFAF4E]" />
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message here..."
                required
                disabled={loading}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed text-base"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#CFAF4E] to-[#b89a3e] text-white font-semibold rounded-xl hover:from-[#0A2540] hover:to-[#0A2540] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-base"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
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
                    className={`w-full px-4 py-3 rounded-lg flex items-start gap-3 ${
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
                      className={`text-sm sm:text-base font-medium ${
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
    </>
  );
};

export default ContactFormModal;
