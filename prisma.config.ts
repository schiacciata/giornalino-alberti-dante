import { defineConfig, env } from "prisma/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	// The database URL
	engine: "classic",
	datasource: {
		// Type Safe env() helper
		// Does not replace the need for dotenv
		url: env("DATABASE_URL"),
	},
});
