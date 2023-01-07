import { useCallback, useEffect, useState } from "react";
import { getWindow } from "../../utils/browser";

/**
 *
 * @returns true if dark mode is preferred, false if color scheme preference is not supported or light mode is preferred
 */
function checkForDarkModePreference() {
  const window = getWindow();
  if (
    !window ||
    window.matchMedia("(prefers-color-scheme)").media === "not all"
  ) {
    return false;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return true;
  } else {
    return false;
  }
}

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const handleDarkModeOn = useCallback(() => {
    setIsDarkMode(true);
  }, []);

  const handleDarkModeOff = useCallback(() => {
    setIsDarkMode(false);
  }, []);

  // Fix for Next.js React Hydration Error,
  // That was caused by using checkForDarkModePreference
  // as initializer function of useState
  useEffect(() => {
    setIsDarkMode(checkForDarkModePreference());
  }, []);

  // Syncing system/broweser prefered color scheme with application theme
  useEffect(() => {
    const handleColorSchemeChange = ({ matches }: MediaQueryListEvent) => {
      if (matches) {
        handleDarkModeOn();
      } else {
        handleDarkModeOff();
      }
    };

    // Listening for changes in dark mode color scheme change
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleColorSchemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, [handleDarkModeOn, handleDarkModeOff]);

  return {
    isDarkMode,
    handleDarkModeOn,
    handleDarkModeOff,
    handleDarkModeToggle,
  } as const;
}
export type UseDarkModeReturn = ReturnType<typeof useDarkMode>;
