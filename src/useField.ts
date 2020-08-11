import { useMemo, useCallback } from "react";
import { FormField, SetState } from "./types";
import { isPlainObject } from "./utilities/isPlainObject";
import { applyTransform } from "./utilities/applyTransform";

function getProperty(data: any, key: any): any {
  return isPlainObject(data) ? data[key] : undefined;
}

function useSetProperty(setState: SetState<any>, name: any): SetState<any> {
  return useCallback(
    update => {
      setState((state: any) => ({
        ...state,
        [name]: applyTransform(update, getProperty(state, name))
      }));
    },
    [setState, name]
  );
}

/**
 * Create a field for a given property.
 *
 * @example
 * const form = useForm({
 *   initialValue: {
 *     email: "",
 *     profile: { name: "" } }
 *   }
 * });
 *
 * const email = useField(form, "email");
 * const profile = useField(form, "profile");
 * const name = useField(profile, "name");
 */
export function useField<Value, Name extends keyof Value>(
  field: FormField<Value>,
  name: Name
): FormField<Value[Name]> {
  const value = getProperty(field.value, name);
  const error = getProperty(field.error, name);
  const touched = getProperty(field.touched, name);

  const setValue = useSetProperty(field.setValue, name);
  const setError = useSetProperty(field.setError, name);
  const setTouched = useSetProperty(field.setTouched, name);

  return useMemo(
    () => ({
      id: `${field.id}_${name}`,
      name: name as string,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched,
      isSubmitting: field.isSubmitting,
      isValidating: field.isValidating
    }),
    [
      field.id,
      field.isSubmitting,
      field.isValidating,
      name,
      value,
      error,
      touched,
      setValue,
      setError,
      setTouched
    ]
  );
}
