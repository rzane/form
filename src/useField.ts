import { useCallback } from "react";
import { transform } from "./utilities";
import { Field, Fields } from "./types";
import { useComponentId } from "./useComponentId";

export function useField<T, K extends keyof T>(
  form: Fields<T>,
  name: K
): Field<T[K]> {
  const { setValue, setError, setTouched } = form;

  return {
    id: `field-${useComponentId()}`,
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
