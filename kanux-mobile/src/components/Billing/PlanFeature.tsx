import React from "react";
import { View, Text } from "react-native";
import { styles } from "./css/PlanFeature.styles";

const PlanFeature = ({
  label,
  enabled,
}: {
  label: string;
  enabled?: boolean;
}) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.icon, enabled ? styles.ok : styles.no]}>
        {enabled ? "✓" : "✕"}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default PlanFeature;
