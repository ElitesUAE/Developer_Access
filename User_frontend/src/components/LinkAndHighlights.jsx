// src/components/LinkAndHighlights.jsx - COMPLETE & FIXED
import React, { forwardRef } from "react";

// Link Component
const Link = forwardRef(
  (
    {
      children,
      href,
      variant = "default",
      underlineEffect = "gold",
      external = false,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: "text-navy hover:text-navy-light",
      subtle: "text-gray-600 hover:text-navy",
      light: "text-gold hover:text-gold",
      inherit: "text-current",
    };

    const underlineEffects = {
      gold: "after:bg-gold",
      navy: "after:bg-navy",
      current: "after:bg-current",
    };

    const baseClasses = `
    relative inline-block cursor-pointer transition-colors duration-300
    after:content-[''] after:absolute after:bottom-0 after:left-0
    after:w-full after:h-0.5 after:scale-x-0 after:origin-right
    after:transition-transform after:duration-300 after:ease-out
    hover:after:scale-x-100 hover:after:origin-left
  `;

    const Component = href ? "a" : "span";

    const linkProps = href
      ? {
          href,
          ...(external && {
            target: "_blank",
            rel: "noopener noreferrer",
          }),
        }
      : {};

    return (
      <Component
        ref={ref}
        onClick={onClick}
        className={`
        ${baseClasses}
        ${variants[variant]}
        ${underlineEffects[underlineEffect]}
        ${className}
      `}
        {...linkProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Link.displayName = "Link";

// Highlight Component
const Highlight = ({
  children,
  color = "gold",
  intensity = "medium",
  underline = false,
  className = "",
}) => {
  const colors = {
    gold: {
      light: "bg-gold/10 text-navy",
      medium: "bg-gold/20 text-navy",
      strong: "bg-gold/30 text-navy-dark",
    },
    navy: {
      light: "bg-navy/10 text-navy",
      medium: "bg-navy/15 text-navy-dark",
      strong: "bg-navy/25 text-white",
    },
    subtle: {
      light: "bg-gray-100 text-gray-700",
      medium: "bg-gray-200 text-gray-800",
      strong: "bg-gray-300 text-gray-900",
    },
  };

  return (
    <span
      className={`
      inline-block px-2 py-1 rounded-md font-medium
      ${colors[color][intensity]}
      ${underline ? "border-b-2 border-current border-opacity-30" : ""}
      ${className}
    `}
    >
      {children}
    </span>
  );
};

// NavLink Component
const NavLink = ({
  children,
  href,
  active = false,
  onClick,
  className = "",
  currentcurrentPath,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      variant={active ? "default" : "subtle"}
      underlineEffect="gold"
      className={`
        px-4 py-2 rounded-lg font-medium transition-all duration-300
        ${active ? "bg-gold/10 text-navy" : "text-gray-600 hover:bg-gray-50"}
        ${className}
      `}
    >
      {children}
    </Link>
  );
};

// TextWithLinks Component
const TextWithLinks = ({ children, className = "" }) => {
  return (
    <div
      className={`text-gold leading-relaxed relative inline-block transition-colors
  after:absolute after:bottom-0 after:left-0
    after:w-full after:h-0.5 after:scale-x-0 after:origin-right
    after:transition-transform after:duration-300 after:ease-out
    hover:after:scale-x-100 hover:after:origin-left  after:bg-gold 
  ${className}`}
    >
      {children}
    </div>
  );
};

// Add helper components to TextWithLinks
TextWithLinks.Link = Link;
TextWithLinks.Highlight = Highlight;

// Named exports (this is what you have)
export { Link, Highlight, NavLink, TextWithLinks };

// Optional: Also provide default export if you want both options
export default { Link, Highlight, NavLink, TextWithLinks };
