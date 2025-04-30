/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Nunito Sans'", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#4dabf5",
          DEFAULT: "#3498db",
          dark: "#2980b9",
        },
      },
    },
  },
  plugins: [],
};
