import { env } from "env/server.mjs";
import type { AuthOptions, User as NextUser } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import PocketBase from "pocketbase";
import type { RegisteredUser } from "services/registration/types";

export const authOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token?.user as NextUser;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          const { username: login, password } = credentials;
          const pb = new PocketBase(env.POCKETBASE_URL);
          const authData = await pb
            .collection("users")
            .authWithPassword<RegisteredUser>(login, password);
          const { id, name, email, avatar: image, username } = authData.record;
          const pbToken = authData.token;
          return {
            id,
            name,
            email,
            image,
            username,
            pbToken,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    newUser: "/auth/register",
    signIn: "/auth/login",
  },
};
export default NextAuth(authOptions);
