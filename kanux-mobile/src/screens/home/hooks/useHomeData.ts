import { useEffect, useState } from "react";
import { analyticsService } from "@/services/analytics.service";
import { profilesService } from "@/services/profiles.service";
import { challengesService, Challenge } from "@/services/challenges.service";
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
  bestChallenge: Challenge | null;
  recommended: Challenge[];
  profile: TalentProfile | null;
  feed: FeedPost[];
  loading: boolean;
  error: string | null;
}

function normalizeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Error al cargar Home";
}

export const useHomeData = (): UseHomeData => {
  const [userName, setUserName] = useState<string>("");

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [analyticsKpis, setAnalyticsKpis] =
    useState<TalentAnalyticsDashboard | null>(null);

  const [bestChallenge, setBestChallenge] = useState<Challenge | null>(null);
  const [recommended, setRecommended] = useState<Challenge[]>([]);

  const [profile, setProfile] = useState<TalentProfile | null>(null);
  const [feed, setFeed] = useState<FeedPost[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchHomeData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const [
          profileData,
          statsData,
          analyticsData,
          softChallengesRes,
          feedData,
        ] = await Promise.all([
          profilesService.getMyProfile(),
          profilesService.getDashboardStats(),
          analyticsService.getTalentDashboard(),
          challengesService.listSoftChallenges(1, 5),
          profilesService.getDashboardFeed(),
        ]);

        if (!mounted) return;

        // PROFILE
        setProfile(profileData);
        setUserName(profileData.first_name ?? "");
        // STATS
        setStats(statsData);
        // ANALYTICS
        setAnalyticsKpis(analyticsData);
        // CHALLENGES
        setRecommended(softChallengesRes.data);
        setBestChallenge(softChallengesRes.data[0] ?? null);
        // FEED
        setFeed(feedData);
      } catch (err) {
        if (!mounted) return;
        setError(normalizeError(err));
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    void fetchHomeData();

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
