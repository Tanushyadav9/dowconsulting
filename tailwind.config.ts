import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B2838", // Deep Charcoal Navy
          light: "#2A3D54",
          dark: "#111B27",
        },
        accent: {
          DEFAULT: "#C9A24B", // Warm Gold
          hover: "#B8913B",
          light: "#F7EED9",
        },
        surface: {
          DEFAULT: "#F7F6F3", // Clean off-white
          pure: "#FFFFFF",
          card: "#FFFFFF",
          muted: "#EFECE6",
        },
        slate: {
          text: "#5A6472", // Supporting Slate Gray
          light: "#8C96A5",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
