// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-main)", ...fontFamily.sans],
      },
      boxShadow: {
        main: "0px 4px 16px -4px rgba(24, 24, 27, 0.1)",
        switchLight: " 0px 0px 0px 8px rgba(0, 0, 0, 0.25)",
        switchDark: " 0px 0px 0px 8px rgba(255, 255, 255, 0.25)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
