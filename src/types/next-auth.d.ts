import { Role } from "@prisma/client";
import { JWT } from "next-auth/jwt"
import { DefaultUser } from "next-auth"

export interface AuthUser extends DefaultUser {
  id: string;
  role?: Role;
}
declare module "next-auth/jwt" {
  interface JWT extends AuthUser {}
}

declare module "next-auth" {
  interface User extends AuthUser {};
  interface Session {
    user: AuthUser
  }
}