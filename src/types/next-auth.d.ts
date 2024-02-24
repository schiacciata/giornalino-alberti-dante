import { Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type AuthUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}