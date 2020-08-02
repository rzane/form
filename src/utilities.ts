import * as React from "react";
import { Transform, SetState } from "./types";

function isTransform<T>(value: T | Transform<T>): value is Transform<T> {
  return typeof value === "function";
}

function isObject(value: any): value is Object {
  return value !== null && typeof value === "object";
}

function transform<T>(next: T | Transform<T>, prev: T): T {
  return isTransform(next) ? next(prev) : next;
}

export function insertItem<T>(values: T[], index: number, value: T): T[] {
  const result = [...values];
  result.splice(index, 0, value);
  return result;
}

export function removeItem<T>(values: T[], index: number): T[] {
  const result = [...values];
  result.splice(index, 1);
  return result;
}

export function getProperty(data: any, key: any): any {
  return isObject(data) ? data[key] : undefined;
}

export function getItem(data: any, index: number): any {
  return Array.isArray(data) ? data[index] : undefined;
}

export function useSetProperty(
  setState: SetState<any>,
  name: any
): SetState<any> {
  return React.useCallback(
    update => {
      setState((state: any) => ({
        ...state,
        [name]: transform(update, getProperty(state, name))
      }));
    },
    [setState, name]
  );
}

export function useSetItem(
  setState: SetState<any>,
  index: number
): SetState<any> {
  return React.useCallback(
    update => {
      setState((state: any) => {
        const nextState = Array.isArray(state) ? [...state] : [];
        nextState[index] = transform(update, getItem(state, index));
        return nextState;
      });
    },
    [setState, index]
  );
}

export function getAllTouched(errors: any): any {
  if (errors === undefined) {
    return errors;
  }

  if (Array.isArray(errors)) {
    return errors.map(getAllTouched);
  }

  if (isObject(errors)) {
    const result: any = {};
    for (const key in errors) {
      result[key] = getAllTouched(errors[key]);
    }
    return result;
  }

  return true;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
    ? React.useLayoutEffect
    : React.useEffect;

export function useEventCallback<T extends (...args: any[]) => any>(fn: T): T {
  const ref: any = React.useRef(fn);

  // we copy a ref to the callback scoped to the current state/props on each render
  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  });

  return React.useCallback(
    (...args: any[]) => ref.current.apply(void 0, args),
    []
  ) as T;
}
