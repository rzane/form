import { Transform } from "./types";

export function isTransform<T>(value: T | Transform<T>): value is Transform<T> {
  return typeof value === "function";
}

export function transform<T>(next: T | Transform<T>, prev: T): T {
  return isTransform(next) ? next(prev) : next;
}
