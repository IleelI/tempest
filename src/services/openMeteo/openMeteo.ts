import type { GetDailyWeatherResponse, GetTodayWeatherResponse } from "./types";
import { add, formatISO } from "date-fns";
import { getErrorMessage, sleep } from "utils/api";

// Base url for openMeteo API endpoint
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

// Fallback geolocation position for Gdańsk, Poland
export const DEFAULT_LATITUDE = 54.3485;
export const DEFAULT_LONGITUDE = 18.5646;

// Fields retrieved from openMeteo API
const WEATHER_BY_DAY_FIELDS =
  "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant";
export async function getWeatherByDay(
  latitude = DEFAULT_LATITUDE,
  lonitude = DEFAULT_LONGITUDE,
  startingDate?: Date,
  endingDate?: Date
) {
  try {
    const startDate = formatISO(startingDate ?? new Date(), {
      representation: "date",
    });
    const endDate = formatISO(endingDate ?? new Date(), {
      representation: "date",
    });

    const url = `${BASE_URL}?latitude=${latitude}&longitude=${lonitude}&start_date=${startDate}&end_date=${endDate}&timezone=Europe%2FWarsaw&daily=${WEATHER_BY_DAY_FIELDS}`;
    const response = await fetch(url);

    // Checking against non-network errors
    if (!response.ok) {
      throw new Error(`[getDailyWeather] Error(${response.status})!`);
    }
    return response.json() as Promise<GetDailyWeatherResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

const WEATHER_BY_HOUR_FIELDS =
  "temperature_2m,relativehumidity_2m,apparent_temperature,rain,showers,snowfall,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m";
export async function getWeatherByHour(
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONGITUDE,
  startingDate?: Date,
  endingDate?: Date
) {
  try {
    const startDate = formatISO(startingDate ?? new Date(), {
      representation: "date",
    });
    const endDate = formatISO(
      endingDate ?? add(startingDate ?? new Date(), { days: 1 }),
      {
        representation: "date",
      }
    );

    const url = `${BASE_URL}?&latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&timezone=Europe%2FWarsaw&hourly=${WEATHER_BY_HOUR_FIELDS}`;
    const response = await fetch(url);

    // Checking against non-network errors
    if (!response.ok) {
      throw new Error(`[getTodayWeather] Error(${response.status})!`);
    }
    return response.json() as Promise<GetTodayWeatherResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
