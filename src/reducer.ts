import { FormState, FormAction } from "./types";

export function reducer<T, K extends keyof T>(
  state: FormState<T>,
  action: FormAction<T, K>
): FormState<T> {
  switch (action.type) {
    case "SET_VALUES":
      return { ...state, values: action.payload };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    case "SET_TOUCHED":
      return { ...state, touched: action.payload };
    case "PUT_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value
        }
      };
    case "PUT_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.name]: action.payload.error
        }
      };
    case "PUT_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.name]: action.payload.touched
        }
      };
  }
}
