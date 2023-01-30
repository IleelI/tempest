import type { ReactNode } from "react";
import AppHeader from "../app-header/app-header";
import AppNavigation from "../app-navigation/app-navigation";

type AppLayoutProps = {
  children: ReactNode;
};
export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="m-auto flex min-h-screen max-w-lg flex-col gap-8 p-4 !pb-24 sm:p-6 md:p-8 lg:max-w-xl">
      <AppHeader />
      {children}
      <AppNavigation />
    </div>
  );
}
