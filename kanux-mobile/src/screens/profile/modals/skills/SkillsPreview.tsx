import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import type { Skill } from "@/screens/profile/types";
import { SkillPill } from "@/screens/profile/components/skills/SkillPill";

type SkillDraft = {
  id: string;
  category: Skill["category"];
  name: string;
  level: NonNullable<Skill["level"]>;
};

const CATEGORY_LABEL: Record<Skill["category"], string> = {
  Technical: "Tecnología",
  Soft: "Blandas",
  Other: "Soporte",
};

export const SkillsPreview: React.FC<{ skills: SkillDraft[] }> = ({
  skills,
}) => {
  const groups = useMemo(() => {
    const map: Record<string, SkillDraft[]> = {};
    skills.forEach((s) => {
      const key = s.category;
      map[key] = map[key] ?? [];
      map[key].push(s);
    });
    return map;
  }, [skills]);

  const categories = Object.keys(groups) as Skill["category"][];

  if (skills.length === 0) return null;

  return (
    <View style={styles.box}>
      <Text style={styles.previewTitle}>Vista previa:</Text>

      {categories.map((cat) => (
        <View key={cat} style={styles.group}>
          <Text style={styles.groupTitle}>{CATEGORY_LABEL[cat]}</Text>
          <View style={styles.pills}>
            {groups[cat].map((s) => (
              <View key={s.id} style={styles.pillItem}>
                <SkillPill label={`${s.name} (${mapLevelLabel(s.level)})`} />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

function mapLevelLabel(level: SkillDraft["level"]) {
  switch (level) {
    case "Beginner":
      return "Principiante";
    case "Intermediate":
      return "Intermedio";
    case "Advanced":
      return "Avanzado";
    case "Expert":
      return "Experto";
    default:
      return level;
  }
}

const styles = StyleSheet.create({
  box: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  previewTitle: {
    ...typography.caption,
    color: colors.textColors.secondary,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  group: {
    marginBottom: spacing.md,
  },
  groupTitle: {
    ...typography.caption,
    color: colors.textColors.primary,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  pills: {
    width: "100%",
  },
  pillItem: {
    marginBottom: spacing.sm,
  },
});
