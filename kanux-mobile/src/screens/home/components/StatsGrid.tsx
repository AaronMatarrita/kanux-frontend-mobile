import React from "react";
import { View } from "react-native";
import type { HomeStat } from "../types/home.types";
import { spacing } from "../../../theme/spacing";
import { StatPill } from "./StatPill";
import { BadgeCheck, Trophy, MessageCircle } from "lucide-react-native";

type Props = {
  stats: HomeStat[];
  onPressStat?: (key: HomeStat["key"]) => void;
};

export const StatsGrid: React.FC<Props> = ({ stats, onPressStat }) => {
  const mapAccent = (key: HomeStat["key"]) => {
    if (key === "unreadMessages") return "message";
    if (key === "completedChallenges") return "success";
    return "primary";
  };

  const mapIcon = (key: HomeStat["key"]) => {
    if (key === "unreadMessages") return MessageCircle;
    if (key === "completedChallenges") return Trophy;
    return BadgeCheck;
  };

  return (
    <View style={{ gap: spacing.md }}>
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <StatPill
          label={stats[0]?.label ?? "Habilidades verificadas"}
          value={stats[0]?.value ?? 0}
          Icon={mapIcon(stats[0]?.key ?? "verifiedSkills")}
          accent={mapAccent(stats[0]?.key ?? "verifiedSkills")}
          onPress={() => stats[0] && onPressStat?.(stats[0].key)}
        />
        <StatPill
          label={stats[1]?.label ?? "Desafíos completados"}
          value={stats[1]?.value ?? 0}
          Icon={mapIcon(stats[1]?.key ?? "completedChallenges")}
          accent={mapAccent(stats[1]?.key ?? "completedChallenges")}
          onPress={() => stats[1] && onPressStat?.(stats[1].key)}
        />
      </View>

      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <StatPill
          label={stats[2]?.label ?? "Mensajes sin leer"}
          value={stats[2]?.value ?? 0}
          Icon={mapIcon(stats[2]?.key ?? "unreadMessages")}
          accent={mapAccent(stats[2]?.key ?? "unreadMessages")}
          onPress={() => stats[2] && onPressStat?.(stats[2].key)}
        />
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
};
