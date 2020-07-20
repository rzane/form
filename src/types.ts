export interface FormOptions<T> {
  initialValues: T;
}

export interface Form<T> {
  initialValues: T;
  values: T;
  setValues: (values: T) => void;
}
