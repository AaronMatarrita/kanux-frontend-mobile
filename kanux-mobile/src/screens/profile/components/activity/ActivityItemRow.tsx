import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Trophy } from "lucide-react-native";
import { colors, spacing, typography } from "@/theme";

type Difficulty = "Básico" | "Intermedio" | "Avanzado";

type Props = {
  title: string;
  dateLabel: string;
  difficulty: Difficulty;
  points: number;
};

const difficultyStyles: Record<Difficulty, { bg: string; text: string }> = {
  Básico: { bg: colors.gray100, text: colors.textColors.secondary },
  Intermedio: { bg: colors.gray100, text: colors.textColors.secondary },
  Avanzado: { bg: colors.gray100, text: colors.textColors.secondary },
};

export const ActivityItemRow: React.FC<Props> = ({
  title,
  dateLabel,
  difficulty,
  points,
}) => {
  const diff = difficultyStyles[difficulty];

  return (
    <View style={styles.row}>
      {/* Left icon box */}
      <View style={styles.iconBox}>
        <Trophy size={18} color={colors.textColors.secondary} strokeWidth={2} />
      </View>

      {/* Middle text */}
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>{dateLabel}</Text>
      </View>

      {/* Right badges */}
      <View style={styles.right}>
        <View style={[styles.diffPill, { backgroundColor: diff.bg }]}>
          <Text style={[styles.diffText, { color: diff.text }]}>
            {difficulty}
          </Text>
        </View>

        <View style={styles.pointsPill}>
          <Text style={styles.pointsText}>{points} pt</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    flexShrink: 0,
  },
  center: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
    fontWeight: "600",
  },
  date: {
    ...typography.caption,
    color: colors.textColors.tertiary,
    marginTop: 2,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: spacing.md,
    gap: spacing.sm,
    flexShrink: 0,
  },
  diffPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  diffText: {
    ...typography.caption,
    fontWeight: "600",
  },
  pointsPill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: colors.gray900,
  },
  pointsText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: "700",
  },
});
