import React, { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

// Button component with variants, sizes, and loading state
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

// CSS classes for variants and sizes, using Tailwind CSS for styling
const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-green-200 text-green-500 hover:bg-green-300",
  ghost: "bg-transparent text-gray-900 hover:bg-gray-100 border border-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

// size classes for different button sizes
const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-5 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center rounded-md font-medium
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";