import { type AppType } from "next/dist/shared/lib/utils";
import { Quicksand } from "@next/font/google";

import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const mainFont = Quicksand({
  weight: "variable",
  subsets: ["latin", "latin-ext"],
  variable: "--font-main",
});

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${mainFont.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
