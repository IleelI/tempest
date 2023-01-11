(function () {
  // Change these if you use something different in your hook.
  const storageKey = "prefersDarkMode";
  const darkModeClass = "dark";
  const html = document.getElementsByTagName("html").item(0);
  console.log("It works on dev?");

  function setClassOnDocumentBody(darkMode) {
    if (darkMode) {
      html.classList.add(darkModeClass);
    } else {
      html.classList.remove(darkModeClass);
    }
  }

  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const mql = window.matchMedia(preferDarkQuery);
  const supportsColorSchemeQuery = mql.media === preferDarkQuery;

  const localStorageTheme = localStorage.getItem(storageKey);
  const isDarkModePrefered = localStorageTheme
    ? JSON.parse(localStorageTheme)
    : null;

  // Determine the source of truth
  if (isDarkModePrefered !== null) {
    // source of truth from localStorage
    setClassOnDocumentBody(isDarkModePrefered);
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    // source of truth from document.body
    const isDarkMode = document.body.classList.contains(darkModeClass);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
