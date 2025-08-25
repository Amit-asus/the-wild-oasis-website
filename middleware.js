// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

export const middleware = auth;
// 👇 Control where middleware runs
export const config = {
  matcher: ["/account", "/cabins"],
};
