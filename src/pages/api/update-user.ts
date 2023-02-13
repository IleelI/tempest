import PocketBase from "pocketbase";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "env/server.mjs";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import type { RegisteredUser } from "services/registration/types";

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
    case "PUT": {
      const { body: newUser } = req;
      const pb = new PocketBase(env.POCKETBASE_URL);

      // Saving token into pocketbase authStore.
      pb.authStore.save(session.user.pbToken, null);
      // Refreshing auth to get access to users collection.
      await pb.collection("users").authRefresh();

      const updatedUser = await pb
        .collection("users")
        .update<RegisteredUser>(session.user.id, newUser);

      // Logging out of auth store
      pb.authStore.clear();
      return res.status(200).json({ user: updatedUser });
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
