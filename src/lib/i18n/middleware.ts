import { type NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { defaultLocale, locales } from ".";

export const I18nMiddleware = createI18nMiddleware({
	locales,
	defaultLocale,
	urlMappingStrategy: "redirect",
});

export function redirect(path: string, request: NextRequest) {
	return NextResponse.redirect(new URL(path, request.url), {
		...I18nMiddleware(request),
		status: 307,
	});
}
