import { useMemo, useState } from "react";
import type {
  Language,
  OpportunityStatus,
  ProfileData,
  LanguageLevel,
} from "../types";

export type BasicInfoDraft = {
  experienceLevel: string;
  education: string;
  opportunityStatus: OpportunityStatus;
  languages: Language[];
};

function uid() {
  return `tmp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function useEditBasicInfoForm(profile: ProfileData) {
  const initial: BasicInfoDraft = useMemo(
    () => ({
      experienceLevel: profile?.basicInfo?.experienceLevel ?? "",
      education: profile?.basicInfo?.education ?? "",
      opportunityStatus: profile?.opportunityStatus ?? "NotAvailable",
      languages: profile?.languages ?? [],
    }),
    [profile],
  );

  const [draft, setDraft] = useState<BasicInfoDraft>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setDraft(initial);
    setErrors({});
  };

  const setExperienceLevel = (v: string) =>
    setDraft((d) => ({ ...d, experienceLevel: v }));

  const setEducation = (v: string) => setDraft((d) => ({ ...d, education: v }));

  const setOpportunityStatus = (v: OpportunityStatus) =>
    setDraft((d) => ({ ...d, opportunityStatus: v }));

  const addLanguage = () => {
    setDraft((d) => ({
      ...d,
      languages: [
        ...d.languages,
        { id: uid(), name: "", level: "Basic" as LanguageLevel },
      ],
    }));
  };

  const removeLanguage = (id: string) => {
    setDraft((d) => ({
      ...d,
      languages: d.languages.filter((l) => l.id !== id),
    }));
  };

  const updateLanguage = (id: string, patch: Partial<Language>) => {
    setDraft((d) => ({
      ...d,
      languages: d.languages.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }));
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (!draft.experienceLevel) next.experienceLevel = "Requerido";
    if (!draft.education) next.education = "Requerido";
    if (!draft.opportunityStatus) next.opportunityStatus = "Requerido";

    if (draft.languages.length === 0) {
      next.languages = "Agrega al menos un idioma";
    } else {
      const invalid = draft.languages.some((l) => !l.name || !l.level);
      if (invalid) next.languages = "Completa idioma y nivel";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return {
    draft,
    errors,
    reset,
    validate,
    setExperienceLevel,
    setEducation,
    setOpportunityStatus,
    addLanguage,
    removeLanguage,
    updateLanguage,
  };
}
