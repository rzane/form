import { useCallback } from "react";
import { FormField } from "./types";

function insert<T>(values: T[], index: number, value: T): T[] {
  const result = [...values];
  result.splice(index, 0, value);
  return result;
}

/**
 * Adds a new value at a specific position to an array of values.
 *
 * This can be used to create a form with repeating fields.
 *
 * @example
 * const pets = useField(form, "pets");
 * const pet = useFieldItem(pets, 0);
 * const insert = useInsertItem(pets, 0, { name: "" });
 */
export function useInsertItem<Value>(
  field: FormField<Value[]>,
  index: number,
  value: Value
) {
  const { setValue, setError, setTouched } = field;

  return useCallback(() => {
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
  }, [index, value, setValue, setError, setTouched]);
}
