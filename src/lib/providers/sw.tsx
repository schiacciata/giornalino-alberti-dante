'use client'

import { env } from '@/env.mjs'
import { createContext, useContext, useEffect, useState, useCallback, ReactElement, useMemo } from 'react'
import { Workbox } from 'workbox-window'

export const wb = new Workbox('/sw.js', { scope: '/' });

type SubscriptionVariables = {
  endpoint: string;
  p256dh: ArrayBuffer | null;
  auth: ArrayBuffer | null;
}

export type SWContext = {
  registration?: ServiceWorkerRegistration
  support: Record<string, boolean>
  permission: NotificationPermission
  requestNotificationPermission: () => Promise<void>
  togglePushSubscription: () => Promise<void>
}

const applicationServerKey = env.NEXT_PUBLIC_VAPID_PUBKEY
const ServiceWorkerContext = createContext<SWContext | null>(null)

type ServiceWorkerProviderProps = {
  children: ReactElement;
}

export const ServiceWorkerProvider = ({ children }: ServiceWorkerProviderProps) => {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>()
  const [support, setSupport] = useState<Record<string, boolean>>({ serviceWorker: false, pushManager: false })
  const [permission, setPermission] = useState<NotificationPermission>("denied");

  useEffect(() => {
    const supportsSW = 'serviceWorker' in navigator;
    const supportsNotifications = 'Notification' in window;
    
    if (!supportsSW) {
      console.error('device does not support service worker')
      return
    }

    wb.register()
      .then(registration => {
        console.info('service worker registration successful')
        setRegistration(registration)
      })

    setSupport({
      serviceWorker: supportsSW,
      notification: supportsNotifications,
      pushManager: 'PushManager' in window
    })
    setPermission(supportsNotifications ? window.Notification.permission : 'denied' )
  }, []);

  const savePushSubscription = async (vars: SubscriptionVariables) => {
    return (await fetch('/api/subscriptions', {
      method: 'POST',
      body: JSON.stringify(vars),
    })).ok;
  }

  const requestNotificationPermission = async () => {
    if (!registration) return;

    const permission = await window.Notification.requestPermission();
    setPermission(permission);

    if (permission === 'granted') return await subscribeToPushNotifications()
  };

  const subscribeToPushNotifications = async () => {
    const subscribeOptions = { userVisibleOnly: true, applicationServerKey }
    // Brave users must enable a flag in brave://settings/privacy first
    if (!registration) return;

    let pushSubscription: any = await registration.pushManager.subscribe(subscribeOptions)
    
    // convert keys from ArrayBuffer to string
    pushSubscription = JSON.parse(JSON.stringify(pushSubscription))
    
    const variables: SubscriptionVariables = {
      endpoint: pushSubscription.endpoint,
      p256dh: pushSubscription.keys.p256dh,
      auth: pushSubscription.keys.auth,
    }

    await savePushSubscription(variables)
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

  const contextValue = useMemo<SWContext>(() => ({
    registration,
    support,
    permission,
    requestNotificationPermission,
    togglePushSubscription
  }), [registration, support, permission, requestNotificationPermission, togglePushSubscription])

  return (
    <ServiceWorkerContext.Provider value={contextValue}>
      {children}
    </ServiceWorkerContext.Provider>
  )
}

export function useServiceWorker () {
  return useContext(ServiceWorkerContext)
}