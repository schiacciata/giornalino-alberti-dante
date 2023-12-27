import { User } from '@prisma/client'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { FC } from 'react'
import { Icon } from './icons'

interface UserBadgeProps {
    user: Pick<User, 'role'>
}

const UserBadge: FC<UserBadgeProps> = ({ user }) => {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <Icon icon={user.role}/>
            </TooltipTrigger>
            <TooltipContent>
                <p>{user.role}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>

}

export default UserBadge