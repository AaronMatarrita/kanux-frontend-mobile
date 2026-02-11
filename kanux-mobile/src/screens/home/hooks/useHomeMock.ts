import { useMemo } from "react";
import type {
  HomeStat,
  RecommendedChallenge,
  AnalyticsKpi,
  BestChallenge,
} from "../types/home.types";

export const useHomeMock = () => {
  return useMemo(() => {
    const userName = "Aaron Matarrita";

    const stats: HomeStat[] = [
      { key: "verifiedSkills", label: "Habilidades verificadas", value: 3 },
      { key: "completedChallenges", label: "Desafíos completados", value: 1 },
      { key: "unreadMessages", label: "Mensajes sin leer", value: 26 },
    ];

    const recommended: RecommendedChallenge[] = [
      {
        id: "1",
        title: "Suma de Dos Números",
        description:
          "Escribe una función que tome dos números como parámetros y retorne su suma.",
        level: "Básico",
        orderTag: "#01",
      },
      {
        id: "2",
        title: "Invertir una Cadena",
        description:
          "Escribe una función que tome una cadena de texto y la retorne invertida.",
        level: "Básico",
        orderTag: "#02",
      },
    ];

    const analyticsKpis: AnalyticsKpi[] = [
      {
        key: "totalSubmissions",
        label: "Total de envíos",
        value: "2",
        helper: "— 0 vs previous period",
      },
      {
        key: "avgScore",
        label: "Puntaje promedio",
        value: "100%",
        helper: "— 0 vs previous period",
      },
      {
        key: "bestScore",
        label: "Mejor puntaje",
        value: "100%",
        helper: "— Mejor resultado obtenido",
      },
      {
        key: "companiesContacted",
        label: "Empresas contactadas",
        value: "2",
        helper: "— 0 vs previous period",
      },
    ];

    const bestChallenge: BestChallenge = {
      title: "Trabajo en equipo y colaboración",
      badge: "Mejor promedio",
      subtitle: "1 intentos — Mejor: 100%",
      score: "100%",
    };

    return { userName, stats, recommended, analyticsKpis, bestChallenge };
  }, []);
};
