import { useCallback, useEffect, useMemo, useState } from "react";
import {
  profilesService,
  type Catalogs,
  type TalentProfile,
  type Skill as ApiSkill,
  type Language as ApiLanguage,
} from "@/services/profiles.service";
import type {
  ProfileContact,
  ProfileData,
  OpportunityStatus,
  Skill,
  Language,
  LanguageLevel,
} from "../types";

type LoadState = {
  loading: boolean;
  error: string | null;
};

const normalizeText = (value?: string) =>
  (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const mapOpportunityStatus = (value?: string): OpportunityStatus => {
  const normalized = normalizeText(value);
  if (!normalized) return "NotAvailable";
  if (normalized.includes("freelance")) return "FreelanceOnly";
  if (normalized.includes("open") || normalized.includes("oportun")) {
    return "OpenToWork";
  }
  if (normalized.includes("disponible")) return "OpenToWork";
  return "NotAvailable";
};

const mapExperienceLevel = (value?: string) => {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  if (normalized === "beginner") return "Beginner";
  if (normalized === "intermediate") return "Intermediate";
  if (normalized === "advanced") return "Advanced";
  if (normalized === "expert") return "Expert";
  return value ?? "";
};

const mapLanguageLevel = (value?: string): LanguageLevel => {
  const normalized = normalizeText(value);
  if (normalized.includes("basico")) return "Basic";
  if (normalized.includes("intermedio")) return "Intermediate";
  if (normalized.includes("avanzado")) return "Advanced";
  if (normalized.includes("native") || normalized.includes("nativo")) {
    return "Native";
  }
  return "Intermediate";
};

const mapSkillLevel = (value?: string): Skill["level"] => {
  const normalized = normalizeText(value);
  if (!normalized) return undefined;
  if (normalized === "beginner") return "Beginner";
  if (normalized === "intermediate") return "Intermediate";
  if (normalized === "advanced") return "Advanced";
  if (normalized === "expert") return "Expert";
  return undefined;
};

const mapSkillCategory = (skill: ApiSkill): Skill["category"] => {
  const normalized = normalizeText(
    skill.category?.type_category ?? skill.category?.name,
  );
  if (normalized.includes("soft")) return "Soft";
  if (normalized.includes("tech") || normalized.includes("tecn")) {
    return "Technical";
  }
  return "Other";
};

const mapContacts = (contact?: Record<string, unknown> | null) => {
  if (!contact) return [] as ProfileContact[];

  return Object.entries(contact)
    .map(([key, value]) => {
      const normalized = normalizeText(key);
      const type: ProfileContact["type"] = normalized.includes("whatsapp")
        ? "WhatsApp"
        : normalized.includes("linkedin")
          ? "LinkedIn"
          : normalized.includes("github")
            ? "GitHub"
            : normalized.includes("twitter")
              ? "Twitter"
              : normalized.includes("website") || normalized.includes("web")
                ? "Website"
                : normalized.includes("phone") ||
                    normalized.includes("telefono")
                  ? "Phone"
                  : "Other";

      return {
        id: `contact-${key}`,
        type,
        value: String(value ?? ""),
      } satisfies ProfileContact;
    })
    .filter((c) => c.value.length > 0);
};

const mapLanguages = (languages?: ApiLanguage[]): Language[] =>
  (languages ?? [])
    .map((item) => {
      const name = item.languages?.name ?? "";
      if (!name) return null;

      return {
        id: item.id,
        name,
        level: mapLanguageLevel(item.level),
      } satisfies Language;
    })
    .filter((item): item is Language => !!item);

const mapSkills = (skills?: ApiSkill[]): Skill[] =>
  (skills ?? []).map((skill) => ({
    id: String(skill.id),
    name: skill.name,
    level: mapSkillLevel(skill.level),
    category: mapSkillCategory(skill),
    verified: true,
  }));

const mapProfileData = (profile: TalentProfile): ProfileData => {
  const fullName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  const contacts = mapContacts(profile.contact);
  const rawWebsite =
    profile.contact && typeof profile.contact === "object"
      ? (profile.contact as Record<string, unknown>)["website"]
      : undefined;
  const website =
    contacts.find((c) => c.type === "Website")?.value ??
    (rawWebsite ? String(rawWebsite) : undefined);

  const skills = mapSkills(profile.skills);
  const languages = mapLanguages(profile.languages_talent);

  return {
    id: profile.id,
    avatarUrl: profile.image_url,
    completion: { percentage: profile.profile_completeness ?? 0 },
    about: profile.about ?? "",
    basicInfo: {
      fullName: fullName || "Talento",
      headline: profile.title ?? "",
      email: undefined,
      website: website || undefined,
      experienceLevel: mapExperienceLevel(profile.experience_level),
      education: profile.learning_backgrounds?.name ?? profile.education ?? "",
      location: profile.location ?? "",
    },
    opportunityStatus: mapOpportunityStatus(profile.opportunity_statuses?.name),
    languages,
    skills,
    activity: [],
    contacts,
    summary: {
      completedChallenges: 0,
      activeChallenges: 0,
      skillsVerified: skills.length,
    },
  };
};

export function useTalentProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [catalogs, setCatalogs] = useState<Catalogs | null>(null);
  const [state, setState] = useState<LoadState>({
    loading: true,
    error: null,
  });

  const loadProfile = useCallback(async () => {
    setState({ loading: true, error: null });
    try {
      const [profileResponse, catalogsResponse] = await Promise.all([
        profilesService.getMyProfile(),
        profilesService.getCatalogs(),
      ]);
      setProfile(mapProfileData(profileResponse));
      setCatalogs(catalogsResponse);
    } catch (error) {
      setState({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "No se pudo cargar el perfil.",
      });
      return;
    }

    setState({ loading: false, error: null });
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const languageCatalog = useMemo(
    () =>
      catalogs?.languages.map((lang) => ({
        id: lang.name,
        label: lang.name,
      })) ?? undefined,
    [catalogs],
  );

  return {
    profile,
    setProfile,
    catalogs,
    languageCatalog,
    loading: state.loading,
    error: state.error,
    reload: loadProfile,
  };
}
