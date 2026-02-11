import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { ActivityItemRow } from "../activity/ActivityItemRow";
import styles from "../../styles/activitySection.styles";
import { challengesService } from "@/services/challenges.service";
import type { ChallengeSubmissionsResponse } from "@/services/challenges.service";

type UiDifficulty = "Básico" | "Intermedio" | "Avanzado";

type ActivityItem = {
  title: string;
  dateLabel: string;
  difficulty: UiDifficulty;
  points: number;
};

type Submission = ChallengeSubmissionsResponse[number];

type SubmissionStatus = string;

const normalizeDifficulty = (raw?: string): UiDifficulty => {
  const v = (raw ?? "").trim().toLowerCase();

  if (v === "básico" || v === "basico" || v.includes("basic")) return "Básico";
  if (v === "avanzado" || v.includes("adv") || v.includes("avan"))
    return "Avanzado";
  return "Intermedio";
};

const formatRelative = (isoDate: string): string => {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();

  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "justo ahora";
  if (diffMin < 60) return `hace ${diffMin} min`;

  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `hace ${diffH} h`;

  const diffD = Math.floor(diffH / 24);
  return `hace ${diffD} d`;
};

const isCompletedStatus = (status: SubmissionStatus): boolean => {
  const s = status.trim().toLowerCase();
  return s !== "started" && s !== "in_progress" && s !== "pending";
};

const toActivityItem = (s: Submission): ActivityItem => ({
  title: s.challenge.title,
  dateLabel: formatRelative(s.submitted_at),
  difficulty: normalizeDifficulty(s.challenge.difficulty),
  points: Number.isFinite(s.score) ? Math.round(s.score) : 0,
});

export const ActivitySection: React.FC = () => {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const run = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        const history: ChallengeSubmissionsResponse =
          await challengesService.getMyChallengeHistory();

        if (!alive) return;

        const completed = history
          .filter((s) => isCompletedStatus(s.status))
          .sort(
            (a, b) =>
              new Date(b.submitted_at).getTime() -
              new Date(a.submitted_at).getTime(),
          )
          .map(toActivityItem)
          .slice(0, 6);

        setItems(completed);
      } catch (e: unknown) {
        if (!alive) return;

        const message =
          e instanceof Error ? e.message : "Error cargando historial de retos";

        setError(message);
        setItems([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    void run();

    return () => {
      alive = false;
    };
  }, []);

  const content = useMemo(() => {
    if (loading) return <Text>Cargando...</Text>;
    if (error) return <Text>{error}</Text>;
    if (items.length === 0) return <Text>No hay retos completados aún.</Text>;

    return (
      <View style={styles.list}>
        {items.map((it, idx) => (
          <ActivityItemRow
            key={`${it.title}-${idx}`}
            title={it.title}
            dateLabel={it.dateLabel}
            difficulty={it.difficulty}
            points={it.points}
          />
        ))}
      </View>
    );
  }, [loading, error, items]);

  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <Text style={styles.title}>Retos completados</Text>
        {content}
      </Card>
    </View>
  );
};
