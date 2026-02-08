import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { colors, spacing, typography } from "@/theme";

type Option = { id: string; label: string };

type Props = {
  label: string;
  valueLabel?: string;
  placeholder?: string;
  error?: string;
  onPress: () => void;
};

export const SelectField: React.FC<Props> = ({
  label,
  valueLabel,
  placeholder = "Seleccionar",
  error,
  onPress,
}) => {
  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        onPress={onPress}
        style={[styles.input, !!error && styles.inputError]}
      >
        <Text style={[styles.value, !valueLabel && styles.placeholder]}>
          {valueLabel ?? placeholder}
        </Text>
        <ChevronDown size={16} color={colors.textColors.tertiary} />
      </Pressable>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  block: { marginBottom: spacing.md },
  label: {
    ...typography.caption,
    color: colors.textColors.secondary,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputError: {
    borderColor: colors.error,
  },
  value: {
    ...typography.caption,
    color: colors.textColors.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  placeholder: {
    color: colors.textColors.tertiary,
  },
  error: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});
