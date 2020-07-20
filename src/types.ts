export interface FormTouched {
  [key: string]: boolean;
}

export interface FormOptions<T> {
  initialValues: T;
  initialTouched?: FormTouched;
}

export interface Form<T> {
  initialValues: T;
  values: T;
  setValues: (values: T) => void;

  initialTouched: FormTouched;
  touched: FormTouched;
  setTouched: (touched: FormTouched) => void;
}
