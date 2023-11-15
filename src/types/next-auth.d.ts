import { Role } from "@prisma/client";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt"

export interface AuthUser extends User {
  id: string;
  role?: Role;
}
declare module "next-auth/jwt" {
  interface JWT extends AuthUser {}
}

declare module "next-auth" {
  interface Session {
    user: AuthUser
  }
}