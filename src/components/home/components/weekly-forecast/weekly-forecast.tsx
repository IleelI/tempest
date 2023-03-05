import clsx from "clsx";
import type { GetDailyForecastResponse } from "services/openMeteo/types";
import ExpandButton from "./components/expand-button/expand-button";
import ForecastList from "./components/forecast-list/forecast-list";
import useWeeklyForecast from "../../hooks/useWeeklyForecast/useWeeklyForecast";

type WeeklyForecastProps = {
  initialData?: GetDailyForecastResponse;
};
function WeeklyForecast({ initialData }: WeeklyForecastProps) {
  const { displayedData, isExpanded, handleExpand } =
    useWeeklyForecast(initialData);

  return (
    <article
      className={clsx([
        "flex flex-col items-center gap-4 rounded-lg border p-4",
        "border-neutral-200 bg-neutral-50 shadow-main",
        "dark:border-transparent dark:bg-neutral-800 dark:shadow-none",
      ])}
    >
      <ForecastList isExpanded={isExpanded} forecastData={displayedData} />
      <ExpandButton isExpanded={isExpanded} handleExpand={handleExpand} />
    </article>
  );
}

export default WeeklyForecast;
