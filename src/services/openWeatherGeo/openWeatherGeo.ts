import { getErrorMessage } from "../../utils/api";
import type { GetCityNameFromGeolocationResponse } from "./types";

const BASE_URL = "http://api.openweathermap.org/geo/1.0";

export async function getCityNameFromGeolocation(
  latitude: number,
  longitude: number,
  apiKey: string
) {
  try {
    const url = `${BASE_URL}/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error! ${response.status}.`);
    }
    return response.json() as Promise<GetCityNameFromGeolocationResponse>;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
