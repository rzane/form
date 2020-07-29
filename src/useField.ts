import { useCallback } from "react";
import { transform } from "./utilities";
import { Field, SetState } from "./types";

function get(data: any, key: any): any {
  return data && typeof data === "object" ? data[key] : undefined;
}

function useNested(setState: SetState<any>, name: any): SetState<any> {
  return useCallback(
    update => {
      setState((state: any) => ({
        ...state,
        [name]: transform(update, get(state, name))
      }));
    },
    [setState, name]
  );
}

export function useField<T, K extends keyof T>(
  field: Field<T>,
  name: K
): Field<T[K]> {
  return {
    id: `${field.id}_${name}`,
    name: name as string,
    value: field.value[name],
    error: get(field.error, name),
    touched: get(field.touched, name),
    setValue: useNested(field.setValue, name),
    setError: useNested(field.setError, name),
    setTouched: useNested(field.setTouched, name)
  };
}
