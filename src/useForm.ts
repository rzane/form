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
    setValues: useCallback(values => dispatch({ type: "SET_VALUES", values }), [
      dispatch
    ]),
    setErrors: useCallback(errors => dispatch({ type: "SET_ERRORS", errors }), [
      dispatch
    ]),
    setTouched: useCallback(
      touched => dispatch({ type: "SET_TOUCHED", touched }),
      [dispatch]
    ),
    putValue: useCallback(
      (name, value) => dispatch({ type: "PUT_VALUE", name, value }),
      [dispatch]
    ),
    putError: useCallback(
      (name, error) => dispatch({ type: "PUT_ERROR", name, error }),
      [dispatch]
    ),
    putTouched: useCallback(
      (name, touched) => dispatch({ type: "PUT_TOUCHED", name, touched }),
      [dispatch]
    )
  };
}
