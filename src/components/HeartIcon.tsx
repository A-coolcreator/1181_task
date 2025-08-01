interface HeartIconProps {
  className?: string;
  "aria-label"?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ 
  className = "w-4 h-4",
  "aria-label": ariaLabel = "Heart"
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaLabel}
      role="img"
    >
      <path
        d="M15 6.875C15 11.25 8.51312 14.7913 8.23687 14.9375C8.16406 14.9767 8.08268 14.9972 8 14.9972C7.91732 14.9972 7.83594 14.9767 7.76312 14.9375C7.48688 14.7913 1 11.25 1 6.875C1.00116 5.84764 1.40979 4.86269 2.13624 4.13624C2.86269 3.40979 3.84764 3.00116 4.875 3C6.16563 3 7.29562 3.555 8 4.49312C8.70438 3.555 9.83438 3 11.125 3C12.1524 3.00116 13.1373 3.40979 13.8638 4.13624C14.5902 4.86269 14.9988 5.84764 15 6.875Z"
        fill="white"
      />
    </svg>
  );
};
