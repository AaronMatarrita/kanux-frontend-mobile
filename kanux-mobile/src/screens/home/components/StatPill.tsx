import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { colors } from "../../../theme/colors";
import { spacing } from "../../../theme/spacing";
import { typography } from "../../../theme/typography";
import { commonStyles } from "../../../theme/commonStyles";
import type { LucideIcon } from "lucide-react-native";

type Props = {
  label: string;
  value: number;
  Icon: LucideIcon;
  accent?: "primary" | "success" | "message";
  onPress?: () => void;
  delay?: number;
};

export const StatPill: React.FC<Props> = ({
  label,
  value,
  Icon,
  accent = "primary",
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

  const accentColor =
    accent === "success"
      ? colors.success
      : accent === "message"
        ? colors.message
        : colors.primary;

  const iconBg =
    accent === "success"
      ? "rgba(16, 185, 129, 0.10)"
      : accent === "message"
        ? "rgba(99, 102, 241, 0.10)"
        : "rgba(13, 54, 98, 0.08)";

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        accessibilityRole="button"
        style={{
          flex: 1,
          minWidth: 130,
          borderRadius: 18,
          padding: spacing.lg,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray200,
          ...commonStyles.shadow,
        }}
      >
        <View style={[commonStyles.rowBetween, { marginBottom: spacing.md }]}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              backgroundColor: iconBg,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} color={accentColor} />
          </View>

          <View
            style={{
              height: 6,
              width: 36,
              borderRadius: 999,
              backgroundColor: accentColor,
            }}
          />
        </View>

        <Text
          style={[typography.caption, { color: colors.textColors.secondary }]}
        >
          {label}
        </Text>

        <Text
          style={[
            typography.h2,
            {
              color: colors.textColors.primary,
              marginTop: spacing.xs,
              lineHeight: 36,
              fontWeight: "700",
              letterSpacing: -0.5,
            },
          ]}
        >
          {value}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
