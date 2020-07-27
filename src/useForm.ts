import { useRef, useState } from "react";
import { FormOptions, Form } from "./types";

export function useForm<T>(options: FormOptions<T>): Form<T> {
  const initialValue = useRef(options.initialValue).current;
  const initialError = useRef(options.initialError ?? {}).current;
  const initialTouched = useRef(options.initialTouched ?? {}).current;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [touched, setTouched] = useState(initialTouched);

  return {
    initialValue,
    initialError,
    initialTouched,
    value,
    error,
    touched,
    setValue,
    setError,
    setTouched
  };
}
