import { useCallback } from "react";
import { Field, FieldItem } from "./types";
import { remove, getItem, useSetItem } from "./utilities";

export function useFieldItem<T>(
  field: Field<T[]>,
  index: number
): FieldItem<T> {
  const { setValue, setError, setTouched } = field;

  return {
    id: `${field.id}_${index}`,
    name: index.toString(),
    value: field.value[index],
    error: getItem(field.error, index),
    touched: getItem(field.touched, index),
    setValue: useSetItem(field.setValue, index),
    setError: useSetItem(field.setError, index),
    setTouched: useSetItem(field.setTouched, index),
    remove: useCallback(() => {
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
    }, [index, setValue, setError, setTouched])
  };
}
