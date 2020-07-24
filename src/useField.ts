import { Fields, Field } from "./types";

type Filter<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
};

export type KeysOfType<T, V> = Filter<T, V>[keyof T];

export function useField<T, K extends keyof T>(
  fields: Fields<T>,
  name: K
): Field<T[K]> {
  return {
    name: name as string,
    value: fields.values[name],
    error: fields.errors[name],
    touched: fields.touched[name],
    setValue(value) {
      fields.setValues({ ...fields.values, [name]: value });
    },
    setTouched(touched) {
      fields.setTouched({ ...fields.touched, [name]: touched });
    },
    setError(error) {
      fields.setErrors({ ...fields.errors, [name]: error });
    }
  };
}

export function useTypedField<T, V>(
  fields: Fields<T>,
  name: KeysOfType<T, V>
): Field<V> {
  return useField<any, any>(fields, name);
}