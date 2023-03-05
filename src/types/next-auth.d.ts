import type { DefaultSession, DefaultUser } from "next-auth";
import { Session, User } from "next-auth";

declare module "next-auth" {
  interface User extends User {
    username: string;
    pbToken: string;
  }
  interface Session extends DefaultSession {
    user: DefaultUser & {
      username: string;
      pbToken: string;
    };
  }
}
