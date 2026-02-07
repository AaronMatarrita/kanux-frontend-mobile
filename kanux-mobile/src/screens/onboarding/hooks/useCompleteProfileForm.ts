import { useCallback, useMemo, useState } from "react";

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
};

const STEP_FIELDS: Record<0 | 1, FieldKey[]> = {
  0: ["firstName", "lastName", "contact", "location"],
  1: ["professionalTitle", "experienceLevel", "education", "aboutMe"],
};

export function useCompleteProfileForm(): UseCompleteProfileFormReturn {
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

  return {
    values,
    setField,
    onBlurField,
    getFieldError,
    profileStep,
    canContinue,
    handleContinue,
    handleBack,
  };
}
