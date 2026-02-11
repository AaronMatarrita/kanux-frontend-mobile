import React, { useMemo } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import type { HomeStat } from "../types/home.types";
import { spacing } from "../../../theme/spacing";
import { StatPill } from "./StatPill";
import { BadgeCheck, Trophy, MessageCircle } from "lucide-react-native";

type Props = {
  stats: HomeStat[];
  onPressStat?: (key: HomeStat["key"]) => void;
};

export const StatsGrid: React.FC<Props> = ({ stats, onPressStat }) => {
  const { width } = useWindowDimensions();

  const columns = useMemo(() => {
    if (width >= 1024) return 4;
    if (width >= 768) return 3;
    return 2;
  }, [width]);

  const mapAccent = (key: HomeStat["key"]) => {
    if (key === "unreadMessages") return "message" as const;
    if (key === "completedChallenges") return "success" as const;
    return "primary" as const;
  };

  const mapIcon = (key: HomeStat["key"]) => {
    if (key === "unreadMessages") return MessageCircle;
    if (key === "completedChallenges") return Trophy;
    return BadgeCheck;
  };

  const itemWidth = useMemo(() => {
    const horizontalPadding = spacing.lg * 2;
    const totalGutters = spacing.md * (columns - 1);
    const usable = Math.max(0, width - horizontalPadding - totalGutters);
    return usable / columns;
  }, [columns, width]);

  return (
    <View style={styles.wrap}>
      {stats.map((s, idx) => (
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
