import type { GetDailyWeatherResponse } from "../../../../../services/openMeteo/types";
import { useLocationContext } from "context/location-context";
import { useQuery } from "react-query";
import { getWeatherByDay } from "services/openMeteo/openMeteo";
import { useMemo } from "react";

export default function useWeeklyWeather(
  initialData?: GetDailyWeatherResponse
) {
  const { currentLocation } = useLocationContext();
  const { data } = useQuery({
    queryKey: [
      "get-weekly-weather",
      currentLocation.country,
      currentLocation.name,
    ],
    queryFn: () =>
      getWeatherByDay(currentLocation.latitude, currentLocation.longitude),
    initialData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const weeklyData = useMemo(
    () =>
      (data?.daily?.temperature_2m_min ?? []).map((minTemperature, index) => {
        const maxTemperatureData = data?.daily?.temperature_2m_max ?? [];
        const weatherCodeData = data?.daily?.weathercode ?? [];
        const weatherDateData = data?.daily?.time ?? [];

        return {
          minTemperature,
          maxTemperature: maxTemperatureData[index]!,
          weatherCode: weatherCodeData[index]!,
          date: weatherDateData[index]!,
        };
      }),
    [
      data?.daily?.temperature_2m_min,
      data?.daily?.temperature_2m_max,
      data?.daily?.weathercode,
      data?.daily?.time,
    ]
  );

  const expandedData = useMemo(() => [...weeklyData], [weeklyData]);
  const nonExpandedData = useMemo(() => weeklyData.slice(0, 3), [weeklyData]);

  return {
    expandedData,
    nonExpandedData,
  };
}
