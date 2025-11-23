const handle = async (
	sw: ServiceWorkerGlobalScope,
	event?: NotificationEvent,
) => {
	event?.notification.close();
	event?.waitUntil(
		sw.clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((clientList) => {
				if (clientList.length > 0) {
					let client = clientList[0];
					for (let i = 0; i < clientList.length; i++) {
						if (clientList[i].focused) {
							client = clientList[i];
						}
					}
					return client.focus();
				}
				return sw.clients.openWindow("/");
			}),
	);
};

export default handle;
