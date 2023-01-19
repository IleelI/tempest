import { getHours } from "date-fns";
import { useMemo } from "react";
import type {
  GetTodayWeatherResponse,
  HourlyData,
} from "services/openMeteo/types";

export type CurrentWeatherWithUnits = {
  [Property in keyof HourlyData]: {
    unit: string;
    value: number | string;
  };
};

export default function useCurrentWeather(
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

  const currentWeatheWithUnits = useMemo(() => {
    if (!currentWeather) return null;
    const keys = Object.keys(currentWeather) as Array<
      keyof typeof currentWeather
    >;
    const infoWithUnits = {} as CurrentWeatherWithUnits;
    keys.forEach((key) => {
      const info = {
        [key]: {
          value: currentWeather[key],
          unit: weatherData?.hourly_units[key],
        },
      };
      Object.assign(infoWithUnits, { ...info });
    });
    return infoWithUnits;
  }, [currentWeather, weatherData?.hourly_units]);

  return {
    currentHour,
    currentWeather,
    currentWeatheWithUnits,
    maxTemperature,
  };
}
