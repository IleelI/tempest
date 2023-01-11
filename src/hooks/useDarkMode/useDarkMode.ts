import { useCallback, useEffect, useState } from "react";
import {
  updateDarkModePreferenceInStorage,
  isDarkModePreferred,
  checkDarkModePreferenceInStorage,
  handleDarkModeClassSync,
} from "./helpers";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkModeToggle = useCallback(() => {
    setIsDarkMode((prev) => {
      updateDarkModePreferenceInStorage(!prev);
      return !prev;
    });
  }, []);

  const handleDarkModeOn = useCallback(() => {
    updateDarkModePreferenceInStorage(true);
    setIsDarkMode(true);
  }, []);

  const handleDarkModeOff = useCallback(() => {
    updateDarkModePreferenceInStorage(false);
    setIsDarkMode(false);
  }, []);

  // Fix for Next.js React Hydration Error,
  // That was caused by using isDarkModePreferred
  // as initializer function of useState
  useEffect(() => {
    setIsDarkMode(isDarkModePreferred());
  }, []);

  // Sync tailwindCSS dark className with html tag
  useEffect(() => {
    handleDarkModeClassSync(isDarkMode);
  }, [isDarkMode]);

  // Adding change listener for system color scheme change
  useEffect(() => {
    // If user has changed color scheme of app by himself, we ignore any change in system preferences
    const handleColorSchemeChange = ({ matches }: MediaQueryListEvent) => {
      const hasPreference = checkDarkModePreferenceInStorage();
      if (hasPreference !== null) return;
      if (matches) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
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
