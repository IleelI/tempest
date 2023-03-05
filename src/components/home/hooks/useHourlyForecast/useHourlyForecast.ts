import { zip } from "lodash";
import { useMemo } from "react";
import { getHours } from "date-fns";
import { useHourlyForecastContext } from "components/home/context/hourly-forecast-context/hourly-forecast-context";

export default function useHourlyForecast() {
  const { hourlyForecastData } = useHourlyForecastContext();

  const currentHour = useMemo(() => getHours(new Date()), []);
  const temperatureHourly = useMemo(
    () =>
      hourlyForecastData?.hourly?.temperature_2m
        .slice(currentHour)
        .splice(0, 24) ?? [],
    [currentHour, hourlyForecastData?.hourly?.temperature_2m]
  );
  const timeHourly = useMemo(
    () =>
      hourlyForecastData?.hourly?.time.slice(currentHour).splice(0, 24) ?? [],
    [currentHour, hourlyForecastData?.hourly.time]
  );
  const weatherCodeHourly = useMemo(
    () =>
      hourlyForecastData?.hourly?.weathercode
        .slice(currentHour)
        .splice(0, 24) ?? [],
    [currentHour, hourlyForecastData?.hourly.weathercode]
  );

  const hourlyData = useMemo(
    () =>
      zip(temperatureHourly, timeHourly, weatherCodeHourly) as [
        number,
        string,
        number
      ][],
    [temperatureHourly, timeHourly, weatherCodeHourly]
  );

  return { hourlyData };
}
