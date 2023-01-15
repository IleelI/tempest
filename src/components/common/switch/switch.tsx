import clsx from "clsx";
import type { ChangeEvent, ReactNode } from "react";
import { forwardRef } from "react";

type SwitchProps = {
  name: string;
  label?: string | ReactNode;
  value?: boolean;
  disabled?: boolean;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { name, label, disabled, value, handleChange },
  ref
) {
  return (
    <span className="flex items-center justify-between gap-2">
      <label
        htmlFor={name}
        className="cursor-pointer select-none text-sm font-medium"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        checked={value}
        onChange={handleChange}
        disabled={disabled}
        role="switch"
        type="checkbox"
        className={clsx(
          "switch",
          [
            "bg-neutral-400 dark:bg-neutral-700",
            "grid cursor-pointer select-none appearance-none rounded-full border-none outline-offset-4",
            "disabled:cursor-not-allowed",
          ],
          [
            "before:rounded-full before:bg-neutral-50 dark:before:bg-neutral-900",
            "disabled:before:border disabled:before:border-neutral-50 disabled:before:bg-transparent",
            "dark:disabled:before:border-neutral-900 dark:disabled:before:bg-transparent",
            "disabled:hover:before:shadow-none dark:disabled:hover:before:shadow-none",
            "hover:before:shadow-switchLight dark:hover:before:shadow-switchDark",
            "before:transition-all before:duration-300 before:ease-out",
          ]
        )}
      />
    </span>
  );
});

export default Switch;
