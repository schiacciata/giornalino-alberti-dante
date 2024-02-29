import NextAuth from "next-auth";
import authConfig from "@/lib/auth/config";
import authOptions from "@/lib/auth/config"

const { auth } = NextAuth(authConfig);

import { isEditor } from "./lib/auth/roles"
import { I18nMiddleware, redirect } from "./lib/i18n/middleware"
import { getCurrentUser } from "./lib/auth/user";

export default auth(async (req) => {
    const isLoggedIn = !!req.auth;

    const isAuthPage = req.nextUrl.pathname.startsWith('/auth/');
    const isEditorPage = ["/dashboard", "/editor"]
      .some(p => req.nextUrl.pathname.startsWith(p));

    if (isAuthPage) {
      if (isLoggedIn) {
        return redirect('/', req);
      }

      return I18nMiddleware(req);
    }

    if (isEditorPage) {
      if (!isLoggedIn) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          from += req.nextUrl.search;
        }
  
        return redirect(`${authOptions.pages.signIn}?from=${encodeURIComponent(from)}`, req);
      }
     
      const user = await getCurrentUser();
      if (!user) return redirect(authOptions.pages.signIn, req);

      if (!isEditor(user)) return redirect(`/`, req);
    }
    
    return I18nMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}