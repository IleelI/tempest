import type { GeocodingResponse } from "services/openWeatherGeo/types";
import { getLocationFromCity } from "services/openWeatherGeo/openWeatherGeo";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "env/server.mjs";
import { getErrorMessage } from "utils/api";
import { regexLettersOnly } from "utils/string";

type ApiResponse = {
  error?: string;
  data?: GeocodingResponse;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { query, method } = req;

  switch (method) {
    case "GET": {
      try {
        const { city } = query;

        if (!city) {
          return res.status(400).json({ error: "City name is required." });
        }

        if (Array.isArray(city)) {
          return res
            .status(400)
            .json({ error: "City name cannot be an array." });
        }

        const parsedCity = city.match(regexLettersOnly);
        if (!parsedCity) {
          return res.status(400).json({
            error: "City name cannot contain any number or special character.",
          });
        }

        const data = await getLocationFromCity(city, env.OPEN_WEATHER_API_KEY);

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
