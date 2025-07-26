import { ReactNode, forwardRef } from "react";
import { HeartIcon } from "./HeartIcon";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  withHearts?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  size = "md",
  className = "",
  withHearts = false,
  type = "button",
  "aria-label": ariaLabel,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-full transition-colors font-grand-hotel";
  
  const variantClasses = {
    primary: "bg-[#FF2157] text-white hover:bg-[#E01E4F]",
    secondary: "bg-[rgba(181,0,44,0.13)] text-[#B5002C] hover:bg-[rgba(181,0,44,0.2)]",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-lg",
    md: "px-6 py-3 text-xl",
    lg: "px-6 py-4 text-2xl",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      aria-label={ariaLabel}
      {...props}
    >
      {withHearts && !loading && <HeartIcon className="w-4 h-4" />}
      {loading && <LoadingSpinner className="w-4 h-4" />}
      {children}
      {withHearts && !loading && <HeartIcon className="w-4 h-4" />}
    </button>
  );
});

Button.displayName = "Button";
