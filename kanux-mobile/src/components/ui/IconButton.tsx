import React from "react";
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { colors } from "@/theme";

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  size?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

export const IconButton: React.FC<Props> = ({
  onPress,
  children,
  size = 32,
  radius = 12,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      style={[
        styles.base,
        { width: size, height: size, borderRadius: radius },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
