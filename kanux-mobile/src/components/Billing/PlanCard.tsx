import React from "react";
import { View, Text } from "react-native";
import { styles } from "./css/PlanCard.styles";
import { TalentPlan } from "@services/subscriptions.service";
import PlanBadge from "./PlanBadge";
import PlanFeature from "./PlanFeature";
import PlanButton from "./PlanButton";

const PlanCard = ({
  plan,
  isCurrentPlan,
  onUpgrade,
}: {
  plan: TalentPlan;
  isCurrentPlan: boolean;
  onUpgrade: (id: string) => void;
}) => {
  const feature = plan.talent_plan_features[0];

  return (
    <View
      style={[
        styles.card,
        isCurrentPlan && styles.currentPlanBorder,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{plan.name}</Text>
        {isCurrentPlan && <PlanBadge />}
      </View>

      <Text style={styles.price}>
        ${plan.price_monthly}
        <Text style={styles.month}> /mes</Text>
      </Text>

      <Text style={styles.description}>{plan.description}</Text>

      <PlanFeature
        label="Acceso a retos avanzados"
        enabled={feature?.can_access_advanced_challenges}
      />
      <PlanFeature
        label="Acceso a retos básicos"
        enabled={feature?.can_access_basic_challenges}
      />
      <PlanFeature
        label="Reportes detallados"
        enabled={feature?.can_access_detailed_reports}
      />

      <PlanButton
        isCurrent={isCurrentPlan}
        onPress={() => onUpgrade(plan.id)}
      />
    </View>
  );
};

export default PlanCard;
