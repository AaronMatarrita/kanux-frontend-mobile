import React from "react";
import { ModalKey } from "@/screens/profile/hooks/useModalState";
import { EditAboutModal } from "./EditAboutModal";
import { ProfileData } from "../types";

type Props = {
  modalKey: ModalKey | null;
  profile: ProfileData;
  onClose: () => void;

  onSaveAbout: (about: string) => void;
};

export const ProfileEditModals: React.FC<Props> = ({
  modalKey,
  profile,
  onClose,
  onSaveAbout,
}) => {
  return (
    <>
      <EditAboutModal
        visible={modalKey === "edit_about"}
        initialAbout={profile.about ?? ""}
        onClose={onClose}
        onSave={(next) => {
          onSaveAbout(next);
          onClose();
        }}
      />
    </>
  );
};
