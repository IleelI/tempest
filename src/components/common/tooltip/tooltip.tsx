import clsx from "clsx";
import type { ReactNode } from "react";

type AbsolutePlacement = "top" | "right" | "bottom" | "left";
type Props = {
  children: ReactNode;
  legend: ReactNode;
  placement?: AbsolutePlacement;
};
export default function Tooltip({
  children,
  legend,
  placement = "bottom",
}: Props) {
  return (
    <div className="group relative flex items-center">
      {children}
      <div
        className={clsx([
          "absolute z-10 w-max max-w-[25ch] px-4 py-2",
          "rounded-lg text-sm font-medium",
          "bg-neutral-50 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200",
          "border border-neutral-200 dark:border-transparent",
          "opacity-0 shadow-main transition-all duration-300",
          "pointer-events-none select-none",
          "group-focus-within:opacity-100 group-hover:opacity-100 group-active:opacity-100",
          placement === "bottom" &&
            "left-1/2 top-[calc(100%_+_0.5rem)] -translate-x-1/2",
          placement === "top" &&
            "left-1/2 bottom-[calc(100%_+_0.5rem)] -translate-x-1/2",
          placement === "left" &&
            "top-1/2 right-[calc(100%_+_0.5rem)] -translate-y-1/2",
          placement === "right" &&
            "top-1/2 left-[calc(100%_+_0.5rem)] -translate-y-1/2",
        ])}
      >
        {legend}
      </div>
    </div>
  );
}
