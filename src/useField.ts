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
    value: form.value[name],
    error: form.error[name],
    touched: form.touched[name],
    setValue: useNestedState(form.setValue, name),
    setError: useNestedState(form.setError, name),
    setTouched: useNestedState(form.setTouched, name)
  };
}
