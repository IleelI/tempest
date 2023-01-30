import clsx from "clsx";
import { parseISO, isSameDay, format } from "date-fns";
import { getWeatherIcon } from "services/openMeteo/utils";
import type { WeeklyForecast } from "../../hooks/useWeeklyForecast";
import ForecastTemperature from "./forecast-temperature";

type ForecastProps = {
  forecast: WeeklyForecast;
  todaysDate: Date;
};
function Forecast({ forecast, todaysDate }: ForecastProps) {
  const { date, weatherCode, minTemperature, maxTemperature, temperatureUnit } =
    forecast;
  const parsedDate = parseISO(date);
  const isTodaysDate = isSameDay(todaysDate, parsedDate);
  const formattedDate = format(parsedDate, "EEEE, MMM do");

  return (
    <li
      key={date}
      className={clsx([
        "relative grid w-full snap-center grid-cols-4 items-center justify-items-center gap-2 gap-y-4 text-sm sm:text-base",
        isTodaysDate
          ? "font-medium text-neutral-900 dark:text-neutral-100"
          : "font-normal text-neutral-700 dark:text-neutral-300",
        "after:col-span-full after:h-[1px] after:w-full after:bg-neutral-300 dark:after:bg-neutral-700",
      ])}
    >
      <p className="col-span-2 justify-self-start">{formattedDate}</p>
      <span className="[&_svg]:h-5 [&_svg]:w-5">
        {getWeatherIcon(weatherCode)}
      </span>
      <ForecastTemperature
        minTemperature={minTemperature}
        maxTemperature={maxTemperature}
        temperatureUnit={temperatureUnit}
      />
    </li>
  );
}

export default Forecast;
