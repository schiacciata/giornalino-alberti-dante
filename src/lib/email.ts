import { Resend } from 'resend';
import { SendVerificationRequestParams } from 'next-auth/providers/email';
import { db } from './db';
import siteConfig from '@/config/site';
import LoginEmail from '@/emails/login';
import VerifyEmail from '@/emails/verification';
import { env } from '@/env.mjs';

export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest = async (params: SendVerificationRequestParams) => {

    const user = await db.user.findUnique({
        where: {
            email: params.identifier,
        },
        select: {
            emailVerified: true,
        },
        })
    
    const Email = user?.emailVerified
        ? LoginEmail
        : VerifyEmail

    await resend.emails.send({
        from: params.provider.from,
        to: params.identifier,
        subject: `${siteConfig.title} | Login`,
        react: Email({
            actionUrl: params.url,
            siteName: siteConfig.title
        }),
        headers: {
            "X-Entity-Ref-ID": new Date().getTime().toString(),
        }
    });
}