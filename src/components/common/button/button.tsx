import clsx from "clsx";
import type { ReactNode } from "react";
import React from "react";

type Props = {
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  type?: "button" | "reset" | "submit";
};
function Button({ label, icon, type = "button", isDisabled = false }: Props) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={clsx([
        "flex items-center gap-2 self-end rounded-lg bg-neutral-700 px-4 py-2 text-neutral-200 transition-colors duration-300",
        "hover:bg-neutral-800 hover:text-neutral-100",
        "dark:bg-neutral-300 dark:text-neutral-700 dark:hover:bg-neutral-200 dark:hover:text-neutral-800",
        "disabled:pointer-events-none disabled:opacity-40",
      ])}
    >
      {icon}
      {label}
    </button>
  );
}

export default Button;
