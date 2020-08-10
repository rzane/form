import { Validator, Result } from "@stackup/validate";
import { useValidation } from "./useValidation";
import { Form, ValidationMode, Validate } from "./types";

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

function convert<T>(result: Result<T>): any {
  if (result.valid) {
    return result;
  }

  const error = result.errors.reduce(
    (error, err) => setIn(error, err.path, err.message),
    undefined
  );

  return { valid: false, error };
}

/**
 * Add validation to the form using {@link https://github.com/rzane/validate @stackup/validate}.
 *
 * @example
 * const validator = schema({
 *   email: assert(isString).then(refute(isBlank))
 * });
 *
 * const validate = useValidate(form, validator);
 */
export function useValidate<Value, Result>(
  form: Form<Value>,
  validator: Validator<Value, Result>,
  mode?: ValidationMode
): Validate<Value, Result> {
  return useValidation(
    form,
    value => validator.validate(value).then(convert),
    mode
  );
}
