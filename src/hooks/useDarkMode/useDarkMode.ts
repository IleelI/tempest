import { useCallback, useEffect, useState } from "react";
import {
  updateStorageDarkModePreference,
  isDarkModePreferred,
  checkStorageForDarkModePreference,
} from "./helpers";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkModeToggle = useCallback(() => {
    setIsDarkMode((prev) => {
      updateStorageDarkModePreference(!prev);
      return !prev;
    });
  }, []);

  const handleDarkModeOn = useCallback(() => {
    updateStorageDarkModePreference(true);
    setIsDarkMode(true);
  }, []);

  const handleDarkModeOff = useCallback(() => {
    updateStorageDarkModePreference(false);
    setIsDarkMode(false);
  }, []);

  // Fix for Next.js React Hydration Error,
  // That was caused by using isDarkModePreferred
  // as initializer function of useState
  useEffect(() => {
    setIsDarkMode(isDarkModePreferred());
  }, []);

  useEffect(() => {
    const handleColorSchemeChange = ({ matches }: MediaQueryListEvent) => {
      const hasPreference = checkStorageForDarkModePreference();
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
