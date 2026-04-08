import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Admin role check
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Define paths that require authentication
        const isAuthRequired = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
        
        if (isAuthRequired) {
          return !!token;
        }

        // For paths that don't match the matcher explicitly, they are public
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Protect specific routes at Edge layer
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
