import type { HTMLInputTypeAttribute, ReactNode } from "react";
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
  isRequired?: boolean;
  icon?: ReactNode;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
};
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      icon,
      label,
      placeholder,
      type = "text",
      isRequired = false,
      ...inputProps
    },
    ref
  ) {
    const { name, error } = inputProps;

    return (
      <span className="flex flex-col gap-1">
        <label
          htmlFor={name}
          className={clsx([
            "flex items-center gap-1 font-medium text-neutral-800",
            "dark:text-neutral-100",
          ])}
        >
          {label}
          {isRequired && <span>*</span>}
        </label>
        <div
          className={clsx([
            "flex overflow-hidden rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-800",
            "dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200",
            "focus-within:border-blue-700 focus-within:dark:border-blue-300",
            error &&
              "!border-red-700 !text-red-700 dark:!border-red-300 dark:!text-red-300",
          ])}
        >
          {icon && (
            <span
              className={clsx([
                "flex items-center border-r border-neutral-300 bg-neutral-100 px-4 py-2",
                "dark:border-neutral-700 dark:bg-neutral-700",
              ])}
            >
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...inputProps}
            className={clsx([
              "flex-[2] items-center border-none bg-transparent p-2 text-sm tracking-wide text-neutral-800 outline-none",
              "dark:text-neutral-200",
              error &&
                "text-red-700 placeholder:text-red-700 placeholder:opacity-70 dark:text-red-300 dark:placeholder:text-red-300",
            ])}
          />
        </div>
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
