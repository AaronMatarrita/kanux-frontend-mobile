import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Alert } from "react-native";
import {
  profilesService,
  type Catalogs,
  type Language as ApiLanguage,
} from "@/services/profiles.service";
import type { LanguageLevel, OpportunityStatus, ProfileData } from "../types";

type SetProfile = Dispatch<SetStateAction<ProfileData | null>>;

type UseProfileEditsReturn = {
  isSavingAbout: boolean;
  saveAbout: (about: string) => Promise<boolean>;
  isSavingBasicInfo: boolean;
  saveBasicInfo: (payload: BasicInfoPayload) => Promise<boolean>;
};

type BasicInfoPayload = {
  experienceLevel: string;
  education: string;
  opportunityStatus: OpportunityStatus;
  languages: {
    id: string;
    name: string;
    level: LanguageLevel;
    languageId?: string;
  }[];
};

const splitFullName = (fullName?: string) => {
  const trimmed = (fullName ?? "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };

  const parts = trimmed.split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
};

const normalizeText = (value?: string) =>
  (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const mapOpportunityStatusId = (
  status: OpportunityStatus,
  catalogs?: Catalogs | null,
) => {
  const options = catalogs?.opportunity_statuses ?? [];
  const findByKeyword = (keyword: string) =>
    options.find((item) => normalizeText(item.name).includes(keyword))?.id;

  if (status === "FreelanceOnly") return findByKeyword("freelance");
  if (status === "OpenToWork") {
    return (
      findByKeyword("disponible") ??
      findByKeyword("open") ??
      findByKeyword("oportun")
    );
  }

  return (
    findByKeyword("no disponible") ??
    findByKeyword("no") ??
    findByKeyword("not")
  );
};

const mapEducationId = (education: string, catalogs?: Catalogs | null) => {
  const options = catalogs?.learning_backgrounds ?? [];
  const normalized = normalizeText(education);

  if (!normalized) return undefined;
  if (normalized.includes("university") || normalized.includes("univers")) {
    return options.find((item) => normalizeText(item.name).includes("univers"))
      ?.id;
  }
  if (normalized.includes("self") || normalized.includes("autodidact")) {
    return options.find((item) =>
      normalizeText(item.name).includes("autodidact"),
    )?.id;
  }
  if (normalized.includes("bootcamp")) {
    return options.find((item) => normalizeText(item.name).includes("bootcamp"))
      ?.id;
  }

  return options.find((item) => normalizeText(item.name) === normalized)?.id;
};

const mapLanguageLevelToApi = (level: LanguageLevel) => {
  switch (level) {
    case "Basic":
      return "Básico";
    case "Intermediate":
      return "Intermedio";
    case "Advanced":
    case "Native":
    default:
      return "Avanzado";
  }
};

const mapLanguageLevelToProfile = (level?: string): LanguageLevel => {
  const normalized = normalizeText(level);
  if (normalized.includes("basico")) return "Basic";
  if (normalized.includes("intermedio")) return "Intermediate";
  if (normalized.includes("avanzado")) return "Advanced";
  return "Intermediate";
};

const mapApiLanguage = (language: ApiLanguage) => ({
  id: language.id,
  name: language.languages?.name ?? "",
  level: mapLanguageLevelToProfile(language.level),
  languageId: language.id_languages ?? language.languages?.id,
});

export function useProfileEdits(
  profile: ProfileData | null,
  catalogs: Catalogs | null,
  setProfile: SetProfile,
): UseProfileEditsReturn {
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [isSavingBasicInfo, setIsSavingBasicInfo] = useState(false);

  const saveAbout = useCallback(
    async (about: string) => {
      if (isSavingAbout) return false;

      const nextAbout = about.trim();
      const nameFallback = splitFullName(profile?.basicInfo.fullName);
      const firstName = profile?.firstName ?? nameFallback.firstName;
      const lastName = profile?.lastName ?? nameFallback.lastName;

      setIsSavingAbout(true);
      try {
        const updated = await profilesService.updateMyProfile({
          first_name: firstName,
          last_name: lastName,
          about: nextAbout,
        });

        setProfile((prev) =>
          prev
            ? {
                ...prev,
                about: updated.about ?? nextAbout,
                completion: {
                  percentage:
                    updated.profile_completeness ?? prev.completion.percentage,
                },
              }
            : prev,
        );

        return true;
      } catch (saveError) {
        const message =
          saveError instanceof Error
            ? saveError.message
            : "No se pudo guardar la descripcion.";
        Alert.alert("Error", message);
        return false;
      } finally {
        setIsSavingAbout(false);
      }
    },
    [
      isSavingAbout,
      profile?.basicInfo.fullName,
      profile?.firstName,
      profile?.lastName,
      setProfile,
    ],
  );

  const saveBasicInfo = useCallback(
    async (payload: BasicInfoPayload) => {
      if (isSavingBasicInfo || !profile) return false;

      const nameFallback = splitFullName(profile.basicInfo.fullName);
      const firstName = profile.firstName ?? nameFallback.firstName;
      const lastName = profile.lastName ?? nameFallback.lastName;
      const learningBackgroundId = mapEducationId(payload.education, catalogs);
      const opportunityStatusId = mapOpportunityStatusId(
        payload.opportunityStatus,
        catalogs,
      );

      const currentLanguages = profile.languages ?? [];
      const toCreate = payload.languages.filter((l) => l.id.startsWith("tmp-"));
      const toDelete = currentLanguages.filter(
        (orig) => !payload.languages.some((curr) => curr.id === orig.id),
      );
      const toUpdate = payload.languages.filter((curr) => {
        if (curr.id.startsWith("tmp-")) return false;
        const original = currentLanguages.find((orig) => orig.id === curr.id);
        return (
          original &&
          (original.languageId !== curr.languageId ||
            original.level !== curr.level)
        );
      });

      setIsSavingBasicInfo(true);
      try {
        const [updatedProfile, createdLanguages, updatedLanguages] =
          await Promise.all([
            profilesService.updateMyProfile({
              first_name: firstName,
              last_name: lastName,
              experience_level: payload.experienceLevel,
              learning_background_id: learningBackgroundId,
              opportunity_status_id: opportunityStatusId,
            }),
            Promise.all(
              toCreate.map((lang) =>
                profilesService.addLanguage({
                  language_id: lang.languageId ?? "",
                  level: mapLanguageLevelToApi(lang.level),
                }),
              ),
            ),
            Promise.all(
              toUpdate.map((lang) =>
                profilesService.updateLanguage(lang.id, {
                  language_id: lang.languageId ?? "",
                  level: mapLanguageLevelToApi(lang.level),
                }),
              ),
            ),
          ]);

        await Promise.all(
          toDelete.map((lang) => profilesService.deleteLanguage(lang.id)),
        );

        const createdMap = new Map<string, ReturnType<typeof mapApiLanguage>>();
        const createdMapped = createdLanguages.map(mapApiLanguage);
        toCreate.forEach((draft, index) => {
          const mapped = createdMapped[index];
          if (mapped) createdMap.set(draft.id, mapped);
        });

        const updatedMapped = updatedLanguages.map(mapApiLanguage);
        const updatedById = new Map(
          updatedMapped.map((lang) => [lang.id, lang]),
        );

        const nextLanguages = payload.languages.flatMap((draft) => {
          if (draft.id.startsWith("tmp-")) {
            const created = createdMap.get(draft.id);
            if (created && created.name) return [created];
            return [
              {
                id: draft.id,
                name: draft.name,
                level: draft.level,
                languageId: draft.languageId,
              },
            ];
          }

          const updated = updatedById.get(draft.id);
          if (updated && updated.name) return [updated];

          return [
            {
              id: draft.id,
              name: draft.name,
              level: draft.level,
              languageId: draft.languageId,
            },
          ];
        });

        setProfile((prev) =>
          prev
            ? {
                ...prev,
                basicInfo: {
                  ...prev.basicInfo,
                  experienceLevel: payload.experienceLevel,
                  education: payload.education,
                },
                opportunityStatus: payload.opportunityStatus,
                languages: nextLanguages,
                completion: {
                  percentage:
                    updatedProfile.profile_completeness ??
                    prev.completion.percentage,
                },
              }
            : prev,
        );

        return true;
      } catch (saveError) {
        const message =
          saveError instanceof Error
            ? saveError.message
            : "No se pudo actualizar la informacion basica.";
        Alert.alert("Error", message);
        return false;
      } finally {
        setIsSavingBasicInfo(false);
      }
    },
    [catalogs, isSavingBasicInfo, profile, setProfile],
  );

  return {
    isSavingAbout,
    saveAbout,
    isSavingBasicInfo,
    saveBasicInfo,
  };
}
