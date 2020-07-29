import { Transform, SetState } from "./types";
import { useCallback } from "react";

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

export function getProperty(data: any, key: any): any {
  return data && typeof data === "object" ? data[key] : undefined;
}

export function getItem(data: any, index: number): any {
  return Array.isArray(data) ? data[index] : undefined;
}

export function useSetProperty(
  setState: SetState<any>,
  name: any
): SetState<any> {
  return useCallback(
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
  return useCallback(
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
