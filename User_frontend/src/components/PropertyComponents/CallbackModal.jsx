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
} from "lucide-react";
import { useCallbackStore } from "../../store/useCallbackStore";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

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
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // NEW STATE for checkbox
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

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
      setAcceptedPolicy(false); // reset checkbox
      clearMessages();
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";

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

    // NEW CHECKBOX VALIDATION
    if (!acceptedPolicy) {
      newErrors.policy =
        "You must accept the Privacy Policy before submitting.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
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

      setFeedbackMessage({
        type: "success",
        message:
          "Callback request submitted successfully! 🎉 We'll contact you soon.",
      });

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
          <p className="text-sm text-[#333333]/70 mb-1 font-['Inter']">
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
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
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
              className={`w-full px-4 py-3 border ${
                errors.name ? "border-red-500" : "border-[#CFAF4E]/30"
              } rounded-lg focus:ring-2 focus:ring-[#CFAF4E]`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              <Mail className="inline text-[#CFAF4E]" size={16} /> Email Address
              *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-[#CFAF4E]/30"
              } rounded-lg focus:ring-2 focus:ring-[#CFAF4E]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2 font-['Inter']">
              <Phone className="inline text-[#CFAF4E]" size={16} /> Phone Number
              *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full px-4 py-3 border ${
                errors.phone ? "border-red-500" : "border-[#CFAF4E]/30"
              } rounded-lg focus:ring-2 focus:ring-[#CFAF4E]`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
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
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E]"
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
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 border border-[#CFAF4E]/30 rounded-lg focus:ring-2 focus:ring-[#CFAF4E] resize-none"
            />
            <p className="text-xs text-[#333333]/60 mt-1 text-right">
              {formData.message.length}/500 characters
            </p>
          </div>

          {/* ✅ NEW CHECKBOX FIELD */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptedPolicy}
                onChange={(e) => setAcceptedPolicy(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#CFAF4E]"
                disabled={loading}
              />
              <span className="text-sm text-[#333333] leading-tight font-['Inter']">
                By submitting this form, you agree to our{" "}
                <span
                  onClick={() => navigate("/privacy-policy")}
                  className="text-[#CFAF4E] underline cursor-pointer hover:text-[#b9973f]"
                >
                  Privacy Policy
                </span>
                .
              </span>
            </label>
            {errors.policy && (
              <p className="text-red-500 text-sm mt-1">{errors.policy}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
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

          {/* Feedback */}
          <AnimatePresence>
            {feedbackMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4"
              >
                <div
                  className={`px-4 py-3 rounded-lg flex items-start gap-3 ${
                    feedbackMessage.type === "success"
                      ? "bg-green-500/20 border border-green-500/50"
                      : "bg-red-500/20 border border-red-500/50"
                  }`}
                >
                  {feedbackMessage.type === "success" ? (
                    <CheckCircle2 className="text-green-600 w-5 h-5 mt-0.5" />
                  ) : (
                    <AlertCircle className="text-red-600 w-5 h-5 mt-0.5" />
                  )}
                  <p
                    className={`text-sm font-['Inter'] ${
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
