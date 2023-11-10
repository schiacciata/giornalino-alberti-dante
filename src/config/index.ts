import { env } from "@/env.mjs";

export default {
    debug: env.NODE_ENV !== "production",
    admins: ['pietro.padovani06@gmail.com'],
}