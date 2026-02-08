import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Trash2 } from "lucide-react-native";
import { colors, spacing } from "@/theme";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";

type Props = {
  categoryLabel?: string;
  skillValue: string;
  levelLabel?: string;

  onPickCategory: () => void;
  onChangeSkill: (value: string) => void;
  onPickLevel: () => void;
  onRemove: () => void;
};

const TRASH_SIZE = 32;
const GAP = spacing.sm;
const LABEL_HEIGHT = 18;

export const SkillRow: React.FC<Props> = ({
  categoryLabel,
  skillValue,
  levelLabel,
  onPickCategory,
  onChangeSkill,
  onPickLevel,
  onRemove,
}) => {
  return (
    <View style={styles.block}>
      {/* Row 1: category + delete */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <SelectField
            label="Categoría"
            valueLabel={categoryLabel}
            onPress={onPickCategory}
          />
        </View>

        <View style={styles.trashWrapper}>
          <View style={styles.labelSpacer} />
          <Pressable onPress={onRemove} hitSlop={10} style={styles.trash}>
            <Trash2 size={18} color={colors.error} />
          </Pressable>
        </View>
      </View>

      {/* Row 2: skill input */}
      <TextField
        label="Habilidad"
        value={skillValue}
        onChangeText={onChangeSkill}
        placeholder="Ej. SQL Server"
        variant="light"
        containerStyle={styles.inputBlock}
        inputWrapStyle={styles.inputWrap}
      />

      {/* Row 3: level */}
      <SelectField
        label="Nivel"
        valueLabel={levelLabel}
        onPress={onPickLevel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
    gap: GAP,
  },
  cell: {
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
  inputBlock: {
    marginBottom: spacing.sm,
  },
  inputWrap: {
    backgroundColor: colors.white,
  },
});
