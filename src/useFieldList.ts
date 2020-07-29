import { useCallback } from "react";
import { Field, FieldList } from "./types";
import { insert, remove } from "./utilities";

export function useFieldList<T>(field: Field<T[]>): FieldList<T> {
  const { setValue } = field;

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
      },
      [setValue]
    ),
    remove: useCallback(
      index => {
        setValue(values => remove(values, index));
      },
      [setValue]
    )
  };
}
