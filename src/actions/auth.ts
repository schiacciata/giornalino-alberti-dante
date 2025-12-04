"use server";

import bcrypt from "bcryptjs";
import type * as z from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/lib/queries/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/lib/queries/two-factor-token";
import { getUserByEmail } from "@/lib/queries/user";
/*import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/lib/mail";
import {
	generateVerificationToken,
	generateTwoFactorToken,
} from "@/lib/tokens";*/
import { loginSchema, registerSchema } from "@/lib/validations/auth";

export const login = async (
	values: z.infer<typeof loginSchema>,
	callbackUrl?: string | null,
) => {
	const validatedFields = loginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser || !existingUser.email) {
		return { error: "Email does not exist!" };
	}

	/*if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

		return { success: "Confirmation email sent!" };
	}*/

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

			if (!twoFactorToken) {
				return { error: "Invalid code!" };
			}

			if (twoFactorToken.token !== code) {
				return { error: "Invalid code!" };
			}

			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if (hasExpired) {
				return { error: "Code expired!" };
			}

			await db.twoFactorToken.delete({
				where: { id: twoFactorToken.id },
			});

			const existingConfirmation = await getTwoFactorConfirmationByUserId(
				existingUser.id,
			);

			if (existingConfirmation) {
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id },
				});
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				},
			});
		} else {
			/*const twoFactorToken = await generateTwoFactorToken(existingUser.email);
			await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token,
      );*/

			return { twoFactor: true };
		}
	}

	try {
		await auth.api.signInEmail({
			body: {
				email,
				password,
				callbackURL: callbackUrl || "/",
			},
		});

		return { success: "Logged in successfully!" };
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Invalid credentials!";
		return { error: message };
	}
};

//TODO: use better-auth
export const register = async (values: z.infer<typeof registerSchema>) => {
	const validatedFields = registerSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: "Invalid fields!" };
	}

	const { email, password, name } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: "Email already in use!" };
	}

	await db.user.create({
		data: {
			name,
			email,
		},
	});

	/*const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent!" };*/
	return { success: "Account created" };
};
