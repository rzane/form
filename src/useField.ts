import { useCallback } from "react";
import { useComponentId } from "./useComponentId";
import { Form, Field, SetState, Transform } from "./types";

const isTransform = <T>(value: SetState<T>): value is Transform<T> => {
  return typeof value === "function";
};

const useNestedState = <T, K extends keyof T>(
  setState: (values: SetState<T>) => void,
  name: K
) => {
  return useCallback(
    update => {
      setState(state => ({
        ...state,
        [name]: isTransform(update) ? update(state[name]) : update
      }));
    },
    [setState, name]
  );
};

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
    setValue: useNestedState(setValues, name),
    setError: useNestedState(setErrors, name),
    setTouched: useNestedState(setTouched, name)
  };
}
