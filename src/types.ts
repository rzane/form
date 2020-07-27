export type FieldErrors<T> = T extends any[]
  ? T[number] extends object
    ? FormErrors<T[number]>[] | string | string[]
    : string | string[]
  : T extends object
  ? FormErrors<T>
  : string;

export type FormErrors<T> = {
  [K in keyof T]?: FieldErrors<T[K]>;
};

export type FieldTouched<T> = T extends any[]
  ? T[number] extends object
    ? FormTouched<T[number]>[]
    : boolean
  : T extends object
  ? FormTouched<T>
  : boolean;

export type FormTouched<T> = {
  [K in keyof T]?: FieldTouched<T[K]>;
};

export interface FormOptions<T> {
  initialValues: T;
  initialErrors?: FormErrors<T>;
  initialTouched?: FormTouched<T>;
}

export type Transform<T> = (value: T) => T;
export type SetState<T> = T | Transform<T>;

export interface Form<T> {
  initialValues: T;
  initialErrors: FormErrors<T>;
  initialTouched: FormTouched<T>;
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  setValues(values: SetState<T>): void;
  setErrors(errors: SetState<FormErrors<T>>): void;
  setTouched(touched: SetState<FormTouched<T>>): void;
}

export interface Field<T> {
  id: string;
  name: string;
  value: T;
  error: FieldErrors<T> | undefined;
  touched: FieldTouched<T> | undefined;
  setValue(value: SetState<T>): void;
  setError(error: SetState<FieldErrors<T>>): void;
  setTouched(touched: SetState<FieldTouched<T>>): void;
}
