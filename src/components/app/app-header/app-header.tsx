import { Moon, Sun } from "react-feather";
import { useDarkModeContext } from "context/dark-mode-context/dark-mode-context";
import Switch from "../../common/switch/switch";
import Link from "next/link";
import clsx from "clsx";
import useMounted from "hooks/useMounted/useMounted";

const AppHeader = () => {
  const { isDarkMode, handleDarkModeToggle } = useDarkModeContext();
  const [isMounted] = useMounted();

  return (
    <header className="flex flex-wrap items-center justify-between gap-8">
      <Link
        href="/"
        className={clsx([
          "text-2xl font-bold text-neutral-900",
          "dark:text-neutral-50",
          "hover:text-blue-700 hover:underline hover:underline-offset-4 hover:dark:text-blue-300",
        ])}
      >
        Tempest
      </Link>
      {isMounted && (
        <Switch
          name="dark-mode"
          label={
            isDarkMode ? (
              <Sun aria-label="toggle light mode" />
            ) : (
              <Moon aria-label="toggle dark mode" />
            )
          }
          value={isDarkMode}
          handleChange={() => handleDarkModeToggle()}
        />
      )}
    </header>
  );
};

export default AppHeader;
