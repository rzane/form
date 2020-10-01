import { useRef, useState, useMemo } from "react";
import { useIdentifier } from "./useIdentifier";
import { UseFormOptions, Form, Submission } from "./types";
import { useEventCallback } from "./utilities/useEventCallback";

const initialSubmission: Submission = { count: 0 };

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
 * @example <caption>Form values can be primitive</caption>
 * const form = useForm({ initialValue: "" });
 *
 * @example <caption>But usually, they'll contain an object</caption>
 * const form = useForm({
 *   initialValue: {
 *     email: "",
 *     name: ""
 *   }
 * });
 */
export function useForm<Value>(options: UseFormOptions<Value>): Form<Value> {
  const id = useIdentifier(options.id);
  const initialValue = useRef(options.initialValue);
  const initialError = useRef(options.initialError);
  const initialTouched = useRef(options.initialTouched);

  const [value, setValue] = useState(initialValue.current);
  const [error, setError] = useState(initialError.current);
  const [touched, setTouched] = useState(initialTouched.current);
  const [isValidating, setValidating] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [submission, setSubmission] = useState(initialSubmission);

  const validate = useEventCallback(() => {
    return Promise.resolve({ value, valid: true as const });
  });

  const reset = useEventCallback(opts => {
    if (opts && "value" in opts) {
      initialValue.current = opts.value;
    }

    if (opts && "error" in opts) {
      initialError.current = opts.error;
    }

    if (opts && "touched" in opts) {
      initialTouched.current = opts.touched;
    }

    setValue(initialValue.current);
    setError(initialError.current);
    setTouched(initialTouched.current);
  });

  return useMemo(
    () => ({
      id: `form-${id}`,
      name: "form",
      initialValue: initialValue.current,
      initialError: initialError.current,
      initialTouched: initialTouched.current,
      value,
      error,
      touched,
      submission,
      isValidating,
      isSubmitting,
      setValue,
      setError,
      setTouched,
      setValidating,
      setSubmitting,
      setSubmission,
      reset,
      validate
    }),
    [
      id,
      initialValue,
      initialError,
      initialTouched,
      value,
      error,
      touched,
      submission,
      isValidating,
      isSubmitting,
      reset,
      validate
    ]
  );
}
