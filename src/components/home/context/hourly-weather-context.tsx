import { useLocationContext } from "context/location-context";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { getWeatherByHour } from "services/openMeteo/openMeteo";
import type { GetTodayWeatherResponse } from "services/openMeteo/types";

type HourlyWeatherContextType = {
  hourlyWeatherData?: GetTodayWeatherResponse;
};
const HourlyWeatherContext = createContext<
  HourlyWeatherContextType | undefined
>(undefined);

type HourlyWeatherProviderType = {
  children: ReactNode;
  initialData?: GetTodayWeatherResponse;
};
function HourlyWeatherProvider({
  initialData,
  children,
}: HourlyWeatherProviderType) {
  const { currentLocation } = useLocationContext();
  const { data: hourlyWeatherData } = useQuery({
    queryKey: [
      "get-today-weather",
      currentLocation.country,
      currentLocation.name,
    ],
    queryFn: () =>
      getWeatherByHour(currentLocation.latitude, currentLocation.longitude),
    initialData,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <HourlyWeatherContext.Provider value={{ hourlyWeatherData }}>
      {children}
    </HourlyWeatherContext.Provider>
  );
}

function useHourlyWeatherContext() {
  const context = useContext(HourlyWeatherContext);
  if (context === undefined) {
    throw new Error(
      "useHourlyWeatherContext must be used within it's provider."
    );
  }
  return context;
}

export { HourlyWeatherProvider, useHourlyWeatherContext };
