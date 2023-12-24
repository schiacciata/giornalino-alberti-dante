'use server'

import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { userUpdateSchema, userUpdateFormData } from '@/lib/validations/user';

export const updateUser = async (formData: userUpdateFormData) => {
    try {
        const user = await getCurrentUser();
        if (!user) return { error: 'Not authenticated' };

        const payload = userUpdateSchema.parse({
            name: formData.name,
        });
    
        await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: payload.name,
            },
        })

        return { success: true }
    } catch (e) {
        return { error: 'There was an error.' };
    }
}