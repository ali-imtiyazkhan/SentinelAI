import { prisma } from "@/lib/prisma";
import { calculateRisk } from "@/lib/risk-engine";
import { adjustTrust } from "@/lib/trust-engine";

type GuardianInput = {
  ip: string;
  endpoint: string;
  method: string;
};

export async function guardian({ ip, endpoint, method }: GuardianInput) {
  // 1 Check if blocked
  const blocked = await prisma.blockedIP.findUnique({
    where: { ip },
  });

  if (blocked) {
    return { decision: "BLOCK", reason: "Already blocked" };
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

  // 3 Get or create trust profile
  let trustProfile = await prisma.trustProfile.findUnique({
    where: { ip },
  });

  if (!trustProfile) {
    trustProfile = await prisma.trustProfile.create({
      data: {
        ip,
        trustScore: 0.8,
      },
    });
  }

  // 4 Calculate risk
  const riskScore = calculateRisk({
    ip,
    endpoint,
    method,
    recentRequestCount: recentCount,
    trustScore: trustProfile.trustScore,
  });

  // 5 Adjust trust
  const newTrust = adjustTrust({
    currentTrust: trustProfile.trustScore,
    riskScore,
  });

  await prisma.trustProfile.update({
    where: { ip },
    data: { trustScore: newTrust },
  });

  const decision = riskScore > 80 ? "BLOCK" : "ALLOW";

  // 6 Log request
  await prisma.requestLog.create({
    data: {
      ip,
      endpoint,
      method,
      riskScore,
      decision,
    },
  });

  // 7 Auto block
  if (decision === "BLOCK") {
    await prisma.blockedIP.create({
      data: {
        ip,
        reason: "High risk detected",
      },
    });
  }

  return {
    decision,
    riskScore,
    trustScore: newTrust,
  };
}
