import { useLocationContext } from "context/location-context/location-context";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { getForecastByHour } from "services/openMeteo/openMeteo";
import type { GetTodayForecastResponse } from "services/openMeteo/types";

type HourlyForecastContextType = {
  hourlyForecastData?: GetTodayForecastResponse;
};
const HourlyForecastContext = createContext<
  HourlyForecastContextType | undefined
>(undefined);

type HourlyWeatherProviderType = {
  children: ReactNode;
  initialData?: GetTodayForecastResponse;
};
function HourlyForecastProvider({
  initialData,
  children,
}: HourlyWeatherProviderType) {
  const { currentLocation } = useLocationContext();
  const { data: hourlyWeatherData } = useQuery({
    queryKey: [
      "get-today-forecast",
      currentLocation.country,
      currentLocation.name,
    ],
    queryFn: () =>
      getForecastByHour(currentLocation.latitude, currentLocation.longitude),
    initialData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <HourlyForecastContext.Provider
      value={{ hourlyForecastData: hourlyWeatherData }}
    >
      {children}
    </HourlyForecastContext.Provider>
  );
}

function useHourlyForecastContext() {
  const context = useContext(HourlyForecastContext);
  if (context === undefined) {
    throw new Error(
      "useHourlyForecastContext must be used within it's provider."
    );
  }
  return context;
}

export { HourlyForecastProvider, useHourlyForecastContext };
