import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none cursor-pointer focus:outline-hidden active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

    // Size variants
    const sizes = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4.5 py-2.5 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5",
    };

    // Style variants
    const variants = {
      primary:
        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-md focus:ring-4 focus:ring-indigo-500/20",
      secondary:
        "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 focus:ring-4 focus:ring-indigo-500/10",
      outline:
        "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:border-slate-300 focus:ring-4 focus:ring-slate-100",
      ghost: "hover:bg-slate-50 text-slate-600 hover:text-slate-800",
      danger:
        "bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-4 focus:ring-rose-500/20",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${sizes[size]}
          ${variants[variant]}
          ${widthStyle}
          ${className}
        `}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {/* Left Icon (if provided & not loading) */}
        {!isLoading && leftIcon && (
          <span className="flex items-center justify-center shrink-0">{leftIcon}</span>
        )}

        {/* Button Content */}
        <span>{children}</span>

        {/* Right Icon (if provided) */}
        {rightIcon && (
          <span className="flex items-center justify-center shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
