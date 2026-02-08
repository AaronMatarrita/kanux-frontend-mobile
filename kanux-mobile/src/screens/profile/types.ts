export type LanguageLevel = "Basic" | "Intermediate" | "Advanced" | "Native";

export type OpportunityStatus = "OpenToWork" | "FreelanceOnly" | "NotAvailable";

export type ActivityType =
  | "POST_PUBLISHED"
  | "CHALLENGE_COMPLETED"
  | "CHALLENGE_STARTED";

export interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category: "Technical" | "Soft" | "Other";
  verified?: boolean;
}

export type ContactType =
  | "Phone"
  | "WhatsApp"
  | "LinkedIn"
  | "GitHub"
  | "Twitter"
  | "Website"
  | "Other";

export interface ProfileContact {
  id: string;
  type: ContactType;
  value: string;
}
export interface Language {
  id: string;
  name: string;
  level: LanguageLevel;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  meta?: string;
  createdAtISO: string;
}

export interface ProfileCompletion {
  percentage: number;
}

export interface ProfileBasicInfo {
  fullName: string;
  headline: string;
  email?: string;
  website?: string;
  experienceLevel?: string;
  education?: string;
  location?: string;
}

export interface ProfileData {
  id: string;
  avatarUrl?: string;
  completion: ProfileCompletion;
  about?: string;

  basicInfo: ProfileBasicInfo;
  opportunityStatus: OpportunityStatus;

  languages: Language[];
  skills: Skill[];
  activity: ActivityItem[];
  contacts?: ProfileContact[];

  summary: {
    completedChallenges: number;
    activeChallenges: number;
    skillsVerified: number;
  };
}
