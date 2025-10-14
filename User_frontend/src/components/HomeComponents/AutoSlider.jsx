import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const AutoSlider = ({
  // Content Props
  images = [],
  subtitle = "",
  title = "Distinguished Developers",
  description = "",

  // Layout Props
  slideWidth = 260,
  slideHeight = 130,
  gap = 80,
  variant = "card", // 'card', 'minimal', 'badge', 'strip', 'glass'

  // Animation Props
  speed = "medium", // 'slow', 'medium', 'fast'
  direction = "ltr", // 'ltr', 'rtl'
  autoPlay = true,
  pauseOnHover = true,

  // Visual Props
  theme = "light", // 'light', 'dark', 'gold', 'minimal', 'gradient'
  showGrayscale = true,
  showFadeEdges = true,
  showDivider = true,
  showAccents = true,
  enableHoverEffect = true,

  // Responsive Props
  responsive = {
    mobile: { slideWidth: 180, slideHeight: 90, gap: 40 },
    tablet: { slideWidth: 220, slideHeight: 110, gap: 60 },
    desktop: { slideWidth: 260, slideHeight: 130, gap: 80 },
  },

  // Callback Props
  onSlideClick = null,
  onSlideHover = null,

  // Custom Class Props
  className = "",
  containerClass = "",

  // State Props
  loading = false,
  loadingText = "Loading Partners...",
  loadingComponent = null,
  emptyMessage = "No partners available",
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("desktop");

  // Responsive breakpoint handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentBreakpoint("mobile");
      } else if (width < 1024) {
        setCurrentBreakpoint("tablet");
      } else {
        setCurrentBreakpoint("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get responsive value
  const getResponsiveValue = (prop, defaultValue) => {
    if (
      responsive &&
      responsive[currentBreakpoint] &&
      responsive[currentBreakpoint][prop] !== undefined
    ) {
      return responsive[currentBreakpoint][prop];
    }
    return defaultValue;
  };

  // Calculate responsive dimensions
  const currentSlideWidth = getResponsiveValue("slideWidth", slideWidth);
  const currentSlideHeight = getResponsiveValue("slideHeight", slideHeight);
  const currentGap = getResponsiveValue("gap", gap);

  // Duplicate images for infinite loop
  const slideImages = useMemo(() => {
    return autoPlay ? [...images, ...images] : images;
  }, [images, autoPlay]);

  // Event handlers
  const handleSlideClick = (image, index) => {
    if (onSlideClick) {
      onSlideClick(image, index);
    }
  };

  const handleSlideHover = (image, index) => {
    if (onSlideHover) {
      onSlideHover(image, index);
    }
  };

  // Loading state
  if (loading) {
    return (
      <>
        <section
          className={`luxury-partners-section theme-${theme} ${containerClass}`}
        >
          <div className="luxury-slider-loading">
            {loadingComponent || (
              <>
                <div className="luxury-spinner"></div>
                {loadingText && (
                  <p className="luxury-loading-text">{loadingText}</p>
                )}
              </>
            )}
          </div>
        </section>
        <style jsx>{styles}</style>
      </>
    );
  }

  // Empty state
  if (!images || images.length === 0) {
    return (
      <>
        <section
          className={`luxury-partners-section theme-${theme} ${containerClass}`}
        >
          <div className="luxury-section-header">
            {subtitle && <p className="luxury-section-subtitle">{subtitle}</p>}
            <h2 className="luxury-section-title">{emptyMessage}</h2>
          </div>
        </section>
        <style jsx>{styles}</style>
      </>
    );
  }

  return (
    <>
      <section
        className={`
          luxury-partners-section
          theme-${theme} 
          ${!showAccents ? "hide-accents" : ""}
          ${containerClass}
        `}
      >
        {/* Header Section */}
        {(subtitle || title || description) && (
          <div className="luxury-section-header">
            {subtitle && <p className="luxury-section-subtitle">{subtitle}</p>}
            {title && <h2 className="luxury-section-title">{title}</h2>}
            {showDivider && <div className="luxury-divider"></div>}
            {description && (
              <p className="luxury-section-description">{description}</p>
            )}
          </div>
        )}

        {/* Slider Section */}
        <div
          className={`luxury-slider-wrapper ${!showFadeEdges ? "no-fade" : ""}`}
        >
          <ul
            className={`
              luxury-slider-track 
              ${autoPlay ? "animated" : ""} 
              ${pauseOnHover ? "pause-on-hover" : ""}
              ${direction === "rtl" ? "direction-rtl" : ""}
              speed-${speed}
              ${className}
            `}
            style={{
              gap: `${currentGap}px`,
              minWidth: autoPlay ? "200%" : "auto",
            }}
          >
            {slideImages.map((img, i) => (
              <li
                key={`${img.alt}-${i}`}
                className={`
                  luxury-logo-slide 
                  variant-${variant}
                  ${showGrayscale ? "grayscale-enabled" : ""}
                  ${!enableHoverEffect ? "no-hover-effect" : ""}
                `}
                style={{
                  width: `${currentSlideWidth}px`,
                  height: `${currentSlideHeight}px`,
                }}
                onClick={() => handleSlideClick(img, i)}
                onMouseEnter={() => handleSlideHover(img, i)}
                role="button"
                tabIndex={0}
                aria-label={img.alt}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable="false"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Embedded Styles */}
      <style jsx>{styles}</style>
    </>
  );
};

// Styles as template literal
const styles = `
  /* AutoSlider - Enterprise-Level Luxury Slider */

  @keyframes infiniteSlider {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes infiniteSliderReverse {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* SECTION CONTAINER */
  .luxury-partners-section {
    position: relative;
    overflow: hidden;
    padding: 20px 0;
    transition: all 0.4s ease;
  }

  /* Theme: Light Elegant */
  .luxury-partners-section.theme-light {
    background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%);
  }

  /* Theme: Dark Sophisticated */
  .luxury-partners-section.theme-dark {
    background: linear-gradient(180deg, var(--color-navy-dark) 0%, var(--color-navy) 100%);
  }

  /* Theme: Gold Premium */
  .luxury-partners-section.theme-gold {
    background: linear-gradient(180deg, #FAF8F3 0%, #F5EFE6 100%);
  }

  /* Theme: Minimal Clean */
  .luxury-partners-section.theme-minimal {
    background: #FFFFFF;
  }

  /* Theme: Gradient Luxury */
  .luxury-partners-section.theme-gradient {
    background: linear-gradient(135deg, #0A2540 0%, #1A3A5C 50%, #0A2540 100%);
  }

  /* Decorative accent lines */
  .luxury-partners-section::before,
  .luxury-partners-section::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    opacity: 0.3;
    transition: opacity 0.4s ease;
  }

  .luxury-partners-section::before {
    top: 0;
    background: linear-gradient(90deg, transparent 0%, var(--color-gold) 50%, transparent 100%);
  }

  .luxury-partners-section::after {
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, var(--color-gold) 50%, transparent 100%);
  }

  .luxury-partners-section.hide-accents::before,
  .luxury-partners-section.hide-accents::after {
    display: none;
  }

  /* SECTION HEADER */
  .luxury-section-header {
    text-align: center;
    margin-bottom: 10px;
    padding: 0 20px;
  }

  .luxury-section-subtitle {
    font-family: var(--font-luxury);
    font-size: 13px;
    letter-spacing: 4px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 20px;
    transition: all 0.3s ease;
  }

  /* Subtitle colors per theme */
  .theme-light .luxury-section-subtitle { color: var(--color-gold); }
  .theme-dark .luxury-section-subtitle { color: var(--color-gold-light); }
  .theme-gold .luxury-section-subtitle { color: var(--color-gold-dark); }
  .theme-minimal .luxury-section-subtitle { color: var(--color-navy); }
  .theme-gradient .luxury-section-subtitle { color: var(--color-gold); }

  .luxury-section-title {
    font-family: var(--font-luxury);
    font-size: 52px;
    font-weight: 400;
    margin: 0;
    line-height: 1.2;
    transition: all 0.3s ease;
  }

  /* Title colors per theme */
  .theme-light .luxury-section-title { color: var(--color-navy); }
  .theme-dark .luxury-section-title { color: #FFFFFF; }
  .theme-gold .luxury-section-title { color: var(--color-navy-dark); }
  .theme-minimal .luxury-section-title { color: var(--color-navy); }
  .theme-gradient .luxury-section-title { color: #FFFFFF; }

  .luxury-section-description {
    font-family: var(--font-luxury);
    font-size: 16px;
    line-height: 1.6;
    max-width: 700px;
    margin: 24px auto 0;
    opacity: 0.8;
  }

  /* Description colors per theme */
  .theme-light .luxury-section-description { color: var(--color-charcol-gray); }
  .theme-dark .luxury-section-description { color: rgba(255, 255, 255, 0.8); }
  .theme-gold .luxury-section-description { color: var(--color-charcol-gray); }
  .theme-minimal .luxury-section-description { color: var(--color-charcol-gray); }
  .theme-gradient .luxury-section-description { color: rgba(255, 255, 255, 0.85); }

  /* Divider */
  .luxury-divider {
    width: 80px;
    height: 2px;
    margin: 28px auto 0;
    position: relative;
  }

  .theme-light .luxury-divider { background: var(--color-gold); }
  .theme-dark .luxury-divider { background: var(--color-gold-light); }
  .theme-gold .luxury-divider { background: var(--color-gold-dark); }
  .theme-minimal .luxury-divider { background: var(--color-navy); }
  .theme-gradient .luxury-divider { background: var(--color-gold); }

  /* SLIDER WRAPPER */
  .luxury-slider-wrapper {
    position: relative;
    overflow: hidden;
    padding: 50px 0;
  }

  /* Fade edge gradients */
  .luxury-slider-wrapper::before,
  .luxury-slider-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 250px;
    z-index: 10;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  /* Light theme fades */
  .theme-light .luxury-slider-wrapper::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  }

  .theme-light .luxury-slider-wrapper::after {
    right: 0;
    background: linear-gradient(to left, rgba(244, 244, 244, 1) 0%, rgba(244, 244, 244, 0) 100%);
  }

  /* Dark theme fades */
  .theme-dark .luxury-slider-wrapper::before,
  .theme-gradient .luxury-slider-wrapper::before {
    left: 0;
    background: linear-gradient(to right, rgba(4, 24, 41, 1) 0%, rgba(4, 24, 41, 0) 100%);
  }

  .theme-dark .luxury-slider-wrapper::after,
  .theme-gradient .luxury-slider-wrapper::after {
    right: 0;
    background: linear-gradient(to left, rgba(10, 37, 64, 1) 0%, rgba(10, 37, 64, 0) 100%);
  }

  /* Gold theme fades */
  .theme-gold .luxury-slider-wrapper::before {
    left: 0;
    background: linear-gradient(to right, rgba(250, 248, 243, 1) 0%, rgba(250, 248, 243, 0) 100%);
  }

  .theme-gold .luxury-slider-wrapper::after {
    right: 0;
    background: linear-gradient(to left, rgba(245, 239, 230, 1) 0%, rgba(245, 239, 230, 0) 100%);
  }

  /* Minimal theme fades */
  .theme-minimal .luxury-slider-wrapper::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  }

  .theme-minimal .luxury-slider-wrapper::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
  }

  .luxury-slider-wrapper.no-fade::before,
  .luxury-slider-wrapper.no-fade::after {
    display: none;
  }

  /* SLIDER TRACK */
  .luxury-slider-track {
    display: flex;
    will-change: transform;
  }

  .luxury-slider-track.animated {
    animation: infiniteSlider 40s linear infinite;
  }

  .luxury-slider-track.direction-rtl.animated {
    animation: infiniteSliderReverse 40s linear infinite;
  }

  .luxury-slider-track.speed-slow { animation-duration: 60s; }
  .luxury-slider-track.speed-medium { animation-duration: 40s; }
  .luxury-slider-track.speed-fast { animation-duration: 25s; }

  .luxury-slider-track.pause-on-hover:hover {
    animation-play-state: paused;
  }

  /* DISPLAY VARIANTS */

  /* VARIANT 1: Clean Card Style */
  .luxury-logo-slide.variant-card {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px;
    background: #FFFFFF;
    border: 1px solid rgba(10, 37, 64, 0.08);
    border-radius: 8px;
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .theme-dark .luxury-logo-slide.variant-card,
  .theme-gradient .luxury-logo-slide.variant-card {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(207, 175, 78, 0.15);
  }

  .theme-gold .luxury-logo-slide.variant-card {
    background: #FFFFFF;
    border-color: rgba(184, 151, 58, 0.12);
  }

  .luxury-logo-slide.variant-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(207, 175, 78, 0.04) 100%);
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .luxury-logo-slide.variant-card:hover {
    transform: translateY(-12px);
    border-color: rgba(207, 175, 78, 0.35);
    box-shadow: 
      0 20px 60px rgba(10, 37, 64, 0.15),
      0 0 0 1px rgba(207, 175, 78, 0.15);
  }

  .theme-dark .luxury-logo-slide.variant-card:hover,
  .theme-gradient .luxury-logo-slide.variant-card:hover {
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(207, 175, 78, 0.4);
  }

  .luxury-logo-slide.variant-card:hover::before {
    opacity: 1;
  }

  /* VARIANT 2: Minimal Borderless */
  .luxury-logo-slide.variant-minimal {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: transparent;
    border: none;
    transition: all 0.5s ease;
  }

  .luxury-logo-slide.variant-minimal:hover {
    transform: scale(1.08);
  }

  /* VARIANT 3: Elegant Badge */
  .luxury-logo-slide.variant-badge {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    background: transparent;
    border: 2px solid rgba(207, 175, 78, 0.2);
    border-radius: 50%;
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    aspect-ratio: 1;
  }

  .luxury-logo-slide.variant-badge:hover {
    border-color: var(--color-gold);
    transform: rotate(8deg) scale(1.15);
    box-shadow: 0 15px 40px rgba(207, 175, 78, 0.25);
  }

  /* VARIANT 4: Premium Strip */
  .luxury-logo-slide.variant-strip {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 25px 40px;
    background: transparent;
    border-bottom: 2px solid rgba(207, 175, 78, 0.15);
    transition: all 0.4s ease;
  }

  .luxury-logo-slide.variant-strip:hover {
    border-bottom-color: var(--color-gold);
    transform: translateY(-4px);
  }

  /* VARIANT 5: Glass Morphism */
  .luxury-logo-slide.variant-glass {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 35px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 12px;
    transition: all 0.5s ease;
  }

  .luxury-logo-slide.variant-glass:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(207, 175, 78, 0.3);
    transform: translateY(-8px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  }

  /* LOGO IMAGE STYLING */
  .luxury-logo-slide img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: relative;
    z-index: 2;
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* Grayscale effect */
  .luxury-logo-slide.grayscale-enabled img {
    filter: grayscale(100%) brightness(0.35) contrast(1.15);
    opacity: 0.45;
  }

  .theme-dark .luxury-logo-slide.grayscale-enabled img,
  .theme-gradient .luxury-logo-slide.grayscale-enabled img {
    filter: grayscale(100%) brightness(0.7) contrast(1.1);
    opacity: 0.55;
  }

  .luxury-logo-slide.grayscale-enabled:hover img {
    filter: grayscale(0%) brightness(1) contrast(1);
    opacity: 1;
    transform: scale(1.08);
  }

  /* No hover effect */
  .luxury-logo-slide.no-hover-effect:hover {
    transform: none !important;
    border-color: inherit !important;
    box-shadow: none !important;
  }

  .luxury-logo-slide.no-hover-effect:hover img {
    transform: none !important;
  }

  /* LOADING & EMPTY STATES */
  .luxury-slider-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    gap: 20px;
  }

  .luxury-spinner {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(207, 175, 78, 0.15);
    border-top-color: var(--color-gold);
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .luxury-loading-text {
    font-family: var(--font-luxury);
    font-size: 14px;
    color: var(--color-gold);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* RESPONSIVE DESIGN */
  @media (max-width: 1024px) {
    .luxury-partners-section { padding: 20px 0; }
    .luxury-section-title { font-size: 44px; }
    .luxury-section-header { margin-bottom: 15px; }
  }

  @media (max-width: 768px) {
    .luxury-partners-section { padding: 20px 0; }
    .luxury-section-title { font-size: 36px; }
    .luxury-section-subtitle { font-size: 11px; letter-spacing: 3px; }
    .luxury-section-header { margin-bottom: 15px; }
    .luxury-slider-wrapper::before,
    .luxury-slider-wrapper::after { width: 120px; }
  }

  @media (max-width: 480px) {
    .luxury-partners-section { padding: 20px 0; }
    .luxury-section-title { font-size: 30px; }
    .luxury-section-subtitle { font-size: 10px; letter-spacing: 2px; }
    .luxury-slider-wrapper::before,
    .luxury-slider-wrapper::after { width: 80px; }
  }
`;

// PropTypes
AutoSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  slideWidth: PropTypes.number,
  slideHeight: PropTypes.number,
  gap: PropTypes.number,
  variant: PropTypes.oneOf(["card", "minimal", "badge", "strip", "glass"]),
  speed: PropTypes.oneOf(["slow", "medium", "fast"]),
  direction: PropTypes.oneOf(["ltr", "rtl"]),
  autoPlay: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark", "gold", "minimal", "gradient"]),
  showGrayscale: PropTypes.bool,
  showFadeEdges: PropTypes.bool,
  showDivider: PropTypes.bool,
  showAccents: PropTypes.bool,
  enableHoverEffect: PropTypes.bool,
  responsive: PropTypes.object,
  onSlideClick: PropTypes.func,
  onSlideHover: PropTypes.func,
  className: PropTypes.string,
  containerClass: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingComponent: PropTypes.node,
  emptyMessage: PropTypes.string,
};

export default AutoSlider;
