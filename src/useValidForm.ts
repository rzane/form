import { useEffect, useMemo } from "react";
import { useForm } from "./useForm";
import { Form, UseValidFormOptions, ValidateOptions } from "./types";
import { useMounted } from "./utilities/useMounted";
import { useEventCallback } from "./utilities/useEventCallback";
import { toPromise } from "./utilities/toPromise";
import { getAllTouched } from "./utilities/getAllTouched";

export function useValidForm<Value, Result>(
  options: UseValidFormOptions<Value, Result>
): Form<Value, Result> {
  const form = useForm<Value>(options);
  const isMounted = useMounted();

  const {
    validate: fn,
    validateOnChange = true,
    validateOnBlur = true
  } = options;

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
    if (validateOnChange) validate();
  }, [form.value, validateOnChange, validate]);

  useEffect(() => {
    if (validateOnBlur) validate();
  }, [form.touched, validateOnBlur, validate]);

  return useMemo(() => ({ ...form, validate }), [form, validate]);
}
