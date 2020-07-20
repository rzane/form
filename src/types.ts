export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface FormOptions<T> {
  initialValues: T;
  initialErrors?: FormErrors;
  initialTouched?: FormTouched;
}

export interface Form<T> {
  initialValues: T;
  values: T;
  setValues: (values: T) => void;

  initialErrors: FormErrors;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;

  initialTouched: FormTouched;
  touched: FormTouched;
  setTouched: (touched: FormTouched) => void;
}
