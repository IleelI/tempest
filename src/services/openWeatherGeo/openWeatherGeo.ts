import { getErrorMessage } from "utils/api";
import type { GeocodingResponse } from "./types";

const BASE_URL = "http://api.openweathermap.org/geo/1.0";

export async function getCityFromGeolocation(
  latitude: number,
  longitude: number,
  apiKey: string
) {
  try {
    const url = `${BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`[getCityFromGeolocation] Error(${response.status})!`);
    }
    return response.json() as Promise<GeocodingResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getLocationFromCity(city: string, apiKey: string) {
  try {
    const url = `${BASE_URL}/direct?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`[getLocationFromCity] Error(${response.status})!`);
    }
    return response.json() as Promise<GeocodingResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
