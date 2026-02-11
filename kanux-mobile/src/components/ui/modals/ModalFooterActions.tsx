import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors, spacing, typography, commonStyles } from "@/theme";

type Props = {
  onCancel: () => void;
  onSave: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
};

export const ModalFooterActions: React.FC<Props> = ({
  onCancel,
  onSave,
  saveLabel = "Guardar",
  cancelLabel = "Cancelar",
  disabled = false,
}) => {
  return (
    <View style={styles.row}>
      <Pressable onPress={onCancel} style={[styles.btn, styles.cancelBtn]}>
        <Text style={[styles.btnText, styles.cancelText]}>{cancelLabel}</Text>
      </Pressable>

      <Pressable
        onPress={onSave}
        disabled={disabled}
        style={[
          styles.btn,
          styles.saveBtn,
          disabled && styles.disabled,
          commonStyles.shadow,
        ]}
      >
        <Text style={[styles.btnText, styles.saveText]}>{saveLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  btn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    borderWidth: 1,
  },
  cancelBtn: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  saveBtn: {
    backgroundColor: colors.emerald600,
    borderColor: colors.emerald600,
  },
  btnText: {
    ...typography.bodySmall,
    fontWeight: "700",
  },
  cancelText: {
    color: colors.gray700,
  },
  saveText: {
    color: colors.white,
  },
  disabled: {
    opacity: 0.6,
  },
});
