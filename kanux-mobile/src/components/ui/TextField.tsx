import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { colors } from "@/theme/colors";
import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";

type Props = TextInputProps & {
  label?: string;
  leftIcon?: LucideIcon;
  error?: string;
  variant?: "auth" | "light";
  containerStyle?: ViewStyle;
  inputWrapStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
};

export function TextField({
  label,
  secureTextEntry,
  leftIcon,
  error,
  variant = "auth",
  containerStyle,
  inputWrapStyle,
  labelStyle,
  inputStyle,
  ...inputProps
}: Props) {
  const [hidden, setHidden] = useState(!!secureTextEntry);
  const isMultiline = !!inputProps.multiline;
  const palette = variant === "light" ? lightPalette : authPalette;

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <Text style={[styles.label, { color: palette.label }, labelStyle]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrap,
          {
            backgroundColor: palette.inputBg,
            borderColor: palette.border,
          },
          isMultiline && styles.inputWrapMultiline,
          error && styles.inputWrapError,
          inputWrapStyle,
        ]}
      >
        {!!leftIcon && (
          <View style={{ marginRight: 10 }}>
            {React.createElement(leftIcon, {
              size: 20,
              color: palette.icon,
            })}
          </View>
        )}

        <TextInput
          {...inputProps}
          placeholderTextColor={palette.placeholder}
          autoCorrect={false}
          secureTextEntry={hidden}
          style={[
            styles.input,
            { color: palette.text },
            isMultiline && styles.inputMultiline,
            inputStyle,
          ]}
        />

        {secureTextEntry && (
          <Pressable onPress={() => setHidden((p) => !p)} hitSlop={10}>
            {hidden ? (
              <Eye size={20} color={colors.muted} />
            ) : (
              <EyeOff size={20} color={colors.muted} />
            )}
          </Pressable>
        )}
      </View>

      {!!error && (
        <Text style={[styles.error, { color: palette.error }]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: {
    marginBottom: 6,
    fontSize: 13,
    opacity: 0.9,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    height: 48,
  },
  inputWrapMultiline: {
    height: 110,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  inputWrapError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  inputMultiline: {
    textAlignVertical: "top",
  },
  error: {
    marginTop: 6,
    fontSize: 12,
  },
});

const authPalette = {
  label: colors.white,
  inputBg: colors.gray50,
  border: colors.border,
  text: colors.text,
  placeholder: colors.muted,
  error: "#FCA5A5",
  icon: colors.muted,
};

const lightPalette = {
  label: colors.textColors.secondary,
  inputBg: colors.white,
  border: colors.border,
  text: colors.textColors.primary,
  placeholder: colors.gray400,
  error: colors.error,
  icon: colors.gray500,
};
