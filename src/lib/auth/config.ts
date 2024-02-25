import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import config from "@/config";

import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "@auth/core/providers/google"
import CredentialsProvider from "@auth/core/providers/credentials"
import SpotifyProvider from "@auth/core/providers/spotify";
import DiscordProvider from "@auth/core/providers/discord"

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
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    CredentialsProvider({
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