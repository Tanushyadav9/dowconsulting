import React from "react";

export function DraftPreviewBanner() {
  const showBanner = process.env.NEXT_PUBLIC_SHOW_DRAFT_BANNER === "true";

  if (!showBanner) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Client Draft Preview"
      className="bg-[#E02027] text-white py-1.5 px-4 text-xs font-semibold text-center tracking-wide"
    >
      <span>
        Client Review Preview &bull; This portfolio is currently in private preview mode pending final client confirmation.
      </span>
    </div>
  );
}
