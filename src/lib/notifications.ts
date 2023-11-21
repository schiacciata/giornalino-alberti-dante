import "server-only"

import { env } from '@/env.mjs';
import webPush from 'web-push'
import { db } from './db';
import { PushSubscription } from '@prisma/client';

type NotificationConstructor = Partial<Notification> & { title: string };

class Notifications {
  webpush: typeof webPush;
  constructor() {
    this.webpush = webPush;
    this.webpush.setVapidDetails(
      env.VAPID_MAILTO,
      env.NEXT_PUBLIC_VAPID_PUBKEY,
      env.VAPID_PRIVKEY
    )
  }

  private createPayload(title: string, options?: NotificationOptions): string {
    // https://web.dev/push-notifications-display-a-notification/#visual-options
    return JSON.stringify({
      title, 
      options: {
        timestamp: Date.now(),
        icon: '/images/icon-192x192.png',
        ...options,
      }
    })
  }

  private async handlePushError(subscriptionId: string, err: any) {
    if (err.statusCode === 400) {
      console.log('[webPush] invalid request: ', err)
    } else if ([401, 403].includes(err.statusCode)) {
      console.log('[webPush] auth error: ', err)
    } else if (err.statusCode === 404 || err.statusCode === 410) {
      console.log('[webPush] subscription has expired or is no longer valid: ', err)
      const deletedSubscripton = await db.pushSubscription.delete({ where: { id: subscriptionId } })
      console.log(`[webPush] deleted subscription ${subscriptionId} of user ${deletedSubscripton.userId} due to push error`)
    } else if (err.statusCode === 413) {
      console.log('[webPush] payload too large: ', err)
    } else if (err.statusCode === 429) {
      console.log('[webPush] too many requests: ', err)
    } else {
      console.log('[webPush] error: ', err)
    }
  }

  private async sendNotification(subscription: PushSubscription, payload: string) {
    return await webPush.sendNotification({
      endpoint: subscription.endpoint,
      keys: {
        auth: subscription.auth,
        p256dh: subscription.p256dh
      },
    }, payload)
      .then(x => console.log(x))
      .catch(async (err) => await this.handlePushError(subscription.id, err))
  }

  async sendUserNotification(userId: string, notification: NotificationConstructor) {
    try {
      const payload = this.createPayload(notification.title, notification)

      const subscriptions = await db.pushSubscription.findMany({
        where: { userId }
      })

      await Promise.allSettled(
        subscriptions.map(async (subscription) => await this.sendNotification(subscription, payload))
      )
    } catch (err) {
      console.log('[webPush] error sending user notification: ', err)
    }
  }

  async sendEveryoneNotification(notification: NotificationConstructor) {
    try {
      const payload = this.createPayload(notification.title, notification)

      const subscriptions = await db.pushSubscription.findMany()

      await Promise.allSettled(
        subscriptions.map(async (subscription) => await this.sendNotification(subscription, payload))
      )
    } catch (err) {
      console.log('[webPush] error sending user notification: ', err)
    }
  }
}

export const notifications = new Notifications();