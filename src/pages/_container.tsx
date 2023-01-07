import type { AppProps } from "next/app";
import { Quicksand } from "@next/font/google";
import { useDarkModeContext } from "../context/darkModeContext";
import clsx from "clsx";

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});

export default function Container({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkModeContext();

  return (
    <div
      className={clsx([mainFont.variable, "font-sans", isDarkMode && "dark"])}
    >
      <Component {...pageProps} />
    </div>
  );
}
