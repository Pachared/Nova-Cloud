import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    return NextResponse.redirect(new URL("/?login=github-config-error", request.url));
  }

  const state = crypto.randomUUID();
  const authorizeURL = new URL("https://github.com/login/oauth/authorize");
  authorizeURL.searchParams.set("client_id", clientId);
  authorizeURL.searchParams.set("redirect_uri", redirectUri);
  authorizeURL.searchParams.set("scope", "read:user user:email");
  authorizeURL.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeURL);
  response.cookies.set("nova_github_oauth_state", state, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
