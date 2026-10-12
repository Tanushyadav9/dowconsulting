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
        brand: {
          red: "#E02027",
          "red-hover": "#C7181F",
          "red-light": "#FDE8E9",
          navy: "#17477F",
          "navy-dark": "#0B1B33",
          "navy-light": "#235B9E",
          blue: "#065A8C",
          "blue-light": "#E6F0F7",
          surface: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#F1F5F9",
        },
        slate: {
          dark: "#0F172A",
          heading: "#17477F",
          body: "#334155",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
