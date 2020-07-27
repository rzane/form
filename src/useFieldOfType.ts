import { useField } from "./useField";
import { Form, Field, NamesOfType } from "./types";

export function useFieldOfType<T, V>(
  form: Form<T>,
  name: NamesOfType<T, V>
): Field<V> {
  return useField<any, any>(form, name);
}
