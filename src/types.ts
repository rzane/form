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

export interface FormState<T> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
}

export type FormAction<T, K extends keyof T> =
  | { type: "form/setValues"; values: T }
  | { type: "form/setErrors"; errors: FormErrors<T> }
  | { type: "form/setTouched"; touched: FormTouched<T> }
  | { type: "field/setValue"; name: K; value: T[K] }
  | { type: "field/setError"; name: K; error: FormErrors<T>[K] }
  | { type: "field/setTouched"; name: K; touched: FormTouched<T>[K] };

export type FormReducer<T> = React.Reducer<
  FormState<T>,
  FormAction<T, keyof T>
>;

export interface Form<T> extends FormState<T> {
  initialValues: T;
  initialErrors: FormErrors<T>;
  initialTouched: FormTouched<T>;
  setValues(values: T): void;
  setErrors(errors: FormErrors<T>): void;
  setTouched(touched: FormTouched<T>): void;
  setFieldValue<K extends keyof T>(name: K, value: T[K]): void;
  setFieldError<K extends keyof T>(name: K, error: FormErrors<T>[K]): void;
  setFieldTouched<K extends keyof T>(name: K, touched: FormTouched<T>[K]): void;
}

export interface Field<T> {
  id: string;
  name: string;
  value: T;
  error: FieldErrors<T> | undefined;
  touched: FieldTouched<T> | undefined;
  setValue(value: T): void;
  setError(error: FieldErrors<T>): void;
  setTouched(touched: FieldTouched<T>): void;
}
