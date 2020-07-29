import { Field } from "./types";
import { useCallback } from "react";

export function usePushItem<T>(field: Field<T[]>) {
  const { setValue } = field;

  return useCallback(
    (value: T) => {
      setValue(values => [...values, value]);
    },
    [setValue]
  );
}
