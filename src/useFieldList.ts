import { useCallback } from "react";
import { Field, FieldList } from "./types";
import { insert, remove } from "./utilities";

export function useFieldList<T>(field: Field<T[]>): FieldList<T> {
  const { setValue, setError, setTouched } = field;

  return {
    ...field,
    push: useCallback(
      value => {
        setValue(values => [...values, value]);
      },
      [setValue]
    ),
    insert: useCallback(
      (index, value) => {
        setValue(values => insert(values, index, value));
        setError(errors => {
          if (Array.isArray(errors)) {
            return insert(errors, index, undefined);
          } else {
            return errors;
          }
        });
        setTouched(touched => {
          if (Array.isArray(touched)) {
            return insert(touched, index, undefined);
          } else {
            return touched;
          }
        });
      },
      [setValue, setError, setTouched]
    ),
    remove: useCallback(
      index => {
        setValue(values => remove(values, index));
        setError(errors => {
          if (Array.isArray(errors)) {
            return remove(errors, index);
          } else {
            return errors;
          }
        });
        setTouched(touched => {
          if (Array.isArray(touched)) {
            return remove(touched, index);
          } else {
            return touched;
          }
        });
      },
      [setValue, setError, setTouched]
    )
  };
}
