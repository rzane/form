import { useCallback } from "react";
import { transform } from "./utilities";
import { useIdentifier } from "./useIdentifier";
import { Field, FieldList, SetState } from "./types";

function get(data: any, index: number): any {
  return Array.isArray(data) ? data[index] : undefined;
}

function useNested(setState: SetState<any>, index: number): SetState<any> {
  return useCallback(
    update => {
      setState((state: any) => {
        const nextState = Array.isArray(state) ? [...state] : [];
        nextState[index] = transform(update, get(state, index));
        return nextState;
      });
    },
    [setState, index]
  );
}

export function useFieldItem<T>(form: FieldList<T>, index: number): Field<T> {
  return {
    id: `field-${useIdentifier()}`,
    name: index.toString(),
    value: form.value[index],
    error: get(form.error, index),
    touched: get(form.touched, index),
    setValue: useNested(form.setValue, index),
    setError: useNested(form.setError, index),
    setTouched: useNested(form.setTouched, index)
  };
}
