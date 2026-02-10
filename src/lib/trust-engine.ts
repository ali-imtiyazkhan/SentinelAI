type TrustInput = {
  currentTrust: number;
  riskScore: number;
};

export function adjustTrust({ currentTrust, riskScore }: TrustInput): number {
  let newTrust = currentTrust;

  // high risk reduce trust heavily

  if (riskScore > 80) {
    newTrust -= 0.2;
  } else if (riskScore > 50) {
    newTrust -= 0.1;
  } else if (riskScore < 20) {
    newTrust += 0.05;
  }

  return Math.max(0, Math.min(1, newTrust));
}
