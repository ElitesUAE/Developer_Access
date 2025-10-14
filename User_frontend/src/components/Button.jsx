import React, { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      className = "",
      leftIcon,
      rightIcon,
      type = "",
      onClick = {},
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-gold text-white hover:bg-navy focus:ring-gold/30 shadow-lg hover:shadow-xl",
      secondary:
        "bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white focus:ring-navy/30 shadow-md",
      outline:
        "bg-transparent text-gold border-2  hover:bg-navy hover:text-white focus:ring-gold/30",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[34px]",
      md: "px-6 py-4 text-base min-h-[42px]",
      lg: "px-6 py-4 text-lg min-h-[50px]",
    };

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`
        relative inline-flex items-center justify-center gap-1
        font-medium rounded-lg transition-all duration-300
        focus:outline-none focus:ring-4 hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
        {...props}
      >
        {loading && (
          <div className="absolute w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}

        <div
          className={`flex items-center gap-1 ${loading ? "opacity-0" : ""}`}
        >
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </div>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
