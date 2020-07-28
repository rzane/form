import { useCallback } from "react";
import { Field, FieldList } from "./types";

export function useFieldList<T>(field: Field<T[]>): FieldList<T> {
  const { setValue } = field;

  return {
    ...field,
    insert: useCallback(
      (index, value) => {
        setValue(prev => {
          const next = [...prev];
          next.splice(index, 0, value);
          return next;
        });
      },
      [setValue]
    ),
    remove: useCallback(
      index => {
        setValue(prev => {
          const next = [...prev];
          next.splice(index, 1);
          return next;
        });
      },
      [setValue]
    )
  };
}
