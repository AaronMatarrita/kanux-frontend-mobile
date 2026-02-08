import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { BaseModal } from "@/components/ui/modals/BaseModal";
import { ModalFooterActions } from "@/components/ui/modals/ModalFooterActions";
import { colors, spacing, typography } from "@/theme";
import { useEditAboutForm } from "@/screens/profile/hooks/useEditAboutForm";

type Props = {
  visible: boolean;
  initialAbout: string;
  onClose: () => void;
  onSave: (nextAbout: string) => void;
};

export const EditAboutModal: React.FC<Props> = ({
  visible,
  initialAbout,
  onClose,
  onSave,
}) => {
  const form = useEditAboutForm(initialAbout);

  useEffect(() => {
    if (visible) form.reset(initialAbout);
  }, [visible, initialAbout]);

  return (
    <BaseModal
      visible={visible}
      title="Editar descripción"
      onClose={onClose}
      footer={
        <ModalFooterActions
          onCancel={onClose}
          onSave={() => onSave(form.value)}
          disabled={!form.isValid}
        />
      }
    >
      <View style={styles.block}>
        <Text style={styles.label}>Descripción *</Text>

        <TextInput
          value={form.value}
          onChangeText={form.setValue}
          multiline
          style={styles.input}
          placeholder="Escribe tu descripción..."
          placeholderTextColor={colors.textColors.tertiary}
        />

        <Text style={styles.helper}>{form.helper}</Text>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  block: {
    gap: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.textColors.secondary,
    fontWeight: "700",
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    ...typography.bodySmall,
    color: colors.textColors.primary,
    textAlignVertical: "top",
    backgroundColor: colors.white,
  },
  helper: {
    ...typography.caption,
    color: colors.textColors.tertiary,
  },
});
