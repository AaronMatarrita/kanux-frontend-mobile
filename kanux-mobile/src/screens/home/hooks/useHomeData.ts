import { useEffect, useState } from "react";
import { analyticsService } from "@/services/analytics.service";
import { profilesService } from "@/services/profiles.service";
import type { TalentAnalyticsDashboard } from "@/types/analytics.types";
import type {
  DashboardStats,
  DashboardChallenge,
  FeedPost,
  TalentProfile,
} from "@/services/profiles.service";

interface UseHomeData {
  userName: string;
  stats: DashboardStats | null;
  analyticsKpis: TalentAnalyticsDashboard | null;
  bestChallenge: DashboardChallenge | null;
  recommended: DashboardChallenge[];
  profile: TalentProfile | null;
  feed: FeedPost[];
  loading: boolean;
  error: string | null;
}

function normalizeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Error al cargar datos de Home";
}

export const useHomeData = (): UseHomeData => {
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [analyticsKpis, setAnalyticsKpis] =
    useState<TalentAnalyticsDashboard | null>(null);
  const [bestChallenge, setBestChallenge] = useState<DashboardChallenge | null>(
    null,
  );
  const [recommended, setRecommended] = useState<DashboardChallenge[]>([]);
  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [feed, setFeed] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [
          profileData,
          statsData,
          analyticsData,
          challengesData,
          feedData,
        ] = await Promise.all([
          profilesService.getMyProfile(),
          profilesService.getDashboardStats(),
          analyticsService.getTalentDashboard(),
          profilesService.getFirstChallenges(),
          profilesService.getDashboardFeed(),
        ]);

        if (!mounted) return;

        setProfile(profileData);
        setUserName(profileData?.first_name ?? "");

        setStats(statsData ?? null);
        setAnalyticsKpis(analyticsData ?? null);

        const challenges = Array.isArray(challengesData) ? challengesData : [];
        setRecommended(challenges);
        setBestChallenge(challenges[0] ?? null);

        setFeed(Array.isArray(feedData) ? feedData : []);
      } catch (err) {
        if (!mounted) return;
        setError(normalizeError(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    void fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    userName,
    stats,
    analyticsKpis,
    bestChallenge,
    recommended,
    profile,
    feed,
    loading,
    error,
  };
};
