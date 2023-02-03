import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Home, Grid, Heart, User } from "react-feather";
import { getFirstSegment } from "utils/string";
import NavigationLink from "./navigation-link/navigation-link";

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
    label: "Weather details",
    icon: <Grid />,
  },
  {
    to: "/favourites",
    label: "Favourite locations",
    icon: <Heart />,
  },
  {
    to: "/user",
    label: "User Profile",
    icon: <User />,
  },
];

export default function AppNavigation() {
  const { pathname } = useRouter();
  const currentPath = useMemo(() => getFirstSegment(pathname), [pathname]);

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-lg border border-neutral-300 bg-neutral-50 px-8 py-4 shadow-main dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-none">
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
