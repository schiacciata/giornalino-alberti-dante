import { env } from "@/env.mjs";

export default {
    debug: env.NODE_ENV !== "production",
    admins: ['pietro.padovani06@gmail.com', 'ilgiornalinoalbertidante@gmail.com'],
    github: {
        repo: 'schiacciata/next-blog',
        token: env.GITHUB_REPO_TOKEN,
        email: '62028267+47PADO47@users.noreply.github.com',
    },
}