import { useComponentId } from "./useComponentId";
import { useNestedState } from "./useNestedState";
import { Field, Form } from "./types";

export function useField<T, K extends keyof T>(
  form: Form<T>,
  name: K
): Field<T[K]> {
  return {
    id: `field-${useComponentId()}`,
    name: name as string,
    value: form.values[name],
    error: form.errors[name],
    touched: form.touched[name],
    setValue: useNestedState(form.setValues, name),
    setError: useNestedState(form.setErrors, name),
    setTouched: useNestedState(form.setTouched, name)
  };
}
