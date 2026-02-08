import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { SkillGroup } from "../skills/SkillGroup";

type Props = {
  onEditPress: () => void;
};

export const SkillsSection: React.FC<Props> = ({ onEditPress }) => {
  const data = [
    {
      title: "Soporte",
      skills: ["Asesor de Base de datos(SQL Server). (advanced)"],
    },
    {
      title: "Tecnología",
      skills: [
        "Desarrollador software (expert)",
        "Técnico de computación. (beginner)",
      ],
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Habilidades verificadas</Text>
          <EditButton onPress={onEditPress} />
        </View>

        {data.map((group) => (
          <SkillGroup
            key={group.title}
            title={group.title}
            skills={group.skills}
          />
        ))}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    borderRadius: 16,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.body,
    fontWeight: "600",
    color: colors.textColors.primary,
  },
});
