import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { DarkModeProvider } from "../context/darkModeContext";
import Container from "./_container";

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
