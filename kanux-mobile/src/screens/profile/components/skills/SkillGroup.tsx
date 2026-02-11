import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { SkillPill } from "./SkillPill";

type Props = {
  title: string;
  skills: string[];
};

export const SkillGroup: React.FC<Props> = ({ title, skills }) => {
  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{title}</Text>

      <View style={styles.list}>
        {skills.map((s) => (
          <View key={s} style={styles.item}>
            <SkillPill label={s} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginTop: spacing.md,
  },
  groupTitle: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  list: {
    width: "100%",
  },
  item: {
    marginBottom: spacing.sm,
  },
});
