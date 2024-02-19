import 'server-only'

import { FC } from 'react'
import { getCurrentUser } from '@/lib/auth/user'
import { isAdmin } from '@/lib/auth/roles';
import { env } from '@/env.mjs';

interface GitHashIndicatorProps {
  
}

const GitHashIndicator: FC<GitHashIndicatorProps> = async ({}) => {
    const user = await getCurrentUser();
    if (!user || !isAdmin(user)) return;

    return <center className='italic text-muted-foreground italic'>
            <kbd>{env.VERCEL_GIT_COMMIT_SHA}</kbd>
        </center>
}

export default GitHashIndicator