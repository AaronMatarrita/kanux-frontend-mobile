import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { BaseModal } from "./BaseModal";
import { colors, spacing, typography } from "@/theme";

type Option = { id: string; label: string };

type Props = {
  visible: boolean;
  title: string;
  options: Option[];
  selectedId?: string;
  onClose: () => void;
  onSelect: (id: string) => void;
};

export const OptionsModal: React.FC<Props> = ({
  visible,
  title,
  options,
  selectedId,
  onClose,
  onSelect,
}) => {
  return (
    <BaseModal visible={visible} title={title} onClose={onClose}>
      <ScrollView style={{ maxHeight: 360 }}>
        {options.map((o) => {
          const active = o.id === selectedId;
          return (
            <Pressable
              key={o.id}
              onPress={() => {
                onSelect(o.id);
                onClose();
              }}
              style={[styles.item, active && styles.itemActive]}
            >
              <Text style={[styles.text, active && styles.textActive]}>
                {o.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  itemActive: {
    borderColor: colors.emerald600,
    backgroundColor: colors.primaryLight,
  },
  text: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
  },
  textActive: {
    fontWeight: "700",
  },
});
