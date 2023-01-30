import { getHours } from "date-fns";
import { useMemo } from "react";
import type { HourlyData } from "services/openMeteo/types";
import { useHourlyForecastContext } from "../context/hourly-forecast-context";

export type CurrentForecastWithUnits = {
  [Property in keyof HourlyData]: {
    unit: string;
    value: number | string;
  };
};

export default function useCurrentForecast() {
  const { hourlyForecastData } = useHourlyForecastContext();
  const currentHour = useMemo(() => getHours(new Date()), []);

  const [currentForecast, maxTemperature] = useMemo(() => {
    if (!hourlyForecastData?.hourly) return [null, null];

    const forecast = Object.entries(hourlyForecastData.hourly).map(
      ([key, value]) => {
        return [key, value[currentHour]];
      }
    );
    // Get the maximum temperature from first 24 hours
    const maxTemperature = Math.max(
      ...hourlyForecastData.hourly.temperature_2m.slice(0, 25)
    );

    return [Object.fromEntries(forecast) as HourlyData, maxTemperature];
  }, [hourlyForecastData?.hourly, currentHour]);

  const currentForecastWithUnits = useMemo(() => {
    if (!currentForecast) return null;
    const keys = Object.keys(currentForecast) as Array<
      keyof typeof currentForecast
    >;
    const infoWithUnits = {} as CurrentForecastWithUnits;
    keys.forEach((key) => {
      const info = {
        [key]: {
          value: currentForecast[key],
          unit: hourlyForecastData?.hourly_units[key],
        },
      };
      Object.assign(infoWithUnits, { ...info });
    });
    return infoWithUnits;
  }, [currentForecast, hourlyForecastData?.hourly_units]);

  return {
    currentHour,
    currentForecast,
    currentForecastWithUnits,
    maxTemperature,
  };
}
