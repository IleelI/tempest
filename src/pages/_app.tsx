import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { DarkModeProvider } from "../context/darkModeContext";
import type { AppProps, AppType } from "next/app";
import { Quicksand } from "@next/font/google";
import clsx from "clsx";
import AppLayout from "components/app/appLayout/appLayout";
import { GeolocationProvider } from "context/geolocationContext";
import useMounted from "hooks/useMounted/useMounted";
import { LocationProvider } from "context/locationContext";

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
