export interface AnalyticsSummary {
  totalCandidates: number;
  activeChallenges: number;
  completionRate: number;
  topMatchScore: number;
}

export type StatChangeType = "positive" | "negative" | "neutral";

export interface StatChange {
  value: number;
  label: string;
  type: StatChangeType;
}

export type ScoreRange = "90-100" | "80-89" | "70-79" | "60-69" | "below-60";

export interface TalentAnalyticsSummary {
  totalSubmissions: number;
  avgScore: number;
  bestScore: number;
  contactedCompanies: number;
}

export interface TalentTopChallenge {
  challengeId: string;
  title: string;
  avgScore: number;
  bestScore: number;
  attempts: number;
}

export interface ContactedCompany {
  id: string;
  name: string;
  lastMessageAt: string;
}

export interface TalentAnalyticsDashboard {
  summary: TalentAnalyticsSummary;
  summaryChanges: {
    totalSubmissions: StatChange;
    avgScore: StatChange;
    contactedCompanies: StatChange;
  };
  topChallenges: TalentTopChallenge[];
  scoreDistribution: Record<ScoreRange, number>;
  contactedCompanies: ContactedCompany[];
}
