import { useCallback } from "react";
import { SetState, Transform } from "./types";

const isTransform = <T>(value: SetState<T>): value is Transform<T> => {
  return typeof value === "function";
};

export const useNestedState = <T, K extends keyof T>(
  setState: (values: SetState<T>) => void,
  name: K
) => {
  return useCallback(
    update => {
      setState(state => ({
        ...state,
        [name]: isTransform(update) ? update(state[name]) : update
      }));
    },
    [setState, name]
  );
};
