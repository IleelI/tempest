import clsx from "clsx";
import Link from "next/link";
import React from "react";
import type { NavigationItem } from "../navigation";

type NavigationLinkProps = {
  currentPath: string;
  item: NavigationItem;
};
const NavigationLink = ({
  currentPath,
  item: { icon, to },
}: NavigationLinkProps) => {
  const isActive = currentPath === to;

  return (
    <li
      className={clsx([
        "transition-colors duration-300",
        "hover:text-neutral-700 dark:hover:text-neutral-300",
        isActive ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-500",
      ])}
    >
      <Link href={to}>{icon}</Link>
    </li>
  );
};

export default NavigationLink;
