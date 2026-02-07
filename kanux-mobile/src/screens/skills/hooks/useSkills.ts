import { useState, useEffect, useMemo } from "react";
import { Skill, profilesService } from "@/services/profiles.service";

interface GroupedSkills {
  category: string;
  skills: { name: string; progress: number }[];
}

export function useSkills() {
  const [activeTab, setActiveTab] = useState("technical");
  const [loading, setLoading] = useState<boolean>(false);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [error,setError] = useState<string|null>(null);

  const getSkills = async () => {
    try {
      setLoading(true);
      const data = await profilesService.getMySkills();
      setAllSkills(data);
    } catch (error) {
      setError("Ocurrió un error al cargar tus habilidades.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSkills();
  }, [allSkills]);

  // process skills
  const groupedSkillsData = useMemo(() => {
    const filtered = allSkills.filter((s) => {
      const isSoft = s.category?.type_category === "soft";
      return activeTab === "soft" ? isSoft : !isSoft;
    });

    const groups: { [key: string]: GroupedSkills } = {};

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

  // return hooks
  return {
    
    loading,
    groupedSkillsData,
    error,
    tabs,
    activeTab,
    setActiveTab,
    refreshSkills: getSkills
  };
}