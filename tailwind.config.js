/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  content: [
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
