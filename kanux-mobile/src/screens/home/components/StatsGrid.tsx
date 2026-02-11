import React, { useMemo } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { spacing } from "../../../theme/spacing";
import { StatPill } from "./StatPill";
import {
  BadgeCheck,
  Trophy,
  MessageCircle,
  FileText,
} from "lucide-react-native";
import type { DashboardStats } from "@/services/profiles.service";

export type HomeStatKey =
  | "skills"
  | "completedChallenges"
  | "unreadMessages"
  | "posts";

type StatVM = {
  key: HomeStatKey;
  label: string;
  value: string;
};

type Props = {
  stats: DashboardStats | null;
  loading?: boolean;
  onPressStat?: (key: HomeStatKey) => void;
};

export const StatsGrid: React.FC<Props> = ({
  stats,
  loading = false,
  onPressStat,
}) => {
  const { width } = useWindowDimensions();

  const columns = useMemo(() => {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    return 2;
  }, [width]);

  const itemWidth = useMemo(() => {
    const horizontalPadding = spacing.lg * 2;
    const totalGutters = spacing.md * (columns - 1);
    const usable = Math.max(0, width - horizontalPadding - totalGutters);
    return usable / columns;
  }, [columns, width]);

  const items: StatVM[] = useMemo(() => {
    const v = (n: number | undefined) => (loading ? "…" : String(n ?? 0));

    return [
      { key: "skills", label: "Habilidades", value: v(stats?.skillsCount) },
      {
        key: "completedChallenges",
        label: "Retos completados",
        value: v(stats?.completedChallengesCount),
      },
      {
        key: "unreadMessages",
        label: "Mensajes",
        value: v(stats?.unreadMessagesCount),
      },
      { key: "posts", label: "Publicaciones", value: v(stats?.postsCount) },
    ];
  }, [stats, loading]);

  const mapAccent = (key: HomeStatKey) => {
    if (key === "unreadMessages") return "message" as const;
    if (key === "completedChallenges") return "success" as const;
    return "primary" as const;
  };

  const mapIcon = (key: HomeStatKey) => {
    if (key === "unreadMessages") return MessageCircle;
    if (key === "completedChallenges") return Trophy;
    if (key === "posts") return FileText;
    return BadgeCheck;
  };

  return (
    <View style={styles.wrap}>
      {items.map((s, idx) => (
        <View
          key={s.key}
          style={{
            width: itemWidth,
            marginRight: (idx + 1) % columns === 0 ? 0 : spacing.md,
            marginBottom: spacing.md,
          }}
        >
          <StatPill
            label={s.label}
            value={s.value}
            Icon={mapIcon(s.key)}
            accent={mapAccent(s.key)}
            onPress={() => onPressStat?.(s.key)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
