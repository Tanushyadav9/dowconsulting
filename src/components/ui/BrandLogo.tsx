import React from "react";
import Image from "next/image";

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

  // Height configurations
  const heightClasses = {
    sm: "h-8",
    md: "h-11",
    lg: "h-14 sm:h-16",
  };

  const imageSizes = {
    sm: { width: 180, height: 78 },
    md: { width: 230, height: 100 },
    lg: { width: 300, height: 130 },
  };

  const descriptorSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  const logoImage = (
    <Image
      src="/images/dow-consulting-logo-transparent.png"
      alt="DOW Consulting - GTM Strategy, Distribution & Brand Building"
      width={imageSizes[size].width}
      height={imageSizes[size].height}
      className={`${heightClasses[size]} w-auto object-contain shrink-0`}
      priority
    />
  );

  if (isDark) {
    return (
      <div
        className={`inline-flex flex-col select-none ${className}`}
        role="img"
        aria-label="DOW Consulting - GTM Strategy, Distribution & Brand Building"
      >
        <div className="inline-flex items-center bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/30">
          {logoImage}
        </div>
        {showDescriptor && (
          <span
            className={`font-medium tracking-wider uppercase mt-2 text-slate-400 ${descriptorSizes[size]}`}
          >
            GTM Strategy, Distribution &amp; Brand Building
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
      role="img"
      aria-label="DOW Consulting - GTM Strategy, Distribution & Brand Building"
    >
      <div className="flex items-center">
        {logoImage}
      </div>
      {showDescriptor && (
        <span
          className={`font-medium tracking-wider uppercase mt-1 text-slate-500 ${descriptorSizes[size]}`}
        >
          GTM Strategy, Distribution &amp; Brand Building
        </span>
      )}
    </div>
  );
}
