import React from "react";
import { View, StyleSheet } from "react-native";
import { Trash2 } from "lucide-react-native";
import { colors, spacing } from "@/theme";
import { SelectField } from "@/components/ui/SelectField";
import { IconButton } from "@/components/ui/IconButton";
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
const LABEL_HEIGHT = 18;

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

      <View style={styles.trashWrapper}>
        <View style={styles.labelSpacer} />
        <IconButton onPress={onRemove} size={TRASH_SIZE}>
          <Trash2 size={18} color={colors.error} />
        </IconButton>
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
});
