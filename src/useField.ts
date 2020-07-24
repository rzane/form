import { Fields, Field } from "./types";

export function useField<T, K extends keyof T>(
  fields: Fields<T>,
  name: K
): Field<T[K]> {
  return {
    name: name as string,
    value: fields.values[name],
    error: fields.errors[name] as string,
    touched: fields.touched[name] as boolean,
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
