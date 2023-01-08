import clsx from "clsx";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Home, Grid, Heart, Settings } from "react-feather";
import Link from "next/link";

type NavigationItem = {
  to: string;
  label: string;
  icon: ReactNode;
};
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    to: "/",
    label: "Home",
    icon: <Home />,
  },
  {
    to: "/details",
    label: "Details",
    icon: <Grid />,
  },
  {
    to: "/favourites",
    label: "Favourties",
    icon: <Heart />,
  },

  {
    to: "/settings",
    label: "Settings",
    icon: <Settings />,
  },
];

export default function Navigation() {
  const { asPath } = useRouter();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-lg border border-neutral-300 bg-neutral-50 px-8 py-4 shadow-main dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none">
      <ul className="flex items-center gap-8">
        {NAVIGATION_ITEMS.map(({ to, label, icon }) => {
          const isActive = to === asPath;
          const isDisabled = false;
          return (
            <li
              key={label}
              className={clsx([
                isActive
                  ? "text-neutral-900 dark:text-neutral-50"
                  : "text-neutral-500",
                isDisabled && "pointer-events-none opacity-30",
              ])}
            >
              <Link href={to}>{icon}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
