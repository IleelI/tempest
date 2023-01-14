import clsx from "clsx";
import type { ReactNode } from "react";

type Props = {
  legend: ReactNode;
  children: ReactNode;
};
export default function Tooltip({ children, legend }: Props) {
  return (
    <div className="group relative">
      {children}
      <div
        className={clsx([
          "absolute z-10 w-max max-w-[25ch] px-4 py-2",
          "rounded-lg text-sm font-medium",
          "bg-neutral-50 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200",
          "border border-neutral-200 dark:border-transparent",
          "opacity-0 shadow-lg transition-all duration-300",
          "pointer-events-none select-none",
          "group-focus-within:opacity-100 group-hover:opacity-100 group-active:opacity-100",
        ])}
      >
        {legend}
      </div>
    </div>
  );
}
