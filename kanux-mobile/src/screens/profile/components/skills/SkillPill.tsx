import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Check } from "lucide-react-native";
import { colors, spacing, typography } from "@/theme";

type Props = {
  label: string;
  verified?: boolean;
};

export const SkillPill: React.FC<Props> = ({ label, verified = true }) => {
  return (
    <View style={styles.pill}>
      {verified && (
        <View style={styles.iconWrap}>
          <Check size={14} color={colors.white} strokeWidth={2.5} />
        </View>
      )}

      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    overflow: "hidden",
  },
  iconWrap: {
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: colors.gray900,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    flexShrink: 0,
  },
  text: {
    ...typography.uiSmall,
    color: colors.white,
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
});
