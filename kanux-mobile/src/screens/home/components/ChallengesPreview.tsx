import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { homeStyles } from "../styles/home.styles";
import { colors } from "../../../theme/colors";
import { typography } from "../../../theme/typography";
import { spacing } from "../../../theme/spacing";
import type { RecommendedChallenge } from "../types/home.types";
import { ChallengeCard } from "./ChallengeCard";

type Props = {
  items: RecommendedChallenge[];
  totalAvailableText: string;
  onPressChallenge?: (id: string) => void;
  onPressSeeMore?: () => void;
};

export const ChallengesPreview: React.FC<Props> = ({
  items,
  totalAvailableText,
  onPressChallenge,
  onPressSeeMore,
}) => {
  return (
    <View>
      <View style={homeStyles.sectionHeaderRow}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text style={homeStyles.sectionTitle}>Desafíos recomendados</Text>
          <Text style={homeStyles.sectionSubtitle}>
            Explora retos alineados a tu perfil.
          </Text>
        </View>

        <View style={homeStyles.chip}>
          <Text
            style={[typography.caption, { color: colors.textColors.secondary }]}
          >
            {totalAvailableText}
          </Text>
        </View>
      </View>

      <View style={{ gap: spacing.md }}>
        {items.slice(0, 2).map((it) => (
          <ChallengeCard key={it.id} item={it} onPress={onPressChallenge} />
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressSeeMore}
        style={{
          marginTop: spacing.lg,
          borderRadius: 16,
          paddingVertical: spacing.md,
          alignItems: "center",
          backgroundColor: colors.primary,
        }}
      >
        <Text style={[typography.uiSmall, { color: colors.white }]}>
          Ver más
        </Text>
      </TouchableOpacity>
    </View>
  );
};
