import { useMemo } from "react";
import { FormField } from "./types";
import { useGetItem, useSetItem } from "./utilities";

export function useFieldItem<T>(
  field: FormField<T[]>,
  index: number
): FormField<T> {
  const {
    setValue: setFieldValue,
    setError: setFieldError,
    setTouched: setFieldTouched
  } = field;

  const value = useGetItem(field.value, index);
  const error = useGetItem(field.error, index);
  const touched = useGetItem(field.touched, index);

  const setValue = useSetItem(setFieldValue, index);
  const setError = useSetItem(setFieldError, index);
  const setTouched = useSetItem(setFieldTouched, index);

  return useMemo(
    () => ({
      id: `${field.id}_${index}`,
      name: index,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched
    }),
    [field.id, index, value, error, touched, setValue, setError, setTouched]
  );
}
