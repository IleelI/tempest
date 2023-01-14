import { getErrorMessage } from "utils/api";
import type { GeocodingResponse } from "./types";

const BASE_URL = "http://api.openweathermap.org/geo/1.0";

// This functions are solely used for get-City api route
export async function getCityFromGeolocation(
  latitude: number,
  longitude: number,
  apiKey: string
) {
  try {
    const url = `${BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`[getCityFromGeolocation] Error(${response.status})!`);
    }
    return response.json() as Promise<GeocodingResponse[]>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// This functions are solely used for get-location Api route
export async function getLocationFromCity(city: string, apiKey: string) {
  try {
    const url = `${BASE_URL}/direct?q=${city}&limit=1&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`[getLocationFromCity] Error(${response.status})!`);
    }
    return response.json() as Promise<GeocodingResponse[]>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
