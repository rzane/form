import { useRef, useState, useMemo } from "react";
import { useIdentifier } from "./useIdentifier";
import { UseFormOptions, Form } from "./types";

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
 *   validate: useValidator(validator),
 *   submit: value => alert(`The value is ${value}`)
 * });
 */
export function useForm<Value>(options: UseFormOptions<Value>): Form<Value> {
  const id = useIdentifier(options.id);
  const initialValue = useRef(options.initialValue).current;
  const initialError = useRef(options.initialError).current;
  const initialTouched = useRef(options.initialTouched).current;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);
  const [touched, setTouched] = useState(initialTouched);
  const [isValidating, setValidating] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

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
      isValidating,
      isSubmitting,
      setValue,
      setError,
      setTouched,
      setValidating,
      setSubmitting
    }),
    [
      id,
      initialValue,
      initialError,
      initialTouched,
      value,
      error,
      touched,
      isValidating,
      isSubmitting
    ]
  );
}
