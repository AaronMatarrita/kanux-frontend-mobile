import React from "react";
import { View, Text } from "react-native";
import { Trophy } from "lucide-react-native";
import { colors } from "@/theme";
import styles from "../../styles/activityItemRow.styles";

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
