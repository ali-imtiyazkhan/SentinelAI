import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/security).*)"],
};

export async function middleware(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

  const endpoint = req.nextUrl.pathname;
  const method = req.method;

  // Call backend security API
  const response = await fetch(`${req.nextUrl.origin}/api/security`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip, endpoint, method }),
  });

  const result = await response.json();

  if (result.decision === "BLOCK") {
    return new NextResponse("Blocked by SentinelAI", {
      status: 403,
    });
  }

  return NextResponse.next();
}
