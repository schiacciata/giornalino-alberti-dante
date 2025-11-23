import { setAppBadge } from "../utils/badge";

const mergeAndShowNotification = (
	sw: ServiceWorkerGlobalScope,
	payload: any,
	currentNotification: Notification,
) => {
	//const { data: incomingData } = payload.options;
	const amount = currentNotification.data?.amount
		? currentNotification.data.amount + 1
		: 2;

	let title = "";
	switch (currentNotification.tag) {
		case "LIKE":
			title = `you have ${amount} new likes`;
			break;

		default:
			break;
	}

	currentNotification.close();
	const newNotificationOptions: NotificationOptions = {
		icon: currentNotification.icon,
		tag: currentNotification.tag,
		data: { url: "/notifications", amount },
	};
	return sw.registration.showNotification(title, newNotificationOptions);
};

const handle = async (sw: ServiceWorkerGlobalScope, event?: PushEvent) => {
	if (!event) return;
	let activeCount = 0;

	const payload = event.data?.json();
	if (!payload) return;

	const { tag } = payload.options;
	event.waitUntil(
		(async () => {
			const notifications = await sw.registration.getNotifications({ tag });

			if (notifications.length > 1) {
				return null;
			}

			if (notifications.length === 0) {
				setAppBadge(sw, ++activeCount);
				return sw.registration.showNotification(payload.title, payload.options);
			}

			const currentNotification = notifications[0];
			return mergeAndShowNotification(sw, payload, currentNotification);
		})(),
	);
};

export default handle;
