import * as React from "react";
import { FormOptions, Form } from "./types";

export function useForm<T>(options: FormOptions<T>): Form<T> {
  const initialValues = React.useRef(options.initialValues).current;
  const [values, setValues] = React.useState(initialValues);

  const initialTouched = React.useRef(options.initialTouched ?? {}).current;
  const [touched, setTouched] = React.useState(initialTouched);

  return {
    initialValues,
    values,
    setValues,

    initialTouched,
    touched,
    setTouched
  };
}
