import { useCallback, useEffect, useState } from "react";
import {
  updateDarkModePreferenceFromStorage,
  isDarkModePreferred,
  getDarkModePreferenceFromStorage,
  updateDarkModeClassName,
} from "./helpers";

/**
 *
 * @param prefersSystemSettings - boolean that controls whether currently selected theme should be overridden by any change in system theme, defaults to false
 * @returns darkMode object containing darkMode boolean state and helper methods to manipulate it.
 */
export default function useDarkMode(prefersSystemSettings = false) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkModeToggle = useCallback(() => {
    setIsDarkMode((prev) => {
      updateDarkModePreferenceFromStorage(!prev);
      return !prev;
    });
  }, []);

  const handleDarkModeOn = useCallback(() => {
    updateDarkModePreferenceFromStorage(true);
    setIsDarkMode(true);
  }, []);

  const handleDarkModeOff = useCallback(() => {
    updateDarkModePreferenceFromStorage(false);
    setIsDarkMode(false);
  }, []);

  // Fix for Next.js React Hydration Error,
  // That was caused by using isDarkModePreferred
  // as initializer function of useState
  useEffect(() => {
    setIsDarkMode(isDarkModePreferred());
  }, []);

  // Sync TailwindCSS dark className with Html tag
  useEffect(() => {
    updateDarkModeClassName(isDarkMode);
  }, [isDarkMode]);

  // Adding change listener for dark color scheme change
  useEffect(() => {
    // Depending of settings we've set, we either give priority to system change, or to user change
    const handleColorSchemeChange = ({ matches }: MediaQueryListEvent) => {
      const hasPreference = getDarkModePreferenceFromStorage();
      if (!prefersSystemSettings && hasPreference !== null) return;
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
    // Removing old listeners on unmount
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleColorSchemeChange);
    };
  }, [handleDarkModeOn, handleDarkModeOff, prefersSystemSettings]);

  return {
    isDarkMode,
    handleDarkModeOn,
    handleDarkModeOff,
    handleDarkModeToggle,
  } as const;
}
export type UseDarkModeReturn = ReturnType<typeof useDarkMode>;
