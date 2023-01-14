import clsx from "clsx";
import Link from "next/link";
import React from "react";
import type { NavigationItem } from "../appNavigation";

type NavigationLinkProps = {
  currentPath: string;
  item: NavigationItem;
};
const NavigationLink = ({
  currentPath,
  item: { icon, to, label },
}: NavigationLinkProps) => {
  const isActive = currentPath === to;

  return (
    <li
      className={clsx([
        "transition-colors duration-300",
        "hover:text-neutral-700 dark:hover:text-neutral-300",
        isActive
          ? "text-neutral-900 transition-none dark:text-neutral-50"
          : "text-neutral-500",
      ])}
    >
      <Link href={to} aria-label={label} className="[&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </Link>
    </li>
  );
};

export default NavigationLink;
