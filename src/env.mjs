import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NODE_ENV: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    SMTP_SERVER: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    NEXT_PUBLIC_VAPID_PUBKEY: z.string().min(1),
    VAPID_MAILTO: z.string().min(1),
    VAPID_PRIVKEY: z.string().min(1),
    GITHUB_REPO_TOKEN: z.string().min(1),
    VERCEL_GIT_COMMIT_SHA: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_VAPID_PUBKEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_FROM: process.env.SMTP_FROM,
    SMTP_SERVER: process.env.SMTP_SERVER,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    NEXT_PUBLIC_VAPID_PUBKEY: process.env.NEXT_PUBLIC_VAPID_PUBKEY,
    VAPID_MAILTO: process.env.VAPID_MAILTO,
    VAPID_PRIVKEY: process.env.VAPID_PRIVKEY,
    GITHUB_REPO_TOKEN: process.env.GITHUB_REPO_TOKEN,
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA
  },
});