"use client";

import {
	createContext,
	type ReactElement,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { env } from "@/lib/env/client";
import { logger } from "../logs";
import { SerwistProvider } from "../serwist";

type SubscriptionVariables = {
	endpoint: string;
	p256dh: ArrayBuffer | null;
	auth: ArrayBuffer | null;
};

export type BeforeInstallPromptEvent = Event & {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type SWContext = {
	registration?: ServiceWorkerRegistration;
	support: Record<string, boolean>;
	permission: NotificationPermission;
	promptInstall: BeforeInstallPromptEvent | null;
	requestNotificationPermission: () => Promise<void>;
	togglePushSubscription: () => Promise<void>;
};

const applicationServerKey = env.NEXT_PUBLIC_VAPID_PUBKEY;
const ServiceWorkerContext = createContext<SWContext | null>(null);

type ServiceWorkerProviderProps = {
	children: ReactElement<any>;
};

export const ServiceWorkerProvider = ({
	children,
}: ServiceWorkerProviderProps) => {
	const [registration, setRegistration] = useState<
		ServiceWorkerRegistration | undefined
	>();
	const [support, setSupport] = useState<Record<string, boolean>>({
		serviceWorker: false,
		pushManager: false,
	});
	const [permission, setPermission] =
		useState<NotificationPermission>("denied");
	const [promptInstall, setPromptInstall] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [, setInstalled] = useLocalStorage("installed", false);

	useEffect(() => {
		logger.info("service worker provider mounted");
	}, []);

	const installSW = useCallback(async () => {
		if (!navigator) return;

		try {
			const active = await navigator.serviceWorker.getRegistration();
			if (active) {
				setRegistration(active);
				logger.info("service worker already registered");
				return;
			}

			const reg = await window.serwist.register();
			setRegistration(reg);
			logger.info("service worker registration successful");
		} catch (error) {
			logger.error("service worker registration failed", error);
		}
	}, []);

	useEffect(() => {
		if (!navigator) return;

		const supportsSW = "serviceWorker" in navigator;
		const supportsNotifications = "Notification" in window;

		if (!supportsSW) {
			logger.error("device does not support service worker");
			return;
		}

		installSW();

		setSupport({
			serviceWorker: supportsSW,
			notification: supportsNotifications,
			pushManager: "PushManager" in window,
		});
		setPermission(
			supportsNotifications ? window.Notification.permission : "denied",
		);

		const appInstalledHandler = (e: Event) => {
			e.preventDefault();
			setInstalled(true);
		};

		const beforeInstallPromptHandler = (e: Event) => {
			e.preventDefault();
			setPromptInstall(e as any);
		};

		window.addEventListener("appinstalled", appInstalledHandler);
		window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

		return () =>
			window.removeEventListener("transitionend", beforeInstallPromptHandler);
	}, []);

	const savePushSubscription = async (vars: SubscriptionVariables) => {
		return (
			await fetch("/api/subscriptions", {
				method: "POST",
				body: JSON.stringify(vars),
			})
		).ok;
	};

	const requestNotificationPermission = async () => {
		if (!registration) return;

		const permission = await window.Notification.requestPermission();
		setPermission(permission);

		if (permission === "granted") return await subscribeToPushNotifications();
	};

	const subscribeToPushNotifications = async () => {
		const subscribeOptions = { userVisibleOnly: true, applicationServerKey };
		// Brave users must enable a flag in brave://settings/privacy first
		if (!registration) return;

		let pushSubscription: any =
			await registration.pushManager.subscribe(subscribeOptions);

		// convert keys from ArrayBuffer to string
		pushSubscription = JSON.parse(JSON.stringify(pushSubscription));

		const variables: SubscriptionVariables = {
			endpoint: pushSubscription.endpoint,
			p256dh: pushSubscription.keys.p256dh,
			auth: pushSubscription.keys.auth,
		};

		await savePushSubscription(variables);
	};

	const unsubscribeFromPushNotifications = async (
		subscription: PushSubscription,
	) => {
		await subscription.unsubscribe();
		const { endpoint } = subscription;
		/*logger.info('unsubscribed from push notifications', { endpoint })
    await deletePushSubscription({ variables: { endpoint } })*/

		// also delete push subscription in IndexedDB so we can tell if the user disabled push subscriptions
		// or we lost the push subscription due to a bug
		/*navigator.serviceWorker.controller.postMessage({ action: 'DELETE_SUBSCRIPTION' })
    logger.info('deleted push subscription from server', { endpoint })*/
	};

	const togglePushSubscription = useCallback(async () => {
		if (!registration) return;

		const pushSubscription = await registration.pushManager.getSubscription();
		if (pushSubscription) {
			return unsubscribeFromPushNotifications(pushSubscription);
		}
		return subscribeToPushNotifications();
	}, []);

	const contextValue = useMemo<SWContext>(
		() => ({
			registration,
			support,
			permission,
			promptInstall,
			requestNotificationPermission,
			togglePushSubscription,
		}),
		[registration, support, permission, promptInstall, togglePushSubscription],
	);

	return (
		<ServiceWorkerContext value={contextValue}>
			<SerwistProvider swUrl="/sw.js">{children}</SerwistProvider>
		</ServiceWorkerContext>
	);
};

export function useServiceWorker() {
	return use(ServiceWorkerContext);
}
