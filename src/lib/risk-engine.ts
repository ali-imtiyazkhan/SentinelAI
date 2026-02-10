type RiskInput = {
  ip: string;
  endpoint: string;
  method: string;
  recentRequestCount: number;
  trustScore?: number;
};

export function calculateRisk({
  ip,
  endpoint,
  method,
  recentRequestCount,
  trustScore = 0.8,
}: RiskInput) {
  let risk = 0;

  const sensitiveRoutes = ["login", "admin", "signup"];

  if (sensitiveRoutes.some((route) => endpoint.includes(route))) {
    risk += 25;
  }

  // Desgerious HTTP method
  if (method === "POST" || method === "DELETE") {
    risk += 15;
  }

  //   recent Request Frequcency

  if (recentRequestCount > 20) {
    risk += 40;
  } else if (recentRequestCount > 10) {
    risk += 20;
  }

  //   suspious query pattren
  const suspiciousPattren = ["'", "--", " OR ", " DROP ", "<script>"];

  if (suspiciousPattren.some((pattren) => endpoint.includes(pattren))) {
    risk += 50;
  }

  if (trustScore > 0.9) {
    risk -= 15;
  }

  if (trustScore < 0.5) {
    risk += 20;
  }

  return Math.max(0, Math.min(100, risk));
}
