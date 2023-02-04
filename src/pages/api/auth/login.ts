import { env } from "env/server.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";
import type { ApiResponse } from "utils/api";

type LoginRequestBody = {
  login: string;
  password: string;
};
export type LoginResponse = {
  token: string;
  user: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<LoginResponse>>
) {
  const { method } = req;
  switch (method) {
    case "POST": {
      const pb = new PocketBase(env.POCKETBASE_URL);
      const { login, password } = req.body as LoginRequestBody;
      try {
        const authData = await pb
          .collection("users")
          .authWithPassword(login, password);
        // "logout" the last authenticated account
        pb.authStore.clear();
        return res.status(200).json({
          data: {
            user: JSON.stringify(authData.record),
            token: JSON.stringify(authData.token),
          },
        });
      } catch (error) {
        return res.status(404).json({ error: "Login or password is invalid." });
      }
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
