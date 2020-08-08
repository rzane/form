import { useState, useEffect } from "react";
import { Validator, Valid, Invalid } from "@stackup/validate";
import { ValidateOptions, Form, Validate } from "./types";
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
  options: ValidateOptions
): Validate<Value, Result> {
  const isMounted = useMounted();
  const [isValidating, setValidating] = useState<boolean>(false);

  const execute = useEventCallback(async (touch?: boolean) => {
    setValidating(true);

    try {
      const result = await validator.validate(form.value).then(convert);
      const errors = result.valid ? undefined : result.error;
      if (isMounted) form.setError(errors);
      if (isMounted && touch) form.setTouched(getAllTouched(errors));
      return result;
    } finally {
      if (isMounted) setValidating(false);
    }
  });

  useEffect(() => {
    if (options.onChange) execute();
  }, [form.value, options.onChange, execute]);

  useEffect(() => {
    if (options.onBlur) execute();
  }, [form.touched, options.onBlur, execute]);

  return {
    execute,
    isValidating
  };
}
