import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  DarkModeProvider,
  useDarkModeContext,
} from "../context/darkModeContext";
import type { AppProps, AppType } from "next/app";
import { Quicksand } from "@next/font/google";
import clsx from "clsx";

const queryClient = new QueryClient();

const MyApp: AppType = (appProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <Container {...appProps} />
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});
function Container({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkModeContext();

  return (
    <div
      className={clsx([mainFont.variable, "font-sans", isDarkMode && "dark"])}
    >
      <Component {...pageProps} />
    </div>
  );
}
