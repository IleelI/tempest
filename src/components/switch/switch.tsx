import type { ChangeEvent, ReactNode } from "react";
import { forwardRef } from "react";

type SwitchProps = {
  name: string;
  label?: string | ReactNode;
  value?: boolean;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { name, label, value, handleChange },
  ref
) {
  return (
    <span className="flex items-center justify-between gap-2">
      <label htmlFor={name} className="text-sm font-medium [&>*]:h-4 [&>*]:w-4">
        {label}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        checked={value}
        onChange={handleChange}
        role="switch"
        type="checkbox"
        className="switch"
      />
    </span>
  );
});

export default Switch;
