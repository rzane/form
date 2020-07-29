import { useMemo } from "react";
import { Field } from "./types";
import { useGetProperty, useSetProperty } from "./utilities";

export function useField<T, K extends keyof T>(
  field: Field<T>,
  name: K
): Field<T[K]> {
  const value = useGetProperty(field.value, name);
  const error = useGetProperty(field.error, name);
  const touched = useGetProperty(field.touched, name);

  const setValue = useSetProperty(field.setValue, name);
  const setError = useSetProperty(field.setError, name);
  const setTouched = useSetProperty(field.setTouched, name);

  return useMemo(
    () => ({
      id: `${field.id}_${name}`,
      name: name as string,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched
    }),
    [field.id, error, touched, value, name, setError, setTouched, setValue]
  );
}
