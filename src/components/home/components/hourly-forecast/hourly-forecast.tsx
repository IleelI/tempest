import clsx from "clsx";
import useHourlyForecast from "../../hooks/useHourlyForecast/useHourlyForecast";
import { format, parseISO } from "date-fns";
import React from "react";
import { getWeatherIcon } from "services/openMeteo/utils";

const HourlyForecast = () => {
  const { hourlyData } = useHourlyForecast();

  return (
    <article
      role="list"
      className={clsx([
        "carousel",
        "grid max-w-full grid-flow-col items-center gap-4 p-4 pt-5",
        "rounded-lg border border-neutral-200 bg-neutral-50 shadow-main dark:border-transparent dark:bg-neutral-800",
        "snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth",
      ])}
    >
      {hourlyData.map(([temperature, time, weatherCode], index) => (
        <div
          key={index}
          className={clsx([
            "snap-center",
            "flex flex-col items-center gap-2",
            "[&_svg]:h-6 [&_svg]:w-6",
          ])}
        >
          {getWeatherIcon(weatherCode)}
          <h2 className="pt-1 text-xs font-medium uppercase text-neutral-700 dark:text-neutral-400">
            {format(parseISO(time), "h aa")}
          </h2>
          <h1 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            {temperature.toFixed(0)}°C
          </h1>
        </div>
      ))}
    </article>
  );
};

export default HourlyForecast;
