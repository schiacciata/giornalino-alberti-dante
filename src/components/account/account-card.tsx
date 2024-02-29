import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Account } from '@prisma/client'
import { toPascalCase } from '@/lib/utils'
import { Icon } from '../icons'
import UnlinkButton from './unlink-button'

interface AccountCardProps {
    account: Pick<Account, 'provider' | 'providerAccountId'>
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
    return (
        <Card className='w-fit'>
            <CardHeader>
            <div className="flex items-center justify-between mb-2 mr-2">
                <CardTitle className='space-between'>
                    <Icon className='inline-flex' icon={account.provider as any} />
                    {toPascalCase(account.provider)}
                </CardTitle>
                <UnlinkButton account={{ provider: account.provider }}/>
            </div>
            <CardDescription>{account.providerAccountId}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export default AccountCard