import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { Home, Grid, Heart, Settings } from "react-feather";
import { getFirstSegment } from "../../utils/string";
import NavigationLink from "./navigationLink/navigationLink";

export type NavigationItem = {
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
  const { pathname } = useRouter();
  const currentPath = getFirstSegment(pathname);

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-lg border border-neutral-300 bg-neutral-50 px-8 py-4 shadow-main dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none">
      <ul className="flex items-center gap-8">
        {NAVIGATION_ITEMS.map((item) => (
          <NavigationLink
            key={item.label}
            item={item}
            currentPath={currentPath}
          />
        ))}
      </ul>
    </nav>
  );
}
