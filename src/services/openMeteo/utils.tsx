import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "react-feather";
import { WeatherCode } from "services/openMeteo/types";
import {
  CLOUD_CODES,
  DRIZZLE_CODES,
  LIGHTNING_CODES,
  RAIN_CODES,
  SNOW_CODES,
  SUN_CODES,
} from "services/openMeteo/types";

export function getWeatherIcon(weatherCode?: WeatherCode) {
  if (!weatherCode) return <Sun />;
  if (DRIZZLE_CODES.includes(weatherCode)) {
    return <CloudDrizzle />;
  }
  if (RAIN_CODES.includes(weatherCode)) {
    return <CloudRain />;
  }
  if (SNOW_CODES.includes(weatherCode)) {
    return <CloudSnow />;
  }
  if (LIGHTNING_CODES.includes(weatherCode)) {
    return <CloudLightning />;
  }
  if (SUN_CODES.includes(weatherCode)) {
    return <Sun />;
  }
  if (CLOUD_CODES.includes(weatherCode)) {
    return <Cloud />;
  }
  return <Sun />;
}

export function formatWeatherCode(weatherCode = 0 as WeatherCode) {
  const weatherCodeText = WeatherCode[weatherCode];
  const splitText = weatherCodeText
    .match(/[A-Z][a-z]+/g)
    ?.map((text, index) => {
      if (index === 0) return text;
      return text.toLowerCase();
    });
  return splitText?.join(" ") ?? weatherCodeText;
}
