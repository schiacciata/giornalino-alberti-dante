import { env } from "@/env.mjs";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function wait(ms: number = 5000) {
  return await new Promise((r) => setTimeout(() => {
    r(true);
  }, ms));
}

export const randomColor = () => "#"+Math.floor(Math.random() * 0x1000000).toString(16);

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);

  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}