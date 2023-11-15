import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { isAdmin } from "./lib/auth/roles"
import { I18nMiddleware, redirect } from "./lib/i18n/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isLoginPage = ['/login', '/register']
      .some(p => req.nextUrl.pathname.startsWith(p));
      
    const isAdminPage = ["/dashboard", "/editor"]
      .some(p => req.nextUrl.pathname.startsWith(p));

    if (isLoginPage) {
      if (!!token) {
        return redirect('/', req);
      }

      return I18nMiddleware(req);
    }

    if (isAdminPage) {
      if (!token) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
          from += req.nextUrl.search;
        }
  
        return redirect(`/login?from=${encodeURIComponent(from)}`, req);
      }
     
      if (!isAdmin(token)) return redirect(`/`, req);
    }
    
    return I18nMiddleware(req);
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)']
}