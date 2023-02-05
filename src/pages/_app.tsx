import clsx from "clsx";
import { Quicksand } from "@next/font/google";
import type { AppProps, AppType } from "next/app";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { LocationProvider } from "context/location-context/location-context";
import { DarkModeProvider } from "context/dark-mode-context/dark-mode-context";
import { GeolocationProvider } from "context/geolocation-context/geolocation-context";
import useMounted from "hooks/useMounted/useMounted";
import AppLayout from "components/app/app-layout/app-layout";
import "../styles/globals.css";

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});

const queryClient = new QueryClient();

const MyApp: AppType = (appProps: AppProps) => {
  const {
    pageProps: { session },
  } = appProps;

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider prefersSystemSettings>
          <GeolocationProvider>
            <LocationProvider>
              <Container {...appProps} />
            </LocationProvider>
          </GeolocationProvider>
        </DarkModeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
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
