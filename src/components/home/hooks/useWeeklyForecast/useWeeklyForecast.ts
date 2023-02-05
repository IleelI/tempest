import { useQuery } from "react-query";
import { getForecastByDay } from "services/openMeteo/openMeteo";
import { useCallback, useMemo, useState } from "react";
import type { GetDailyForecastResponse } from "services/openMeteo/types";
import { useLocationContext } from "context/location-context/location-context";

export type WeeklyForecast = {
  minTemperature: number;
  maxTemperature: number;
  weatherCode: number;
  date: string;
  temperatureUnit: string;
};

export default function useWeeklyForecast(
  initialData?: GetDailyForecastResponse
) {
  const { currentLocation } = useLocationContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const { data } = useQuery({
    queryKey: [
      "get-weekly-forecast",
      currentLocation.country,
      currentLocation.name,
    ],
    queryFn: () =>
      getForecastByDay(currentLocation.latitude, currentLocation.longitude),
    initialData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  const handleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, [setIsExpanded]);

  const weeklyData = useMemo(
    () =>
      (data?.daily?.temperature_2m_min ?? []).map((minTemperature, index) => {
        const maxTemperatureData = data?.daily?.temperature_2m_max ?? [];
        const weatherCodeData = data?.daily?.weathercode ?? [];
        const weatherDateData = data?.daily?.time ?? [];
        const temperatureUnit = data?.daily_units?.temperature_2m_min ?? "℃";
        return {
          minTemperature,
          maxTemperature: maxTemperatureData[index] ?? 0,
          weatherCode: weatherCodeData[index] ?? 0,
          date: weatherDateData[index] ?? "",
          temperatureUnit,
        } as WeeklyForecast;
      }),
    [
      data?.daily?.temperature_2m_min,
      data?.daily?.temperature_2m_max,
      data?.daily?.weathercode,
      data?.daily?.time,
      data?.daily_units?.temperature_2m_min,
    ]
  );

  const expandedData = useMemo(() => [...weeklyData], [weeklyData]);
  const nonExpandedData = useMemo(() => weeklyData.slice(0, 4), [weeklyData]);
  const displayedData = isExpanded ? expandedData : nonExpandedData;

  return {
    displayedData,
    isExpanded,
    handleExpand,
  };
}
