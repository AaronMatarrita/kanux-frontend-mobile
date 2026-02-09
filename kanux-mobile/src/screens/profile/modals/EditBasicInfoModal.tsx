import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Plus } from "lucide-react-native";
import { BaseModal } from "@/components/ui/modals/BaseModal";
import { ModalFooterActions } from "@/components/ui/modals/ModalFooterActions";
import { SelectField } from "@/components/ui/SelectField";
import { OptionsModal } from "@/components/ui/modals/OptionsModal";
import { colors, spacing, typography } from "@/theme";
import type {
  ProfileData,
  OpportunityStatus,
  LanguageLevel,
} from "@/screens/profile/types";
import { useEditBasicInfoForm } from "@/screens/profile/hooks/useEditBasicInfoForm";
import { LanguageRow } from "./basicInfo/LanguageRow";

type Option = { id: string; label: string };

const EXPERIENCE_LEVELS: Option[] = [
  { id: "Beginner", label: "Principiante" },
  { id: "Intermediate", label: "Intermedio" },
  { id: "Advanced", label: "Avanzado" },
  { id: "Expert", label: "Experto" },
];

const LANGUAGE_LEVELS: Option[] = [
  { id: "Basic", label: "Básico" },
  { id: "Intermediate", label: "Intermedio" },
  { id: "Advanced", label: "Avanzado" },
  { id: "Native", label: "Nativo" },
];

const OPPORTUNITY: Option[] = [
  { id: "OpenToWork", label: "Disponible" },
  { id: "FreelanceOnly", label: "Solo freelance" },
  { id: "NotAvailable", label: "No disponible" },
];

const EDUCATION: Option[] = [
  { id: "University", label: "Universitario" },
  { id: "SelfTaught", label: "Autodidacta" },
  { id: "Bootcamp", label: "Bootcamp" },
];

type PickerKey = "experience" | "education" | "opportunity" | null;

type Props = {
  visible: boolean;
  profile: ProfileData;
  onClose: () => void;
  onSave: (next: {
    experienceLevel: string;
    education: string;
    opportunityStatus: OpportunityStatus;
    languages: {
      id: string;
      name: string;
      level: LanguageLevel;
      languageId?: string;
    }[];
  }) => Promise<boolean>;

  isSaving?: boolean;

  languageCatalog?: Option[];
};

export const EditBasicInfoModal: React.FC<Props> = ({
  visible,
  profile,
  onClose,
  onSave,
  isSaving = false,
  languageCatalog,
}) => {
  const form = useEditBasicInfoForm(profile);

  const [picker, setPicker] = useState<PickerKey>(null);

  const [langPickerFor, setLangPickerFor] = useState<string | null>(null);
  const [levelPickerFor, setLevelPickerFor] = useState<string | null>(null);

  const languageOptions = useMemo<Option[]>(
    () =>
      languageCatalog ?? [
        { id: "Inglés", label: "Inglés" },
        { id: "Español", label: "Español" },
        { id: "Francés", label: "Francés" },
      ],
    [languageCatalog],
  );

  useEffect(() => {
    if (visible) form.reset();
  }, [visible]);

  const onPressSave = async () => {
    if (!form.validate()) return;

    const saved = await onSave({
      experienceLevel: form.draft.experienceLevel,
      education: form.draft.education,
      opportunityStatus: form.draft.opportunityStatus,
      languages: form.draft.languages.map((l) => ({
        id: l.id,
        name: l.name,
        level: l.level,
        languageId: l.languageId,
      })),
    });

    if (saved) onClose();
  };

  const experienceLabel = form.draft.experienceLevel || undefined;
  const educationLabel = form.draft.education || undefined;
  const oppLabel = OPPORTUNITY.find(
    (o) => o.id === form.draft.opportunityStatus,
  )?.label;

  return (
    <>
      <BaseModal
        visible={visible}
        title="Editar información básica"
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
        {/* Experiencia */}
        <SelectField
          label="Nivel de experiencia *"
          valueLabel={
            EXPERIENCE_LEVELS.find((o) => o.id === experienceLabel)?.label
          }
          error={form.errors.experienceLevel}
          onPress={() => setPicker("experience")}
        />

        {/* Idiomas */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Idiomas *</Text>

          <Pressable
            onPress={form.addLanguage}
            style={styles.addBtn}
            hitSlop={10}
          >
            <Plus size={16} color={colors.white} />
            <Text style={styles.addText}>Agregar</Text>
          </Pressable>
        </View>

        {!!form.errors.languages && (
          <Text style={styles.errorText}>{form.errors.languages}</Text>
        )}

        {form.draft.languages.map((l) => (
          <LanguageRow
            key={l.id}
            item={l}
            languageOptions={languageOptions}
            levelOptions={LANGUAGE_LEVELS}
            languageLabel={l.name || undefined}
            levelLabel={LANGUAGE_LEVELS.find((x) => x.id === l.level)?.label}
            onPickLanguage={() => setLangPickerFor(l.id)}
            onPickLevel={() => setLevelPickerFor(l.id)}
            onRemove={() => form.removeLanguage(l.id)}
          />
        ))}

        {/* Formacion */}
        <SelectField
          label="Formación *"
          placeholder=""
          valueLabel={EDUCATION.find((o) => o.id === educationLabel)?.label}
          error={form.errors.education}
          onPress={() => setPicker("education")}
        />

        {/* Disponibilidad */}
        <SelectField
          label="Disponible para oportunidades *"
          valueLabel={oppLabel}
          error={form.errors.opportunityStatus}
          onPress={() => setPicker("opportunity")}
        />
      </BaseModal>

      {/* Pickers */}
      <OptionsModal
        visible={picker === "experience"}
        title="Nivel de experiencia"
        options={EXPERIENCE_LEVELS}
        selectedId={form.draft.experienceLevel}
        onClose={() => setPicker(null)}
        onSelect={(id) => form.setExperienceLevel(id)}
      />

      <OptionsModal
        visible={picker === "education"}
        title="Formación"
        options={EDUCATION}
        selectedId={form.draft.education}
        onClose={() => setPicker(null)}
        onSelect={(id) => form.setEducation(id)}
      />

      <OptionsModal
        visible={picker === "opportunity"}
        title="Disponible para oportunidades"
        options={OPPORTUNITY}
        selectedId={form.draft.opportunityStatus}
        onClose={() => setPicker(null)}
        onSelect={(id) => form.setOpportunityStatus(id as OpportunityStatus)}
      />

      {/* Language pickers */}
      <OptionsModal
        visible={!!langPickerFor}
        title="Idioma"
        options={languageOptions}
        selectedId={
          form.draft.languages.find((x) => x.id === langPickerFor)?.languageId
        }
        onClose={() => setLangPickerFor(null)}
        onSelect={(id) => {
          if (!langPickerFor) return;
          const selected = languageOptions.find((o) => o.id === id);
          form.updateLanguage(langPickerFor, {
            name: selected?.label ?? "",
            languageId: id,
          });
        }}
      />

      <OptionsModal
        visible={!!levelPickerFor}
        title="Nivel"
        options={LANGUAGE_LEVELS}
        selectedId={
          form.draft.languages.find((x) => x.id === levelPickerFor)?.level
        }
        onClose={() => setLevelPickerFor(null)}
        onSelect={(id) => {
          if (!levelPickerFor) return;
          form.updateLanguage(levelPickerFor, { level: id as LanguageLevel });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
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
});
