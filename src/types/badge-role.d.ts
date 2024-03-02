import { Role } from "@prisma/client";

type BadgeRole = Role | 'AUTHOR';

export type {
    BadgeRole,
}