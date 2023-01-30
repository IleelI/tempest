import { useHourlyForecastContext } from "components/home/context/hourly-forecast-context";
import useCurrentForecast from "components/home/hooks/useCurrentForecast";
import React from "react";
import { formatWeatherCode, getWeatherIcon } from "services/openMeteo/utils";
import { renderTimeOfTheDay } from "utils/time";

export default function CurrentForecast() {
  const { hourlyForecastData } = useHourlyForecastContext();
  const { currentHour, currentForecast, maxTemperature } =
    useCurrentForecast(hourlyForecastData);

  if (!currentForecast || !maxTemperature) return null;
  const {
    temperature_2m: temperature,
    apparent_temperature: relativeTemperature,
    weathercode,
  } = currentForecast;

  // TODO Add units from backend reponse
  return (
    <article className="grid w-full grid-cols-2 overflow-hidden rounded-lg shadow-main">
      <section className="flex flex-col items-start gap-4 rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-neutral-200 bg-neutral-50 p-4 text-start dark:border-neutral-800 dark:bg-neutral-800">
        <h1 className="text-3xl font-medium text-neutral-900 dark:text-neutral-50">
          {temperature.toFixed(0)}°C
        </h1>
        <div className="flex flex-[2] flex-col justify-end">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Feels like: {relativeTemperature.toFixed(0)}°C
          </p>
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Max today: {maxTemperature.toFixed(0)}°C
          </p>
        </div>
      </section>
      <section className="flex flex-col items-end gap-4 rounded-lg rounded-tl-none rounded-bl-none border border-l-0 border-neutral-800 bg-neutral-800 p-4 text-end dark:border-neutral-200 dark:bg-neutral-200">
        <span className="h-8 w-8 text-neutral-50 dark:text-neutral-900 [&_svg]:h-full [&_svg]:w-full">
          {getWeatherIcon(weathercode)}
        </span>
        <div className="flex flex-[2] flex-col justify-end">
          <p className="text-sm font-medium text-neutral-300 dark:text-neutral-700">
            {renderTimeOfTheDay(currentHour)}
          </p>
          <p className="text-sm font-medium text-neutral-300 dark:text-neutral-700">
            {formatWeatherCode(weathercode)}
          </p>
        </div>
      </section>
    </article>
  );
}
