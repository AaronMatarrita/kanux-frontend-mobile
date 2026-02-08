import { useCallback, useMemo, useState } from "react";
import { profilesService } from "@/services/profiles.service";
import { useAuth } from "@/context/AuthContext";
import type { TalentProfile as SessionTalentProfile } from "@/types/session.types";

type FieldKey =
  | "firstName"
  | "lastName"
  | "contact"
  | "location"
  | "professionalTitle"
  | "experienceLevel"
  | "education"
  | "aboutMe";

type Values = Record<FieldKey, string>;

type Errors = Partial<Record<FieldKey, string>>;

type UseCompleteProfileFormReturn = {
  values: Values;
  setField: (key: FieldKey, value: string) => void;
  onBlurField: (key: FieldKey) => void;
  getFieldError: (key: FieldKey) => string | undefined;
  profileStep: 0 | 1;
  canContinue: boolean;
  handleContinue: () => boolean;
  handleBack: () => void;
  submitting: boolean;
  submitProfile: () => Promise<"success" | "session-missing" | "error">;
};

const STEP_FIELDS: Record<0 | 1, FieldKey[]> = {
  0: ["firstName", "lastName", "contact", "location"],
  1: ["professionalTitle", "experienceLevel", "education", "aboutMe"],
};

export function useCompleteProfileForm(): UseCompleteProfileFormReturn {
  const { session, login } = useAuth();
  const [profileStep, setProfileStep] = useState<0 | 1>(0);
  const [values, setValues] = useState<Values>({
    firstName: "",
    lastName: "",
    contact: "",
    location: "",
    professionalTitle: "",
    experienceLevel: "",
    education: "",
    aboutMe: "",
  });
  const [touched, setTouched] = useState<Record<FieldKey, boolean>>({
    firstName: false,
    lastName: false,
    contact: false,
    location: false,
    professionalTitle: false,
    experienceLevel: false,
    education: false,
    aboutMe: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo<Errors>(() => {
    const next: Errors = {};

    (Object.keys(values) as FieldKey[]).forEach((key) => {
      if (!values[key].trim()) next[key] = "Campo requerido";
    });

    return next;
  }, [values]);

  const setField = useCallback((key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onBlurField = useCallback((key: FieldKey) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  }, []);

  const getFieldError = useCallback(
    (key: FieldKey) => {
      if (!touched[key] && !hasSubmitted) return undefined;
      return errors[key];
    },
    [errors, hasSubmitted, touched],
  );

  const canContinue = useMemo(() => {
    return STEP_FIELDS[profileStep].every((key) => !errors[key]);
  }, [errors, profileStep]);

  const handleContinue = useCallback(() => {
    setHasSubmitted(true);

    if (!canContinue) return false;

    if (profileStep === 0) {
      setHasSubmitted(false);
      setProfileStep(1);
      return true;
    }

    return true;
  }, [canContinue, profileStep]);

  const handleBack = useCallback(() => {
    if (profileStep === 1) setProfileStep(0);
  }, [profileStep]);

  const submitProfile = useCallback(async () => {
    if (!session?.token) return "session-missing" as const;

    setSubmitting(true);
    try {
      const updatedProfile = await profilesService.updateMyProfile({
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        title: values.professionalTitle.trim(),
        location: values.location.trim(),
        experience_level: values.experienceLevel.trim(),
        education: values.education.trim(),
        about: values.aboutMe.trim(),
        contact: { phone: values.contact.trim() },
      });

      const currentProfile = session.user.profile;
      const mappedProfile: SessionTalentProfile = {
        id: updatedProfile.id || currentProfile.id,
        id_user: updatedProfile.user_id || currentProfile.id_user,
        first_name: updatedProfile.first_name ?? currentProfile.first_name,
        last_name: updatedProfile.last_name ?? currentProfile.last_name,
        title: updatedProfile.title ?? currentProfile.title,
        bio: updatedProfile.about ?? currentProfile.bio,
        location: updatedProfile.location ?? currentProfile.location,
        skills: currentProfile.skills ?? null,
        photo_url: updatedProfile.image_url ?? currentProfile.photo_url,
        created_at: currentProfile.created_at || new Date().toISOString(),
      };

      await login({
        ...session,
        isAuthenticated: true,
        user: {
          ...session.user,
          profile: mappedProfile,
        },
      });

      return "success" as const;
    } catch (error) {
      return "error" as const;
    } finally {
      setSubmitting(false);
    }
  }, [
    login,
    session,
    values.aboutMe,
    values.contact,
    values.education,
    values.experienceLevel,
    values.firstName,
    values.lastName,
    values.location,
    values.professionalTitle,
  ]);

  return {
    values,
    setField,
    onBlurField,
    getFieldError,
    profileStep,
    canContinue,
    handleContinue,
    handleBack,
    submitting,
    submitProfile,
  };
}
