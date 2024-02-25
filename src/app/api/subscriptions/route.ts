import { getCurrentUser } from "@/lib/auth/user";
import { db } from "@/lib/db";
import { subscriptionCreateSchema } from "@/lib/validations/subscription";

export async function POST(req: Request) {
    try {
      const user = await getCurrentUser();
  
      if (!user || !user.id) {
        return new Response("Unauthorized", { status: 403 });
      }
  
      const json = await req.json();
      const body = subscriptionCreateSchema.parse(json);

      const existingSubscription = await db.pushSubscription.findFirst({
        where: {
          userId: user.id,
          endpoint: body.endpoint,
        },
      });

      if (existingSubscription) throw new Error("Subscription already exists")
  
      const subscription = await db.pushSubscription.create({
        data: {
            userId: user.id,
            endpoint: body.endpoint,
            p256dh: body.p256dh,
            auth: body.auth,
        },
      })
  
      return new Response(JSON.stringify(subscription));
    } catch (error) {
      return new Response(null, { status: 500 })
    }
  }
  