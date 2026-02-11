import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Plus, Trash2, Edit } from "lucide-react-native";
import { BaseModal } from "@/components/ui/modals/BaseModal";
import { ModalFooterActions } from "@/components/ui/modals/ModalFooterActions";
import { IconButton } from "@/components/ui/IconButton";
import { colors, spacing, typography } from "@/theme";
import type { ProfileData, Skill } from "@/screens/profile/types";
import { useEditSkillsForm } from "@/screens/profile/hooks/useEditSkillsForm";
import { SkillsPreview } from "./skills/SkillsPreview";
import { SkillEditModal } from "./skills/SkillEditModal";

type Option = { id: string; label: string };

const CATEGORY_OPTIONS: Option[] = [
  { id: "Other", label: "Soporte" },
  { id: "Technical", label: "Tecnología" },
  { id: "Soft", label: "Blandas" },
];

const LEVEL_OPTIONS: Option[] = [
  { id: "Beginner", label: "Principiante" },
  { id: "Intermediate", label: "Intermedio" },
  { id: "Advanced", label: "Avanzado" },
  { id: "Expert", label: "Experto" },
];

const DEFAULT_CATEGORY: Skill["category"] = "Technical";
const DEFAULT_LEVEL: NonNullable<Skill["level"]> = "Beginner";

type EditModalState = { mode: "add" } | { mode: "edit"; id: string } | null;

type Props = {
  visible: boolean;
  profile: ProfileData;
  onClose: () => void;
  onSave: (skills: Skill[]) => Promise<boolean>;
  isSaving?: boolean;
};

export const EditSkillsInfoModal: React.FC<Props> = ({
  visible,
  profile,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const form = useEditSkillsForm(profile);
  const [editModal, setEditModal] = useState<EditModalState>(null);

  useEffect(() => {
    if (visible) form.reset();
    if (!visible) setEditModal(null);
  }, [visible]);

  const onPressSave = async () => {
    if (!form.validate()) return;

    const next: Skill[] = form.skills.map((s) => ({
      id: s.id,
      name: s.name,
      level: s.level,
      category: s.category,
      categoryId: s.categoryId,
      verified: true,
    }));

    const saved = await onSave(next);
    if (saved) onClose();
  };

  const editInitial = useMemo(() => {
    if (editModal?.mode === "edit") {
      const current = form.skills.find((s) => s.id === editModal.id);
      if (current) {
        return {
          category: current.category,
          name: current.name,
          level: current.level,
        };
      }
    }

    return {
      category: DEFAULT_CATEGORY,
      name: "",
      level: DEFAULT_LEVEL,
    };
  }, [editModal, form.skills]);

  const onSaveSkill = (draft: {
    category: Skill["category"];
    name: string;
    level: NonNullable<Skill["level"]>;
  }) => {
    if (!editModal) return;

    if (editModal.mode === "add") {
      form.addSkill(draft);
    } else {
      form.updateSkill(editModal.id, draft);
    }

    setEditModal(null);
  };

  return (
    <>
      <BaseModal
        visible={visible}
        title="Editar habilidades"
        onClose={onClose}
        footer={
          <ModalFooterActions
            onCancel={onClose}
            onSave={onPressSave}
            saveLabel={isSaving ? "Guardando..." : "Guardar"}
            disabled={isSaving}
          />
        }
      >
        <Text style={styles.helper}>
          Agrega tus habilidades organizadas por categoría.
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Habilidades</Text>

          <Pressable
            onPress={() => setEditModal({ mode: "add" })}
            style={styles.addBtn}
            hitSlop={10}
          >
            <Plus size={16} color={colors.white} />
            <Text style={styles.addText}>Agregar habilidad</Text>
          </Pressable>
        </View>

        {!!form.errors.skills && (
          <Text style={styles.errorText}>{form.errors.skills}</Text>
        )}

        {form.skills.length === 0 && (
          <Text style={styles.emptyText}>
            Aún no hay habilidades agregadas.
          </Text>
        )}

        {form.skills.map((s) => (
          <View key={s.id} style={styles.skillItem}>
            <View style={styles.skillInfo}>
              <Text style={styles.skillName}>{s.name || "Sin nombre"}</Text>
              <Text style={styles.skillMeta}>
                {CATEGORY_OPTIONS.find((o) => o.id === s.category)?.label} ·{" "}
                {LEVEL_OPTIONS.find((o) => o.id === s.level)?.label}
              </Text>
            </View>

            <View style={styles.skillActions}>
              <IconButton
                onPress={() => setEditModal({ mode: "edit", id: s.id })}
                size={32}
              >
                <Edit size={16} color={colors.textColors.secondary} />
              </IconButton>

              <IconButton onPress={() => form.removeSkill(s.id)} size={32}>
                <Trash2 size={16} color={colors.error} />
              </IconButton>
            </View>
          </View>
        ))}

        <SkillsPreview
          skills={form.skills.filter((s) => s.name.trim().length > 0)}
        />
      </BaseModal>

      <SkillEditModal
        visible={!!editModal}
        title={
          editModal?.mode === "edit" ? "Editar habilidad" : "Agregar habilidad"
        }
        initial={editInitial}
        categoryOptions={CATEGORY_OPTIONS}
        levelOptions={LEVEL_OPTIONS}
        onClose={() => setEditModal(null)}
        onSave={onSaveSkill}
      />
    </>
  );
};

const styles = StyleSheet.create({
  helper: {
    ...typography.bodySmall,
    color: colors.textColors.secondary,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textColors.secondary,
    fontWeight: "700",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.emerald600,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  addText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: "700",
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.bodySmall,
    color: colors.textColors.tertiary,
    marginBottom: spacing.sm,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  skillInfo: {
    flex: 1,
    minWidth: 0,
  },
  skillName: {
    ...typography.bodySmall,
    color: colors.textColors.primary,
    fontWeight: "700",
  },
  skillMeta: {
    ...typography.caption,
    color: colors.textColors.secondary,
    marginTop: 2,
  },
  skillActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
});
