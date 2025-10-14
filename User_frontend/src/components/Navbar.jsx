import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// --- SVG Icons ---
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-5a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
      clipRule="evenodd"
    />
  </svg>
);

const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

const InfoCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Navigation Links ---
const navLinks = [
  { href: "/", text: "Home", icon: <HomeIcon /> },
  { href: "/properties", text: "Properties", icon: <BuildingIcon /> },
  { href: "/blogs", text: "Blogs", icon: <BookIcon /> },
  { href: "/about", text: "About Us", icon: <InfoCircleIcon /> },
  { href: "/contactus", text: "Contact Us", icon: <PhoneIcon /> },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ✅ Helper function to check if route is active (including child routes)
const isRouteActive = (currentPath, linkHref) => {
  // Exact match for home
  if (linkHref === "/" && currentPath === "/") {
    return true;
  }

  // For /properties link, also match /property/:id (singular)
  if (linkHref === "/properties") {
    return (
      currentPath.startsWith("/properties") ||
      currentPath.startsWith("/property/")
    );
  }

  // For /blogs link, also match /blog/:id (singular)
  if (linkHref === "/blogs") {
    return currentPath.startsWith("/blogs") || currentPath.startsWith("/blog/");
  }

  // For other routes, check if current path starts with link href
  if (linkHref !== "/" && currentPath.startsWith(linkHref)) {
    return true;
  }

  return false;
};

// --- Desktop/Tablet NavLink Component ---
const NavLink = ({ href, text, icon, currentPath, navId }) => {
  const isActive = isRouteActive(currentPath, href);

  return (
    <Link
      to={href}
      className="relative px-3 lg:px-4 py-2 flex items-center gap-2 whitespace-nowrap cursor-pointer"
    >
      {/* Icon - Hidden on md, visible on lg+ */}
      <span
        className={`hidden lg:inline transition-colors duration-300 ${
          isActive
            ? "text-[var(--color-gold)]"
            : "text-[var(--color-charcol-gray)]"
        }`}
      >
        {icon}
      </span>

      {/* Text */}
      <span
        className={`text-sm md:text-base lg:text-lg font-semibold transition-colors duration-300 ${
          isActive
            ? "text-[var(--color-gold)]"
            : "text-[var(--color-charcol-gray)]"
        }`}
      >
        {text}
      </span>

      {/* Active Underline - Stays visible when active */}
      {isActive && (
        <motion.div
          layoutId={`navbar-underline-${navId}`}
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-gold)] rounded-full"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
          }}
        />
      )}
    </Link>
  );
};

// --- Navbar Component ---
function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 transition-shadow duration-300 bg-[var(--color-light-gray)]"
      style={{
        boxShadow: isScrolled
          ? "0 4px 6px rgb(0 0 0 / 0.1)"
          : "0 1px 3px rgb(0 0 0 / 0.06)",
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <motion.div
          className="flex items-center justify-between h-16 md:h-18 lg:h-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="text-center text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold select-none cursor-pointer flex-shrink-0"
            style={{
              fontFamily: "var(--font-luxury)",
              color: "var(--color-navy)",
            }}
          >
            <Link to="/" className="no-underline">
              <div>Elite In Emirates</div>
              <div className="text-xs sm:text-sm lg:text-sm xl:text-base font-light text-[var(--color-gold)] text-right">
                Discover Luxury
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation (lg and above) */}
          <motion.nav
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
            variants={containerVariants}
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <NavLink {...link} currentPath={currentPath} navId="desktop" />
              </motion.div>
            ))}
          </motion.nav>

          {/* Tablet Navigation (md to lg) */}
          <motion.nav
            className="hidden md:flex lg:hidden items-center space-x-1"
            variants={containerVariants}
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={itemVariants}>
                <NavLink {...link} currentPath={currentPath} navId="tablet" />
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.div className="md:hidden" variants={itemVariants}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="focus:outline-none p-2 rounded-lg transition-colors duration-300"
              style={{
                color: isOpen ? "var(--color-gold)" : "var(--color-navy)",
              }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloseIcon />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
              style={{ top: "64px" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden absolute w-full z-50 shadow-2xl border-t"
              style={{
                borderColor: "rgba(207, 175, 78, 0.2)",
                backgroundColor: "var(--color-light-gray)",
                maxHeight: "calc(100vh - 64px)",
                overflowY: "auto",
              }}
            >
              <div className="flex flex-col px-4 py-6 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = isRouteActive(currentPath, link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`relative flex items-center gap-4 px-4 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-r from-[var(--color-gold)]/20 to-[var(--color-gold)]/5 text-[var(--color-gold)] shadow-lg"
                            : "text-[var(--color-charcol-gray)]"
                        }`}
                      >
                        {/* Icon */}
                        <span>{link.icon}</span>

                        {/* Text */}
                        <span className="flex-1">{link.text}</span>

                        {/* Active Dot Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="w-2 h-2 rounded-full bg-[var(--color-gold)]"
                          />
                        )}

                        {/* Left Border - Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-gold)] rounded-r-full"
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 35,
                            }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Navbar;
