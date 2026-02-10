import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateRisk } from "@/lib/risk-engine";

export async function POST(req: Request) {
  const { ip, endpoint, method } = await req.json();

  // 1 Check if blocked
  const blocked = await prisma.blockedIP.findUnique({
    where: { ip },
  });

  if (blocked) {
    return NextResponse.json({ decision: "BLOCK" });
  }

  // 2 Count recent requests
  const recentCount = await prisma.requestLog.count({
    where: {
      ip,
      createdAt: {
        gte: new Date(Date.now() - 60 * 1000),
      },
    },
  });

  // 3 Get trust
  const trustProfile = await prisma.trustProfile.findUnique({
    where: { ip },
  });

  // 4 Calculate risk
  const riskScore = calculateRisk({
    ip,
    endpoint,
    method,
    recentRequestCount: recentCount,
    trustScore: trustProfile?.trustScore ?? 0.8,
  });

  const decision = riskScore > 80 ? "BLOCK" : "ALLOW";

  // 5 Log request
  await prisma.requestLog.create({
    data: {
      ip,
      endpoint,
      method,
      riskScore,
      decision,
    },
  });

  // 6 Auto block if needed
  if (decision === "BLOCK") {
    await prisma.blockedIP.create({
      data: {
        ip,
        reason: "High risk detected",
      },
    });
  }

  return NextResponse.json({ decision });
}
