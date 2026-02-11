import React from "react";
import { ModalKey } from "@/screens/profile/hooks/useModalState";
import type {
  ProfileData,
  OpportunityStatus,
  LanguageLevel,
  Skill,
  ProfileContact,
} from "../types";

import { EditAboutModal } from "./EditAboutModal";
import { EditBasicInfoModal } from "./EditBasicInfoModal";
import { EditSkillsInfoModal } from "./EditSkillsInfoModal";
import { EditProfileHeaderModal } from "./EditProfileHeaderModal";

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

type Props = {
  modalKey: ModalKey | null;
  profile: ProfileData;
  onClose: () => void;

  onSaveHeader: (payload: {
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
  }) => Promise<boolean>;
  isSavingHeader?: boolean;
  onSaveAbout: (about: string) => Promise<boolean>;
  isSavingAbout?: boolean;
  onSaveBasicInfo: (payload: BasicInfoPayload) => Promise<boolean>;
  isSavingBasicInfo?: boolean;
  onSaveSkills: (skills: Skill[]) => Promise<boolean>;
  isSavingSkills?: boolean;
  languageCatalog?: { id: string; label: string }[];
};

export const ProfileEditModals: React.FC<Props> = ({
  modalKey,
  profile,
  onClose,
  onSaveHeader,
  isSavingHeader = false,
  onSaveAbout,
  isSavingAbout = false,
  onSaveBasicInfo,
  isSavingBasicInfo = false,
  onSaveSkills,
  isSavingSkills = false,
  languageCatalog,
}) => {
  return (
    <>
      {/* HEADER */}
      <EditProfileHeaderModal
        visible={modalKey === "edit_header"}
        profile={profile}
        onClose={onClose}
        onSave={(payload) => onSaveHeader(payload)}
        isSaving={isSavingHeader}
      />

      {/* ABOUT */}
      <EditAboutModal
        visible={modalKey === "edit_about"}
        initialAbout={profile.about ?? ""}
        onClose={onClose}
        onSave={(next) => onSaveAbout(next)}
        isSaving={isSavingAbout}
      />

      {/* BASIC INFO */}
      <EditBasicInfoModal
        visible={modalKey === "edit_basic"}
        profile={profile}
        languageCatalog={languageCatalog}
        onClose={onClose}
        onSave={(payload) => onSaveBasicInfo(payload)}
        isSaving={isSavingBasicInfo}
      />

      {/* SKILLS INFO */}
      <EditSkillsInfoModal
        visible={modalKey === "edit_skills"}
        profile={profile}
        onClose={onClose}
        onSave={(skills) => onSaveSkills(skills)}
        isSaving={isSavingSkills}
      />
    </>
  );
};
