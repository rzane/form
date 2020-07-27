import { FormOptions, Form } from "./types";
import { useRef, useState } from "react";

export function useForm<T>(options: FormOptions<T>): Form<T> {
  const initialValues = useRef(options.initialValues).current;
  const initialTouched = useRef(options.initialTouched ?? {}).current;
  const initialErrors = useRef(options.initialErrors ?? {}).current;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);

  return {
    initialValues,
    initialErrors,
    initialTouched,
    values,
    errors,
    touched,
    setValues,
    setErrors,
    setTouched
  };
}
