import type { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { User as UserType } from "services/authentication/types";

declare module "next-auth" {
  interface User extends UserType {
    test: string;
  }
}
