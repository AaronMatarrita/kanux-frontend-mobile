import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ArrowRight, Rocket } from "lucide-react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { homeStyles } from "../styles/home.styles";
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
      {/* Section header */}
      <View style={homeStyles.sectionHeaderRow}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text
            style={[
              homeStyles.sectionTitle,
              { fontWeight: "700", fontSize: 16 },
            ]}
          >
            Desafios recomendados
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.textColors.secondary,
              marginTop: 2,
            }}
          >
            Explora retos alineados a tu perfil.
          </Text>
        </View>

        {/* Available count chip with icon */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: spacing.md,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: colors.gray100,
            borderWidth: 1,
            borderColor: colors.gray200,
          }}
        >
          <Rocket size={12} color={colors.primary} />
          <Text
            style={{
              fontSize: 11,
              fontWeight: "500",
              color: colors.textColors.secondary,
            }}
          >
            {totalAvailableText}
          </Text>
        </View>
      </View>

      {/* Challenge cards with staggered animation */}
      <View style={{ gap: 12 }}>
        {items.slice(0, 2).map((it, idx) => (
          <ChallengeCard
            key={it.id}
            item={it}
            onPress={onPressChallenge}
            delay={600 + idx * 100}
          />
        ))}
      </View>

      {/* Gradient CTA button */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressSeeMore}
        accessibilityRole="button"
        accessibilityLabel="Ver mas desafios"
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        style={{
          marginTop: spacing.lg,
          borderRadius: 16,
          paddingVertical: 14,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: colors.white,
          }}
        >
          Explorar todos los desafios
        </Text>
        <ArrowRight size={16} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};
