import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import type { RecommendedChallenge } from "../types/home.types";

type Props = {
  item: RecommendedChallenge;
  onPress?: (id: string) => void;
};

export const ChallengeCard: React.FC<Props> = ({ item, onPress }) => {
  const isIntermediate = item.level === "Intermedio";
  const badgeBg = isIntermediate
    ? "rgba(245, 158, 11, 0.14)"
    : "rgba(13, 54, 98, 0.10)";
  const badgeText = isIntermediate ? colors.warning : colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(item.id)}
      style={{
        borderRadius: 20,
        padding: spacing.lg,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.gray200,
        ...commonStyles.shadow,
      }}
    >
      <View style={[commonStyles.rowBetween, { marginBottom: spacing.sm }]}>
        <Text
          style={[
            typography.uiSmall,
            { color: colors.textColors.primary, flex: 1 },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[typography.caption, { color: colors.textColors.tertiary }]}
        >
          {item.orderTag}
        </Text>
      </View>

      <Text
        style={[typography.bodySmall, { color: colors.textColors.secondary }]}
        numberOfLines={3}
      >
        {item.description}
      </Text>

      <View style={[commonStyles.rowBetween, { marginTop: spacing.lg }]}>
        <View
          style={{
            paddingHorizontal: spacing.md,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: badgeBg,
          }}
        >
          <Text style={[typography.uiSmall, { color: badgeText }]}>
            {item.level}
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.sm,
            borderRadius: 14,
            backgroundColor: colors.gray50,
            borderWidth: 1,
            borderColor: colors.gray200,
          }}
        >
          <Text
            style={[typography.uiSmall, { color: colors.textColors.primary }]}
          >
            Más detalles
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
