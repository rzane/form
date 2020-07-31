import { useMemo } from "react";
import { FormField } from "./types";
import { useGetProperty, useSetProperty } from "./utilities";

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
  const value = useGetProperty(field.value, name);
  const error = useGetProperty(field.error, name);
  const touched = useGetProperty(field.touched, name);

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
      setTouched
    }),
    [field.id, error, touched, value, name, setError, setTouched, setValue]
  );
}
