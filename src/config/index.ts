import { env } from "@/env.mjs";

const config = {
    debug: env.NODE_ENV !== "production",
    admin: 'pietro.padovani06@gmail.com',
};

export default config;