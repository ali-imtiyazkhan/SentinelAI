import { NextResponse } from "next/server";
import { guardian } from "@/lib/guardian";

export async function POST(req: Request) {
  const { ip, endpoint, method } = await req.json();

  const result = await guardian({ ip, endpoint, method });

  return NextResponse.json(result);
}
