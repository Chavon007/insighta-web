

import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const token = searchParams.get("token");
  const refreshToken = searchParams.get("refresh_token");

  if (!token || !refreshToken) {
    return NextResponse.json(
      { error: "Missing tokens" },
      { status: 400 }
    );
  }

  const response = NextResponse.redirect(
    new URL("/dashboard", req.url)
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/", 
  });

  response.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/", 
  });

  return response;
}