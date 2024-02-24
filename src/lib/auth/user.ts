import { auth } from ".";

export async function getCurrentUser() {
  const session = await auth();

  return session?.user
}

export const getCurrentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};