/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGreen: "#56CB56",
        startBtn: "#31792F",
        dropshadowBtn: "#163F15",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Fallback to Arial and generic sans-serif
      },
    },
  },
  plugins: [nextui()],
};
