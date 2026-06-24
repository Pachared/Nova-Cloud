import { NextRequest, NextResponse } from "next/server";

type GitHubLoginResult = {
  token: string;
  refresh_token: string;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("nova_github_oauth_state")?.value;
  const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!code || !state || state !== expectedState || !redirectUri || !apiUrl) {
    return NextResponse.redirect(new URL("/?login=github-error", request.url));
  }

  const exchange = await fetch(`${apiUrl}/auth/github`, {
    body: JSON.stringify({ code, redirect_uri: redirectUri }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    cache: "no-store",
  });
  if (!exchange.ok) {
    return NextResponse.redirect(new URL("/?login=github-error", request.url));
  }

  const tokens = await exchange.json() as GitHubLoginResult;
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set("nova_access_token", tokens.token, { httpOnly: true, maxAge: 86400, path: "/", sameSite: "lax", secure });
  response.cookies.set("nova_refresh_token", tokens.refresh_token, { httpOnly: true, maxAge: 604800, path: "/", sameSite: "lax", secure });
  response.cookies.delete("nova_github_oauth_state");
  return response;
}
