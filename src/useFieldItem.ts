import { useCallback } from "react";
import { transform, remove } from "./utilities";
import { Field, FieldItem, SetState } from "./types";

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

export function useFieldItem<T>(
  field: Field<T[]>,
  index: number
): FieldItem<T> {
  const { setValue } = field;

  return {
    id: `${field.id}_${index}`,
    name: index.toString(),
    value: field.value[index],
    error: get(field.error, index),
    touched: get(field.touched, index),
    setValue: useNested(field.setValue, index),
    setError: useNested(field.setError, index),
    setTouched: useNested(field.setTouched, index),
    remove: useCallback(() => setValue(values => remove(values, index)), [
      index,
      setValue
    ])
  };
}
