import { getWindow } from "utils/browser";

export const COLOR_SCHEME_STORAGE_KEY = "prefersDarkMode";

export function getDarkModePreferenceFromStorage() {
  const window = getWindow();
  if (!window) {
    return null;
  }
  const storageContent = window.localStorage.getItem(COLOR_SCHEME_STORAGE_KEY);
  if (storageContent) {
    const isDarkModePreferred = JSON.parse(storageContent);
    if (typeof isDarkModePreferred === "boolean") {
      return isDarkModePreferred;
    }
  }
  return null;
}

export function updateDarkModePreferenceFromStorage(
  isDarkModePreferred: boolean
) {
  const window = getWindow();
  if (!window) {
    return;
  }
  window.localStorage.setItem(
    COLOR_SCHEME_STORAGE_KEY,
    JSON.stringify(isDarkModePreferred)
  );
}

export function updateDarkModeClassName(isDarkMode: boolean) {
  const html = document.getElementsByTagName("html").item(0);
  if (!html) return;
  if (isDarkMode) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

/**
 *
 * @returns true if dark mode is preferred, false if color scheme preference is not supported or light mode is preferred
 */
export function isDarkModePreferred(prefersSystemSettings = false) {
  const window = getWindow();
  if (!window) {
    return true;
  }
  const storagePreference = getDarkModePreferenceFromStorage();
  if (!prefersSystemSettings && storagePreference !== null) {
    return storagePreference;
  }
  if (window.matchMedia("(prefers-color-scheme)").media === "not all") {
    return false;
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return true;
  } else {
    return false;
  }
}
