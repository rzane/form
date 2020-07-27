import { useNestedState } from "./useNestedState";
import { FormState, NestedField, FormErrors, FormTouched } from "./types";

const EMPTY = {};

export function useNestedField<T, K extends keyof T>(
  form: FormState<T>,
  name: K
): NestedField<T[K]> {
  return {
    name: name as string,
    values: form.values[name],
    errors: (form.errors[name] || EMPTY) as FormErrors<T[K]>,
    touched: (form.touched[name] || EMPTY) as FormTouched<T[K]>,
    setValues: useNestedState(form.setValues, name),
    setErrors: useNestedState(form.setErrors, name),
    setTouched: useNestedState(form.setTouched, name)
  };
}
