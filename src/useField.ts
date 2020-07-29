import { Field } from "./types";
import { getProperty, useSetProperty } from "./utilities";

export function useField<T, K extends keyof T>(
  field: Field<T>,
  name: K
): Field<T[K]> {
  return {
    id: `${field.id}_${name}`,
    name: name as string,
    value: field.value[name],
    error: getProperty(field.error, name),
    touched: getProperty(field.touched, name),
    setValue: useSetProperty(field.setValue, name),
    setError: useSetProperty(field.setError, name),
    setTouched: useSetProperty(field.setTouched, name)
  };
}
