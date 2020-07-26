import { reducer } from "./reducer";
import { FormOptions, Form, FormReducer } from "./types";
import { useRef, useReducer, useCallback } from "react";

export function useForm<T>(options: FormOptions<T>): Form<T> {
  const initialValues = useRef(options.initialValues).current;
  const initialTouched = useRef(options.initialTouched ?? {}).current;
  const initialErrors = useRef(options.initialErrors ?? {}).current;

  const [state, dispatch] = useReducer<FormReducer<T>>(reducer, {
    values: initialValues,
    errors: initialErrors,
    touched: initialTouched
  });

  return {
    ...state,
    initialValues,
    initialErrors,
    initialTouched,
    setValues: useCallback(
      values => dispatch({ type: "form/setValues", values }),
      [dispatch]
    ),
    setErrors: useCallback(
      errors => dispatch({ type: "form/setErrors", errors }),
      [dispatch]
    ),
    setTouched: useCallback(
      touched => dispatch({ type: "form/setTouched", touched }),
      [dispatch]
    ),
    setFieldValue: useCallback(
      (name, value) => dispatch({ type: "field/setValue", name, value }),
      [dispatch]
    ),
    setFieldError: useCallback(
      (name, error) => dispatch({ type: "field/setError", name, error }),
      [dispatch]
    ),
    setFieldTouched: useCallback(
      (name, touched) => dispatch({ type: "field/setTouched", name, touched }),
      [dispatch]
    )
  };
}
