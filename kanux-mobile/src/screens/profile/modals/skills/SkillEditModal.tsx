import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { BaseModal } from "@/components/ui/modals/BaseModal";
import { ModalFooterActions } from "@/components/ui/modals/ModalFooterActions";
import { OptionsModal } from "@/components/ui/modals/OptionsModal";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { colors, spacing } from "@/theme";
import type { Skill } from "@/screens/profile/types";

type Option = { id: string; label: string };

type Draft = {
  category: Skill["category"];
  name: string;
  level: NonNullable<Skill["level"]>;
};

type PickerKey = "category" | "level" | null;

type Props = {
  visible: boolean;
  title: string;
  initial: Draft;
  categoryOptions: Option[];
  levelOptions: Option[];
  onClose: () => void;
  onSave: (draft: Draft) => void;
};

export const SkillEditModal: React.FC<Props> = ({
  visible,
  title,
  initial,
  categoryOptions,
  levelOptions,
  onClose,
  onSave,
}) => {
  const [draft, setDraft] = useState<Draft>(initial);
  const [picker, setPicker] = useState<PickerKey>(null);

  useEffect(() => {
    if (visible) setDraft(initial);
  }, [visible, initial]);

  const categoryLabel = useMemo(
    () => categoryOptions.find((o) => o.id === draft.category)?.label,
    [categoryOptions, draft.category],
  );

  const levelLabel = useMemo(
    () => levelOptions.find((o) => o.id === draft.level)?.label,
    [levelOptions, draft.level],
  );

  const canSave = draft.name.trim().length > 0;

  return (
    <>
      <BaseModal
        visible={visible}
        title={title}
        onClose={onClose}
        footer={
          <ModalFooterActions
            onCancel={onClose}
            onSave={() => onSave({ ...draft, name: draft.name.trim() })}
            disabled={!canSave}
          />
        }
      >
        <SelectField
          label="Categoría *"
          valueLabel={categoryLabel}
          onPress={() => setPicker("category")}
        />

        <TextField
          label="Habilidad *"
          value={draft.name}
          onChangeText={(value) =>
            setDraft((prev) => ({ ...prev, name: value }))
          }
          placeholder="Ej. SQL Server"
          variant="light"
          containerStyle={styles.inputBlock}
          inputWrapStyle={styles.inputWrap}
        />

        <SelectField
          label="Nivel *"
          valueLabel={levelLabel}
          onPress={() => setPicker("level")}
        />
      </BaseModal>

      <OptionsModal
        visible={picker === "category"}
        title="Categoría"
        options={categoryOptions}
        selectedId={draft.category}
        onClose={() => setPicker(null)}
        onSelect={(id) =>
          setDraft((prev) => ({ ...prev, category: id as Skill["category"] }))
        }
      />

      <OptionsModal
        visible={picker === "level"}
        title="Nivel"
        options={levelOptions}
        selectedId={draft.level}
        onClose={() => setPicker(null)}
        onSelect={(id) =>
          setDraft((prev) => ({
            ...prev,
            level: id as NonNullable<Skill["level"]>,
          }))
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputBlock: {
    marginBottom: spacing.md,
  },
  inputWrap: {
    backgroundColor: colors.white,
  },
});
