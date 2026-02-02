import { useCallback, useMemo, useState } from "react";

type LoginValues = {
  email: string;
  password: string;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

type UseLoginFormParams = {
  onSubmit?: (values: LoginValues) => Promise<void> | void;
};

export function useLoginForm({ onSubmit }: UseLoginFormParams = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const errors = useMemo<LoginErrors>(() => {
    const next: LoginErrors = {};
    if (!email.trim()) next.email = "Ingresá tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Correo inválido";
    if (!password) next.password = "Ingresá tu contraseña";
    return next;
  }, [email, password]);

  const canSubmit = !errors.email && !errors.password && !loading;

  const handleSubmit = useCallback(async () => {
    setHasSubmitted(true);
    if (errors.email || errors.password) return;
    if (!canSubmit) return;

    setLoading(true);
    try {
      await onSubmit?.({ email, password });
    } finally {
      setLoading(false);
    }
  }, [canSubmit, email, errors.email, errors.password, onSubmit, password]);

  const onBlurEmail = useCallback(() => {
    setTouched((prev) => ({ ...prev, email: true }));
  }, []);

  const onBlurPassword = useCallback(() => {
    setTouched((prev) => ({ ...prev, password: true }));
  }, []);

  const emailError = touched.email || hasSubmitted ? errors.email : undefined;
  const passwordError =
    touched.password || hasSubmitted ? errors.password : undefined;

  return {
    values: { email, password },
    setEmail,
    setPassword,
    loading,
    touched,
    hasSubmitted,
    errors,
    canSubmit,
    emailError,
    passwordError,
    onBlurEmail,
    onBlurPassword,
    handleSubmit,
  };
}
