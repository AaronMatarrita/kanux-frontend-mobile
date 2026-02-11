import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
};

export const StatPill: React.FC<Props> = ({
  label,
  value,
  Icon,
  accent = "primary",
  onPress,
}) => {
  const accentColor =
    accent === "success"
      ? colors.success
      : accent === "message"
        ? colors.message
        : colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
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
            backgroundColor: "rgba(13,54,98,0.08)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={18} color={accentColor} />
        </View>

        {/* acento */}
        <View
          style={{
            height: 6,
            width: 38,
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
          },
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
};
