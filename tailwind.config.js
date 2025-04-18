/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#41b6e6", // Light blue from logo
          DEFAULT: "#0072bc", // Main blue from the design
          dark: "#005999", // Darker shade for hover states
        },
        secondary: {
          light: "#f0f9ff",
          DEFAULT: "#e6f2ff", // Light blue background
          dark: "#cce5ff",
        },
        accent: {
          DEFAULT: "#ff6b00", // Orange from pricing elements
        },
        gray: {
          light: "#f8f9fa",
          DEFAULT: "#e9ecef",
          dark: "#343a40",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "2rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        "card-hover":
          "0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInFromBottom: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        slideInFromRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1.5s ease-in-out",
        slideInFromBottom: "slideInFromBottom 0.8s ease-out",
        scaleIn: "scaleIn 0.8s ease-out",
        slideInFromRight: "slideInFromRight 0.8s ease-out",
        slideInFromLeft: "slideInFromLeft 0.8s ease-out",
      },
    },
  },
  plugins: [
    "@tailwindcss/postcss",
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
