import clsx from "clsx";

type ExpandButtonProps = {
  isExpanded: boolean;
  handleExpand: () => void;
};
function ExpandButton({ isExpanded, handleExpand }: ExpandButtonProps) {
  return (
    <button
      type="button"
      onClick={handleExpand}
      className={clsx([
        "w-full rounded-md py-2 text-lg transition-colors",
        "bg-neutral-700 text-neutral-300",
        "hover:bg-neutral-900 hover:text-neutral-100",
        "dark:bg-neutral-300 dark:text-neutral-700",
        "dark:hover:bg-neutral-100 dark:hover:text-neutral-900",
      ])}
    >
      {isExpanded ? "Hide" : "Show more"}
    </button>
  );
}

export default ExpandButton;
