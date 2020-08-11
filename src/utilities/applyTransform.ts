import { Transform } from "../types";
function isTransform<T>(value: T | Transform<T>): value is Transform<T> {
  return typeof value === "function";
}

export function applyTransform<T>(next: T | Transform<T>, prev: T): T {
  return isTransform(next) ? next(prev) : next;
}
