import useMounted from "hooks/useMounted/useMounted";
import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  const [isMounted] = useMounted();

  if (!isMounted) return null;
  return (
    <Toaster
      toastOptions={{
        className:
          "!px-4 !py-2 text-sm font-medium bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200",
      }}
    />
  );
}
