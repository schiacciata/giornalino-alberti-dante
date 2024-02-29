import { Role, User } from '@prisma/client'
import { FC } from 'react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { getScopedI18n } from '@/lib/i18n/server'

interface UserBadgeProps {
    user: Pick<User, 'role'>
}

const getRoleColor = (role: Role): `text-${string}-${number}` => {
    switch (role) {
        case 'ADMIN':
            return 'text-red-500';
        case 'EDITOR':
            return 'text-yellow-500';
        default:
            return 'text-primary-500';
    }
}

const UserBadge: FC<UserBadgeProps> = async ({ user }) => {
    const t = await getScopedI18n('roles');

    return (
        <Badge variant={'outline'} className={cn('border-current', getRoleColor(user.role))}>
            {t(user.role)}
        </Badge>
    )

}

export default UserBadge