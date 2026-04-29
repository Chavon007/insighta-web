import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const refresh_token = searchParams.get("refresh_token");

  if (!token || !refresh_token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 60,
    path: "/",
  });

  response.cookies.set("refresh_token", refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 5 * 60,
    path: "/",
  });

  return response;
}