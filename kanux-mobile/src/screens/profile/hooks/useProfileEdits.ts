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
  type Skill as ApiSkill,
} from "@/services/profiles.service";
import type {
  LanguageLevel,
  OpportunityStatus,
  ProfileData,
  Skill as ProfileSkill,
  ProfileContact,
} from "../types";

type SetProfile = Dispatch<SetStateAction<ProfileData | null>>;

type UseProfileEditsReturn = {
  isSavingAbout: boolean;
  saveAbout: (about: string) => Promise<boolean>;
  isSavingBasicInfo: boolean;
  saveBasicInfo: (payload: BasicInfoPayload) => Promise<boolean>;
  isSavingHeader: boolean;
  saveHeader: (payload: HeaderPayload) => Promise<boolean>;
  isSavingSkills: boolean;
  saveSkills: (skills: ProfileSkill[]) => Promise<boolean>;
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

type HeaderPayload = {
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

const mapSkillLevelToApi = (level?: ProfileSkill["level"]) => {
  if (!level) return undefined;
  const normalized = normalizeText(level);
  if (normalized.includes("beginner")) return "beginner" as const;
  if (normalized.includes("intermediate")) return "intermediate" as const;
  if (normalized.includes("advanced")) return "advanced" as const;
  if (normalized.includes("expert")) return "expert" as const;
  return undefined;
};

const mapSkillLevelToProfile = (level?: string): ProfileSkill["level"] => {
  const normalized = normalizeText(level);
  if (normalized.includes("beginner")) return "Beginner";
  if (normalized.includes("intermediate")) return "Intermediate";
  if (normalized.includes("advanced")) return "Advanced";
  if (normalized.includes("expert")) return "Expert";
  return undefined;
};

const mapSkillCategory = (skill: ApiSkill): ProfileSkill["category"] => {
  const normalized = normalizeText(
    skill.category?.type_category ?? skill.category?.name,
  );
  if (normalized.includes("soft") || normalized.includes("bland"))
    return "Soft";
  if (normalized.includes("tech") || normalized.includes("tecn")) {
    return "Technical";
  }
  return "Other";
};

const mapCategoryId = (
  category: ProfileSkill["category"],
  catalogs?: Catalogs | null,
) => {
  const options = catalogs?.categories ?? [];
  const normalized = (value?: string) => normalizeText(value);

  if (category === "Soft") {
    return options.find((item) => {
      const name = normalized(item.name);
      return name.includes("soft") || name.includes("bland");
    })?.id;
  }

  if (category === "Technical") {
    return options.find((item) => {
      const name = normalized(item.name);
      return name.includes("tech") || name.includes("tecn");
    })?.id;
  }

  return options.find((item) => {
    const name = normalized(item.name);
    return (
      name.includes("other") ||
      name.includes("otro") ||
      name.includes("soporte")
    );
  })?.id;
};

const mapApiLanguage = (language: ApiLanguage) => ({
  id: language.id,
  name: language.languages?.name ?? "",
  level: mapLanguageLevelToProfile(language.level),
  languageId: language.id_languages ?? language.languages?.id,
});

const mapApiSkill = (
  skill: ApiSkill,
  fallback?: ProfileSkill,
): ProfileSkill => {
  return {
    id: String(skill.id),
    name: skill.name ?? fallback?.name ?? "",
    level: mapSkillLevelToProfile(skill.level) ?? fallback?.level,
    category: mapSkillCategory(skill) ?? fallback?.category ?? "Other",
    categoryId: skill.id_category ?? skill.category?.id ?? fallback?.categoryId,
    verified: true,
  };
};

const contactsToRecord = (contacts: ProfileContact[]) => {
  return contacts.reduce<Record<string, string>>((acc, contact) => {
    const value = contact.value.trim();
    if (!value) return acc;
    acc[normalizeText(contact.type)] = value;
    return acc;
  }, {});
};

export function useProfileEdits(
  profile: ProfileData | null,
  catalogs: Catalogs | null,
  setProfile: SetProfile,
): UseProfileEditsReturn {
  const [isSavingAbout, setIsSavingAbout] = useState(false);
  const [isSavingBasicInfo, setIsSavingBasicInfo] = useState(false);
  const [isSavingHeader, setIsSavingHeader] = useState(false);
  const [isSavingSkills, setIsSavingSkills] = useState(false);

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

  const saveHeader = useCallback(
    async (payload: HeaderPayload) => {
      if (isSavingHeader) return false;

      setIsSavingHeader(true);
      try {
        const baseUpdate = {
          first_name: payload.firstName.trim(),
          last_name: payload.lastName.trim(),
          title: payload.headline.trim(),
          location: payload.location.trim(),
          contact: contactsToRecord(payload.contacts),
        };

        let updated = null as Awaited<
          ReturnType<typeof profilesService.updateMyProfile>
        > | null;

        let imageUrlFromUpload: string | undefined;

        if (payload.avatarFile) {
          const imageUpdated = await profilesService.updateMyProfile({
            ...baseUpdate,
            contact: undefined,
            image_profile: payload.avatarFile,
          });

          imageUrlFromUpload = imageUpdated.image_url ?? undefined;

          updated = await profilesService.updateMyProfileJson(baseUpdate);

          if (!updated.image_url && imageUpdated.image_url) {
            updated = { ...updated, image_url: imageUpdated.image_url };
          }
        } else {
          updated = await profilesService.updateMyProfileJson(baseUpdate);
        }

        const finalAvatarUrl =
          updated.image_url ?? imageUrlFromUpload ?? payload.avatarUrl;

        setProfile((prev) =>
          prev
            ? {
                ...prev,
                firstName: updated.first_name ?? payload.firstName,
                lastName: updated.last_name ?? payload.lastName,
                avatarUrl: finalAvatarUrl,
                basicInfo: {
                  ...prev.basicInfo,
                  fullName: `${payload.firstName} ${payload.lastName}`.trim(),
                  headline: updated.title ?? payload.headline,
                  location: updated.location ?? payload.location,
                  website:
                    payload.contacts.find((c) => c.type === "Website")?.value ??
                    prev.basicInfo.website,
                },
                contacts: payload.contacts,
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
            : "No se pudo actualizar la informacion del perfil.";
        Alert.alert("Error", message);
        return false;
      } finally {
        setIsSavingHeader(false);
      }
    },
    [isSavingHeader, setProfile],
  );

  const saveSkills = useCallback(
    async (skills: ProfileSkill[]) => {
      if (isSavingSkills || !profile) return false;

      const currentSkills = profile.skills ?? [];
      const toCreate = skills.filter((s) => s.id.startsWith("tmp-"));
      const toDelete = currentSkills.filter(
        (orig) => !skills.some((curr) => curr.id === orig.id),
      );
      const toUpdate = skills.filter((curr) => {
        if (curr.id.startsWith("tmp-")) return false;
        const original = currentSkills.find((orig) => orig.id === curr.id);
        if (!original) return false;
        return (
          original.name !== curr.name ||
          original.level !== curr.level ||
          original.category !== curr.category ||
          original.categoryId !== curr.categoryId
        );
      });

      setIsSavingSkills(true);
      try {
        const [createdSkills, updatedSkills] = await Promise.all([
          Promise.all(
            toCreate.map((skill) =>
              profilesService.addSkill({
                category_id:
                  mapCategoryId(skill.category, catalogs) ??
                  skill.categoryId ??
                  "",
                name: skill.name,
                level: mapSkillLevelToApi(skill.level),
              }),
            ),
          ),
          Promise.all(
            toUpdate.map((skill) =>
              profilesService.updateSkill(skill.id, {
                category_id:
                  mapCategoryId(skill.category, catalogs) ?? skill.categoryId,
                name: skill.name,
                level: mapSkillLevelToApi(skill.level),
              }),
            ),
          ),
        ]);

        await Promise.all(
          toDelete.map((skill) => profilesService.deleteSkill(skill.id)),
        );

        const createdMap = new Map<string, ProfileSkill>();
        toCreate.forEach((draft, index) => {
          const mapped = createdSkills[index]
            ? mapApiSkill(createdSkills[index], draft)
            : undefined;
          if (mapped) createdMap.set(draft.id, mapped);
        });

        const updatedMap = new Map(
          updatedSkills.map((skill) => [
            String(skill.id),
            mapApiSkill(
              skill,
              skills.find((s) => s.id === String(skill.id)),
            ),
          ]),
        );

        const nextSkills = skills.flatMap((draft) => {
          if (draft.id.startsWith("tmp-")) {
            const created = createdMap.get(draft.id);
            return created ? [created] : [draft];
          }

          const updated = updatedMap.get(draft.id);
          return updated ? [updated] : [draft];
        });

        setProfile((prev) =>
          prev
            ? {
                ...prev,
                skills: nextSkills,
                summary: {
                  ...prev.summary,
                  skillsVerified: nextSkills.length,
                },
              }
            : prev,
        );

        return true;
      } catch (saveError) {
        const message =
          saveError instanceof Error
            ? saveError.message
            : "No se pudieron actualizar las habilidades.";
        Alert.alert("Error", message);
        return false;
      } finally {
        setIsSavingSkills(false);
      }
    },
    [catalogs, isSavingSkills, profile, setProfile],
  );

  return {
    isSavingAbout,
    saveAbout,
    isSavingBasicInfo,
    saveBasicInfo,
    isSavingHeader,
    saveHeader,
    isSavingSkills,
    saveSkills,
  };
}
