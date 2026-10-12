import React from "react";

interface BrandLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showDescriptor?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = "light",
  size = "md",
  showDescriptor = true,
  className = "",
}: BrandLogoProps) {
  const isDark = variant === "dark";

  // Sizes
  const sizeClasses = {
    sm: "h-7",
    md: "h-10",
    lg: "h-12 sm:h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl sm:text-4xl",
  };

  const descriptorSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      role="img"
      aria-label="DOW Consulting - GTM Strategy, Distribution & Brand Building"
    >
      <div className="flex items-center gap-2">
        {/* Rising-Arrow Symbol Device from Logo */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${sizeClasses[size]} w-auto shrink-0`}
          aria-hidden="true"
        >
          {/* Subtle base pill / foundation */}
          <rect
            x="3"
            y="3"
            width="30"
            height="30"
            rx="6"
            fill={isDark ? "#17477F" : "#0B1B33"}
            opacity={isDark ? "0.3" : "0.06"}
          />
          {/* Growth bar 1 */}
          <rect x="7" y="21" width="4" height="8" rx="1.5" fill={isDark ? "#93C5FD" : "#17477F"} />
          {/* Growth bar 2 */}
          <rect x="13" y="16" width="4" height="13" rx="1.5" fill={isDark ? "#60A5FA" : "#065A8C"} />
          {/* Growth bar 3 */}
          <rect x="19" y="11" width="4" height="18" rx="1.5" fill="#E02027" />
          {/* Rising Arrow Path Device */}
          <path
            d="M8 22L19 11L29 7M29 7V15M29 7H21"
            stroke="#E02027"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Brand Text Typography */}
        <div className="flex flex-col leading-none">
          <div className={`font-black tracking-tight flex items-baseline gap-1.5 ${textSizes[size]}`}>
            <span className={isDark ? "text-white" : "text-[#17477F]"}>DOW</span>
            <span
              className={`font-semibold tracking-wider ${
                isDark ? "text-[#93C5FD]" : "text-[#065A8C]"
              }`}
            >
              CONSULTING
            </span>
          </div>

          {showDescriptor && (
            <span
              className={`font-medium tracking-wider uppercase mt-0.5 ${descriptorSizes[size]} ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              GTM Strategy, Distribution &amp; Brand Building
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
