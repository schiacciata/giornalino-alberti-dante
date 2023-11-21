import message from "./handlers/message"
import notificationClick from "./handlers/notificationClick"
import push from "./handlers/push"

export {}
declare let self: ServiceWorkerGlobalScope

self.addEventListener('message',  (event) => message(self, event))
self.addEventListener('push',  (event) => push(self, event))
self.addEventListener('notificationclick',  (event) => notificationClick(self, event))