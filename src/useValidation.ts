import { useEffect } from "react";
import { getAllTouched } from "./utilities/getAllTouched";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";
import {
  ValidationMode,
  Form,
  Validate,
  ValidateOptions,
  ValidateFn
} from "./types";

/**
 * Use a plain ol' function for validation.
 *
 * This hook can also be used to incorporate your favorite validation library.
 *
 * @example
 * const validate = useValidation(form, value => {
 *   if (!value.email) {
 *     return { valid: false, error: { email: "can't be blank" } };
 *   }
 *
 *   return { valid: true, value };
 * });
 */
export function useValidation<Value, Result>(
  form: Form<Value>,
  validate: ValidateFn<Value, Result>,
  mode: ValidationMode = {}
): Validate<Value, Result> {
  const isMounted = useMounted();
  const { onChange = true, onBlur = true } = mode;

  const execute = useEventCallback(async (opts: ValidateOptions = {}) => {
    form.setValidating(true);

    try {
      const result = await validate(form.value);
      const errors = result.valid ? undefined : result.error;

      if (isMounted) form.setError(errors);
      if (isMounted && opts.touch) form.setTouched(getAllTouched(errors));

      return result;
    } finally {
      if (isMounted) form.setValidating(false);
    }
  });

  useEffect(() => {
    if (onChange) execute();
  }, [form.value, onChange, execute]);

  useEffect(() => {
    if (onBlur) execute();
  }, [form.touched, onBlur, execute]);

  return { form, execute };
}
