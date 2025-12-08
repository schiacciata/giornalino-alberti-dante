import config from "@/config";
import { PrismaClient } from "@/generated/prisma/client";
import type { PrismaClientOptions } from "@/generated/prisma/runtime/client";
import { env } from "./env/server";

declare global {
	// eslint-disable-next-line no-var
	var cachedPrisma: PrismaClient;
}

const options: PrismaClientOptions = {};
if (config.debug) {
	options.log = ["info", "warn", "error"];
}

const setup = (): PrismaClient => {
	if (env.NODE_ENV === "production") {
		return new PrismaClient(options);
	}

	if (!global.cachedPrisma) {
		global.cachedPrisma = new PrismaClient(options);
	}

	return global.cachedPrisma;
};

const prisma = setup();

export const db = prisma;
