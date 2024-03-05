import 'server-only'

import { FC } from 'react'
import { getCurrentUser } from '@/lib/auth/user'
import { isAdmin } from '@/lib/auth/roles';
import { env } from '@/env.mjs';
import Link from 'next/link';
import github from '@/config/github';
import { buttonVariants } from '@/components/ui/button';
import { Icon } from './icons';

interface GitHashIndicatorProps {
  
}

const GitHashIndicator: FC<GitHashIndicatorProps> = async ({}) => {
    const user = await getCurrentUser();
    if (!user || !isAdmin(user)) return;

    const hash = env.VERCEL_GIT_COMMIT_SHA;

    return <center>
            <Link href={`https://github.com/${github.repo}/commit/${hash}`} className={buttonVariants({ variant: 'link', className: 'italic' })}>
                <Icon icon='github'/>
                <kbd>{hash}</kbd>
            </Link>
        </center>
}

export default GitHashIndicator