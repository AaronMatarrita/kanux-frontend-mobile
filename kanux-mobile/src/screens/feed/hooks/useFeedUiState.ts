import { useState } from "react";

export type FeedViewState = "loading" | "error" | "empty" | "ready";

export const useFeedUiState = (initialState: FeedViewState = "ready") => {
  const [state, setState] = useState<FeedViewState>(initialState);

  return {
    state,
    setState,
  };
};
