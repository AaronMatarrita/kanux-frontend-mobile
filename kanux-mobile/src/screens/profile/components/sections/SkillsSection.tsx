import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { SkillGroup } from "../skills/SkillGroup";
import styles from "../../styles/skillsSection.styles";
import type { Skill } from "../../types";

type Props = {
  skills?: Skill[];
  onEditPress: () => void;
};

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  Other: "Soporte",
  Technical: "Tecnología",
  Soft: "Blandas",
};

const formatLevel = (level?: Skill["level"]) => {
  if (!level) return "";
  const labels: Record<NonNullable<Skill["level"]>, string> = {
    Beginner: "Principiante",
    Intermediate: "Intermedio",
    Advanced: "Avanzado",
    Expert: "Experto",
  };
  return labels[level];
};

export const SkillsSection: React.FC<Props> = ({
  skills = [],
  onEditPress,
}) => {
  const grouped = skills.reduce<Record<string, string[]>>((acc, skill) => {
    const label = CATEGORY_LABELS[skill.category] ?? "Otros";
    if (!acc[label]) acc[label] = [];
    const level = formatLevel(skill.level);
    const description = level ? `${skill.name} (${level})` : skill.name;
    acc[label].push(description);
    return acc;
  }, {});

  const groups = Object.entries(grouped).map(([title, items]) => ({
    title,
    skills: items,
  }));

  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Habilidades verificadas</Text>
          <EditButton onPress={onEditPress} />
        </View>

        {groups.length === 0 ? (
          <Text>No hay habilidades registradas.</Text>
        ) : (
          groups.map((group) => (
            <SkillGroup
              key={group.title}
              title={group.title}
              skills={group.skills}
            />
          ))
        )}
      </Card>
    </View>
  );
};
