import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { DarkModeProvider } from "../context/dark-mode-context";
import type { AppProps, AppType } from "next/app";
import { Quicksand } from "@next/font/google";
import clsx from "clsx";
import AppLayout from "components/app/app-layout/app-layout";
import { GeolocationProvider } from "context/geolocation-context";
import useMounted from "hooks/useMounted/useMounted";
import { LocationProvider } from "context/location-context";

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});

const queryClient = new QueryClient();

const MyApp: AppType = (appProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider prefersSystemSettings>
        <GeolocationProvider>
          <LocationProvider>
            <Container {...appProps} />
          </LocationProvider>
        </GeolocationProvider>
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

function Container({ Component, pageProps }: AppProps) {
  const [isMounted] = useMounted();

  return (
    <div
      className={clsx([
        `${mainFont.variable} font-sans`,
        // Workaround to prevent flashing when non-default theme is detected
        !isMounted && "invisible",
      ])}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </div>
  );
}
