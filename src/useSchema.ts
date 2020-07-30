import { useCallback } from "react";
import { Validate } from "./types";

interface Valid<T> {
  valid: true;
  value: T;
}

interface Invalid {
  valid: false;
  errors: Problem[];
}

interface Problem {
  path: Array<string | number>;
  message: string;
}

interface Schema<T, R> {
  validate(values: T): Promise<Valid<R> | Invalid>;
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
}

function convert<T>(result: Valid<T> | Invalid): any {
  if (result.valid) {
    const { value } = result;
    return { value };
  }

  const error: any = {};
  for (const err of result.errors) {
    setIn(error, err.path, err.message);
  }
  return { error };
}

/**
 * Use a validation schema produced by `@stackup/validate`
 */
export function useSchema<T, R>(schema: Schema<T, R>): Validate<T, R> {
  return useCallback(values => schema.validate(values).then(convert), [schema]);
}
