import { useCallback } from "react";
import { removeItem } from "./utilities";
import { FormField } from "./types";

/**
 * Removes a value at the given index from array of values.
 *
 * This can be used to create a form with repeating fields.
 *
 * @example
 * const pets = useField(form, "pets");
 * const pet = useFieldItem(pets, 0);
 * const removePet = useRemoveItem(pets, 0);
 */
export function useRemoveItem<Value>(field: FormField<Value[]>, index: number) {
  const { setValue, setError, setTouched } = field;

  return useCallback(() => {
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
  }, [index, setValue, setError, setTouched]);
}
