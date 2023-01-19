import clsx from "clsx";
import type { ReactNode } from "react";

export type InfoCardData = {
  name: string;
  icon: ReactNode;
  unit: string;
  value: string | number;
};

type InfoCardProps = InfoCardData & {
  index: number;
  useContrastCards?: boolean;
};
export default function InfoCard(props: InfoCardProps) {
  const { name, value, unit, icon, index, useContrastCards = false } = props;

  const relativeIndex = index % 4 === 1 ? index - 1 : index;
  const isContrastCard = useContrastCards && relativeIndex % 4 === 0;

  return (
    <article
      className={clsx([
        "flex w-full flex-col justify-between p-4",
        isContrastCard
          ? "border border-transparent bg-neutral-800 text-neutral-200 dark:border-neutral-400 dark:bg-neutral-300 dark:text-neutral-800"
          : "border border-neutral-200 bg-neutral-50 text-neutral-800 dark:border-transparent dark:bg-neutral-800 dark:text-neutral-200",
        "aspect-twoToOne rounded-lg shadow-main",
      ])}
    >
      <header className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 lg:[&_svg]:h-5 lg:[&_svg]:w-5">
        {icon}
        <h1 className="text-lg font-medium">{name}</h1>
      </header>
      <p className="flex items-end justify-end gap-1 text-3xl font-semibold">
        {value}
        <span className="text-base font-normal">{unit}</span>
      </p>
    </article>
  );
}
