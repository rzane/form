import { useCallback } from "react";
import { Validate } from "./types";

/**
 * This can be used to create a form that doesn't require
 * any validation. Granted, this is kind of stupid, but
 * it does make the types in this library significantly
 * simpler.
 */
export function useNoValidate<T>(): Validate<T, T> {
  return useCallback(value => ({ valid: true, value }), []);
}
