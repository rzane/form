import { useCallback } from "react";
import { Validate } from "./types";

interface Valid<Result> {
  valid: true;
  value: Result;
}

interface Invalid {
  valid: false;
  errors: Problem[];
}

interface Problem {
  path: Array<string | number>;
  message: string;
}

interface Validator<Value, Result> {
  validate(values: Value): Promise<Valid<Result> | Invalid>;
}

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

/**
 * Use a validation schema produced by {@link https://github.com/rzane/validate @stackup/validate}
 *
 * @example
 * import { useForm, useValidator } from "@stackup/form";
 * import { schema, assert, isString } from "@stackup/validate";
 *
 * const validator = schema({
 *   name: assert(isString)
 * });
 *
 * const form = useForm({
 *   submit: createUser,
 *   validate: useValidator(validator),
 *   initialValue: { name: "" }
 * });
 */
export function useValidator<Value, Result>(
  validator: Validator<Value, Result>
): Validate<Value, Result> {
  return useCallback(values => validator.validate(values).then(convert), [
    validator
  ]);
}
