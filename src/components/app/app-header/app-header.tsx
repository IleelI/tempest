import { Moon, Sun } from "react-feather";
import { useDarkModeContext } from "context/dark-mode-context";
import Switch from "../../common/switch/switch";
import useMounted from "hooks/useMounted/useMounted";

const AppHeader = () => {
  const { isDarkMode, handleDarkModeToggle } = useDarkModeContext();
  const [isMounted] = useMounted();

  return (
    <header className="flex flex-wrap items-center justify-between gap-8">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Tempest
      </h1>
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
