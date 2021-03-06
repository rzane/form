import { useEffect, useMemo } from "react";
import { toPromise } from "./utilities/toPromise";
import { getAllTouched } from "./utilities/getAllTouched";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";
import {
  Form,
  ValidateOptions,
  ValidateFn,
  UseValidationOptions
} from "./types";

/**
 * Use a plain ol' function for validation.
 *
 * This hook can also be used to incorporate your favorite validation library.
 *
 * @example
 * const validation = useValidation(form, value => {
 *   if (!value.email) {
 *     return { valid: false, error: { email: "can't be blank" } };
 *   }
 *
 *   return { valid: true, value };
 * });
 */
export function useValidation<Value, Result>(
  form: Form<Value, Value>,
  fn: ValidateFn<Value, Result>,
  opts: UseValidationOptions = {}
): Form<Value, Result> {
  const isMounted = useMounted();
  const { onChange = true, onBlur = true } = opts;

  const validate = useEventCallback((opts: ValidateOptions = {}) => {
    form.setValidating(true);

    return toPromise(() => fn(form.value))
      .then(result => {
        const errors = result.valid ? undefined : result.error;

        if (isMounted.current) {
          form.setError(errors);

          if (opts.touch) {
            form.setTouched(getAllTouched(errors));
          }
        }

        return result;
      })
      .finally(() => {
        if (isMounted.current) {
          form.setValidating(false);
        }
      });
  });

  useEffect(() => {
    if (onChange) validate();
  }, [form.value, onChange, validate]);

  useEffect(() => {
    if (onBlur) validate();
  }, [form.touched, onBlur, validate]);

  return useMemo(() => ({ ...form, validate }), [form, validate]);
}
