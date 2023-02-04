import React from "react";

type DividerProps = {
  title?: string;
};
export default function Divider({ title }: DividerProps) {
  if (!title) {
    return <hr className="w-full border-neutral-400 dark:border-neutral-600" />;
  }
  return (
    <section className="flex items-center gap-4">
      <hr className="flex-[2] border-neutral-400 dark:border-neutral-600" />
      <h1 className="mx-auto text-2xl font-bold text-neutral-400 dark:text-neutral-600">
        {title}
      </h1>
      <hr className="flex-[2] border-neutral-400 dark:border-neutral-600" />
    </section>
  );
}
