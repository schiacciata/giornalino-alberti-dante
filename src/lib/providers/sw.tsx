'use client'

import { env } from '@/env.mjs'
import { createContext, useContext, useEffect, useState, useCallback, ReactElement } from 'react'
import { Workbox } from 'workbox-window'

const applicationServerKey = env.NEXT_PUBLIC_VAPID_PUBKEY
const ServiceWorkerContext = createContext<any>(null)

type ServiceWorkerProviderProps = {
  children: ReactElement;
}

export const ServiceWorkerProvider = ({ children }: ServiceWorkerProviderProps) => {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>()
  const [support, setSupport] = useState<Record<string, boolean>>({ serviceWorker: false, pushManager: false })
  const [permission, setPermission] = useState<NotificationPermission>("denied");

  const requestNotificationPermission = useCallback(async () => {
    const permission = await window.Notification.requestPermission();
    setPermission(permission);

    if (permission === 'granted') return subscribeToPushNotifications()
  }, [])

  const subscribeToPushNotifications = async () => {
    const subscribeOptions = { userVisibleOnly: true, applicationServerKey }
    // Brave users must enable a flag in brave://settings/privacy first
    if (!registration) return;

    const pushSubscription = await registration.pushManager.subscribe(subscribeOptions)
    const { endpoint } = pushSubscription
    console.info('subscribed to push notifications', { endpoint })
    
    // convert keys from ArrayBuffer to string
    //pushSubscription = JSON.parse(JSON.stringify(pushSubscription))
    // Send subscription to service worker to save it so we can use it later during `pushsubscriptionchange`
    // see https://medium.com/@madridserginho/how-to-handle-webpush-api-pushsubscriptionchange-event-in-modern-browsers-6e47840d756f
    /*navigator.serviceWorker.controller.postMessage({
      action: 'STORE_SUBSCRIPTION',
      subscription: pushSubscription
    })
    logger.info('sent STORE_SUBSCRIPTION to service worker', { endpoint })*/
    // send subscription to server
    const variables = {
      endpoint,
      p256dh: pushSubscription.getKey('p256dh'),
      auth: pushSubscription.getKey('auth'),
    }

    /*await savePushSubscription({ variables })
    logger.info('sent push subscription to server', { endpoint })*/
  }

  const unsubscribeFromPushNotifications = async (subscription: PushSubscription) => {
    await subscription.unsubscribe()
    const { endpoint } = subscription
    /*logger.info('unsubscribed from push notifications', { endpoint })
    await deletePushSubscription({ variables: { endpoint } })*/
    
    // also delete push subscription in IndexedDB so we can tell if the user disabled push subscriptions
    // or we lost the push subscription due to a bug
    /*navigator.serviceWorker.controller.postMessage({ action: 'DELETE_SUBSCRIPTION' })
    logger.info('deleted push subscription from server', { endpoint })*/
  }

  const togglePushSubscription = useCallback(async () => {
    if (!registration) return;

    const pushSubscription = await registration.pushManager.getSubscription()
    if (pushSubscription) {
      return unsubscribeFromPushNotifications(pushSubscription)
    }
    return subscribeToPushNotifications()
  }, [])

  useEffect(() => {
    setSupport({
      serviceWorker: 'serviceWorker' in navigator,
      notification: 'Notification' in window,
      pushManager: 'PushManager' in window
    })
    setPermission('Notification' in window ? window.Notification.permission : 'denied' )

    if (!('serviceWorker' in navigator)) {
      console.error('device does not support service worker')
      return
    }

    const wb = new Workbox('/sw.js', { scope: '/' })
    wb.register()
      .then(setRegistration);
  }, [])

  useEffect(() => {
    // wait until successful registration
    if (!registration) return
    // setup channel between app and service worker
    const channel = new MessageChannel()
    navigator?.serviceWorker?.controller?.postMessage({ action: 'ACTION_PORT' }, [channel.port2])
    channel.port1.onmessage = (event) => {
      if (event.data.action === 'RESUBSCRIBE') {
        return subscribeToPushNotifications()
      }
    }
    // since (a lot of) browsers don't support the pushsubscriptionchange event,
    // we sync with server manually by checking on every page reload if the push subscription changed.
    // see https://medium.com/@madridserginho/how-to-handle-webpush-api-pushsubscriptionchange-event-in-modern-browsers-6e47840d756f
    /*navigator?.serviceWorker?.controller?.postMessage?.({ action: 'SYNC_SUBSCRIPTION' })
    logger.info('sent SYNC_SUBSCRIPTION to service worker')*/
  }, [registration])

  return (
    <ServiceWorkerContext.Provider value={{ registration, support, permission, requestNotificationPermission, togglePushSubscription }}>
      {children}
    </ServiceWorkerContext.Provider>
  )
}

export function useServiceWorker () {
  return useContext(ServiceWorkerContext)
}