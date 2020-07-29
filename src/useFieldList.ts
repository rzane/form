import { useCallback } from "react";
import { Field, FieldList } from "./types";
import { insertItem, removeItem } from "./utilities";

export function useFieldList<T>(field: Field<T[]>): FieldList<T> {
  const { setValue, setError, setTouched } = field;

  const push = useCallback(
    (value: T) => {
      setValue(values => [...values, value]);
    },
    [setValue]
  );

  const insert = useCallback(
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

  const remove = useCallback(
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

  return {
    ...field,
    push,
    insert,
    remove
  };
}
