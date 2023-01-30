import type {
  GetDailyForecastResponse,
  GetTodayForecastResponse,
} from "./types";
import { add, formatISO } from "date-fns";
import { getErrorMessage } from "utils/api";

// Base url for openMeteo API endpoint
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

// Fallback geolocation position for Gdańsk, Poland
export const DEFAULT_LATITUDE = 54.3485;
export const DEFAULT_LONGITUDE = 18.5646;

// Fields retrieved from openMeteo API
const FORECAST_BY_DAY_FIELDS =
  "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,windspeed_10m_max,winddirection_10m_dominant";
// By default if ending date not provided get 2 weeks of weather forecast data
export async function getForecastByDay(
  latitude = DEFAULT_LATITUDE,
  lonitude = DEFAULT_LONGITUDE,
  startingDate?: Date,
  endingDate?: Date
) {
  try {
    const startDate = formatISO(startingDate ?? new Date(), {
      representation: "date",
    });
    const endDate = formatISO(endingDate ?? add(new Date(), { weeks: 2 }), {
      representation: "date",
    });

    const url = `${BASE_URL}?latitude=${latitude}&longitude=${lonitude}&start_date=${startDate}&end_date=${endDate}&timezone=Europe%2FWarsaw&daily=${FORECAST_BY_DAY_FIELDS}`;
    const response = await fetch(url);

    // Checking against non-network errors
    if (!response.ok) {
      throw new Error(`[getForecastByDay] Error(${response.status})!`);
    }
    return response.json() as Promise<GetDailyForecastResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

const FORECAST_BY_HOUR_FIELDS =
  "temperature_2m,relativehumidity_2m,apparent_temperature,rain,showers,snowfall,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,winddirection_10m";
export async function getForecastByHour(
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

    const url = `${BASE_URL}?&latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&timezone=Europe%2FWarsaw&hourly=${FORECAST_BY_HOUR_FIELDS}`;
    const response = await fetch(url);

    // Checking against non-network errors
    if (!response.ok) {
      throw new Error(`[getForecastByHour] Error(${response.status})!`);
    }
    return response.json() as Promise<GetTodayForecastResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
