import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#007BFF", // Blue for primary elements
        secondary: "#343A40", // Dark Gray for text
        accent: {
          green: "#28A745", // Green for accents
          purple: "#6F42C1", // Purple for accents
          cyan: "#17A2B8", // Cyan for accents
        },
        background: "#F8F9FA", // Light Gray for background
        white: "#FFFFFF", // White for background
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"], // Clean and modern sans-serif font
        serif: ["Merriweather", "serif"], // Option for a serif font if needed
      },
    },
  },
  plugins: [],
};

export default config;
