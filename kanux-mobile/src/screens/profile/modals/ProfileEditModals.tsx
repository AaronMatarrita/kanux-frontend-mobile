import React from "react";
import { ModalKey } from "@/screens/profile/hooks/useModalState";
import type {
  ProfileData,
  OpportunityStatus,
  LanguageLevel,
  Skill,
} from "../types";

import { EditAboutModal } from "./EditAboutModal";
import { EditBasicInfoModal } from "./EditBasicInfoModal";
import { EditSkillsInfoModal } from "./EditSkillsInfoModal";

type BasicInfoPayload = {
  experienceLevel: string;
  education: string;
  opportunityStatus: OpportunityStatus;
  languages: { name: string; level: LanguageLevel }[];
};

type Props = {
  modalKey: ModalKey | null;
  profile: ProfileData;
  onClose: () => void;

  onSaveAbout: (about: string) => void;
  onSaveBasicInfo: (payload: BasicInfoPayload) => void;
  onSaveSkills: (skills: Skill[]) => void;
  languageCatalog?: { id: string; label: string }[];
};

export const ProfileEditModals: React.FC<Props> = ({
  modalKey,
  profile,
  onClose,
  onSaveAbout,
  onSaveBasicInfo,
  onSaveSkills,
  languageCatalog,
}) => {
  return (
    <>
      {/* ABOUT */}
      <EditAboutModal
        visible={modalKey === "edit_about"}
        initialAbout={profile.about ?? ""}
        onClose={onClose}
        onSave={(next) => {
          onSaveAbout(next);
          onClose();
        }}
      />

      {/* BASIC INFO */}
      <EditBasicInfoModal
        visible={modalKey === "edit_basic"}
        profile={profile}
        languageCatalog={languageCatalog}
        onClose={onClose}
        onSave={(payload) => {
          onSaveBasicInfo(payload);
          onClose();
        }}
      />

      {/* SKILLS INFO */}
      <EditSkillsInfoModal
        visible={modalKey === "edit_skills"}
        profile={profile}
        onClose={onClose}
        onSave={(skills) => {
          onSaveSkills(skills);
          onClose();
        }}
      />
    </>
  );
};
