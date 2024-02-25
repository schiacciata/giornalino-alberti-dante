'use client'

import { deleteAccountByProviderID } from '@/actions/account';
import { Account } from '@prisma/client';
import { FC } from 'react'
import { toast } from 'sonner';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';

interface UnlinkButtonProps {
    account: Pick<Account, 'provider'>;
}

const UnlinkButton: FC<UnlinkButtonProps> = ({ account }) => {
    const handleCommentDelete = async () => {
        toast.promise(deleteAccountByProviderID(account.provider), {
            loading: 'Loading...',
            success: (data) => {
              return data.message;
            },
            error: (error) => {
                return error.message;
            },
        });
    };
    
    return <form action={handleCommentDelete}>
        <Button variant="destructive">
            <Icon icon='unlink' className='mr-0' />
        </Button>
    </form>
}

export default UnlinkButton