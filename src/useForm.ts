import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { useIdentifier } from "./useIdentifier";
import { FormOptions, Form } from "./types";
import { getAllTouched } from "./utilities";

export function useForm<T, R = T>(options: FormOptions<T, R>): Form<T, R> {
  const { validate: runValidate, submit: runSubmit } = options;

  const id = useIdentifier();
  const initialValue = useRef(options.initialValue).current;
  const initialError = useRef(options.initialError).current;
  const initialTouched = useRef(options.initialTouched).current;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [touched, setTouched] = useState(initialTouched);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const validate = useCallback(async () => {
    setValidating(true);

    try {
      const result = await runValidate(value);
      const errors = result.valid ? undefined : result.error;
      setTouched(getAllTouched(errors));
      setError(errors);
      return result;
    } finally {
      setValidating(false);
    }
  }, [value, runValidate]);

  const submit = useCallback(async () => {
    setSubmitting(true);

    try {
      const result = await validate();
      if (result.valid) await runSubmit(result.value);
    } finally {
      setSubmitting(false);
    }
  }, [validate, runSubmit]);

  useEffect(() => {
    if (options.validateOnChange) validate();
  }, [value, validate, options.validateOnChange]);

  useEffect(() => {
    if (options.validateOnBlur) validate();
  }, [touched, validate, options.validateOnBlur]);

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
      isValidating,
      submit,
      validate
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
      isValidating,
      submit,
      validate
    ]
  );
}
