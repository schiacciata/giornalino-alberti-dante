export const locales = ['it', 'en'] as const;
export const defaultLocale: typeof locales[0] = "it" as const;

export const emojis = {
    it: '🇮🇹',
    en: '🇬🇧',
} as const;