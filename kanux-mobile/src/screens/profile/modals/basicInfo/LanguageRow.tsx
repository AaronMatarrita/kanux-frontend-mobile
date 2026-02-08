import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Trash2 } from "lucide-react-native";
import { colors, spacing } from "@/theme";
import { SelectField } from "@/components/ui/SelectField";
import type { Language } from "@/screens/profile/types";

type Option = { id: string; label: string };

type Props = {
  item: Language;
  languageOptions: Option[];
  levelOptions: Option[];
  onPickLanguage: () => void;
  onPickLevel: () => void;
  onRemove: () => void;
  languageLabel?: string;
  levelLabel?: string;
};

const TRASH_SIZE = 32;
const GAP = spacing.sm;
const LABEL_HEIGHT = 18; // debe coincidir aprox con el label del SelectField

export const LanguageRow: React.FC<Props> = ({
  onPickLanguage,
  onPickLevel,
  onRemove,
  languageLabel,
  levelLabel,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.language}>
        <SelectField
          label="Idioma"
          valueLabel={languageLabel}
          onPress={onPickLanguage}
        />
      </View>

      <View style={styles.level}>
        <SelectField
          label="Nivel"
          valueLabel={levelLabel}
          onPress={onPickLevel}
        />
      </View>

      {/* Trash alineado al input (no al label) */}
      <View style={styles.trashWrapper}>
        <View style={styles.labelSpacer} />
        <Pressable onPress={onRemove} hitSlop={10} style={styles.trash}>
          <Trash2 size={18} color={colors.error} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
    gap: GAP,
  },

  language: {
    flexGrow: 1.2,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },

  level: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
  },

  trashWrapper: {
    width: TRASH_SIZE,
    alignItems: "center",
  },

  labelSpacer: {
    height: LABEL_HEIGHT,
    marginBottom: 4,
  },

  trash: {
    width: TRASH_SIZE,
    height: TRASH_SIZE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
