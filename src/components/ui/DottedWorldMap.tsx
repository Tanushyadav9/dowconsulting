import React from "react";

interface DottedWorldMapProps {
  className?: string;
  opacity?: number;
}

export function DottedWorldMap({
  className = "",
  opacity = 0.08,
}: DottedWorldMapProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1000 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        <defs>
          <pattern
            id="dotted-grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
          </pattern>
        </defs>

        {/* Global coordinate lines */}
        <path
          d="M0 75 H1000 M0 150 H1000 M0 225 H1000 M0 300 H1000 M0 375 H1000"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 6"
        />
        <path
          d="M200 0 V450 M400 0 V450 M600 0 V450 M800 0 V450"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="4 6"
        />

        {/* Stylized Continent Dot Clusters (North America) */}
        <g fill="currentColor">
          {/* North America */}
          <ellipse cx="220" cy="140" rx="90" ry="50" fill="url(#dotted-grid)" />
          {/* South America */}
          <ellipse cx="290" cy="290" rx="50" ry="70" fill="url(#dotted-grid)" />
          {/* Europe */}
          <ellipse cx="510" cy="130" rx="45" ry="35" fill="url(#dotted-grid)" />
          {/* Africa */}
          <ellipse cx="520" cy="240" rx="55" ry="65" fill="url(#dotted-grid)" />
          {/* Asia / India (prominently mapped) */}
          <ellipse cx="680" cy="160" rx="110" ry="60" fill="url(#dotted-grid)" />
          <circle cx="680" cy="210" r="3" fill="#E02027" /> {/* Focal Hub: India */}
          <circle cx="680" cy="210" r="7" stroke="#E02027" strokeWidth="1" strokeDasharray="2 2" />
          {/* Southeast Asia & Australia */}
          <ellipse cx="780" cy="250" rx="35" ry="25" fill="url(#dotted-grid)" />
          <ellipse cx="820" cy="330" rx="55" ry="40" fill="url(#dotted-grid)" />
        </g>

        {/* Global Trade & Distribution Arc Lines originating from India focal hub */}
        <path
          d="M680 210 Q 580 130 510 130"
          stroke="#E02027"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <path
          d="M680 210 Q 750 180 820 330"
          stroke="#065A8C"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <path
          d="M680 210 Q 450 100 220 140"
          stroke="#17477F"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}
