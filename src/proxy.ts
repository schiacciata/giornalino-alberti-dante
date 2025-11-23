import type { NextRequest } from "next/server";
import { authPages } from "./lib/auth/config";
import { isAdmin, isEditor } from "./lib/auth/roles";
import { getCurrentUser } from "./lib/auth/user";
import { I18nMiddleware, redirect } from "./lib/i18n/middleware";

export const proxy = async (req: NextRequest) => {
	const user = await getCurrentUser();
	const isLoggedIn = !!user;

	const isAuthPage = req.nextUrl.pathname.startsWith("/auth/");
	const isEditorPage = ["/dashboard", "/editor"].some((p) =>
		req.nextUrl.pathname.startsWith(p),
	);

	const isAdminPage = ["/dashboard/users"].some((p) =>
		req.nextUrl.pathname.startsWith(p),
	);

	if (isAuthPage) {
		if (isLoggedIn) {
			return redirect("/", req);
		}

		return I18nMiddleware(req);
	}

	if (!isEditorPage && !isAdminPage) return I18nMiddleware(req);

	if (!isLoggedIn) {
		let from = req.nextUrl.pathname;
		if (req.nextUrl.search) {
			from += req.nextUrl.search;
		}

		return redirect(
			`${authPages.signIn}?from=${encodeURIComponent(from)}`,
			req,
		);
	}

	if (!user) return redirect(authPages.signIn, req);

	if (isAdminPage && !isAdmin(user)) return redirect(`/`, req);

	if (!isEditor(user)) return redirect(`/`, req);

	return I18nMiddleware(req);
};

export const config = {
	matcher: [
		"/((?!api|sw.js|serweist|static|.*\\..*|_next|favicon.ico|robots.txt).*)",
	],
};
