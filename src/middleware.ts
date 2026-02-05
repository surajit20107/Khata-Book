import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Define protected and auth routes
  const protectedRoutes = ["/", "/dashboard"];
  const authRoutes = ["/login", "/register"];
  
  const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));
  const isAuthRoute = authRoutes.includes(pathname);

  const token = req.cookies.get("token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret");

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      await jose.jwtVerify(token, secret);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  if (isAuthRoute) {
    if (token) {
      try {
        await jose.jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/", req.url));
      } catch (error) {
        // Token is invalid, clear cookie and stay on auth page
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
