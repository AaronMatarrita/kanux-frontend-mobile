import { useCallback, useState } from "react";
import { useChallengesCache } from "../store/challenges.store";
import { challengesService } from "@/services/challenges.service"; // Asegúrate de importar tu servicio

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration_minutes: number;
  challenge_type?: string;
}

export type ChallengeSubmission = {
  submission_id: string;
  challenge: {
    id: string;
    title: string;
    type: string;
    difficulty: string;
    description?: string;
    duration_minutes?: number;
  };
  score: number;
  status: string;
  evaluation_type?: string;
  submitted_at: string;
};

export function useChallengesList() {
  const store = useChallengesCache();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadChallenges = useCallback(
    async (type: "all" | "technical" | "soft", page: number, limit: number) => {
      setError(null);
      const results = {
        technical: [] as Challenge[],
        soft: [] as Challenge[],
        totalPages: 1,
        error: null as string | null,
      };

      try {
        if (type === "all" || type === "technical") {
          const tech = await store.getTechnicalChallenges(page, limit);
          results.technical = tech.data;
          if (type === "technical") results.totalPages = tech.totalPages;
        }

        if (type === "all" || type === "soft") {
          const soft = await store.getSoftChallenges(page, limit);
          results.soft = soft.data;
          if (type === "soft") results.totalPages = soft.totalPages;
        }

        if (type === "all") {
          const tech = await store.getTechnicalChallenges(page, limit);
          const soft = await store.getSoftChallenges(page, limit);
          results.totalPages = Math.max(tech.totalPages, soft.totalPages);
        }

        return results;
      } catch (err) {
        setError("Error al cargar los challenges.");
        results.error = "Error al cargar los challenges.";
        return results;
      }
    },
    [store],
  );

  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    setError(null);
    try {
      const response = await challengesService.getMyChallengeHistory();
      return response as ChallengeSubmission[];
    } catch (err) {
      console.error("Error loading history:", err);
      setError("Ocurrió un error al cargar los datos.")
      return [];
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  const clearCache = useCallback(() => {
    store.clearCache();
  }, [store]);

  return {
    loadChallenges,
    loadHistory,
    clearCache,
    isLoading: store.loadingTechnical || store.loadingSoft || loadingHistory,
    error: error,
  };
}