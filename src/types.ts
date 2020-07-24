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

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface Fields<T> {
  values: T;
  setValues: SetState<T>;
  errors: FormErrors;
  setErrors: SetState<FormErrors>;
  touched: FormTouched;
  setTouched: SetState<FormTouched>;
}

export interface Form<T> extends Fields<T> {
  initialValues: T;
  initialErrors: FormErrors;
  initialTouched: FormTouched;
}

export interface Field<T> {
  value: T;
  setValue: SetState<T>;
  error: string | undefined;
  setError: SetState<string>;
  touched: boolean;
  setTouched: SetState<boolean>;
}
