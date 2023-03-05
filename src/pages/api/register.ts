import type { AppUser } from "services/user/user";
import PocketBase from "pocketbase";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "env/server.mjs";
import type { ApiResponse } from "utils/api";

type CreateUserInput = {
  email: string;
  password: string;
  passwordConfirm: string;
  emailVisibility: boolean;
};
type RegisterRequestBody = {
  email: string;
  password: string;
};
export type RegisterResponse = {
  user: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<RegisterResponse>>
) {
  const { method, body } = req;

  switch (method) {
    case "POST": {
      const pb = new PocketBase(env.POCKETBASE_URL);
      const { email, password } = body as RegisterRequestBody;

      // Checking if user with given email already exists
      // It will throw an error when user does NOT exist
      try {
        await pb.collection("users").getFirstListItem(`email="${email}"`);
        return res.status(400).json({ error: "Email is already in use." });
      } catch (error) {}

      try {
        const createUserInput: CreateUserInput = {
          email,
          password,
          passwordConfirm: password,
          emailVisibility: true,
        };
        const user = await pb
          .collection("users")
          .create<AppUser>(createUserInput);
        await pb.collection("users").requestVerification(email);

        return res.status(200).json({
          data: {
            user: JSON.stringify(user),
          },
        });
      } catch (error) {
        return res.status(500).json({ error: "Something went wrong." });
      }
    }
    default: {
      return res.status(400).json({
        error: "Unknown request method.",
      });
    }
  }
}
