import { CLEAR_NOTIFICATIONS, clearAppBadge } from "../utils/badge"

const handle = async (sw: ServiceWorkerGlobalScope, event?: ExtendableMessageEvent) => {
    if (!event) return;

    /*if (event.data.action === 'STORE_SUBSCRIPTION') {
        messageChannelPort?.postMessage({ message: '[sw:message] storing subscription in IndexedDB', context: { endpoint: event.data.subscription.endpoint } })
        return event.waitUntil(storage.setItem('subscription', { ...event.data.subscription, swVersion: 2 }))
      }
      if (event.data.action === 'SYNC_SUBSCRIPTION') {
        return event.waitUntil(onPushSubscriptionChange(sw)(event, true))
      }
      if (event.data.action === 'DELETE_SUBSCRIPTION') {
        return event.waitUntil(storage.removeItem('subscription'))
      }
      */

    switch (event.data.action) {
        case CLEAR_NOTIFICATIONS:
        return event.waitUntil((async () => {
            let notifications: any[] = []
            try {
              notifications = await sw.registration.getNotifications()
            } catch (err) {
              console.error('failed to get notifications')
            }
            notifications.forEach(notification => notification.close())
            //activeCount = 0
            return await clearAppBadge(sw as any)
          })());
    
        default:
            break;
    }
};

export default handle;