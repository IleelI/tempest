import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  DarkModeProvider,
  useDarkModeContext,
} from "../context/darkModeContext";
import type { AppProps, AppType } from "next/app";
import { Quicksand } from "@next/font/google";
import clsx from "clsx";
import { GeolocationProvider } from "../context/geolocationContext";
import MainLayout from "../components/mainLayout/mainLayout";

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});

const queryClient = new QueryClient();

const MyApp: AppType = (appProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <GeolocationProvider>
          <Container {...appProps} />
        </GeolocationProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

function Container({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkModeContext();

  return (
    <div
      className={clsx([mainFont.variable, "font-sans", isDarkMode && "dark"])}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </div>
  );
}
