import { useCallback, useMemo, useState } from "react";

type RegisterValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type UseRegisterFormParams = {
  onSubmit?: (values: RegisterValues) => Promise<void> | void;
};

export function useRegisterForm({ onSubmit }: UseRegisterFormParams = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const errors = useMemo<RegisterErrors>(() => {
    const next: RegisterErrors = {};

    if (!name.trim()) next.name = "Ingresá tu nombre";
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
  }, [name, email, password, confirmPassword]);

  const canSubmit =
    !errors.name &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    !loading;

  const handleSubmit = useCallback(async () => {
    setHasSubmitted(true);

    if (
      errors.name ||
      errors.email ||
      errors.password ||
      errors.confirmPassword
    )
      return;

    if (!canSubmit) return;

    setLoading(true);
    try {
      await onSubmit?.({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });
    } finally {
      setLoading(false);
    }
  }, [
    canSubmit,
    email,
    errors.confirmPassword,
    errors.email,
    errors.name,
    errors.password,
    name,
    onSubmit,
    password,
    confirmPassword,
  ]);

  const onBlurName = useCallback(() => {
    setTouched((prev) => ({ ...prev, name: true }));
  }, []);

  const onBlurEmail = useCallback(() => {
    setTouched((prev) => ({ ...prev, email: true }));
  }, []);

  const onBlurPassword = useCallback(() => {
    setTouched((prev) => ({ ...prev, password: true }));
  }, []);

  const onBlurConfirmPassword = useCallback(() => {
    setTouched((prev) => ({ ...prev, confirmPassword: true }));
  }, []);

  const nameError = touched.name || hasSubmitted ? errors.name : undefined;
  const emailError = touched.email || hasSubmitted ? errors.email : undefined;
  const passwordError =
    touched.password || hasSubmitted ? errors.password : undefined;
  const confirmPasswordError =
    touched.confirmPassword || hasSubmitted
      ? errors.confirmPassword
      : undefined;

  return {
    values: { name, email, password, confirmPassword },
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,

    loading,
    touched,
    hasSubmitted,
    errors,
    canSubmit,

    nameError,
    emailError,
    passwordError,
    confirmPasswordError,

    onBlurName,
    onBlurEmail,
    onBlurPassword,
    onBlurConfirmPassword,

    handleSubmit,
  };
}
