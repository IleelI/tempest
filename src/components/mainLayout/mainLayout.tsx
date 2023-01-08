import type { ReactNode } from "react";
import Navigation from "../navigation/navigation";

type MainLayoutProps = {
  children: ReactNode;
};
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative bg-neutral-50 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
      {children}
      <Navigation />
    </div>
  );
}
