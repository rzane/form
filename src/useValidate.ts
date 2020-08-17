import { useValidation } from "./useValidation";
import { setIn, Path } from "./utilities/setIn";
import { Form, UseValidationOptions } from "./types";

interface Problem {
  message: string;
  path: Path;
}

type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; errors: Problem[] };

interface Validator<T, R> {
  validate(value: T): Promise<ValidationResult<R>>;
}

function convert<T>(result: ValidationResult<T>): any {
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
  form: Form<Value, Value>,
  validator: Validator<Value | unknown, Result>,
  opts?: UseValidationOptions
): Form<Value, Result> {
  return useValidation(
    form,
    value => validator.validate(value).then(convert),
    opts
  );
}
