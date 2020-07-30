import { useCallback } from "react";
import { FormField } from "./types";
import { insertItem } from "./utilities";

export function useInsertItem<T>(field: FormField<T[]>) {
  const { setValue, setError, setTouched } = field;

  return useCallback(
    (index: number, value: T) => {
      setValue(values => insertItem(values, index, value));
      setError(errors => {
        if (Array.isArray(errors)) {
          return insertItem(errors, index, undefined);
        } else {
          return errors;
        }
      });
      setTouched(touched => {
        if (Array.isArray(touched)) {
          return insertItem(touched, index, undefined);
        } else {
          return touched;
        }
      });
    },
    [setValue, setError, setTouched]
  );
}
