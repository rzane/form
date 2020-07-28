import { useCallback } from "react";
import { transform } from "./utilities";
import { Field, FieldMap } from "./types";
import { useIdentifier } from "./useIdentifier";

export function useField<T, K extends keyof T>(
  form: FieldMap<T>,
  name: K
): Field<T[K]> {
  const { setValue, setError, setTouched } = form;

  return {
    id: `field-${useIdentifier()}`,
    name: name as string,
    value: form.value[name],
    error: form.error?.[name],
    touched: form.touched?.[name],
    setValue: useCallback(
      value => {
        setValue(state => ({
          ...state,
          [name]: transform(value, state[name])
        }));
      },
      [name, setValue]
    ),
    setError: useCallback(
      error => {
        setError(state => ({
          ...state,
          [name]: transform(error, state?.[name])
        }));
      },
      [name, setError]
    ),
    setTouched: useCallback(
      touched => {
        setTouched(state => ({
          ...state,
          [name]: transform(touched, state?.[name])
        }));
      },
      [name, setTouched]
    )
  };
}
