import type { HTMLInputTypeAttribute } from "react";
import { forwardRef } from "react";
import React from "react";
import type { ChangeHandler, FieldError } from "react-hook-form";
import clsx from "clsx";

type ReactHookFormProps = {
  name: string;
  error?: FieldError;
  onBlur: ChangeHandler;
  onChange: ChangeHandler;
};
type InputFieldProps = ReactHookFormProps & {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { label, type = "text", placeholder, ...inputProps },
    ref
  ) {
    const { name, error } = inputProps;

    return (
      <span className="flex flex-col gap-1">
        <label
          htmlFor={name}
          className={clsx([
            "text-lg font-medium text-neutral-800",
            "dark:text-neutral-100",
          ])}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={name}
          type={type}
          placeholder={placeholder}
          {...inputProps}
          className={clsx([
            "rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-800",
            "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
          ])}
        />
        {error && (
          <span
            className={clsx([
              "text-xs font-medium text-red-700",
              "dark:font-normal dark:text-red-300",
            ])}
          >
            {error?.message}
          </span>
        )}
      </span>
    );
  }
);

export default InputField;
