import { FormState, FormAction } from "./types";

export function reducer<T, K extends keyof T>(
  state: FormState<T>,
  action: FormAction<T, K>
): FormState<T> {
  switch (action.type) {
    case "SET_VALUES":
      return { ...state, values: action.values };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "SET_TOUCHED":
      return { ...state, touched: action.touched };
    case "PUT_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value }
      };
    case "PUT_ERROR":
      return {
        ...state,
        errors: { ...state.values, [action.name]: action.error }
      };
    case "PUT_TOUCHED":
      return {
        ...state,
        touched: { ...state.touched, [action.name]: action.touched }
      };
  }
}
