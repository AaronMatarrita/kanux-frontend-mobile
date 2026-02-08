import { useCallback, useState } from "react";

export type ModalKey =
  | "edit_header"
  | "edit_about"
  | "edit_basic"
  | "edit_skills";

type ModalState<TPayload = unknown> = {
  key: ModalKey | null;
  payload?: TPayload;
};

export function useModalState<TPayload = unknown>() {
  const [state, setState] = useState<ModalState<TPayload>>({ key: null });

  const open = useCallback((key: ModalKey, payload?: TPayload) => {
    setState({ key, payload });
  }, []);

  const close = useCallback(() => {
    setState({ key: null });
  }, []);

  const isOpen = useCallback((key: ModalKey) => state.key === key, [state.key]);

  return { modal: state, open, close, isOpen };
}
