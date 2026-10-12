import React from "react";

interface RisingArrowAccentProps {
  className?: string;
  size?: number;
  color?: string;
}

export function RisingArrowAccent({
  className = "",
  size = 18,
  color = "#E02027",
}: RisingArrowAccentProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <rect x="2" y="14" width="3" height="6" rx="1" fill="#17477F" />
      <rect x="7" y="10" width="3" height="10" rx="1" fill="#065A8C" />
      <rect x="12" y="6" width="3" height="14" rx="1" fill={color} />
      <path
        d="M3 14L12 6L20 3M20 3V9M20 3H14"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
