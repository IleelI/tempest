import { Moon, Sun } from "react-feather";
import { useDarkModeContext } from "context/darkModeContext";
import Switch from "../../switch/switch";

const AppHeader = () => {
  const { isDarkMode, handleDarkModeToggle } = useDarkModeContext();

  return (
    <header className="flex items-center justify-between gap-8">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
        Tempest
      </h1>
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
    </header>
  );
};

export default AppHeader;
