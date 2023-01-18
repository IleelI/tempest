import type { GetTodayWeatherResponse } from "services/openMeteo/types";

import { zip } from "lodash";
import { useMemo } from "react";
import { getHours } from "date-fns";

export default function useHourlyWeather(
  weatherData?: GetTodayWeatherResponse
) {
  const currentHour = useMemo(() => getHours(new Date()), []);
  const temperatureHourly = useMemo(
    () =>
      weatherData?.hourly?.temperature_2m.slice(currentHour).splice(0, 24) ??
      [],
    [currentHour, weatherData?.hourly?.temperature_2m]
  );
  const timeHourly = useMemo(
    () => weatherData?.hourly?.time.slice(currentHour).splice(0, 24) ?? [],
    [currentHour, weatherData?.hourly.time]
  );
  const weatherCodeHourly = useMemo(
    () =>
      weatherData?.hourly?.weathercode.slice(currentHour).splice(0, 24) ?? [],
    [currentHour, weatherData?.hourly.weathercode]
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
