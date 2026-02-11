export type HomeStat = {
  key: "verifiedSkills" | "completedChallenges" | "unreadMessages";
  label: string;
  value: number;
};

export type RecommendedChallenge = {
  id: string;
  title: string;
  description: string;
  level: "Básico" | "Intermedio";
  orderTag: string; // "#01"
};

export type AnalyticsKpi = {
  key: "totalSubmissions" | "avgScore" | "bestScore" | "companiesContacted";
  label: string;
  value: string;
  helper?: string;
};

export type BestChallenge = {
  title: string;
  badge: string;
  subtitle: string;
  score: string;
};
