import type { NextApiRequest, NextApiResponse } from "next";
import PocketBase from "pocketbase";
import { env } from "env/server.mjs";

export type CreateUser = {
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name?: string;
  username?: string;
  favourite_locations?: string[];
};

export type RegisterFailedResponse = {
  data?: never;
  error: string;
};
export type RegisterSuccessfullResponse = {
  data: string;
  error?: never;
};
export type RegisterResponse =
  | RegisterSuccessfullResponse
  | RegisterFailedResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  const { method } = req;
  switch (method) {
    case "POST": {
      const pb = new PocketBase(env.POCKETBASE_URL);
      const { email, password } = req.body as RequestBody;
      let isAlreadyRegistered = false;

      // Login as admin into DB
      try {
        await pb.admins.authWithPassword(
          env.POCKETBASE_ADMIN_LOGIN,
          env.POCKETBASE_ADMIN_PASSWORD
        );
      } catch (error) {
        return res.status(500).json({ error: "Failed to create new user." });
      }

      const usersData = pb.collection("users");
      // Check if given email already exists in DB
      // This will throw an error if user doesn't exist
      try {
        const user = await usersData.getFirstListItem(`email="${email}"`);
        isAlreadyRegistered = Boolean(user);
      } catch (error) {}

      // If user is already registered we throw an error
      if (isAlreadyRegistered) {
        return res.status(400).json({ error: "Email is already in use." });
      }

      const newUser: CreateUser = {
        email,
        emailVisibility: false,
        password,
        passwordConfirm: password,
      };
      const record = await usersData.create(newUser);
      await usersData.requestVerification(email);

      return res.status(200).json({
        data: JSON.stringify(record),
      });
    }
    default: {
      return res.status(400).json({ error: "Unknown method." });
    }
  }
}

type RequestBody = {
  email: string;
  password: string;
};
