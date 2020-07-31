import { useRef, useState, useMemo, useEffect } from "react";
import { useIdentifier } from "./useIdentifier";
import { FormOptions, Form } from "./types";
import { getAllTouched, useEventCallback } from "./utilities";

/**
 * Create a new form. A form requires an initial value, a function to validate,
 * and a submit handler.
 *
 * A form behaves just like any other field, but with some extra properties for
 * managing submission.
 *
 * The initial value for the form can be literally anything! Usually, it's an
 * object, but it could be any type of value.
 *
 * The `useForm` function takes two generic parameters. The first describes the
 * shape of your form state. The second is optional, but it describes the result
 * of casting your form state with a validator. The casted value is what will be
 * passed to `submit`.
 *
 * If your form doesn't require validation, see {@link useNoValidate}.
 *
 * @example
 * const form = useForm({
 *   initialValue: "",
 *   validate: useSchema(mySchema),
 *   submit: value => alert(`The value is ${value}`)
 * });
 */
export function useForm<Value, Result = Value>(
  options: FormOptions<Value, Result>
): Form<Value, Result> {
  const {
    submit: runSubmit,
    validate: runValidate,
    validateOnBlur,
    validateOnChange
  } = options;

  const id = useIdentifier(options.id);
  const initialValue = useRef(options.initialValue).current;
  const initialError = useRef(options.initialError).current;
  const initialTouched = useRef(options.initialTouched).current;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [touched, setTouched] = useState(initialTouched);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isValidating, setValidating] = useState(false);

  const executeValidate = async (touchAllErrors: boolean) => {
    setValidating(true);

    try {
      const result = await runValidate(value);
      const errors = result.valid ? undefined : result.error;

      // When submitting, touch all fields that have errors.
      if (touchAllErrors) {
        setTouched(getAllTouched(errors));
      }

      setError(errors);
      return result;
    } finally {
      setValidating(false);
    }
  };

  const validate = useEventCallback(() => {
    return executeValidate(false);
  });

  const submit = useEventCallback(async () => {
    setSubmitting(true);

    try {
      const result = await executeValidate(true);

      if (result.valid) {
        await runSubmit(result.value);
      }
    } finally {
      setSubmitting(false);
    }
  });

  const onSubmit = useEventCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      return submit();
    }
  );

  useEffect(() => {
    if (validateOnChange) {
      validate();
    }
  }, [value, validateOnChange, validate]);

  useEffect(() => {
    if (validateOnBlur) {
      validate();
    }
  }, [touched, validateOnBlur, validate]);

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
      validate,
      onSubmit
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
      validate,
      onSubmit
    ]
  );
}
