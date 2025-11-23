export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

export const clearNotifications = () =>
	navigator.serviceWorker?.controller?.postMessage({
		action: CLEAR_NOTIFICATIONS,
	});

const badgingApiSupported = (sw: ServiceWorkerGlobalScope) =>
	"setAppBadge" in sw.navigator;

const permissionGranted = async (
	sw: ServiceWorkerGlobalScope,
	name: PermissionName = "notifications",
) => {
	let permission: PermissionStatus | undefined;
	try {
		permission = await sw.navigator.permissions.query({ name });
	} catch (err) {
		console.error("Failed to check permissions", err);
	}
	return permission?.state === "granted";
};

export const setAppBadge = async (
	sw: ServiceWorkerGlobalScope,
	count: number,
) => {
	if (!badgingApiSupported(sw) || !(await permissionGranted(sw))) return;
	try {
		await sw.navigator.setAppBadge(count);
	} catch (err) {
		console.error("Failed to set app badge", err);
	}
};

export const clearAppBadge = async (sw: ServiceWorkerGlobalScope) => {
	if (!badgingApiSupported(sw) || !(await permissionGranted(sw))) return;
	try {
		await sw.navigator.clearAppBadge();
	} catch (err) {
		console.error("Failed to clear app badge", err);
	}
};
