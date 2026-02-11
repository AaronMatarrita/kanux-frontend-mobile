import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { typography, colors, spacing } from "@/theme";
import { ProcessedSkill } from "../hooks/useSkills";

// get data
interface SkillCategoryCardProps {
  categoryName: string;
  skills: ProcessedSkill[];
}

export const SkillCategoryCard: React.FC<SkillCategoryCardProps> = ({
  categoryName,
  skills,
}) => {
  return (
    <Card variant="shadow" padding="lg" style={styles.container}>
      {/* category title*/}
      <Text style={[typography.h3, styles.categoryTitle]}>{categoryName}</Text>

      {/* skill list */}
      <View style={styles.skillsList}>
        {skills.map((skill) => (
          <View key={skill.id} style={styles.skillItem}>
            <View style={styles.skillHeader}>
              <Text style={typography.bodySmall}>{skill.name}</Text>
              <Text style={[typography.caption, { color: colors.gray500 }]}>
                {skill.progress}%
              </Text>
            </View>

            <ProgressBar
              progress={skill.progress}
              height={6}
              color={colors.emerald600}
            />
          </View>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  categoryTitle: {
    color: colors.primary,
    marginBottom: spacing.md,
    textTransform: "capitalize",
  },
  skillsList: {
    gap: spacing.md,
  },
  skillItem: {
    marginBottom: spacing.xs,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});
