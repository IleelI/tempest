import { getErrorMessage } from "utils/api";
import PocketBase from "pocketbase";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "env/server.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

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
    case "DELETE": {
      try {
        const pb = new PocketBase(env.POCKETBASE_URL);

        // Saving token into pocketbase authStore.
        pb.authStore.save(session.user.pbToken, null);
        // Refreshing auth to get access to users collection.
        await pb.collection("users").authRefresh();

        await pb.collection("users").delete(session.user.id);

        pb.authStore.clear();

        return res.status(200).json({ data: null });
      } catch (error) {
        return res.status(500).json({ error: getErrorMessage(error) });
      }
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
