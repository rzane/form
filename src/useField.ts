import { Fields, Field } from "./types";

export function useField<T, K extends keyof T>(
  parent: Fields<T>,
  name: K
): Field<T[K]> {
  return {
    value: parent.values[name],
    error: parent.errors[name] as string,
    touched: parent.touched[name] as boolean,
    setValue(value) {
      parent.setValues({ ...parent.values, [name]: value });
    },
    setTouched(touched) {
      parent.setTouched({ ...parent.touched, [name]: touched });
    },
    setError(error) {
      parent.setErrors({ ...parent.errors, [name]: error });
    }
  };
}
