import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Loader2,
} from "lucide-react";
import { useContactStore } from "../store/useContactStore";
import toast from "react-hot-toast";
import StructuredData from "../components/StructuredData";
import useSEO from "../hooks/useSEO";
const ContactUs = () => {
  const { createContact, loading } = useContactStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await createContact(formData);
      toast.success(result.message || "Message sent successfully! 🎉");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    }
  };

  const FacebookIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
  );
  const YoutubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.107C19.437 3.5 12 3.5 12 3.5s-7.437 0-9.404.579A2.974 2.974 0 0 0 .502 6.186 31.242 31.242 0 0 0 0 12a31.242 31.242 0 0 0 .502 5.814 2.974 2.974 0 0 0 2.094 2.107C4.563 20.5 12 20.5 12 20.5s7.437 0 9.404-.579a2.974 2.974 0 0 0 2.094-2.107A31.242 31.242 0 0 0 24 12a31.242 31.242 0 0 0-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );

  const XIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.5 11.24H16.31l-5.214-6.817-5.972 6.817H1.816l7.73-8.835L1.333 2.25h6.586l4.713 6.231 5.612-6.231zm-1.158 18.317h1.833L7.084 3.835H5.117l11.969 16.732z" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073z M12 6.873c-2.849 0-5.127 2.278-5.127 5.127s2.278 5.127 5.127 5.127 5.127-2.278 5.127-5.127-2.278-5.127-5.127-5.127zm0 8.254c-1.73 0-3.127-1.397-3.127-3.127s1.397-3.127 3.127-3.127 3.127 1.397 3.127 3.127-1.397 3.127-3.127 3.127zm6.35-8.125c-.781 0-1.417.635-1.417 1.417s.636 1.417 1.417 1.417 1.417-.635 1.417-1.417-.636-1.417-1.417-1.417z" />
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073z M12 6.873c-2.849 0-5.127 2.278-5.127 5.127s2.278 5.127 5.127 5.127 5.127-2.278 5.127-5.127-2.278-5.127-5.127-5.127zm0 8.254c-1.73 0-3.127-1.397-3.127-3.127s1.397-3.127 3.127-3.127 3.127 1.397 3.127 3.127-1.397 3.127-3.127 3.127zm6.35-8.125c-.781 0-1.417.635-1.417 1.417s.636 1.417 1.417 1.417 1.417-.635 1.417-1.417-.636-1.417-1.417-1.417z" />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );

  const socialLinks = [
    {
      href: "https://www.facebook.com/share/17H48sW73k/",
      icon: <FacebookIcon />,
      name: "Facebook",
    },
    {
      href: "https://x.com/NiyazNargis?t=jdTBg27d_Rjw8i5Q4KeWSQ&s=08",
      icon: <XIcon />,
      name: "Twitter",
    },
    {
      href: "https://www.instagram.com/elite_in_emirates?igsh=OTZzcG9rZWF3bmIy",
      icon: <InstagramIcon />,
      name: "Instagram",
    },
    { href: "#", icon: <LinkedInIcon />, name: "LinkedIn" },
    {
      href: "https://www.youtube.com/@EliteInEmirates",
      icon: <YoutubeIcon />,
      name: "YouTube",
    },
  ];
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useSEO({
    title: "Contact Us | Elite In Emirates - Luxury Real Estate Dubai",
    description:
      "Get in touch with Elite In Emirates for luxury property inquiries in Dubai and UAE. Our expert team is ready to help you find your dream home.",
    keywords:
      "contact Elite In Emirates, Dubai property inquiry, real estate agent contact Dubai, luxury property consultation UAE",
    canonical: "https://eliteinemirates.com/contactus",
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Elite In Emirates",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@eliteinemirates.com",
      availableLanguage: ["English", "Arabic"],
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div
        className="bg-white min-h-screen flex flex-col overflow-x-hidden"
        style={{
          fontFamily: "var(--font-luxury)",
        }}
      >
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-[#0A2540] via-[#0A2540] to-[#1a3a5f] text-white py-4 md:py-6 px-6 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10">
            <Send size={64} className="mx-auto mb-6 text-[gold]" />
            <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4 tracking-tight">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-[#CFAF4E] mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
              We'd love to hear from you. Let's start a conversation.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16">
          {/* Left: Contact Form */}
          <div className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#CFAF4E]/10 to-transparent rounded-3xl -z-10"></div>

            <div className="bg-white rounded-3xl p-8 md:p-10 border-t-4 border-[#CFAF4E]">
              <div className="h-1 bg-[#CFAF4E] mb-6 w-16"></div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-8">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 text-lg">
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone"
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2 uppercase tracking-wide">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Write your message..."
                    required
                    disabled={loading}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#CFAF4E] focus:ring-2 focus:ring-[#CFAF4E]/20 outline-none transition-all duration-300 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#CFAF4E] text-white text-lg font-semibold rounded-xl shadow-xl hover:bg-[#0A2540] transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={20} />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="h-1 bg-[#CFAF4E] mb-6 w-16"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A2540] mb-6">
                Get in touch
              </h2>
            </div>

            <p className="text-xl text-[#333333] leading-relaxed">
              Whether you have questions about our services, need investment
              advice, or just want to connect — we're here to help you every
              step of the way.
            </p>

            {/* Contact details */}
            <div className="space-y-4 text-lg">
              {[
                {
                  icon: <Mail className="text-white" size={24} />,
                  title: "Email",
                  value: "hello@eliteinemirates.com",
                },
                {
                  icon: <MapPin className="text-white" size={24} />,
                  title: "Location",
                  value: "Dubai, United Arab Emirates",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="w-full flex items-center space-x-4 p-5 bg-gradient-to-br from-[#F4F4F4] to-white rounded-2xl shadow-md border border-gray-100"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-[#CFAF4E] rounded-xl flex items-center justify-center shadow-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      {item.title}
                    </div>
                    <span className="text-[#333333] font-medium break-all">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="pt-6">
              <h3 className="text-lg font-bold text-[#0A2540] mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#CFAF4E] to-[#b89a3e] text-white hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-t-4 border-[#CFAF4E]">
              <div className="aspect-video">
                <iframe
                  title="Dubai Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115616.46209288524!2d55.11208517868296!3d25.07575965879367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434b2d8a3c65%3A0x9e2a897a5a3f1c11!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1696179445639!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUs;
