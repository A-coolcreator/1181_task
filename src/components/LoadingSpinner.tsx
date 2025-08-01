interface LoadingSpinnerProps {
  className?: string;
  "aria-label"?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  className = "w-6 h-6",
  "aria-label": ariaLabel = "Loading"
}) => {
  return (
    <div 
      className={`${className} animate-spin`}
      role="status"
      aria-label={ariaLabel}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        />
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          className="opacity-75"
        />
      </svg>
    </div>
  );
};
