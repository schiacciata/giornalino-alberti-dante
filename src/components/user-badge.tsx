import { FC } from 'react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { getScopedI18n } from '@/lib/i18n/server'
import { getRoleColor } from '@/lib/auth/color'
import { BadgeRole } from '@/types/badge-role'

interface UserBadgeProps {
    user: {
        role: BadgeRole;
    };
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