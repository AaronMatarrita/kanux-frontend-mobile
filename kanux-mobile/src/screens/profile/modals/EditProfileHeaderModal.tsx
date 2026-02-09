import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Plus, Trash2, X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { BaseModal } from "@/components/ui/modals/BaseModal";
import { ModalFooterActions } from "@/components/ui/modals/ModalFooterActions";
import { OptionsModal } from "@/components/ui/modals/OptionsModal";
import { SelectField } from "@/components/ui/SelectField";
import { TextField } from "@/components/ui/TextField";
import { IconButton } from "@/components/ui/IconButton";
import { colors, spacing, typography, commonStyles } from "@/theme";
import type { ProfileContact, ProfileData, ContactType } from "../types";

type Option = { id: ContactType; label: string };

type DraftContact = ProfileContact;

type Draft = {
  avatarUrl?: string;
  avatarFile?: {
    uri: string;
    name: string;
    type: string;
  } | null;
  firstName: string;
  lastName: string;
  headline: string;
  location: string;
  contacts: DraftContact[];
};

type Props = {
  visible: boolean;
  profile: ProfileData;
  onClose: () => void;
  onSave: (next: {
    avatarUrl?: string;
    avatarFile?: {
      uri: string;
      name: string;
      type: string;
    } | null;
    firstName: string;
    lastName: string;
    headline: string;
    location: string;
    contacts: ProfileContact[];
  }) => Promise<boolean>;
  isSaving?: boolean;
};

const CONTACT_OPTIONS: Option[] = [
  { id: "Phone", label: "Teléfono" },
  { id: "WhatsApp", label: "WhatsApp" },
  { id: "LinkedIn", label: "LinkedIn" },
  { id: "GitHub", label: "GitHub" },
  { id: "Twitter", label: "Twitter" },
  { id: "Website", label: "Sitio Web" },
  { id: "Other", label: "Otro" },
];

function uid() {
  return `contact-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function splitName(fullName?: string) {
  const value = (fullName ?? "").trim();
  if (!value) return { firstName: "", lastName: "" };
  const parts = value.split(/\s+/);
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function normalizeContacts(profile: ProfileData): DraftContact[] {
  if (profile.contacts && profile.contacts.length > 0) return profile.contacts;

  if (profile.basicInfo.website) {
    return [
      {
        id: uid(),
        type: "Website",
        value: profile.basicInfo.website,
      },
    ];
  }

  return [];
}

const TRASH_SIZE = 32;
const LABEL_HEIGHT = 18;

export const EditProfileHeaderModal: React.FC<Props> = ({
  visible,
  profile,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const nameParts = splitName(profile.basicInfo.fullName);

  const initial = useMemo<Draft>(
    () => ({
      avatarUrl: profile.avatarUrl,
      avatarFile: null,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
      headline: profile.basicInfo.headline ?? "",
      location: profile.basicInfo.location ?? "",
      contacts: normalizeContacts(profile),
    }),
    [profile],
  );

  const [draft, setDraft] = useState<Draft>(initial);
  const [contactPickerFor, setContactPickerFor] = useState<string | null>(null);

  useEffect(() => {
    if (visible) setDraft(initial);
  }, [visible, initial]);

  const onAddContact = () => {
    setDraft((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { id: uid(), type: "Website", value: "" }],
    }));
  };

  const onRemoveContact = (id: string) => {
    setDraft((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((c) => c.id !== id),
    }));
  };

  const onUpdateContact = (id: string, patch: Partial<DraftContact>) => {
    setDraft((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) =>
        c.id === id ? { ...c, ...patch } : c,
      ),
    }));
  };

  const cleanedContacts = draft.contacts.filter(
    (c) => c.value.trim().length > 0,
  );

  const pickImage = async () => {
    try {
      if (Platform.OS !== "web") {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            "Permiso requerido",
            "Necesitamos acceso a tus fotos para seleccionar una imagen.",
          );
          return;
        }
      }

      const mediaTypes = ImagePicker.MediaTypeOptions.Images;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes,
        quality: 0.9,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      const fileName = asset.fileName ?? `avatar-${Date.now()}.jpg`;
      const fileType = asset.mimeType ?? "image/jpeg";

      setDraft((prev) => ({
        ...prev,
        avatarUrl: asset.uri,
        avatarFile: { uri: asset.uri, name: fileName, type: fileType },
      }));
    } catch (error) {
      console.error("Image picker error:", error);
      const message =
        error instanceof Error ? error.message : "No se pudo abrir la galeria.";
      Alert.alert("Error", message);
    }
  };

  const hasEmptyContacts = draft.contacts.some(
    (c) => c.value.trim().length === 0,
  );
  const contactError = hasEmptyContacts
    ? "Completa los contactos o elimina los que no uses."
    : "";
  const canSave =
    draft.firstName.trim().length > 0 &&
    draft.lastName.trim().length > 0 &&
    draft.headline.trim().length > 0 &&
    !hasEmptyContacts;

  return (
    <>
      <BaseModal
        visible={visible}
        title="Editar información de usuario"
        onClose={onClose}
        footer={
          <ModalFooterActions
            onCancel={onClose}
            onSave={async () => {
              const saved = await onSave({
                avatarUrl: draft.avatarUrl,
                avatarFile: draft.avatarFile ?? null,
                firstName: draft.firstName.trim(),
                lastName: draft.lastName.trim(),
                headline: draft.headline.trim(),
                location: draft.location.trim(),
                contacts: cleanedContacts,
              });
              if (saved) onClose();
            }}
            saveLabel={isSaving ? "Guardando..." : "Guardar"}
            disabled={!canSave || isSaving}
          />
        }
      >
        <View style={styles.photoBlock}>
          <Text style={styles.sectionTitle}>Foto de perfil</Text>
          <View style={styles.avatarWrap}>
            <Image
              source={{
                uri: draft.avatarUrl ?? "https://i.pravatar.cc/120",
              }}
              style={styles.avatar}
            />

            {!!draft.avatarUrl && (
              <Pressable
                onPress={() =>
                  setDraft((prev) => ({
                    ...prev,
                    avatarUrl: undefined,
                    avatarFile: null,
                  }))
                }
                style={[styles.avatarRemove, commonStyles.shadow]}
                hitSlop={10}
              >
                <X size={12} color={colors.white} />
              </Pressable>
            )}
          </View>

          <Pressable
            style={styles.changePhotoBtn}
            hitSlop={10}
            onPress={pickImage}
          >
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </Pressable>
          <Text style={styles.photoHint}>JPG, PNG o GIF. Máx 5MB</Text>
        </View>

        <TextField
          label="Nombre *"
          value={draft.firstName}
          onChangeText={(value) =>
            setDraft((prev) => ({ ...prev, firstName: value }))
          }
          variant="light"
          containerStyle={styles.inputBlock}
          inputWrapStyle={styles.inputWrap}
        />

        <TextField
          label="Apellidos *"
          value={draft.lastName}
          onChangeText={(value) =>
            setDraft((prev) => ({ ...prev, lastName: value }))
          }
          variant="light"
          containerStyle={styles.inputBlock}
          inputWrapStyle={styles.inputWrap}
        />

        <TextField
          label="Título profesional *"
          value={draft.headline}
          onChangeText={(value) =>
            setDraft((prev) => ({ ...prev, headline: value }))
          }
          variant="light"
          containerStyle={styles.inputBlock}
          inputWrapStyle={styles.inputWrap}
        />

        <TextField
          label="Ubicación"
          value={draft.location}
          onChangeText={(value) =>
            setDraft((prev) => ({ ...prev, location: value }))
          }
          variant="light"
          containerStyle={styles.inputBlock}
          inputWrapStyle={styles.inputWrap}
        />

        <View style={styles.contactsHeader}>
          <Text style={styles.sectionTitle}>Contactos</Text>
          <Pressable onPress={onAddContact} style={styles.addBtn} hitSlop={10}>
            <Plus size={16} color={colors.white} />
            <Text style={styles.addText}>Agregar contacto</Text>
          </Pressable>
        </View>

        {draft.contacts.map((c) => (
          <View key={c.id} style={styles.contactCard}>
            <SelectField
              label="Tipo de contacto"
              valueLabel={CONTACT_OPTIONS.find((o) => o.id === c.type)?.label}
              onPress={() => setContactPickerFor(c.id)}
            />

            <View style={styles.contactRow}>
              <View style={styles.contactInput}>
                <TextField
                  label=""
                  placeholder="Agregar contacto"
                  value={c.value}
                  onChangeText={(value) => onUpdateContact(c.id, { value })}
                  variant="light"
                  containerStyle={StyleSheet.flatten([
                    styles.inputBlock,
                    { marginBottom: 0 },
                  ])}
                  inputWrapStyle={styles.inputWrap}
                />
              </View>

              <View style={styles.trashWrapper}>
                <View style={styles.labelSpacer} />
                <IconButton
                  onPress={() => onRemoveContact(c.id)}
                  size={TRASH_SIZE}
                >
                  <Trash2 size={18} color={colors.error} />
                </IconButton>
              </View>
            </View>
          </View>
        ))}
        {!!contactError && (
          <Text style={styles.contactError}>{contactError}</Text>
        )}
      </BaseModal>

      <OptionsModal
        visible={!!contactPickerFor}
        title="Tipo de contacto"
        options={CONTACT_OPTIONS}
        selectedId={
          draft.contacts.find((x) => x.id === contactPickerFor)?.type ??
          "Website"
        }
        onClose={() => setContactPickerFor(null)}
        onSelect={(id) => {
          if (!contactPickerFor) return;
          onUpdateContact(contactPickerFor, { type: id as ContactType });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  photoBlock: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textColors.secondary,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  avatarWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarRemove: {
    position: "absolute",
    top: -6,
    right: "35%",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },
  changePhotoBtn: {
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.emerald600,
    marginBottom: spacing.xs,
  },
  changePhotoText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: "700",
  },
  photoHint: {
    ...typography.caption,
    color: colors.textColors.tertiary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  inputBlock: {
    marginBottom: spacing.sm,
  },
  inputWrap: {
    backgroundColor: colors.white,
  },
  contactsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
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
  contactCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  contactInput: {
    flex: 1,
  },
  trashWrapper: {
    width: TRASH_SIZE,
    alignItems: "center",
  },

  labelSpacer: {
    height: LABEL_HEIGHT,
    marginBottom: 4,
  },
  contactError: {
    ...typography.caption,
    color: colors.error,
    marginBottom: spacing.sm,
  },
});
