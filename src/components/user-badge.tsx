'use client'

import { FC } from 'react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import { getRoleColor } from '@/lib/auth/color'
import { BadgeRole } from '@/types/badge-role'
import { useScopedI18n } from '@/lib/i18n/client'

interface UserBadgeProps {
    user: {
        role: BadgeRole;
    };
}

const UserBadge: FC<UserBadgeProps> = async ({ user }) => {
    const t = useScopedI18n('roles');

    return (
        <Badge variant={'outline'} className={cn('border-current', getRoleColor(user.role))}>
            {t(user.role)}
        </Badge>
    )

}

export default UserBadge