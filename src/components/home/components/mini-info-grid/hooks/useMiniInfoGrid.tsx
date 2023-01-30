import type { InfoCardData } from "components/common/info-card/info-card";
import type { CurrentForecastWithUnits } from "components/home/hooks/useCurrentForecast";
import useCurrentForecast from "components/home/hooks/useCurrentForecast";
import { useMemo } from "react";
import { Umbrella, CloudSnow, Droplet, Info, ArrowDown } from "react-feather";

export default function useMiniInfoGrid() {
  const { currentForecastWithUnits } = useCurrentForecast();

  const miniInfo = useMemo(
    () => getMiniInfo(currentForecastWithUnits),
    [currentForecastWithUnits]
  );

  return {
    miniInfo,
  };
}

function getMiniInfo(
  currentForecastWithUnits: CurrentForecastWithUnits | null
) {
  if (!currentForecastWithUnits) return [];

  const {
    rain,
    showers,
    snowfall: snow,
    relativehumidity_2m: humidity,
    surface_pressure: pressure,
    winddirection_10m: windDirection,
    windspeed_10m: windSpeed,
  } = currentForecastWithUnits;

  const rainPrecipitationSum =
    (rain.value as number) + (showers.value as number);
  const precipitationValue =
    rainPrecipitationSum >= (snow.value as number)
      ? rainPrecipitationSum
      : (snow.value as number);
  const precipitationUnit =
    rainPrecipitationSum >= (snow.value as number) ? rain.unit : snow.unit;
  const precipitationIcon =
    rainPrecipitationSum >= (snow.value as number) ? (
      <Umbrella />
    ) : (
      <CloudSnow />
    );

  const miniInfo: InfoCardData[] = [
    {
      name: "Humidity",
      icon: <Droplet />,
      unit: humidity.unit,
      value: (humidity.value as number).toFixed(0),
    },
    {
      name: "Pressure",
      icon: <Info />,
      unit: pressure.unit,
      value: (pressure.value as number).toFixed(0),
    },
    {
      name: "Wind",
      icon: (
        <ArrowDown
          style={{
            transform: `rotate(${windDirection.value}deg)`,
          }}
        />
      ),
      unit: windSpeed.unit,
      value: windSpeed.value as number,
    },
    {
      name: "Precipitation",
      icon: precipitationIcon,
      value: precipitationValue,
      unit: precipitationUnit,
    },
  ];

  return miniInfo;
}
