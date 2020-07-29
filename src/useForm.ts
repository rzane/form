import { useRef, useState } from "react";
import { useIdentifier } from "./useIdentifier";
import { FormOptions, Form } from "./types";

export function useForm<T>(options: FormOptions<T>): Form<T> {
  const id = useIdentifier();
  const initialValue = useRef(options.initialValue).current;
  const initialError = useRef(options.initialError).current;
  const initialTouched = useRef(options.initialTouched).current;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [touched, setTouched] = useState(initialTouched);

  return {
    id: `form-${id}`,
    name: "form",
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
