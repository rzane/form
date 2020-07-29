import { useCallback } from "react";
import { removeItem } from "./utilities";
import { Field } from "./types";

export function useRemoveItem<T>(field: Field<T[]>) {
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
