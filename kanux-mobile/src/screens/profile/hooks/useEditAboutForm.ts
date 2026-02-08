import { useMemo, useState } from "react";

export function useEditAboutForm(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const min = 50;
  const count = value.length;

  const isValid = useMemo(() => count >= min, [count]);
  const helper = useMemo(() => `${count} caracteres (mínimo ${min})`, [count]);

  const reset = (next: string) => setValue(next);

  return {
    value,
    setValue,
    isValid,
    helper,
    reset,
  };
}
