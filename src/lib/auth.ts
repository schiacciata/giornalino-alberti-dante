import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth/minimal";
import config from "@/config/site";
import { env } from "@/lib/env/server";
import { db } from "./db";

export const auth = betterAuth({
	appName: config.title,
	database: prismaAdapter(db, {
		provider: "mongodb",
	}),
	advanced: {
		database: {
			generateId: false,
		},
	},
	experimental: { joins: true },
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
		},
		spotify: {
			clientId: env.SPOTIFY_CLIENT_ID,
			clientSecret: env.SPOTIFY_CLIENT_SECRET,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			updateUserInfoOnLink: true,
		},
	},
	user: {
		deleteUser: {
			enabled: true,
		},
		changeEmail: {
			enabled: true,
			updateEmailWithoutVerification: true,
		},
		additionalFields: {
			role: {
				type: "string",
				default: "USER",
				required: false,
				input: false,
			},
			isTwoFactorEnabled: {
				type: "boolean",
				default: false,
				required: false,
				input: false,
			},
			likedPostsIDs: {
				type: "string[]",
				default: [],
				required: false,
				input: false,
			},
		},
	},
});
