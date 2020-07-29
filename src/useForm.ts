import { useRef, useState, useCallback, useMemo } from "react";
import { useIdentifier } from "./useIdentifier";
import { FormOptions, Form } from "./types";

export function useForm<T, R = T>(options: FormOptions<T, R>): Form<T> {
  const { validate, submit } = options;

  const id = useIdentifier();
  const initialValue = useRef(options.initialValue).current;
  const initialError = useRef(options.initialError).current;
  const initialTouched = useRef(options.initialTouched).current;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [touched, setTouched] = useState(initialTouched);

  const [isSubmitting, setSubmitting] = useState(false);

  const executeSubmit = useCallback(() => {
    setSubmitting(true);
    setError(undefined);

    return Promise.resolve(validate(value))
      .then(result => {
        if ("error" in result) {
          setError(result.error);
        } else {
          return submit(result.value);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  }, [value, submit, validate]);

  return useMemo(
    () => ({
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
      setTouched,
      isSubmitting,
      submit: executeSubmit
    }),
    [
      id,
      value,
      error,
      touched,
      initialError,
      initialTouched,
      initialValue,
      isSubmitting,
      executeSubmit
    ]
  );
}
