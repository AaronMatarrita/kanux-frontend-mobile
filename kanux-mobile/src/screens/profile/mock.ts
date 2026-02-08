import { ProfileData } from "./types";

export const mockProfile: ProfileData = {
  id: "me",
  avatarUrl: undefined,
  completion: { percentage: 100 },
  about:
    "Soy FullStack Developer enfocado en construir productos escalables, con experiencia en UI moderna y APIs robustas. Me gusta resolver problemas y entregar valor rápido.",

  basicInfo: {
    fullName: "Aaron Matarrita",
    headline: "Frontend Developer - Backend Developer - FullStack",
    email: "aaron@example.com",
    website: "https://www.google.com/aaronmatarrita",
    experienceLevel: "expert",
    education: "University",
    location: "Costa Rica",
  },

  opportunityStatus: "FreelanceOnly",

  contacts: [
    {
      id: "contact-website",
      type: "Website",
      value: "https://www.google.com/aaronmatarrita",
    },
  ],

  languages: [
    { id: "en", name: "English", level: "Intermediate" },
    { id: "es", name: "Spanish", level: "Basic" },
  ],

  skills: [
    {
      id: "sql",
      name: "SQL Server",
      level: "Advanced",
      category: "Technical",
      verified: true,
    },
    {
      id: "dev",
      name: "Software Development",
      level: "Expert",
      category: "Technical",
      verified: true,
    },
    {
      id: "it",
      name: "IT Support",
      level: "Beginner",
      category: "Other",
      verified: true,
    },
    { id: "team", name: "Teamwork", category: "Soft" },
    { id: "comm", name: "Communication", category: "Soft" },
  ],

  activity: [
    {
      id: "a1",
      type: "POST_PUBLISHED",
      title: "Published a new post: Post 1",
      subtitle: "Community",
      createdAtISO: new Date().toISOString(),
    },
    {
      id: "a2",
      type: "CHALLENGE_COMPLETED",
      title: "Complete Challenge: Challenge 1",
      subtitle: "Verified",
      meta: "100 pt",
      createdAtISO: new Date().toISOString(),
    },
    {
      id: "a3",
      type: "CHALLENGE_STARTED",
      title: "Start new Challenge: Challenge 2",
      subtitle: "In progress",
      createdAtISO: new Date().toISOString(),
    },
  ],

  summary: {
    completedChallenges: 8,
    activeChallenges: 3,
    skillsVerified: 15,
  },
};
