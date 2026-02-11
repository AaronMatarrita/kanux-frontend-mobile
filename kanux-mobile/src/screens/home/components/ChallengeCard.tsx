import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { ChevronRight, Zap, Flame, Shield } from "lucide-react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import type { RecommendedChallenge } from "../types/home.types";

type Props = {
  item: RecommendedChallenge;
  onPress?: (id: string) => void;
  delay?: number;
};

const levelConfig: Record<
  string,
  { bg: string; border: string; textColor: string; Icon: typeof Zap }
> = {
  Avanzado: {
    bg: "rgba(239, 68, 68, 0.10)",
    border: "rgba(239, 68, 68, 0.20)",
    textColor: "#EF4444",
    Icon: Flame,
  },
  Intermedio: {
    bg: "rgba(245, 158, 11, 0.10)",
    border: "rgba(245, 158, 11, 0.20)",
    textColor: "#F59E0B",
    Icon: Zap,
  },
  Principiante: {
    bg: "rgba(13, 54, 98, 0.08)",
    border: "rgba(13, 54, 98, 0.15)",
    textColor: colors.primary,
    Icon: Shield,
  },
};

export const ChallengeCard: React.FC<Props> = ({
  item,
  onPress,
  delay = 0,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);
    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim, delay]);

  const config = levelConfig[item.level] || levelConfig.Principiante;
  const LevelIcon = config.Icon;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onPress?.(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Abrir desafio: ${item.title}`}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        style={{
          borderRadius: 20,
          padding: spacing.lg,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray200,
          ...commonStyles.shadow,
        }}
      >
        {/* Title row */}
        <View style={[commonStyles.rowBetween, { marginBottom: spacing.sm }]}>
          <Text
            style={[
              typography.uiSmall,
              {
                color: colors.textColors.primary,
                flex: 1,
                fontWeight: "600",
                fontSize: 13,
              },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              typography.caption,
              { color: colors.textColors.tertiary, fontSize: 10 },
            ]}
          >
            {item.orderTag}
          </Text>
        </View>

        {/* Description */}
        <Text
          style={[
            typography.bodySmall,
            {
              color: colors.textColors.secondary,
              fontSize: 12,
              lineHeight: 18,
            },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        {/* Footer */}
        <View style={[commonStyles.rowBetween, { marginTop: spacing.lg }]}>
          {/* Level badge with icon */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: spacing.md,
              paddingVertical: 6,
              borderRadius: 999,
              backgroundColor: config.bg,
              borderWidth: 1,
              borderColor: config.border,
            }}
          >
            <LevelIcon size={12} color={config.textColor} />
            <Text
              style={[
                typography.uiSmall,
                { color: config.textColor, fontWeight: "600", fontSize: 11 },
              ]}
            >
              {item.level}
            </Text>
          </View>

          {/* Details button */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
              borderRadius: 14,
              backgroundColor: colors.gray50,
              borderWidth: 1,
              borderColor: colors.gray200,
            }}
          >
            <Text
              style={[
                typography.uiSmall,
                {
                  color: colors.textColors.primary,
                  fontWeight: "600",
                  fontSize: 11,
                },
              ]}
            >
              Ver detalles
            </Text>
            <ChevronRight size={14} color={colors.textColors.primary} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
