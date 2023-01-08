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
        main: "0px 6px 24px -2px rgba(24, 24, 27, 0.1)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
