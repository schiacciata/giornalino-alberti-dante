import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import config from "@/config";

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import SpotifyProvider from "next-auth/providers/spotify";

import { loginSchema } from "@/lib/validations/auth";
import { getUserByEmail } from "@/lib/queries/user";

export default {
  debug: config.debug,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],

} satisfies NextAuthConfig;