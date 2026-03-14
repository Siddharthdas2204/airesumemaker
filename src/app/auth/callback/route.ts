import { createClient } from "@/utils/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = request.nextUrl.clone();
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
      const protocol = request.headers.get("x-forwarded-proto") || "https";
      const absoluteUrl = new URL(next, `${protocol}://${host}`);
      return NextResponse.redirect(absoluteUrl.toString());
    }
    
    // If there's an error, pass the message to the login page
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
    const protocol = request.headers.get("x-forwarded-proto") || "https";
    const errorUrl = new URL(`/login?error=auth-code-error&details=${encodeURIComponent(error.message)}`, `${protocol}://${host}`);
    return NextResponse.redirect(errorUrl.toString());
  }

  // Fallback for missing code
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
  const protocol = request.headers.get("x-forwarded-proto") || "https";
  const errorUrl = new URL("/login?error=no-code", `${protocol}://${host}`);
  return NextResponse.redirect(errorUrl.toString());
}
