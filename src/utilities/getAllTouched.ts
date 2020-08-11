import { isPlainObject } from "./isPlainObject";

/**
 * @private
 *
 * Usually, an error message is only shown if a field has been touched. So,
 * when the form is submitted, we'll mark all erroneous fields as having
 * been touched.
 *
 * This function iterates over errors, replacing each error with `true`.
 */
export function getAllTouched(errors: any): any {
  if (errors === undefined) {
    return errors;
  }

  if (Array.isArray(errors)) {
    return errors.map(getAllTouched);
  }

  if (isPlainObject(errors)) {
    const result: any = {};
    for (const key in errors) {
      result[key] = getAllTouched(errors[key]);
    }
    return result;
  }

  return true;
}
