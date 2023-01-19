import type { InfoCardData } from "components/common/info-card/info-card";
import InfoCard from "components/common/info-card/info-card";
import { useHourlyWeatherContext } from "components/home/context/hourly-weather-context";
import type { CurrentWeatherWithUnits } from "components/home/hooks/useCurrentWeather";
import useCurrentWeather from "components/home/hooks/useCurrentWeather";
import React, { useMemo } from "react";
import { Droplet, Info, ArrowDown, Umbrella, CloudSnow } from "react-feather";

function getMiniInfo(currentWeatheWithUnits: CurrentWeatherWithUnits | null) {
  if (!currentWeatheWithUnits) return [];

  const {
    rain,
    showers,
    snowfall: snow,
    relativehumidity_2m: humidity,
    surface_pressure: pressure,
    winddirection_10m: windDirection,
    windspeed_10m: windSpeed,
  } = currentWeatheWithUnits;

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

const MiniInfoGrid = () => {
  const { hourlyWeatherData } = useHourlyWeatherContext();
  const { currentWeatheWithUnits } = useCurrentWeather(hourlyWeatherData);
  const miniInfo = useMemo(
    () => getMiniInfo(currentWeatheWithUnits),
    [currentWeatheWithUnits]
  );

  return (
    <section className="grid w-full grid-cols-2 gap-4">
      {miniInfo.map((item, index) => (
        <InfoCard
          key={item.name}
          index={index + 1}
          useContrastCards
          {...item}
        />
      ))}
    </section>
  );
};

export default MiniInfoGrid;
