export default function getNavigator() {
  if (typeof window === "undefined") {
    return null;
  } else {
    return window.navigator;
  }
}
