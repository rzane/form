import { useEffect } from "react";
import { Validator, Valid, Invalid } from "@stackup/validate";
import { ValidationMode, Form, Validate, ValidateOptions } from "./types";
import { useEventCallback, useMounted, getAllTouched } from "./utilities";

function isNumber(value: any): value is number {
  return typeof value === "number";
}

// Adapted from https://github.com/lukeed/dset
// prettier-ignore
function setIn(data: any, keys: Array<string | number>, val: any) {
  let i = 0, l = keys.length, t = data, x;
  for (; i < l; ++i) {
    x = t[keys[i]];
    t = t[keys[i]] = (i === l - 1 ? val : (x != null ? x : isNumber(keys[i+1]) ? [] : {}));
  }
  return data;
}

function convert(result: Valid<any> | Invalid): any {
  if (result.valid) {
    return result;
  }

  const error = result.errors.reduce(
    (error, err) => setIn(error, err.path, err.message),
    {}
  );

  return { valid: false, error };
}

/**
 * Add validation to the form using {@link https://github.com/rzane/validate @stackup/validate}.
 */
export function useValidation<Value, Result>(
  form: Form<Value>,
  validator: Validator<Value, Result>,
  mode: ValidationMode = {}
): Validate<Value, Result> {
  const isMounted = useMounted();
  const { onChange = true, onBlur = true } = mode;

  const execute = useEventCallback(async (opts: ValidateOptions = {}) => {
    form.setValidating(true);

    try {
      const result = await validator.validate(form.value).then(convert);
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
