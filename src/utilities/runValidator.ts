import { ValidationResult, Validator } from "../types";
import { setIn } from "./setIn";

function parsePath(path: string) {
  return path.split(".").map(key => {
    if (/^\d+$/.test(key)) {
      return parseInt(key, 10);
    } else {
      return key;
    }
  });
}

export function runValidator<V, R>(
  validator: Validator<V, R>,
  values: V
): Promise<ValidationResult<V, R>> {
  if (typeof validator === "function") {
    return Promise.resolve(validator(values));
  }

  if (
    "validate" in validator &&
    "validateSync" in validator &&
    "cast" in validator
  ) {
    return validator
      .validate(values)
      .then(result => ({
        valid: true as const,
        value: result
      }))
      .catch(error => {
        if (error.name !== "ValidationError") {
          throw error;
        }

        const inner = error.inner.length === 0 ? [error] : error.inner;
        const messages = inner.reduce(
          (acc: any, e: any) => setIn(acc, parsePath(e.path), e.message),
          undefined
        );

        return { valid: false as const, error: messages };
      });
  }

  if (
    "validate" in validator &&
    "resolve" in validator &&
    "reject" in validator
  ) {
    return validator.validate(values).then(result => {
      if (result.valid) {
        return result;
      }

      const error = result.errors.reduce(
        (error, err) => setIn(error, err.path, err.message),
        undefined
      );

      return { valid: false as const, error };
    });
  }

  throw new Error("The validator you provided is not supported.");
}
