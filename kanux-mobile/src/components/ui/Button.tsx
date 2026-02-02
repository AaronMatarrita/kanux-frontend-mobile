import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "success" | "outline";
  style?: ViewStyle;
};

export function Button({
  title,
  onPress,
  disabled,
  variant = "success",
  style,
}: Props) {
  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          textVariantStyles[variant],
          disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  disabledText: { opacity: 0.7 },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primary },
  success: { backgroundColor: colors.success },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
});

const textVariantStyles = StyleSheet.create({
  primary: { color: colors.white },
  success: { color: colors.white },
  outline: { color: colors.text },
});
