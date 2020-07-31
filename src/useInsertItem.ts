import { useCallback } from "react";
import { FormField } from "./types";
import { insertItem } from "./utilities";

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
  }, [index, value, setValue, setError, setTouched]);
}
