import type { PrecacheEntry } from "@serwist/precaching";
import { installSerwist } from "@serwist/sw";
import message from "./handlers/message"
import notificationClick from "./handlers/notificationClick"
import push from "./handlers/push"

declare const self: ServiceWorkerGlobalScope & {
    // Change this attribute's name to your `injectionPoint`.
    // `injectionPoint` is an InjectManifest option.
    // See https://serwist.pages.dev/docs/build/inject-manifest/configuring
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    __WB_DISABLE_DEV_LOGS: boolean;
};

const revision = crypto.randomUUID();

installSerwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    disableDevLogs: true,
    fallbacks: {
        entries: [
            {
                url: "/offline",
                revision,
                matcher({ request }) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

self.addEventListener('message', (event) => message(self, event))
self.addEventListener('push', (event) => push(self, event))
self.addEventListener('notificationclick', (event) => notificationClick(self, event))