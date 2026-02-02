import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { colors } from "@/theme/colors";
import { Eye, EyeOff, type LucideIcon } from "lucide-react-native";

type Props = {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  leftIcon?: LucideIcon;
  error?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "none",
  secureTextEntry,
  leftIcon,
  error,
}: Props) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={{ marginBottom: 14 }}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <View style={[styles.inputWrap, error && styles.inputWrapError]}>
        {!!leftIcon && (
          <View style={{ marginRight: 10 }}>
            {React.createElement(leftIcon, {
              size: 20,
              color: colors.muted,
            })}
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          secureTextEntry={hidden}
          style={styles.input}
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

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: colors.white,
    marginBottom: 6,
    fontSize: 13,
    opacity: 0.9,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray50,
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 48,
  },
  inputWrapError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
  },
  error: {
    marginTop: 6,
    color: "#FCA5A5",
    fontSize: 12,
  },
});
