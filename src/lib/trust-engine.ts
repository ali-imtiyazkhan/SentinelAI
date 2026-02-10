type TrustInput = {
  currentTrust: number;
  riskScore: number;
  lastUpdated: Date;
};

const BASELINE_TRUST = 0.8;
const DECAY_RATE_PER_MINUTE = 0.01; // recovery speed

export function adjustTrust({
  currentTrust,
  riskScore,
  lastUpdated,
}: TrustInput): number {
  let newTrust = currentTrust;

  // ⏳ 1️⃣ Time-based recovery
  const minutesPassed =
    (Date.now() - new Date(lastUpdated).getTime()) / 60000;

  if (minutesPassed > 0) {
    const recoveryAmount = minutesPassed * DECAY_RATE_PER_MINUTE;

    if (newTrust < BASELINE_TRUST) {
      newTrust += recoveryAmount;
    }
  }

  // 🔻 2️⃣ Risk-based adjustment
  if (riskScore > 80) {
    newTrust -= 0.25;
  } else if (riskScore > 50) {
    newTrust -= 0.1;
  } else if (riskScore < 20) {
    newTrust += 0.02;
  }

  // Clamp 0–1
  return Math.max(0, Math.min(1, newTrust));
}
