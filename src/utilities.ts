import { Transform, SetState } from "./types";
import { useCallback, useMemo } from "react";

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

function getProperty(data: any, key: any): any {
  return isObject(data) ? data[key] : undefined;
}

function getItem(data: any, index: number): any {
  return Array.isArray(data) ? data[index] : undefined;
}

export function useGetProperty(data: any, key: any): any {
  return useMemo(() => getProperty(data, key), [data, key]);
}

export function useGetItem(data: any, index: number): any {
  return useMemo(() => getItem(data, index), [data, index]);
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
