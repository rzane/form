import { useCallback } from "react";
import { SetState, Transform } from "./types";

const isTransform = <T>(value: T | Transform<T>): value is Transform<T> => {
  return typeof value === "function";
};

export function useNestedState<T, K extends keyof T>(
  setState: SetState<T>,
  name: K
): SetState<T[K]> {
  return useCallback(
    update => {
      setState(state => ({
        ...state,
        [name]: isTransform(update) ? update(state[name]) : update
      }));
    },
    [setState, name]
  );
}
