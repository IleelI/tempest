import { getErrorMessage } from "utils/api";
import type { GeocodingResponse } from "./types";

const BASE_URL = "http://api.openweathermap.org/geo/1.0";

// This functions are solely used for get-City api route
export async function ApiGetCityFromGeolocation(
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
export async function ApiGetGeolocationFromCity(city: string, apiKey: string) {
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

export async function getGeolocationFromCity(city: string) {
  try {
    const url = `${location.origin}/api/get-location?city=${city}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[${url}]: something went wrong.`);
    }
    return (await response.json()) as { location: GeocodingResponse };
  } catch (error) {
    throw getErrorMessage(error);
  }
}

export async function getCityFromGeolocation(
  latitude: number,
  longitude: number
) {
  try {
    const url = `${location.origin}/api/get-city?latitude=${latitude}&longitude=${longitude}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`[${url}]: something went wrong.`);
    }
    return (await response.json()) as { city: GeocodingResponse };
  } catch (error) {
    throw getErrorMessage(error);
  }
}
