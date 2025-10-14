// src/components/Footer.jsx - INTEGRATED WITH NEWSLETTER SYSTEM
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNewsletterStore } from "../store/useNewsletterStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

// Using placeholder Link for demonstration
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
);

// Color Palette
const PRIMARY = "#0A2540";
const ACCENT = "#CFAF4E";
const SECONDARY = "#FFFFFF";
const TEXT_DARK = "#333333";
const BG_LIGHT = "#F4F4F4";

// SVG Icons (unchanged)
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

// Data Arrays
const navLinks = [
  { to: "/", text: "Home" },
  { to: "/properties", text: "Properties" },
  { to: "/blogs", text: "Blogs" },
  { to: "/about", text: "About Us" },
  { to: "/contactus", text: "Contact Us" },
];

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

function Footer() {
  // ✅ Newsletter state management
  const [email, setEmail] = useState("");
  const { subscribe, loading, error, successMessage, clearMessages } =
    useNewsletterStore();

  // ✅ Handle form submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    clearMessages();

    // Validate email
    if (!email || !email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await subscribe(email, "footer");

      // Show success message
      if (result.alreadySubscribed) {
        toast("You're already subscribed! 📧", {
          icon: "ℹ️",
          style: {
            background: "#0A2540",
            color: "#CFAF4E",
          },
        });
      } else {
        toast.success(result.message || "Successfully subscribed! 🎉", {
          duration: 4000,
          style: {
            background: "#0A2540",
            color: "#CFAF4E",
          },
        });
      }

      // Clear email input
      setEmail("");
    } catch (err) {
      toast.error(error || "Failed to subscribe. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer
      className="relative bg-cover bg-center overflow-hidden bg-[#0A2540] px-4 py-8 sm:px-6 md:px-8 lg:m-4 lg:rounded-2xl lg:py-10 xl:py-12"
      style={{
        fontFamily: "var(--font-luxury)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-[#0A2540]/50 to-[#0A2540]/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 text-white z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12"
        >
          {/* Column 1: Logo and Address */}
          <motion.div
            variants={itemVariants}
            className="w-full flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div
              className="text-center md:text-left text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold select-none cursor-pointer flex-shrink-0 mb-2 md:mb-2"
              style={{
                fontFamily: "var(--font-luxury)",
                color: "var(--color-gold)",
              }}
            >
              <div>Elite In Emirates</div>
              <div className="text-xs sm:text-sm lg:text-sm xl:text-base font-light text-[var(--color-gold)] text-right md:text-left">
                Discover Luxury
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              <a
                href="mailto:hello@eliteinemirates.com"
                className="hover:text-[--accent-color] transition"
              >
                E-Mail: hello@eliteinemirates.com
              </a>
            </p>

            <div className="mt-4">
              <h3
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: ACCENT }}
              >
                Stay Connected
              </h3>
              <div className="flex space-x-4 mt-2 justify-center md:justify-start">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="text-gray-300 hover:text-[--accent-color] hover:scale-110 transform transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            variants={itemVariants}
            className="w-full flex flex-col items-center text-center md:items-start md:text-left"
          >
            <h3
              className="text-xl sm:text-2xl font-semibold mb-5"
              style={{ color: ACCENT }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group text-base sm:text-lg text-gray-200 transition-all duration-300 ease-in-out"
                  >
                    <span className="bg-left-bottom bg-gradient-to-r from-[--accent-color] to-[--accent-color] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hover:cursor-pointer hover:text-[--accent-color]">
                      {link.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Newsletter - ✅ INTEGRATED */}
          <motion.div
            variants={itemVariants}
            className="w-full flex flex-col items-center text-center md:items-start md:text-left lg:col-span-2"
          >
            <h3
              className="text-xl sm:text-2xl font-semibold"
              style={{ color: ACCENT }}
            >
              Never Miss Any Updates
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              Get the latest properties and blogs delivered to your inbox.
            </p>

            {/* ✅ Newsletter Form with Integration */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row w-full max-w-md gap-2 sm:gap-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                className="w-full px-4 py-3 text-base sm:text-lg text-gray-800 bg-white rounded-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-[--accent-color] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 text-base sm:text-lg font-semibold text-white rounded-md sm:rounded-l-none transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Subscribing...</span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>

            {/* ✅ Privacy Notice */}
            <p className="text-xs text-gray-400 mt-3 max-w-md">
              By subscribing, you agree to receive marketing emails. You can
              unsubscribe at any time.
            </p>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 md:mt-8 pt-2 border-t border-white/20 text-center text-xs sm:text-sm text-gray-400"
        >
          © {new Date().getFullYear()} — Elite In Emirates. All Rights Reserved.
        </motion.div>
      </div>
    </footer>
  );
}

// Main App component
export default function App() {
  const globalStyles = {
    "--primary-color": PRIMARY,
    "--accent-color": ACCENT,
    "--secondary-color": SECONDARY,
    "--text-dark": TEXT_DARK,
    "--bg-light": BG_LIGHT,
  };

  return (
    <div style={globalStyles}>
      <div className="flex flex-col justify-end">
        <Footer />
      </div>
    </div>
  );
}
