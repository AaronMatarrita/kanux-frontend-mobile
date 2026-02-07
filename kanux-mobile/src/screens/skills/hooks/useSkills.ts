import { useState, useEffect, useMemo } from "react";
import { Skill, profilesService } from "@/services/profiles.service";

// skill processed
export interface ProcessedSkill {
  id:string|number;
  name: string;
  progress: number;
}
// category with skill
export interface GroupedSkills {
  category: string;
  skills: ProcessedSkill[];
}

export function useSkills() {
  const [activeTab, setActiveTab] = useState<string>("technical");
  const [loading, setLoading] = useState<boolean>(false);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSkill = async () => {
    try {
      setLoading(true);
      const data = await profilesService.getMySkills();
      setAllSkills(data);
    } catch (err) {
      setError("Ocurrió un error al cargar tus habilidades.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSkill();
  }, []);

  // typed groups
  const groupedSkillsData = useMemo((): GroupedSkills[] => {
    const filtered = allSkills.filter((s) => {
      const isSoft = s.category?.type_category === "soft";
      return activeTab === "soft" ? isSoft : !isSoft;
    });

    const groups: Record<string, GroupedSkills> = {};

    filtered.forEach((skill) => {
      const catName = skill.category?.name || "Otras";
      if (!groups[catName]) {
        groups[catName] = { category: catName, skills: [] };
      }

      const progressMap: Record<string, number> = {
        beginner: 25,
        intermediate: 50,
        advanced: 75,
        expert: 100,
      };

      groups[catName].skills.push({
        id: skill.id,
        name: skill.name,
        progress: progressMap[skill.level || "beginner"],
      });
    });

    return Object.values(groups);
  }, [allSkills, activeTab]);

  const tabs = [
    { id: "technical", label: "Habilidades técnicas" },
    { id: "soft", label: "Habilidades blandas" },
  ];

  return {
    loading,
    groupedSkillsData, 
    error,
    tabs,
    activeTab,
    setActiveTab,
    refreshSkills: fetchSkill
  };
}