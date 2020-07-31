import { useMemo } from "react";
import { FormField } from "./types";
import { useGetItem, useSetItem } from "./utilities";

/**
 * Create a field for a specific index in an array.
 *
 * This hook is intended for use in building forms with "Add another" functionality.
 *
 * @example
 * const form = useForm({
 *   initialValue: {
 *     pets: [{ name: "" }]
 *   }
 * });
 *
 * const pets = useField(form, "pets");
 * const pet = useFieldItem(pets, 0);
 * const name = useField(pet, "name");
 */
export function useFieldItem<Value>(
  field: FormField<Value[]>,
  index: number
): FormField<Value> {
  const {
    setValue: setFieldValue,
    setError: setFieldError,
    setTouched: setFieldTouched
  } = field;

  const value = useGetItem(field.value, index);
  const error = useGetItem(field.error, index);
  const touched = useGetItem(field.touched, index);

  const setValue = useSetItem(setFieldValue, index);
  const setError = useSetItem(setFieldError, index);
  const setTouched = useSetItem(setFieldTouched, index);

  return useMemo(
    () => ({
      id: `${field.id}_${index}`,
      name: index,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched
    }),
    [field.id, index, value, error, touched, setValue, setError, setTouched]
  );
}
