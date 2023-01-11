import { getWindow } from "utils/browser";

const STORAGE_KEY = "prefersDarkMode";

export function checkDarkModePreferenceInStorage() {
  const window = getWindow();
  if (!window) {
    return null;
  }
  const storageContent = window.localStorage.getItem(STORAGE_KEY);
  if (storageContent) {
    const isDarkModePreferred = JSON.parse(storageContent);
    if (typeof isDarkModePreferred === "boolean") {
      return isDarkModePreferred;
    }
  }
  return null;
}

export function updateDarkModePreferenceInStorage(
  isDarkModePreferred: boolean
) {
  const window = getWindow();
  if (!window) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(isDarkModePreferred));
}

/**
 *
 * @returns true if dark mode is preferred, false if color scheme preference is not supported or light mode is preferred
 */
export function isDarkModePreferred() {
  const window = getWindow();
  if (!window) {
    return true;
  }
  const storagePreferrence = checkDarkModePreferenceInStorage();
  if (storagePreferrence !== null) {
    return storagePreferrence;
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

export function handleDarkModeClassSync(isDarkMode: boolean) {
  const html = document.getElementsByTagName("html").item(0);
  if (!html) return;

  if (isDarkMode) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}
