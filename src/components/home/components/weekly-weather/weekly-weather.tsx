import type { GetDailyWeatherResponse } from "services/openMeteo/types";
import useWeeklyWeather from "./hooks/useWeeklyWeather";

type WeeklyWeatherProps = {
  initialData?: GetDailyWeatherResponse;
};
function WeeklyWeather({ initialData }: WeeklyWeatherProps) {
  const { expandedData, nonExpandedData } = useWeeklyWeather(initialData);

  return (
    <article>
      <h1>Weekly data</h1>
      {nonExpandedData.map(
        ({ minTemperature, maxTemperature, weatherCode, date }) => (
          <div key={date}>
            <h1>{minTemperature}</h1>
            <h1>{maxTemperature}</h1>
            <h1>{weatherCode}</h1>
            <h1>{date}</h1>
          </div>
        )
      )}
    </article>
  );
}

export default WeeklyWeather;
