import { FormField } from "./types";
import { useCallback } from "react";

/**
 * Adds a new value to the end to an array of values.
 *
 * This can be used to create a form with repeating fields.
 *
 * @example
 * const pets = useField(form, "pets");
 * const pet = useFieldItem(pets, 0);
 * const addPet = usePushItem(pets, { name: ""  });
 */
export function usePushItem<T>(field: FormField<T[]>, value: T) {
  const { setValue } = field;

  return useCallback(() => {
    setValue(values => [...values, value]);
  }, [value, setValue]);
}
