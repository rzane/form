import { useCallback } from "react";
import { Field, FieldItem } from "./types";
import { remove, getItem, useSetItem } from "./utilities";

export function useFieldItem<T>(
  field: Field<T[]>,
  index: number
): FieldItem<T> {
  const { setValue } = field;

  return {
    id: `${field.id}_${index}`,
    name: index.toString(),
    value: field.value[index],
    error: getItem(field.error, index),
    touched: getItem(field.touched, index),
    setValue: useSetItem(field.setValue, index),
    setError: useSetItem(field.setError, index),
    setTouched: useSetItem(field.setTouched, index),
    remove: useCallback(() => setValue(values => remove(values, index)), [
      index,
      setValue
    ])
  };
}
