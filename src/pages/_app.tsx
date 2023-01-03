import { type AppType } from "next/dist/shared/lib/utils";
import { Quicksand } from "@next/font/google";

import "../styles/globals.css";

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={`${mainFont.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
