import { env } from '@/env.mjs';
import webPush from 'web-push'
import { db } from './db';

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

  private createPayload(notification: Partial<Notification>) {
    // https://web.dev/push-notifications-display-a-notification/#visual-options
    const { title, body, ...options } = notification;
    return JSON.stringify({
      title,
      options: {
        body,
        timestamp: Date.now(),
        icon: '/images/icon-192x192.png',
        ...options
      }
    })
  }

  public sendNotification(subscription: any, payload: string) {
    const { id, endpoint, p256dh, auth } = subscription;
    return webPush.sendNotification({ endpoint, keys: { p256dh, auth } }, payload)
      .catch(async (err) => {
        if (err.statusCode === 400) {
          console.log('[webPush] invalid request: ', err)
        } else if ([401, 403].includes(err.statusCode)) {
          console.log('[webPush] auth error: ', err)
        } else if (err.statusCode === 404 || err.statusCode === 410) {
          console.log('[webPush] subscription has expired or is no longer valid: ', err)
          //const deletedSubscripton = await db.pushSubscription.delete({ where: { id } })
          //console.log(`[webPush] deleted subscription ${id} of user ${deletedSubscripton.userId} due to push error`)
        } else if (err.statusCode === 413) {
          console.log('[webPush] payload too large: ', err)
        } else if (err.statusCode === 429) {
          console.log('[webPush] too many requests: ', err)
        } else {
          console.log('[webPush] error: ', err)
        }
      })
  }

  async sendUserNotification(userId: string, notification: Partial<Notification>) {
    try {
      const payload = this.createPayload(notification)
      /*const subscriptions = await db.pushSubscription.findMany({
        where: { userId }
      })
      await Promise.allSettled(
        subscriptions.map(subscription => this.sendNotification(subscription, payload))
      )*/
    } catch (err) {
      console.log('[webPush] error sending user notification: ', err)
    }
  }
}

export const notifications = new Notifications();