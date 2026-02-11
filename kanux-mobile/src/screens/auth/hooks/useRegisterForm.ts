import { useCallback, useMemo, useState } from "react";
import { authService } from "@services/auth.service";

type RegisterValues = {
  email: string;
  password: string;
};

type RegisterErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  submit?: string;
};

type UseRegisterFormParams = {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
};

export function useRegisterForm({
  onSuccess,
  onError,
}: UseRegisterFormParams = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  const errors = useMemo<RegisterErrors>(() => {
    const next: RegisterErrors = {};

    if (!email.trim()) next.email = "Ingresá tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Correo inválido";

    if (!password) next.password = "Ingresá tu contraseña";
    else if (password.length < 8) next.password = "Al menos 8 caracteres";
    else if (!(/[A-Z]/.test(password) && /[a-z]/.test(password)))
      next.password = "Debe incluir mayúsculas y minúsculas";

    if (!confirmPassword) next.confirmPassword = "Confirmá tu contraseña";
    else if (confirmPassword !== password)
      next.confirmPassword = "Las contraseñas no coinciden";

    return next;
  }, [email, password, confirmPassword]);

  const canSubmit =
    !errors.email && !errors.password && !errors.confirmPassword && !loading;

  const handleSubmit = useCallback(async () => {
    setHasSubmitted(true);
    setSubmitError(undefined);

    if (errors.email || errors.password || errors.confirmPassword) return;

    if (!canSubmit) return;

    setLoading(true);
    try {
      const response = await authService.preRegister({
        email: email.trim(),
        password,
        confirmPassword,
        userType: "talent",
      });
      onSuccess?.(response);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error al registrarse";
      setSubmitError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [
    canSubmit,
    email,
    errors.email,
    errors.password,
    errors.confirmPassword,
    password,
    confirmPassword,
    onSuccess,
    onError,
  ]);

  const onBlurEmail = useCallback(() => {
    setTouched((prev) => ({ ...prev, email: true }));
  }, []);

  const onBlurPassword = useCallback(() => {
    setTouched((prev) => ({ ...prev, password: true }));
  }, []);

  const onBlurConfirmPassword = useCallback(() => {
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
  }, []);

  const emailError = touched.email || hasSubmitted ? errors.email : undefined;
  const passwordError =
    touched.password || hasSubmitted ? errors.password : undefined;
  const confirmPasswordError =
    touched.confirmPassword || hasSubmitted
      ? errors.confirmPassword
      : undefined;

  return {
    values: { email, password, confirmPassword },
    setEmail,
    setPassword,
    setConfirmPassword,

    loading,
    touched,
    hasSubmitted,
    errors,
    canSubmit,

    emailError,
    passwordError,
    confirmPasswordError,

    onBlurEmail,
    onBlurPassword,
    onBlurConfirmPassword,

    handleSubmit,
    submitError,
    setSubmitError,
  };
}
