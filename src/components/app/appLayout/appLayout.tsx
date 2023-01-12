import type { ReactNode } from "react";
import AppHeader from "../appHeader/appHeader";
import AppNavigation from "../appNavigation/appNavigation";

type AppLayoutProps = {
  children: ReactNode;
};
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="m-auto flex min-h-screen flex-col p-4 sm:max-w-screen-sm sm:p-6 md:max-w-screen-md md:p-8">
      <AppHeader />
      {children}
      <AppNavigation />
    </div>
  );
}
