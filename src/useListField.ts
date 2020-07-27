import { useCallback } from "react";
import { useNestedState } from "./useNestedState";
import { FormState, ListField, NamesOfType } from "./types";

const EMPTY: any[] = [];

export function useListField<T, K extends NamesOfType<T, any[]>>(
  form: FormState<T>,
  name: K
): ListField<T[K]> {
  const { setValues } = form;

  return {
    name: name as string,
    values: form.values[name],
    errors: (form.errors[name] || EMPTY) as any,
    touched: (form.touched[name] || EMPTY) as any,
    setValues: useNestedState(form.setValues, name),
    setErrors: useNestedState(form.setErrors, name),
    setTouched: useNestedState(form.setTouched, name),
    addItem: useCallback(
      item => {
        setValues(values => {
          const value: T[K][] = values[name];
          const nextValue = value.concat(item);
          return { ...values, [name]: nextValue };
        });
      },
      [name, setValues]
    ),
    removeItem: useCallback(
      index => {
        setValues(values => {
          const value: T[K][] = values[name];
          const nextValue = [...value];
          nextValue.splice(index, 1);
          return { ...values, [name]: value };
        });
      },
      [name, setValues]
    )
  };
}
