export function renderTimeOfTheDay(currentHour: number) {
  if (currentHour < 6 || currentHour > 20) {
    return "Night";
  } else if (currentHour < 12) {
    return "Morning";
  } else if (currentHour === 12) {
    return "Noon";
  } else if (currentHour < 18) {
    return "Afternoon";
  } else if (currentHour <= 20) {
    return "Evening";
  } else {
    return "Midnight";
  }
}
