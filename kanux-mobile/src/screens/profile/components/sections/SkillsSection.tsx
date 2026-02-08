import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import { SkillGroup } from "../skills/SkillGroup";
import styles from "../../styles/skillsSection.styles";

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
