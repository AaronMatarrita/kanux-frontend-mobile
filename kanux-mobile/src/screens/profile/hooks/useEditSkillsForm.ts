import { useMemo, useState } from "react";
import type { ProfileData, Skill } from "../types";

export type SkillDraft = {
  id: string;
  category: Skill["category"];
  name: string;
  level: NonNullable<Skill["level"]>;
  verified?: boolean;
};

function uid() {
  return `tmp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

const DEFAULT_LEVEL: NonNullable<Skill["level"]> = "Beginner";
const DEFAULT_CATEGORY: Skill["category"] = "Technical";

export function useEditSkillsForm(profile: ProfileData) {
  const initial = useMemo<SkillDraft[]>(
    () =>
      (profile.skills ?? []).map((s) => ({
        id: s.id,
        category: s.category,
        name: s.name,
        level: (s.level ?? DEFAULT_LEVEL) as NonNullable<Skill["level"]>,
        verified: s.verified ?? true,
      })),
    [profile],
  );

  const [skills, setSkills] = useState<SkillDraft[]>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reset = () => {
    setSkills(initial);
    setErrors({});
  };

  const addSkill = (initial?: Partial<SkillDraft>) => {
    const id = uid();
    setSkills((prev) => [
      ...prev,
      {
        id,
        category: DEFAULT_CATEGORY,
        name: "",
        level: DEFAULT_LEVEL,
        verified: true,
        ...initial,
        id,
      },
    ]);
    return id;
  };

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSkill = (id: string, patch: Partial<SkillDraft>) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    );
  };

  const validate = () => {
    const next: Record<string, string> = {};

    if (skills.length === 0) next.skills = "Agrega al menos una habilidad";

    const invalid = skills.some((s) => !s.category || !s.name || !s.level);
    if (invalid) next.skills = "Completa categoría, habilidad y nivel";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return {
    skills,
    errors,
    reset,
    validate,
    addSkill,
    removeSkill,
    updateSkill,
  };
}
