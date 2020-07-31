import { useCallback } from "react";
import { Validate } from "./types";

/**
 * This can be used to create a form that doesn't require any validation.
 *
 * @example
 * const form = useForm({
 *   submit: createUser,
 *   validate: useNoValidate(),
 *   initialValue: { name: "" }
 * });
 */
export function useNoValidate<Value>(): Validate<Value, Value> {
  return useCallback(value => ({ valid: true, value }), []);
}
