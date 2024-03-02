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

export const randomColor = () => "#" + Math.floor(Math.random() * 0x1000000).toString(16);

export function formatDate(input: string | number | Date, locales?: Intl.LocalesArgument): string {
  const date = new Date(input);

  return date.toLocaleString(locales, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export const toPascalCase = (str: string) => `${str}`
  .toLowerCase()
  .replace(new RegExp(/[-_]+/, 'g'), ' ')
  .replace(new RegExp(/[^\w\s]/, 'g'), '')
  .replace(
    new RegExp(/\s+(.)(\w*)/, 'g'),
    ($1, $2, $3) => `${$2.toUpperCase() + $3}`
  )
  .replace(new RegExp(/\w/), s => s.toUpperCase());

export const randomBool = () => Math.random() < 0.5; 