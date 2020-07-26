import { FormState, FormAction } from "./types";

export function reducer<T, K extends keyof T>(
  state: FormState<T>,
  action: FormAction<T, K>
): FormState<T> {
  switch (action.type) {
    case "form/setValues":
      return { ...state, values: action.values };
    case "form/setErrors":
      return { ...state, errors: action.errors };
    case "form/setTouched":
      return { ...state, touched: action.touched };
    case "field/setValue":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value }
      };
    case "field/setError":
      return {
        ...state,
        errors: { ...state.values, [action.name]: action.error }
      };
    case "field/setTouched":
      return {
        ...state,
        touched: { ...state.touched, [action.name]: action.touched }
      };
  }
}
