import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { RuntimeCache, Serwist } from "serwist";

import message from "./handlers/message";
import notificationClick from "./handlers/notificationClick";
import push from "./handlers/push";

declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		// This declares the value of `injectionPoint` to TypeScript.
		// `injectionPoint` is the string that will be replaced by the
		// actual precache manifest. By default, this string is set to
		// `"self.__SW_MANIFEST"`.
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope & {
	__WB_DISABLE_DEV_LOGS?: boolean;
};

const serwist = new Serwist({
	/*precacheEntries: getPrecacheManifest(),
    precacheOptions: {
        cleanupOutdatedCaches: true,
        concurrency: 20,
        ignoreURLParametersMatching: defaultIgnoreUrlParameters,
    },*/
	runtimeCaching: defaultCache,
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	disableDevLogs: true,
	navigationPreload: true,
	extensions: [
		new RuntimeCache(defaultCache, {
			warmEntries: ["/offline"],
			fallbacks: {
				entries: [
					{
						url: "/offline",
						matcher({ request }) {
							return request.destination === "document";
						},
					},
				],
			},
		}),
	],
});

serwist.addEventListeners();

self.addEventListener("message", (event) => message(self, event));
self.addEventListener("push", (event) => push(self, event));
self.addEventListener("notificationclick", (event) =>
	notificationClick(self, event),
);
