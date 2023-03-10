// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      gridTemplateColumns: {
        favouriteLocations: "minmax(0, 1fr), max-content",
      },
      fontFamily: {
        sans: ["var(--font-main)", ...fontFamily.sans],
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      boxShadow: {
        main: "0px 4px 16px -4px rgba(24, 24, 27, 0.1)",
        switchLight: "0px 0px 0px 8px rgba(0, 0, 0, 0.25)",
        switchDark: "0px 0px 0px 8px rgba(255, 255, 255, 0.25)",
      },
      aspectRatio: {
        twoToOne: "3/2",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
