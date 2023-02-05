import clsx from "clsx";
import { useMemo } from "react";
import type { WeeklyForecast } from "../../../../hooks/useWeeklyForecast/useWeeklyForecast";
import Forecast from "../forecast/forecast";

type ForecastListProps = {
  isExpanded: boolean;
  forecastData: WeeklyForecast[];
};
function ForecastList({ isExpanded, forecastData }: ForecastListProps) {
  const todaysDate = useMemo(() => new Date(), []);

  return (
    <ul
      className={clsx([
        "flex w-full snap-y snap-proximity flex-col gap-4",
        isExpanded
          ? "max-h-96 overflow-y-auto overflow-x-hidden"
          : "overflow-hidden",
      ])}
    >
      {forecastData.map((forecast) => (
        <Forecast
          key={forecast.date}
          forecast={forecast}
          todaysDate={todaysDate}
        />
      ))}
    </ul>
  );
}

export default ForecastList;
