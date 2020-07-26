import { useComponentId } from "./useComponentId";
import { Form, Field } from "./types";

type Filter<T, V> = {
  [P in keyof T]: T[P] extends V ? P : never;
};

export type NamesOfType<T, V> = Filter<T, V>[keyof T];

export function useField<T, K extends keyof T>(
  fields: Form<T>,
  name: K
): Field<T[K]> {
  const componentId = useComponentId();

  return {
    id: `field-${componentId}`,
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

export function useFieldOfType<T, V>(
  fields: Form<T>,
  name: NamesOfType<T, V>
): Field<V> {
  return useField<any, any>(fields, name);
}
