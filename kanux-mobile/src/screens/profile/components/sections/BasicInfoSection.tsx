import React from "react";
import { View, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { EditButton } from "@/components/ui/EditButton";
import styles from "../../styles/basicInfoSection.styles";
import type { Language, OpportunityStatus } from "../../types";

type Props = {
  experienceLevel?: string;
  education?: string;
  opportunityStatus?: OpportunityStatus;
  languages?: Language[];
  onEditPress: () => void;
};

const OPPORTUNITY_LABELS: Record<OpportunityStatus, string> = {
  OpenToWork: "Disponible",
  FreelanceOnly: "Solo freelance",
  NotAvailable: "No disponible",
};

const EXPERIENCE_LABELS: Record<string, string> = {
  Beginner: "Principiante",
  Intermediate: "Intermedio",
  Advanced: "Avanzado",
  Expert: "Experto",
};

const EDUCATION_LABELS: Record<string, string> = {
  University: "Universitario",
  SelfTaught: "Autodidacta",
  Bootcamp: "Bootcamp",
};

const formatExperience = (value?: string) => {
  if (!value) return "Sin datos";
  return EXPERIENCE_LABELS[value] ?? value;
};

const formatEducation = (value?: string) => {
  if (!value) return "Sin datos";
  return EDUCATION_LABELS[value] ?? value;
};

const formatLanguages = (languages?: Language[]) => {
  if (!languages || languages.length === 0) return "Sin datos";

  return languages
    .map((lang) => `${lang.name} (${mapLanguageLevel(lang.level)})`)
    .join(", ");
};

const mapLanguageLevel = (level?: Language["level"]) => {
  if (!level) return "";
  const labels: Record<Language["level"], string> = {
    Basic: "Básico",
    Intermediate: "Intermedio",
    Advanced: "Avanzado",
    Native: "Nativo",
  };
  return labels[level];
};

export const BasicInfoSection: React.FC<Props> = ({
  experienceLevel,
  education,
  opportunityStatus,
  languages,
  onEditPress,
}) => (
  <View style={styles.wrapper}>
    <Card variant="shadow" padding="lg" style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Información básica</Text>
        <EditButton onPress={onEditPress} />
      </View>

      <InfoRow
        label="Nivel de experiencia"
        value={formatExperience(experienceLevel)}
      />
      <InfoRow label="Idiomas" value={formatLanguages(languages)} />
      <InfoRow label="Formación" value={formatEducation(education?.trim())} />
      <InfoRow
        label="Disponibilidad"
        value={
          opportunityStatus
            ? OPPORTUNITY_LABELS[opportunityStatus]
            : "Sin datos"
        }
      />
    </Card>
  </View>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);
