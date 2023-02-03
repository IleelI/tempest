import type { GeocodingResponse } from "services/openWeatherGeo/types";
import { ApiGetGeolocationFromCity } from "services/openWeatherGeo/openWeatherGeo";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "env/server.mjs";
import { getErrorMessage } from "utils/api";
import { regexNoNumbers } from "utils/string";

type GetLocationApiResponse = {
  error?: string;
  location?: GeocodingResponse;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetLocationApiResponse>
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
        const parsedCity = city.match(regexNoNumbers);
        if (!parsedCity) {
          return res.status(400).json({
            error: "City name cannot contain any numbers.",
          });
        }

        const data = await ApiGetGeolocationFromCity(
          city,
          env.OPEN_WEATHER_API_KEY
        );

        return res.status(200).json({ location: data[0] });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
