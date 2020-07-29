import { useCallback, useMemo } from "react";
import { Field, FieldItem } from "./types";
import { removeItem, useGetItem, useSetItem } from "./utilities";

export function useFieldItem<T>(
  field: Field<T[]>,
  index: number
): FieldItem<T> {
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

  const remove = useCallback(() => {
    setFieldValue(values => removeItem(values, index));
    setFieldError(errors => {
      if (Array.isArray(errors)) {
        return removeItem(errors, index);
      } else {
        return errors;
      }
    });
    setFieldTouched(touched => {
      if (Array.isArray(touched)) {
        return removeItem(touched, index);
      } else {
        return touched;
      }
    });
  }, [index, setFieldError, setFieldTouched, setFieldValue]);

  return useMemo(
    () => ({
      id: `${field.id}_${index}`,
      name: index.toString(),
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched,
      remove
    }),
    [
      field.id,
      index,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched,
      remove
    ]
  );
}
