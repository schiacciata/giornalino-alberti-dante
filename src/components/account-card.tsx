import { FC } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Account } from '@prisma/client'
import { toPascalCase } from '@/lib/utils'
import { Icon } from './icons'
import { CardContainer } from './ui/3d-card'

interface AccountCardProps {
    account: Pick<Account, 'provider' | 'providerAccountId'>
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Icon className='inline-flex' icon={account.provider as any} />
                    {toPascalCase(account.provider)}
                </CardTitle>
                <CardDescription>{account.providerAccountId}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export default AccountCard