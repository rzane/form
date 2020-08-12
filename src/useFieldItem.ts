import { useMemo, useCallback } from "react";
import { FormField, SetState } from "./types";
import { applyTransform } from "./utilities/applyTransform";

function getItem(data: any, index: number): any {
  return Array.isArray(data) ? data[index] : undefined;
}

function useSetItem(setState: SetState<any>, index: number): SetState<any> {
  return useCallback(
    update => {
      setState((state: any) => {
        const nextState = Array.isArray(state) ? [...state] : [];
        nextState[index] = applyTransform(update, getItem(state, index));
        return nextState;
      });
    },
    [setState, index]
  );
}

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
  const value = getItem(field.value, index);
  const error = getItem(field.error, index);
  const touched = getItem(field.touched, index);

  const setValue = useSetItem(field.setValue, index);
  const setError = useSetItem(field.setError, index);
  const setTouched = useSetItem(field.setTouched, index);

  return useMemo(
    () => ({
      id: `${field.id}_${index}`,
      name: index,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched,
      isValidating: field.isValidating,
      isSubmitting: field.isSubmitting
    }),
    [
      field.id,
      field.isValidating,
      field.isSubmitting,
      index,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched
    ]
  );
}
