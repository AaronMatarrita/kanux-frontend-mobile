import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { ActivityItemRow } from "../activity/ActivityItemRow";
import styles from "../../styles/activitySection.styles";

type Props = {};

export const ActivitySection: React.FC<Props> = () => {
  const items = [
    {
      title: "Suma de Dos Números",
      dateLabel: "hace 10 d",
      difficulty: "Básico" as const,
      points: 100,
    },
    {
      title: "Eliminar Duplicados de un Array",
      dateLabel: "hace 10 d",
      difficulty: "Avanzado" as const,
      points: 100,
    },
    {
      title: "Secuencia de Fibonacci",
      dateLabel: "hace 10 d",
      difficulty: "Intermedio" as const,
      points: 100,
    },
    {
      title: "Verificador de Palíndromos",
      dateLabel: "hace 10 d",
      difficulty: "Intermedio" as const,
      points: 100,
    },
    {
      title: "Invertir una Cadena",
      dateLabel: "hace 10 d",
      difficulty: "Básico" as const,
      points: 100,
    },
    {
      title: "Trabajo en equipo bajo presión",
      dateLabel: "hace 21 d",
      difficulty: "Intermedio" as const,
      points: 93,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Card variant="shadow" padding="lg" style={styles.card}>
        <Text style={styles.title}>Retos completados</Text>

        <View style={styles.list}>
          {items.map((it, idx) => (
            <ActivityItemRow
              key={`${it.title}-${idx}`}
              title={it.title}
              dateLabel={it.dateLabel}
              difficulty={it.difficulty}
              points={it.points}
            />
          ))}
        </View>
      </Card>
    </View>
  );
};
