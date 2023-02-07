import type { FavouriteLocation } from "./types";
import { getErrorMessage } from "utils/api";

const API_ROUTE = "/api/data/get-favourite-locations";

export async function getFavouriteLocations() {
  try {
    const response = await fetch(API_ROUTE);
    if (!response.ok) {
      throw new Error(`[${API_ROUTE}]: something went wrong.`);
    }
    return (await response.json()) as FavouriteLocation[];
  } catch (error) {
    throw getErrorMessage(error);
  }
}
