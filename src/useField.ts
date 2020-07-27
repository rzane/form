import { useCallback } from "react";
import { useComponentId } from "./useComponentId";
import { Form, Field, SetState } from "./types";

type Filter<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
};

export type NamesOfType<T, V> = Filter<T, V>[keyof T];

function apply<T>(next: SetState<T>, prev: T) {
  return typeof next === "function" ? (next as any)(prev) : next;
}

export function useField<T, K extends keyof T>(
  form: Form<T>,
  name: K
): Field<T[K]> {
  const componentId = useComponentId();
  const { setValues, setErrors, setTouched } = form;

  return {
    id: `field-${componentId}`,
    name: name as string,
    value: form.values[name],
    error: form.errors[name],
    touched: form.touched[name],
    setValue: useCallback(
      value =>
        setValues(values => ({
          ...values,
          [name]: apply(value, values[name])
        })),
      [setValues, name]
    ),
    setError: useCallback(
      error => setErrors(values => ({ ...values, [name]: error })),
      [setErrors, name]
    ),
    setTouched: useCallback(
      touched => setTouched(values => ({ ...values, [name]: touched })),
      [setTouched, name]
    )
  };
}

export function useFieldOfType<T, V>(
  fields: Form<T>,
  name: NamesOfType<T, V>
): Field<V> {
  return useField<any, any>(fields, name);
}
