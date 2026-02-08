import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Alert } from "react-native";
import { profilesService } from "@/services/profiles.service";
import type { ProfileData } from "../types";

type SetProfile = Dispatch<SetStateAction<ProfileData | null>>;

type UseProfileEditsReturn = {
  isSavingAbout: boolean;
  saveAbout: (about: string) => Promise<boolean>;
};

const splitFullName = (fullName?: string) => {
  const trimmed = (fullName ?? "").trim();
  if (!trimmed) return { firstName: "", lastName: "" };

  const parts = trimmed.split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
};

export function useProfileEdits(
  profile: ProfileData | null,
  setProfile: SetProfile,
): UseProfileEditsReturn {
  const [isSavingAbout, setIsSavingAbout] = useState(false);

  const saveAbout = useCallback(
    async (about: string) => {
      if (isSavingAbout) return false;

      const nextAbout = about.trim();
      const nameFallback = splitFullName(profile?.basicInfo.fullName);
      const firstName = profile?.firstName ?? nameFallback.firstName;
      const lastName = profile?.lastName ?? nameFallback.lastName;

      setIsSavingAbout(true);
      try {
        const updated = await profilesService.updateMyProfile({
          first_name: firstName,
          last_name: lastName,
          about: nextAbout,
        });

        setProfile((prev) =>
          prev
            ? {
                ...prev,
                about: updated.about ?? nextAbout,
                completion: {
                  percentage:
                    updated.profile_completeness ?? prev.completion.percentage,
                },
              }
            : prev,
        );

        return true;
      } catch (saveError) {
        const message =
          saveError instanceof Error
            ? saveError.message
            : "No se pudo guardar la descripcion.";
        Alert.alert("Error", message);
        return false;
      } finally {
        setIsSavingAbout(false);
      }
    },
    [
      isSavingAbout,
      profile?.basicInfo.fullName,
      profile?.firstName,
      profile?.lastName,
      setProfile,
    ],
  );

  return {
    isSavingAbout,
    saveAbout,
  };
}
