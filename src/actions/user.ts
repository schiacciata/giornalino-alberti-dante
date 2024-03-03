'use server'

import { db } from "@/lib/db"
import { getCurrentUser } from '@/lib/auth/user'
import { userUpdateSchema } from '@/lib/validations/user';
import { z } from "zod";
import { getUserByEmail, getUserById } from "@/lib/queries/user";
import bcrypt from 'bcryptjs';
import { update } from '@/lib/auth';
import { isAdmin } from "@/lib/auth/roles";
import { Role } from "@prisma/client";

export const updateUser = async (values: z.infer<typeof userUpdateSchema>) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }

    /*const verificationToken = await generateVerificationToken(
      values.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };*/

    return { success: "Updated email" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(
      values.newPassword,
      10,
    );
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    }
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    }
  });

  return { success: "Settings Updated!" }
}

export const editUser = async (userId: string, values: z.infer<typeof userUpdateSchema>) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" }
  }

  if (!isAdmin(user)) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(userId);

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" }
    }

    return { success: "Updated email" };
  }

  if (values.password && dbUser.password) {
    const hashedPassword = await bcrypt.hash(
      values.password,
      10,
    );
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    }
  });

  return { success: "Settings Updated!" }
}

export async function deleteUser(userId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return Promise.reject('Not authenticated');
  if (!isAdmin(currentUser)) {
    return { error: "Unauthorized" }
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      role: true,
    }
  });

  if (!user) {
    return Promise.reject('User not found');
  }
  
  if (isAdmin(user)) {
    return { error: "Unauthorized" }
  }

  const deletedUser = await db.user.delete({
    where: {
      id: userId,
    },
  });

  return deletedUser;
}

export const updateUserRole = async (options: {
  id: string,
  role: Role,
}) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" }
  }

  if (!isAdmin(user)) {
    return { error: "Unauthorized" }
  }

  const dbUser = await getUserById(options.id);

  if (!dbUser) {
    return { error: "Unauthorized" }
  }

  const updatedUser = await db.user.update({
    where: { id: options.id },
    data: {
      role: options.role,
    }
  });

  return { success: "Updated user role!" }
}