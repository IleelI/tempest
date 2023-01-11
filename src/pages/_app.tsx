import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { DarkModeProvider } from "../context/darkModeContext";
import type { AppProps, AppType } from "next/app";
import { Quicksand } from "@next/font/google";
import clsx from "clsx";
import AppLayout from "components/app/appLayout/appLayout";
import { GeolocationProvider } from "context/geolocationContext";
import { useEffect, useState } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  // Workaround to prevent flashing when non-default theme is detected
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className={clsx([
        mainFont.variable,
        "font-sans",
        !isMounted && "invisible",
      ])}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </div>
  );
}
