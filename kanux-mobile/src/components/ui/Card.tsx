import React from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { colors, spacing, commonStyles } from "@/theme";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "shadow" | "primary";
  style?: ViewStyle;
  onPress?: () => void;
  padding?: keyof typeof spacing;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  style,
  onPress,
  padding = "lg",
}) => {
  const Container = onPress ? Pressable : View;

  const cardStyles = [
    styles.base,
    variantStyles[variant],
    { padding: spacing[padding] },
    style,
  ];

  return (
    <Container
      onPress={onPress}
      style={
        onPress
          ? ({ pressed }) => [cardStyles, pressed && styles.pressed]
          : cardStyles
      }
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    width: "100%",           
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});

const variantStyles = StyleSheet.create({
  default: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  shadow: {
    backgroundColor: colors.white,
    borderRadius: 8,
    ...commonStyles.shadow,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  primary: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
});
