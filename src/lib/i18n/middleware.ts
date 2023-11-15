import { createI18nMiddleware } from "next-international/middleware";
import { locales, defaultLocale } from ".";
import { NextRequest, NextResponse } from "next/server";

export const I18nMiddleware = createI18nMiddleware({
    locales,
    defaultLocale,
    urlMappingStrategy: 'rewrite'
});

export function redirect(path: string, request: NextRequest) {
    return NextResponse.redirect(new URL(path, request.url), {
      ...I18nMiddleware(request),
      status: 307,
    })
}