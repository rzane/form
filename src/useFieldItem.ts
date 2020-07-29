import { useCallback } from "react";
import { Field, FieldItem } from "./types";
import { removeItem, getItem, useSetItem } from "./utilities";

export function useFieldItem<T>(
  field: Field<T[]>,
  index: number
): FieldItem<T> {
  const { setValue, setError, setTouched } = field;

  return {
    id: `${field.id}_${index}`,
    name: `${field.name}[${index}]`,
    value: field.value[index],
    error: getItem(field.error, index),
    touched: getItem(field.touched, index),
    setValue: useSetItem(field.setValue, index),
    setError: useSetItem(field.setError, index),
    setTouched: useSetItem(field.setTouched, index),
    remove: useCallback(() => {
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
    }, [index, setValue, setError, setTouched])
  };
}
