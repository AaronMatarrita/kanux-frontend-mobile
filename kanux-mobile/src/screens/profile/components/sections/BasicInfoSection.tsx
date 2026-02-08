import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import styles from "../../styles/basicInfoSection.styles";

type Props = {
  onEditPress: () => void;
};

export const BasicInfoSection: React.FC<Props> = ({ onEditPress }) => (
  <View style={styles.wrapper}>
    <Card variant="shadow" padding="lg" style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Información básica</Text>
        <EditButton onPress={onEditPress} />
      </View>

      <InfoRow label="Nivel de experiencia" value="Expert" />
      <InfoRow label="Idiomas" value="English (Intermedio), Spanish (Básico)" />
      <InfoRow label="Disponibilidad" value="Freelance only" />
    </Card>
  </View>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
