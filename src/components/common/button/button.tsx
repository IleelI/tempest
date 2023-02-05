import clsx from "clsx";
import type { MouseEvent, ReactNode } from "react";
import React from "react";

type Props = {
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  className?: string;
  type?: "button" | "reset" | "submit";
  variant?: "primary" | "secondary";
  onClick?: (event: MouseEvent) => void;
};
function Button({
  label,
  icon,
  className,
  type = "button",
  variant = "primary",
  isDisabled = false,
  onClick,
}: Props) {
  const isPrimary = variant === "primary";
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={clsx([
        "flex min-w-max items-center justify-center gap-3 rounded-lg border px-4 py-2.5 font-medium transition-colors",
        "disabled:pointer-events-none disabled:opacity-40",
        isPrimary
          ? "border-transparent bg-neutral-800 text-neutral-200"
          : "border-neutral-800 text-neutral-800",
        isPrimary
          ? "hover:bg-neutral-700 hover:text-neutral-100"
          : "hover:bg-neutral-800 hover:text-neutral-200",
        isPrimary
          ? "dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-50 dark:hover:text-neutral-900"
          : "dark:border-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-200 dark:hover:text-neutral-800",
        className,
      ])}
    >
      {icon}
      {label}
    </button>
  );
}

export default Button;
