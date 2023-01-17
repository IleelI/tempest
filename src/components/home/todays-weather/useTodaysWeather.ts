import { getHours } from "date-fns";
import { useMemo } from "react";
import type {
  GetTodayWeatherResponse,
  HourlyData,
} from "services/openMeteo/types";

export default function useTodaysWeather(
  weatherData?: GetTodayWeatherResponse
) {
  const currentHour = useMemo(() => getHours(new Date()), []);

  const [currentWeather, maxTemperature] = useMemo(() => {
    if (!weatherData?.hourly) return [null, null];

    const weather = Object.entries(weatherData.hourly).map(([key, value]) => {
      return [key, value[currentHour]];
    });
    // Get the maximum temperature from first 24 hours
    const maxTemperature = Math.max(
      ...weatherData.hourly.temperature_2m.slice(0, 25)
    );

    return [Object.fromEntries(weather) as HourlyData, maxTemperature];
  }, [weatherData?.hourly, currentHour]);

  return {
    currentHour,
    currentWeather,
    maxTemperature,
  };
}
