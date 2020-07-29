import { Transform } from "./types";

function isTransform<T>(value: T | Transform<T>): value is Transform<T> {
  return typeof value === "function";
}

export function transform<T>(next: T | Transform<T>, prev: T): T {
  return isTransform(next) ? next(prev) : next;
}

export function insert<T>(values: T[], index: number, value: T): T[] {
  const result = [...values];
  result.splice(index, 0, value);
  return result;
}

export function remove<T>(values: T[], index: number): T[] {
  const result = [...values];
  result.splice(index, 1);
  return result;
}
