import type { NextApiRequest, NextApiResponse } from "next";
import { getCityNameFromGeolocation } from "services/openWeatherGeo/openWeatherGeo.js";
import type { GetCityNameFromGeolocationResponse } from "services/openWeatherGeo/types.js";
import { getErrorMessage } from "utils/api.js";
import { env } from "env/server.mjs";

type ApiResponse = {
  error?: string;
  data?: GetCityNameFromGeolocationResponse;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { query, method } = req;

  switch (method) {
    case "GET": {
      try {
        const { latitude, longitude } = query;

        if (!latitude || !longitude) {
          return res
            .status(400)
            .json({ error: "Latitude and longitude are required." });
        }

        if (Array.isArray(latitude) || Array.isArray(longitude)) {
          return res
            .status(400)
            .json({ error: "Latitude and longitude cannot be an array." });
        }

        const parsedLatitude = parseFloat(latitude);
        const parsedLongitude = parseFloat(longitude);
        if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
          return res
            .status(400)
            .json({ error: "Latitude and longitude must be a number." });
        }

        const data = await getCityNameFromGeolocation(
          parsedLatitude,
          parsedLongitude,
          env.OPEN_WEATHER_API_KEY
        );

        return res.status(200).json({ data });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
