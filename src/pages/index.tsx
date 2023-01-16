import { type NextPage } from "next";
import Head from "next/head";
import CitySelection from "components/home/city-selection/city-selection";
import { Sun } from "react-feather";
import { useLocationContext } from "context/location-context";
import { useQuery } from "react-query";
import { getWeatherByHour } from "services/openMeteo/openMeteo";
import { useMemo } from "react";
import { getHours } from "date-fns";
import type { HourlyData } from "services/openMeteo/types";
import { WeatherCode } from "services/openMeteo/types";

function renderTimeOfTheDay(currentHour: number) {
  if (currentHour < 6 || currentHour > 20) {
    return "Night";
  } else if (currentHour < 12) {
    return "Morning";
  } else if (currentHour === 12) {
    return "Noon";
  } else if (currentHour < 18) {
    return "Afternoon";
  } else if (currentHour <= 20) {
    return "Evening";
  } else {
    return "Midnight";
  }
}

const Home: NextPage = () => {
  const { currentLocation } = useLocationContext();
  const { data } = useQuery({
    queryKey: [
      "get-today-weather",
      currentLocation.country,
      currentLocation.name,
    ],
    queryFn: () =>
      getWeatherByHour(currentLocation.latitude, currentLocation.longitude),
    keepPreviousData: true,
  });

  const currentHour = useMemo(() => getHours(new Date()), []);
  const [currentWeather, maxTemperature] = useMemo(() => {
    if (!data?.hourly) return [null, null];
    const weather = Object.entries(data.hourly).map(([key, value]) => {
      return [key, value[currentHour]];
    });
    const maxTemperature = Math.max(...data.hourly.temperature_2m.slice(0, 25));
    return [Object.fromEntries(weather) as HourlyData, maxTemperature];
  }, [data?.hourly, currentHour]);

  return (
    <>
      <Head>
        <title>Tempest</title>
        <meta name="description" content="Tempest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col gap-6">
        <CitySelection />
        <article className="grid w-full grid-cols-2 overflow-hidden rounded-lg shadow-main">
          <section className="flex flex-col gap-4 rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-neutral-200 bg-neutral-50 p-4 text-start dark:border-neutral-800 dark:bg-neutral-800">
            <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-50">
              {currentWeather?.temperature_2m.toFixed(0) ?? 0}°C
            </h1>
            <div className="flex flex-[2] flex-col justify-end">
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Feels like:{" "}
                {currentWeather?.apparent_temperature.toFixed(0) ?? 0}°C
              </p>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Max today: {maxTemperature?.toFixed(0) ?? 0}°C
              </p>
            </div>
          </section>
          <section className="flex flex-col items-end gap-4 rounded-lg rounded-tl-none rounded-bl-none border bg-neutral-800 p-4 text-end dark:border-neutral-200 dark:bg-neutral-200">
            <Sun className="h-9 w-9 text-neutral-50 dark:text-neutral-900" />
            <div className="flex flex-[2] flex-col justify-end">
              <p className="text-sm font-medium text-neutral-400 dark:text-neutral-600">
                {renderTimeOfTheDay(currentHour)}
              </p>
              <p className="text-sm font-medium text-neutral-400 dark:text-neutral-600">
                {WeatherCode[currentWeather?.weathercode ?? 0]}
              </p>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default Home;
