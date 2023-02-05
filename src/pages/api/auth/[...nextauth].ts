import { env } from "env/server.mjs";
import type { AuthOptions, User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log(credentials);
        try {
          if (!credentials) return null;
          const { username, password } = credentials;
          const pb = new PocketBase(env.POCKETBASE_URL);
          const authData = await pb
            .collection("users")
            .authWithPassword<User>(username, password);
          return authData.record;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    newUser: "/auth/register",
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
};
export default NextAuth(authOptions);
