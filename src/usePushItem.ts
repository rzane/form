import { FormField } from "./types";
import { useCallback } from "react";

export function usePushItem<T>(field: FormField<T[]>) {
  const { setValue } = field;

  return useCallback(
    (value: T) => {
      setValue(values => [...values, value]);
    },
    [setValue]
  );
}
