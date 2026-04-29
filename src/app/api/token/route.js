import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  return NextResponse.json({ token: token.value });
}