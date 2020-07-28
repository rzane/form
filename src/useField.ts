import { useCallback } from "react";
import { transform } from "./utilities";
import { useIdentifier } from "./useIdentifier";
import { Field, FieldState, SetState } from "./types";

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
  form: FieldState<T>,
  name: K
): Field<T[K]> {
  return {
    id: `field-${useIdentifier()}`,
    name: name as string,
    value: form.value[name],
    error: get(form.error, name),
    touched: get(form.touched, name),
    setValue: useNested(form.setValue, name),
    setError: useNested(form.setError, name),
    setTouched: useNested(form.setTouched, name)
  };
}
