import { ContributionDocument } from "../models/Contribution";

const TREASURY_POOL = 124.5;

export function computeRewardDistribution(
  contributions: ContributionDocument[]
): Array<{
  user: string;
  score: number;
  percentage: number;
  earned: number;
}> {
  const totalScore = contributions.reduce((sum, c) => sum + c.score, 0);
  if (totalScore === 0) {
    return contributions.map((c) => ({
      user: c.user,
      score: c.score,
      percentage: 0,
      earned: 0,
    }));
  }

  return contributions.map((c) => {
    const ratio = c.score / totalScore;
    return {
      user: c.user,
      score: c.score,
      percentage: Number((ratio * 100).toFixed(2)),
      earned: Number((ratio * TREASURY_POOL).toFixed(4)),
    };
  });
}

