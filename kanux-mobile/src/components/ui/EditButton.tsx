import React from "react";
import { Edit } from "lucide-react-native";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { colors, typography, spacing } from "@/theme";

type Props = {
  onPress: () => void;
};

export const EditButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={styles.button}
    >
      <View style={styles.content}>
        <Edit size={14} color={colors.textColors.secondary} strokeWidth={2} />
        <Text style={styles.text}>Editar</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    ...typography.caption,
    color: colors.textColors.secondary,
    fontWeight: "600",
  },
});
