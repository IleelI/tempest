import { GetDailyWeatherResponse, GetTodayWeatherResponse } from "./types";
import { add, formatISO } from "date-fns";

// Base url for openMeteo API endpoint
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const fallbackLatitude = 54.3485;
const fallbackLongitude = 18.5646;

// Fields retrieved from openMeteo API
const DAILY_WEATHER_FIELDS =
  "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant";
export async function getDailyWeather(
  latitude = fallbackLatitude,
  lonitude = fallbackLongitude,
  start?: Date,
  end?: Date
) {
  try {
    const startDate = start
      ? formatISO(start, { representation: "date" })
      : formatISO(new Date(), { representation: "date" });
    const endDate = end
      ? formatISO(end, { representation: "date" })
      : formatISO(add(new Date(), { days: 13 }), { representation: "date" });

    const url = `${BASE_URL}?&latitude=${latitude}&longitude=${lonitude}&start_date=${startDate}&end_date=${endDate}&timezone=Europe%2FWarsaw&daily=${DAILY_WEATHER_FIELDS}`;
    const response = await fetch(url);

    // Checking against non-network errors
    if (!response.ok) {
      throw new Error(`Error! Error code: ${response.status}.`);
    }
    return response.json() as Promise<GetDailyWeatherResponse>;
  } catch (error) {
    throw new Error(error as string);
  }
}

const HOURLY_WEATHER_FIELDS =
  "temperature_2m,relativehumidity_2m,apparent_temperature,rain,showers,snowfall,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m";
export async function getTodayWeather(
  latitude = fallbackLatitude,
  longitude = fallbackLongitude
) {
  try {
    const startDate = formatISO(new Date(), { representation: "date" });
    const endDate = formatISO(add(new Date(), { days: 1 }), {
      representation: "date",
    });

    const url = `${BASE_URL}?$&latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&timezone=Europe%2FWarsaw&hourly=${HOURLY_WEATHER_FIELDS}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! Error code: ${response.status}.`);
    }
    return response.json() as Promise<GetTodayWeatherResponse>;
  } catch (error) {
    throw new Error(error as string);
  }
}
