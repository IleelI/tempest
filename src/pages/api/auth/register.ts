import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";
import { env } from "env/server.mjs";
import type { ApiResponse } from "utils/api";

export type CreateUser = {
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
};
type RegisterRequestBody = {
  email: string;
  password: string;
};
export type RegisterResponse = { user: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<RegisterResponse>>
) {
  const { method } = req;
  switch (method) {
    case "POST": {
      const pb = new PocketBase(env.POCKETBASE_URL);
      const { email, password } = req.body as RegisterRequestBody;

      // Login as admin into DB
      try {
        await pb.admins.authWithPassword(
          env.POCKETBASE_ADMIN_LOGIN,
          env.POCKETBASE_ADMIN_PASSWORD
        );
      } catch (error) {
        return res.status(500).json({ error: "Failed to create new user." });
      }

      // Check if given email already exists in DB
      // This will throw an error if user doesn't exist
      try {
        const user = await pb
          .collection("users")
          .getFirstListItem(`email="${email}"`);
        // If user is already registered we throw an error
        if (user) {
          return res.status(400).json({ error: "Email is already in use." });
        }
      } catch (error) {}

      const newUser: CreateUser = {
        email,
        emailVisibility: false,
        password,
        passwordConfirm: password,
      };
      const record = await pb.collection("users").create(newUser);
      await pb.collection("users").requestVerification(email);

      return res.status(200).json({
        data: {
          user: JSON.stringify(record),
        },
      });
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}
