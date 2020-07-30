import { useCallback } from "react";
import { removeItem } from "./utilities";
import { FormField } from "./types";

export function useRemoveItem<T>(field: FormField<T[]>) {
  const { setValue, setError, setTouched } = field;

  return useCallback(
    (index: number) => {
      setValue(values => removeItem(values, index));
      setError(errors => {
        if (Array.isArray(errors)) {
          return removeItem(errors, index);
        } else {
          return errors;
        }
      });
      setTouched(touched => {
        if (Array.isArray(touched)) {
          return removeItem(touched, index);
        } else {
          return touched;
        }
      });
    },
    [setValue, setError, setTouched]
  );
}
