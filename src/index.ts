import * as React from "react";
import { isEvent } from "./utilities";
import { Valid } from "@stackup/validate";
import { FormOptions, Form, Field } from "./types";

export function useForm<T, R>(options: FormOptions<T, R>): Form<T> {
  const { validate, onSubmit } = options;

  const initialValues = React.useRef(options.initialValues).current;
  const [values, setValues] = React.useState(initialValues);

  const useField = <K extends keyof T>(key: K): Field<T[K]> => {
    const setValue = React.useCallback(
      (value: T[K]) => setValues(state => ({ ...state, [key]: value })),
      [key]
    );

    return {
      value: values[key],
      setValue
    };
  };

  const reset = React.useCallback(() => {
    setValues(initialValues);
  }, [setValues, initialValues]);

  const submit = React.useCallback(
    async (event?: Event) => {
      if (isEvent(event)) {
        event.preventDefault();
      }

      const result = await validate(values);

      if (result.valid) {
        await onSubmit(result.value);
      }
    },
    [validate, values, onSubmit]
  );

  return {
    initialValues,
    values,
    setValues,
    useField,
    submit,
    reset
  };
}

export const noValidate = <T>(value: T): Promise<Valid<T>> => {
  return Promise.resolve({ valid: true, value });
};
