import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import SpotifyProvider from "next-auth/providers/spotify";

import { env } from "@/env.mjs"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"
import { sendVerificationRequest } from "./email"

export const authOptions: NextAuthOptions = {
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
        EmailProvider({
          server: env.SMTP_SERVER,
          from: env.SMTP_FROM,
          sendVerificationRequest,
        }),
        SpotifyProvider({
          clientId: env.SPOTIFY_CLIENT_ID,
          clientSecret: env.SPOTIFY_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
              session.user.id = token.id
              session.user.name = token.name
              session.user.email = token.email
              session.user.image = token.picture
            }
      
            return session
        },
        async jwt({ token, user }) {
          const dbUser = await db.user.findFirst({
            where: {
              email: token.email,
            },
          })
    
          if (!dbUser) {
            if (user) {
              token.id = user?.id
            }
            return token
          }
    
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          }
      },
    },
}