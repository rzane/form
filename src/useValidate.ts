import { useEffect } from "react";
import { Validator, Valid, Invalid } from "@stackup/validate";
import { ValidationMode, Form, Validate, ValidateOptions } from "./types";
import { useEventCallback, useMounted, getAllTouched } from "./utilities";

function isNumber(value: any): value is number {
  return typeof value === "number";
}

// Adapted from https://github.com/lukeed/dset
// prettier-ignore
function setIn(obj: any, keys: Array<string | number>, val: any) {
  let i = 0, l = keys.length, t = obj, x;
  for (; i < l; ++i) {
    x = t[keys[i]];
    t = t[keys[i]] = (i === l - 1 ? val : (x != null ? x : isNumber(keys[i+1]) ? [] : {}));
  }
  return obj
}

function convert<T>(result: Valid<T> | Invalid): any {
  if (result.valid) {
    return result;
  }

  return {
    valid: false,
    error: result.errors.reduce(
      (error, err) => setIn(error, err.path, err.message),
      {}
    )
  };
}

export function useValidate<Value, Result>(
  form: Form<Value>,
  validator: Validator<Value, Result>,
  mode: ValidationMode = {}
): Validate<Value, Result> {
  const isMounted = useMounted();

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
    if (mode.onChange) execute();
  }, [form.value, mode.onChange, execute]);

  useEffect(() => {
    if (mode.onBlur) execute();
  }, [form.touched, mode.onBlur, execute]);

  return { form, execute };
}
