import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";
import { env } from "env/server.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "401 Unauthorized." });
  }
  switch (method) {
    case "GET": {
      const pb = new PocketBase(env.POCKETBASE_URL);

      // Saving token into pocketbase authStore.
      pb.authStore.save(session.user.pbToken, null);
      // Refreshing auth to get access to users collection.
      await pb.collection("users").authRefresh();

      // Fetching logged user data with favouriteLocations data
      const userData = await pb.collection("users").getOne(session.user.id, {
        expand: "favouriteLocations",
      });
      const locations = userData.expand?.favouriteLocations ?? [];

      // Logging out of auth store
      pb.authStore.clear();

      // Return favourite locations
      return res.status(200).json(locations);
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
