import { Role } from "@prisma/client";

export const getRoleColor = (role: string & {} | Role): `text-${string}-${number}` => {
    switch (role) {
        case 'ADMIN':
            return 'text-red-500';
        case 'EDITOR':
            return 'text-yellow-500';
        case 'AUTHOR':
            return 'text-blue-500';
        default:
            return 'text-primary-500';
    }
};