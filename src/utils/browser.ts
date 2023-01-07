export function getWindow() {
  if (typeof window === "undefined") {
    return null;
  } else {
    return window;
  }
}

export function getNavigator() {
  const window = getWindow();
  return window ? window.navigator : null;
}
