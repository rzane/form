import { Transform } from "./types";

export const isTransform = <T>(
  value: T | Transform<T>
): value is Transform<T> => {
  return typeof value === "function";
};

export const transform = <T>(next: T | Transform<T>, prev: T): T => {
  if (isTransform(next)) {
    return next(prev);
  }

  return next;
};
