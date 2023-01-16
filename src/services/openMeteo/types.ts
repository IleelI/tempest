export enum WeatherCode {
  ClearSky = 0,
  MainlyClear = 1,
  PartlyCloudy = 2,
  Overcast = 3,
  Fog = 45,
  DepositingRimeFog = 48,
  DrizzleLight = 51,
  DrizzleModerate = 53,
  DrizzleDense = 55,
  FreezingDrizzleLight = 56,
  FreezingDrizzleDense = 57,
  RainSlight = 61,
  RainModerate = 63,
  RainHeavy = 65,
  FreezingRainLight = 66,
  FreezingRainHeavy = 67,
  SnowFallSlight = 71,
  SnowFallModerate = 73,
  SnowFallHeavy = 75,
  SnowGrains = 77,
  RainShowersSlight = 80,
  RainShowersModerate = 81,
  RainShowersViolent = 82,
  SnowShowersSlight = 85,
  SnowShowersHeavy = 86,
  ThunderstormSlightOrModerate = 95,
  ThunderstormHailSlight = 96,
  ThunderstormHailHeavy = 99,
}

export type BaseWeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
};

export type HourlyData = {
  time: string;
  temperature_2m: number;
  relativehumidity_2m: number;
  apparent_temperature: number;
  rain: number;
  showers: number;
  snowfall: number;
  weathercode: number;
  surface_pressure: number;
  cloudcover: number;
  visibility: number;
  windspeed_10m: number;
  winddirection_10m: number;
};
export type GetTodayWeatherResponse = BaseWeatherResponse & {
  hourly_units: {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    apparent_temperature: string;
    rain: string;
    showers: string;
    snowfall: string;
    weathercode: string;
    surface_pressure: string;
    cloudcover: string;
    visibility: string;
    windspeed_10m: string;
    winddirection_10m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    apparent_temperature: number[];
    rain: number[];
    showers: number[];
    snowfall: number[];
    weathercode: number[];
    surface_pressure: number[];
    cloudcover: number[];
    visibility: number[];
    windspeed_10m: number[];
    winddirection_10m: number[];
  };
};

export type GetDailyWeatherResponse = BaseWeatherResponse & {
  daily_units: {
    time: string;
    weathercode: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    rain_sum: string;
    showers_sum: string;
    snowfall_sum: string;
    windspeed_10m_max: string;
    winddirection_10m_dominant: string;
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    rain_sum: Array<number | null>[];
    showers_sum: Array<number | null>[];
    snowfall_sum: Array<number | null>[];
    windspeed_10m_max: Array<number | null>[];
    winddirection_10m_dominant: Array<number | null>[];
  };
};
